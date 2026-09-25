import { describe, expect, it } from "vitest";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import {
  assertAdminImageFile,
  getAdminAssetIds,
  parseAdminArticleFormData,
  toContentfulArticleFields,
} from "./articlePayload";

describe("toContentfulArticleFields", () => {
  it("설교영상은 유튜브 링크를 embed URL로 정규화해 youtubeUrl 필드로 보낸다", () => {
    const fields = toContentfulArticleFields({
      category: CONTENTFUL_CATEGORY.movies,
      title: "설교 제목",
      youtubeUrl: "https://www.youtube.com/watch?v=YATPaLsfT08",
      movieType: "주일설교",
      tags: ["빌립보서"],
      thumbnailTitle: "기뻐하라",
      thumbnailBible: "빌 4:4",
      date: "2026-09-25T00:00:00.000Z",
    });

    expect(fields).toEqual({
      title: "설교 제목",
      category: CONTENTFUL_CATEGORY.movies,
      date: "2026-09-25T00:00:00.000Z",
      movieType: "주일설교",
      youtubeUrl: "https://www.youtube.com/embed/YATPaLsfT08",
      tag: ["빌립보서"],
      thumbnailTitle: "기뻐하라",
      thumbnailBible: "빌 4:4",
    });
  });

  it("교회소식은 이미지 asset id를 순서대로 images 필드로 보낸다", () => {
    expect(
      toContentfulArticleFields(
        {
          category: CONTENTFUL_CATEGORY.news,
          title: "소식 제목",
          newsType: "주보",
          date: "2026-09-25T00:00:00.000Z",
        },
        ["asset-1", "asset-2"],
      ),
    ).toEqual({
      title: "소식 제목",
      category: CONTENTFUL_CATEGORY.news,
      date: "2026-09-25T00:00:00.000Z",
      newsType: "주보",
      imageAssetIds: ["asset-1", "asset-2"],
    });
  });
});

describe("getAdminAssetIds", () => {
  function createFormData(assetIds: string[]) {
    const formData = new FormData();
    assetIds.forEach((assetId) => formData.append("assetIds", assetId));
    return formData;
  }

  it("빈 값을 제외한 asset id 목록을 순서대로 반환한다", () => {
    expect(
      getAdminAssetIds(createFormData(["asset-1", " ", "asset-2"])),
    ).toEqual(["asset-1", "asset-2"]);
  });

  it("asset id가 5개를 넘으면 에러를 던진다", () => {
    expect(() =>
      getAdminAssetIds(createFormData(["a", "b", "c", "d", "e", "f"])),
    ).toThrow("이미지는 최대 5장까지 업로드할 수 있습니다.");
  });

  it("허용되지 않은 문자가 들어간 asset id는 거부한다", () => {
    expect(() => getAdminAssetIds(createFormData(["../entries"]))).toThrow(
      "유효하지 않은 이미지 ID입니다.",
    );
  });
});

describe("assertAdminImageFile", () => {
  function createFile(size: number, type = "image/png") {
    return new File([new Uint8Array(size)], "image.png", { type });
  }

  it("4MB 이하의 허용된 이미지를 반환한다", () => {
    const file = createFile(4 * 1024 * 1024);
    expect(assertAdminImageFile(file)).toBe(file);
  });

  it("4MB를 넘는 이미지는 거부한다", () => {
    expect(() => assertAdminImageFile(createFile(4 * 1024 * 1024 + 1))).toThrow(
      "이미지는 한 장당 4MB 이하만 업로드할 수 있습니다.",
    );
  });

  it("허용되지 않은 형식은 거부한다", () => {
    expect(() => assertAdminImageFile(createFile(10, "image/gif"))).toThrow(
      "PNG, JPG, WEBP 이미지만 업로드할 수 있습니다.",
    );
  });

  it("파일이 없으면 거부한다", () => {
    expect(() => assertAdminImageFile(null)).toThrow(
      "업로드할 이미지가 필요합니다.",
    );
  });
});

describe("parseAdminArticleFormData", () => {
  function createMovieFormData(movieType?: string) {
    const formData = new FormData();
    formData.set("category", CONTENTFUL_CATEGORY.movies);
    formData.set("title", "설교 제목");
    formData.set("youtubeUrl", "https://www.youtube.com/watch?v=YATPaLsfT08");
    if (movieType !== undefined) {
      formData.set("movieType", movieType);
    }
    return formData;
  }

  it("설교영상의 설교 종류를 읽는다", () => {
    expect(
      parseAdminArticleFormData(createMovieFormData("수요설교")),
    ).toMatchObject({ movieType: "수요설교" });
  });

  it("설교 종류가 없거나 허용되지 않은 값이면 에러를 던진다", () => {
    expect(() => parseAdminArticleFormData(createMovieFormData())).toThrow(
      "설교 종류를 선택해주세요.",
    );
    expect(() =>
      parseAdminArticleFormData(createMovieFormData("금요설교")),
    ).toThrow("설교 종류를 선택해주세요.");
  });

  function createNewsFormData(newsType?: string) {
    const formData = new FormData();
    formData.set("category", CONTENTFUL_CATEGORY.news);
    formData.set("title", "소식 제목");
    if (newsType !== undefined) {
      formData.set("newsType", newsType);
    }
    return formData;
  }

  it("교회소식의 소식 종류를 읽는다", () => {
    expect(parseAdminArticleFormData(createNewsFormData("주보"))).toMatchObject(
      { newsType: "주보" },
    );
  });

  it("소식 종류가 없거나 허용되지 않은 값이면 에러를 던진다", () => {
    expect(() => parseAdminArticleFormData(createNewsFormData())).toThrow(
      "소식 종류를 선택해주세요.",
    );
    expect(() => parseAdminArticleFormData(createNewsFormData("행사"))).toThrow(
      "소식 종류를 선택해주세요.",
    );
  });
});

describe("toContentfulArticleFields updateImages", () => {
  it("이미지를 바꾸지 않은 교회소식 수정은 이미지 필드를 보내지 않는다", () => {
    const fields = toContentfulArticleFields(
      {
        category: CONTENTFUL_CATEGORY.news,
        title: "소식 제목",
        newsType: "주보",
      },
      [],
      { updateImages: false },
    );

    expect(fields).toHaveProperty("imageAssetIds", undefined);
  });
});

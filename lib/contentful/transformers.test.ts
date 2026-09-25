import { describe, expect, it } from "vitest";
import { CONTENTFUL_CATEGORY } from "@/constants/category";
import type { ArticleEntry } from "@/lib/contentful/article";
import { mockArticle } from "@/utils/__test__/article-fixture";
import { toArticleDetail, toArticleSummary } from "./transformers";

function createEntry(contentType: string, fields: Record<string, unknown>) {
  return {
    ...mockArticle,
    sys: {
      ...mockArticle.sys,
      contentType: {
        sys: { type: "Link", linkType: "ContentType", id: contentType },
      },
    },
    fields,
  } as unknown as ArticleEntry;
}

const asset = {
  fields: {
    title: "주보",
    file: {
      url: "//images.ctfassets.net/space/asset/jubo.png",
      details: { image: { width: 1080, height: 1920 } },
    },
  },
};

describe("transformers", () => {
  it("movie 모델은 설교영상 카테고리와 youtubeUrl을 갖는다", () => {
    const detail = toArticleDetail(
      createEntry("movie", {
        title: "설교",
        date: "2026-09-13T00:00+09:00",
        movieType: "주일설교",
        youtubeUrl: "https://www.youtube.com/embed/abc",
        tag: ["열왕기하"],
      }),
    );

    expect(detail.fields).toMatchObject({
      category: CONTENTFUL_CATEGORY.movies,
      movieType: "주일설교",
      newsType: null,
      youtubeUrl: "https://www.youtube.com/embed/abc",
      tag: ["열왕기하"],
      paragraph: null,
      images: [],
    });
  });

  it("news 모델은 images 필드를 이미지 목록과 대표 이미지로 쓴다", () => {
    const entry = createEntry("news", {
      title: "주보",
      date: "2026-07-05T00:00+09:00",
      newsType: "주보",
      images: [asset],
    });

    expect(toArticleDetail(entry).fields).toMatchObject({
      category: CONTENTFUL_CATEGORY.news,
      newsType: "주보",
      youtubeUrl: null,
      images: [
        {
          url: "https://images.ctfassets.net/space/asset/jubo.png",
          width: 1080,
          height: 1920,
          title: "주보",
        },
      ],
    });
    expect(toArticleSummary(entry).fields.thumbnailUrl).toBe(
      "https://images.ctfassets.net/space/asset/jubo.png",
    );
  });

  it("기존 article 모델은 category 필드를 그대로 쓴다", () => {
    const detail = toArticleDetail(mockArticle);

    expect(detail.fields.category).toBe(mockArticle.fields.category);
    expect(detail.fields.youtubeUrl).toBeNull();
    expect(detail.fields.images).toEqual([]);
  });
});

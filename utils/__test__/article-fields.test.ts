import {
  getArticleDescription,
  getArticleTags,
  getArticleThumbnailUrl,
} from "@/utils/article-fields";
import { mockArticle } from "@/utils/__test__/article-fixture";
import { describe, expect, it } from "vitest";

describe("article-fields utils", () => {
  it("getArticleThumbnailUrl", () => {
    const expected =
      "https://images.ctfassets.net/gahy3ijwoce2/6QTx4NXaucnwVwHnDNHOPR/490f021a08371a25370daa752241939e/_________1.png";

    expect(getArticleThumbnailUrl(mockArticle)).toBe(expected);
  });

  it("getArticleTags", () => {
    expect(getArticleTags(mockArticle)).toEqual(["빌립보서"]);
  });

  it("getArticleDescription", () => {
    const desc = getArticleDescription(mockArticle);

    // check link removal
    expect(desc).not.toMatch(/https?:\/\/\S+/);
    expect(desc).toContain("빌립보서 4 : 1");
    expect(desc).toContain("그러므로 나의 사랑하고 사모하는 형제들");
  });
});

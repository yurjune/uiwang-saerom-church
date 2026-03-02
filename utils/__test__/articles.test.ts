import { postNumberPerOnePage } from "@/constants/pagination";
import { mockArticle } from "@/utils/__test__/article-fixture";
import { filterByTag, getLimitedArticles } from "@/utils/articles";
import { describe, expect, it } from "vitest";

describe("articles utils", () => {
  describe("filterByTag", () => {
    it("returns only articles that contain the matching tag", () => {
      const articles = [mockArticle, mockArticle, mockArticle];
      const result = filterByTag(articles, "빌립보서");
      expect(result).toHaveLength(3);
    });

    it("returns empty array for a non-existing tag", () => {
      const articles = [mockArticle, mockArticle];
      const result = filterByTag(articles, "없는태그");
      expect(result).toEqual([]);
    });

    it("returns original articles when tag value is not provided", () => {
      const articles = [mockArticle, mockArticle];

      expect(filterByTag(articles)).toEqual(articles);
    });
  });

  describe("getLimitedArticles", () => {
    it("returns first page with postNumberPerOnePage size", () => {
      const articles = Array.from(
        { length: postNumberPerOnePage + 4 },
        () => mockArticle,
      );

      const result = getLimitedArticles(articles, 1);

      expect(result).toHaveLength(postNumberPerOnePage);
      expect(result).toEqual(articles.slice(0, postNumberPerOnePage));
    });

    it("returns remaining articles on the last page", () => {
      const total = postNumberPerOnePage + 2;
      const articles = Array.from({ length: total }, () => mockArticle);

      const result = getLimitedArticles(articles, 2);

      expect(result).toHaveLength(2);
      expect(result).toEqual(articles.slice(postNumberPerOnePage, total));
    });
  });
});

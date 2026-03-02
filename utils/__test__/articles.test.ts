import { mockArticle } from "@/utils/__test__/article-fixture";
import { filterByTag, getLimitedArticles } from "@/utils/articles";

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
      const limit = 8;
      const articles = Array.from({ length: limit + 4 }, () => mockArticle);

      const result = getLimitedArticles(articles, 1, limit);

      expect(result).toHaveLength(limit);
      expect(result).toEqual(articles.slice(0, limit));
    });

    it("returns remaining articles on the last page", () => {
      const limit = 8;
      const total = limit + 2;
      const articles = Array.from({ length: total }, () => mockArticle);

      const result = getLimitedArticles(articles, 2, limit);

      expect(result).toHaveLength(2);
      expect(result).toEqual(articles.slice(limit, total));
    });
  });
});

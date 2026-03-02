import { CONTENTFUL_CATEGORY } from "@/constants/category";
import { categoryToContentUrl, categoryToUrl } from "@/utils/category";
import { ProjectUrl } from "@/constants/projectUrl";

describe("category utils", () => {
  it("maps known category to page url", () => {
    expect(categoryToUrl(CONTENTFUL_CATEGORY.movies)).toBe(
      ProjectUrl.movies.toString(),
    );
    expect(categoryToUrl(CONTENTFUL_CATEGORY.news)).toBe(
      ProjectUrl.news.toString(),
    );
  });

  it("maps known category to content url", () => {
    expect(categoryToContentUrl(CONTENTFUL_CATEGORY.movies)).toBe(
      ProjectUrl.contents.movies.toString(),
    );
    expect(categoryToContentUrl(CONTENTFUL_CATEGORY.news)).toBe(
      ProjectUrl.contents.news.toString(),
    );
  });
});

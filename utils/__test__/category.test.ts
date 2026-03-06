import { CONTENTFUL_CATEGORY } from "@/constants/category";
import {
  categoryToContentUrl,
  buildMoviesUrl,
  categoryToUrl,
} from "@/utils/category";
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

  it("builds movies url with search params", () => {
    const moviesUrl = ProjectUrl.movies.toString();

    expect(buildMoviesUrl()).toBe(moviesUrl);
    expect(buildMoviesUrl({ bible: "john" })).toBe(`${moviesUrl}?bible=john`);
    expect(buildMoviesUrl({ bible: "john", page: 2 })).toBe(
      `${moviesUrl}?bible=john&page=2`,
    );
    expect(buildMoviesUrl({ page: 0 })).toBe(moviesUrl);
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContentList from "./ContentList";
import { createMockArticle } from "@/utils/__test__/article-fixture";

function setUp(length: number = 10) {
  const articles = Array.from({ length }).map(createMockArticle);
  return render(
    <ContentList articles={articles} currentPage={1} limit={length} />,
  );
}

describe("ContentList", () => {
  it("renders contents correctly", () => {
    setUp(10);
    expect(screen.getAllByRole("link")).toHaveLength(10);
  });
});

import { render, screen } from "@testing-library/react";
import ContentItemCard from "./ContentItemCard";
import { mockArticle } from "@/utils/__test__/article-fixture";
import { toArticleSummary } from "@/lib/contentful/transformers";

function setUp() {
  return render(
    <ContentItemCard article={toArticleSummary(mockArticle)} href="/#" />,
  );
}

describe("ContentItem", () => {
  it("has link", () => {
    setUp();
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders the title over a preset thumbnail", () => {
    const { container } = setUp();
    const img = container.querySelector("img");
    expect(img?.getAttribute("src") ?? "").toContain(".webp");
    expect(screen.getAllByText("항상 기뻐하라")).toHaveLength(2);
  });
});

import { render, screen } from "@testing-library/react";
import ContentItemCard from "./ContentItemCard";
import { mockArticle } from "@/utils/__test__/article-fixture";

function setUp() {
  return render(<ContentItemCard article={mockArticle} href="/#" />);
}

describe("ContentItem", () => {
  it("has link", () => {
    setUp();
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("has thumbnail img", () => {
    setUp();
    const img = screen.getByRole("img");
    const src = img.getAttribute("src") ?? "";
    expect(src).toContain(".png");
  });
});

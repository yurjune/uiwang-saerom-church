import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";

type SetUpOptions = {
  totalCount: number;
  currentPage: number;
  limit?: number;
  pageGroupSize?: number;
  movePage?: (page: number) => void;
};

function setUp({
  totalCount,
  currentPage,
  limit = 8,
  pageGroupSize = 5,
  movePage = vi.fn(),
}: SetUpOptions) {
  return render(
    <Pagination
      totalCount={totalCount}
      currentPage={currentPage}
      limit={limit}
      pageGroupSize={pageGroupSize}
      movePage={movePage}
    />,
  );
}

describe("Pagination", () => {
  describe("renders", () => {
    it("first page group buttons correctly", () => {
      setUp({ totalCount: 40, currentPage: 1 });
      expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();

      expect(
        screen.queryByRole("button", { name: "6" }),
      ).not.toBeInTheDocument();
    });

    it("second page group buttons correctly", () => {
      setUp({ totalCount: 50, currentPage: 6 });
      expect(screen.getByRole("button", { name: "6" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "7" })).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "8" }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "1" }),
      ).not.toBeInTheDocument();
    });

    it("no buttons when totalCount is 0", () => {
      const { container } = setUp({ totalCount: 0, currentPage: 1 });
      expect(within(container).queryAllByRole("button")).toHaveLength(0);
    });
  });

  it("movePage is called when click a button", () => {
    const movePage = vi.fn();
    setUp({ totalCount: 40, currentPage: 1, movePage });

    screen.getByRole("button", { name: "1" }).click();
    expect(movePage).toHaveBeenCalledWith(1);
  });

  describe("group tests: ", () => {
    it("hide prev-group arrows if first page group", () => {
      setUp({ totalCount: 40, currentPage: 1 });
      expect(
        screen.queryByRole("button", { name: /to previous page group/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /to first page/i }),
      ).not.toBeInTheDocument();
    });

    it("hide next-group arrows if last page group", () => {
      setUp({ totalCount: 40, currentPage: 1 });
      expect(
        screen.queryByRole("button", { name: /to next page group/i }),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: /to last page/i }),
      ).not.toBeInTheDocument();
    });

    it("show next-group arrows if not last page group", () => {
      setUp({ totalCount: 50, currentPage: 1 });
      expect(
        screen.getByRole("button", { name: /to next page group/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /to last page/i }),
      ).toBeInTheDocument();
    });

    it("show prev-group arrows if not first page group", () => {
      setUp({ totalCount: 50, currentPage: 6 });
      expect(
        screen.getByRole("button", { name: /to previous page group/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /to first page/i }),
      ).toBeInTheDocument();
    });
  });
});

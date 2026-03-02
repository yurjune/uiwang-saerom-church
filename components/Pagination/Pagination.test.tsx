import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Pagination from "./Pagination";

function setUp(totalCount: number = 0, currentPage: number = 1) {
  return render(
    <Pagination totalCount={totalCount} currentPage={currentPage} />,
  );
}

describe("Pagination", () => {
  it("renders", () => {
    setUp();
  });
});

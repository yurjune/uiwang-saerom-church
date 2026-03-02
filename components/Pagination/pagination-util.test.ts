import getPagination from "./pagination-util";

const defaultOptions = {
  totalCount: 41,
  currentPage: 1,
  limit: 8,
  pageGroupSize: 5,
};

describe("getPagination", () => {
  it("returns", () => {
    const res = getPagination(defaultOptions);
    expect(res).toStrictEqual({
      currentPageGroup: [1, 2, 3, 4, 5],
      lastPage: 6,
      isFirstGroup: true,
      isLastGroup: false,
    });
  });

  it("current page in first group", () => {
    const res = getPagination(defaultOptions);
    expect(res.isFirstGroup).toBe(true);
    expect(res.isLastGroup).toBe(false);
  });

  it("current page in last group", () => {
    const res = getPagination({ ...defaultOptions, currentPage: 6 });
    expect(res.isFirstGroup).toBe(false);
    expect(res.isLastGroup).toBe(true);
  });

  it("if totalCount is 0", () => {
    expect(getPagination({ ...defaultOptions, totalCount: 0 })).toStrictEqual({
      currentPageGroup: [],
      lastPage: 0,
      isFirstGroup: true,
      isLastGroup: true,
    });
  });
});

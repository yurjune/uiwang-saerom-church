"use client";

import { postNumberPerOnePage } from "../../utils/pagination";

const PAGE_GROUP_SIZE = 5;

const toPage = (value, fallback = 1) => {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 1) {
    return fallback;
  }
  return number;
};

const usePagination = (totalCount = 0, initialPage = 1) => {
  const safeTotalCount = Number.isFinite(Number(totalCount))
    ? Math.max(0, Number(totalCount))
    : 0;
  const totalPageCount = Math.ceil(safeTotalCount / postNumberPerOnePage);
  const safeCurrentPage =
    totalPageCount > 0
      ? Math.min(Math.max(toPage(initialPage), 1), totalPageCount)
      : 1;
  const startPage =
    Math.floor((safeCurrentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPageCount);
  const firstGroupEnd = Math.min(PAGE_GROUP_SIZE, totalPageCount);

  const currentPageGroup =
    totalPageCount > 0
      ? Array.from(
          { length: endPage - startPage + 1 },
          (_value, index) => startPage + index,
        )
      : [];
  const firstPageGroup =
    totalPageCount > 0
      ? Array.from({ length: firstGroupEnd }, (_value, index) => index + 1)
      : [];
  const lastGroupStart =
    Math.floor((Math.max(totalPageCount, 1) - 1) / PAGE_GROUP_SIZE) *
      PAGE_GROUP_SIZE +
    1;
  const lastPageGroup =
    totalPageCount > 0
      ? Array.from(
          { length: totalPageCount - lastGroupStart + 1 },
          (_value, index) => lastGroupStart + index,
        )
      : [];

  const isFirstGroup = firstPageGroup[0] === currentPageGroup[0];
  const isLastGroup = lastPageGroup[0] === currentPageGroup[0];

  return {
    currentPage: safeCurrentPage,
    currentPageGroup,
    firstPage: firstPageGroup[0],
    lastPage: lastPageGroup[lastPageGroup.length - 1],
    isFirstGroup,
    isLastGroup,
  };
};

export default usePagination;

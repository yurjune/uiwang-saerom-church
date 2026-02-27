"use client";

import { postNumberPerOnePage } from "../../constants/pagination";

const PAGE_GROUP_SIZE = 5;

const toPage = (page) => {
  const number = Number(page);
  const showFallback = !Number.isInteger(number) || number < 1;
  return showFallback ? 1 : number;
};

const usePagination = (_totalCount = 0, initialPage = 1) => {
  const totalCount = Number.isFinite(Number(_totalCount))
    ? Math.max(0, Number(_totalCount))
    : 0;

  const totalPageCount = Math.ceil(totalCount / postNumberPerOnePage);
  const currentPage =
    totalPageCount > 0
      ? Math.min(Math.max(toPage(initialPage), 1), totalPageCount)
      : 1;

  const startPage =
    Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPageCount);

  const firstGroupEnd = Math.min(PAGE_GROUP_SIZE, totalPageCount);
  const lastGroupStart =
    Math.floor((Math.max(totalPageCount, 1) - 1) / PAGE_GROUP_SIZE) *
      PAGE_GROUP_SIZE +
    1;

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
    currentPage: currentPage,
    currentPageGroup,
    firstPage: firstPageGroup[0],
    lastPage: lastPageGroup[lastPageGroup.length - 1],
    isFirstGroup,
    isLastGroup,
  };
};

export default usePagination;

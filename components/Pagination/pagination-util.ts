"use client";

import { postNumberPerOnePage } from "@/constants/pagination";

const PAGE_GROUP_SIZE = 5;

export interface PaginationOption {
  totalCount: number;
  currentPage: number;
  limit?: number;
  pageGroupSize?: number;
}

const getPagination = ({
  totalCount,
  currentPage,
  limit = postNumberPerOnePage,
  pageGroupSize = PAGE_GROUP_SIZE,
}: PaginationOption) => {
  const totalPageCount = Math.ceil(totalCount / limit);

  const startPage =
    Math.floor((currentPage - 1) / pageGroupSize) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPageCount);

  const currentPageGroup =
    totalPageCount > 0
      ? Array.from(
          { length: endPage - startPage + 1 },
          (_value, index) => startPage + index,
        )
      : [];

  const lastPage = totalPageCount;
  const isFirstGroup = totalPageCount === 0 || startPage === 1;
  const isLastGroup = totalPageCount === 0 || endPage === totalPageCount;

  return {
    currentPageGroup,
    lastPage,
    isFirstGroup,
    isLastGroup,
  };
};

export default getPagination;

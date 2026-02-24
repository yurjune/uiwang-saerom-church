"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Flex, Icon } from "@chakra-ui/react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { PageButton, ArrowButton } from "./PageButton";
import usePagination from "./usePagination";

const Pagination = ({ totalCount = 0, currentPage: initialPage = 1 }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    currentPage,
    currentPageGroup,
    firstPage,
    lastPage,
    isFirstGroup,
    isLastGroup,
  } = usePagination(totalCount, initialPage);

  const movePage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`${pathname}?${params.toString()}`);
  };

  const onClickPrevArrow = () => {
    if (currentPageGroup.length === 0) {
      return;
    }

    const startPage = currentPageGroup[0];
    movePage(startPage - 1);
  };

  const onClickNextArrow = () => {
    if (currentPageGroup.length === 0) {
      return;
    }

    const endPage = currentPageGroup[currentPageGroup.length - 1];
    movePage(endPage + 1);
  };

  const onClickFirstArrow = () => {
    if (!firstPage) {
      return;
    }

    movePage(firstPage);
  };

  const onClickLastArrow = () => {
    if (!lastPage) {
      return;
    }

    movePage(lastPage);
  };

  return (
    <Flex w="full" align="center" justify="center">
      {isFirstGroup ? null : (
        <>
          <ArrowButton onClickButton={onClickFirstArrow}>
            <Icon as={FaAngleDoubleLeft} boxSize={3} />
          </ArrowButton>
          <ArrowButton onClickButton={onClickPrevArrow}>
            <Icon as={FaAngleLeft} boxSize={3} />
          </ArrowButton>
        </>
      )}

      <Box mx={3}>
        {currentPageGroup.map((value) => (
          <PageButton
            key={value}
            value={value}
            selected={currentPage === value}
            onClickButton={movePage}
          />
        ))}
      </Box>

      {isLastGroup ? null : (
        <>
          <ArrowButton onClickButton={onClickNextArrow}>
            <Icon as={FaAngleRight} boxSize={3} />
          </ArrowButton>
          <ArrowButton onClickButton={onClickLastArrow}>
            <Icon as={FaAngleDoubleRight} boxSize={3} />
          </ArrowButton>
        </>
      )}
    </Flex>
  );
};

export default Pagination;

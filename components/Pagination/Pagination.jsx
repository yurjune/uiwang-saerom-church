"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PageButton, ArrowButton } from "./PageButton";

import usePagination from "../../hooks/usePagination";

const Pagination = ({ articles, currentPage: initialPage = 1 }) => {
  // console.log('Pagination')
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    currentPage,
    setCurrentPage,
    currentPageGroup,
    memorizedCurrentPageGroup,
    setCurrentPageGroup,
    firstPageGroup,
    lastPageGroup,
    firstPage,
    lastPage,
  } = usePagination(articles, initialPage);

  useEffect(() => {
    const page = parseInt(searchParams.get("page"), 10);
    setCurrentPage(page || 1);
  }, [searchParams, setCurrentPage]);

  useEffect(() => {
    setCurrentPageGroup(memorizedCurrentPageGroup);
  }, [memorizedCurrentPageGroup]);

  const movePage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`${pathname}?${params.toString()}`);
  };

  const onClickButton = (children) => (e) => {
    movePage(children);
  };

  const onClickPrevArrow = () => {
    const startPage = currentPageGroup[0];
    movePage(startPage - 1);
  };

  const onClickNextArrow = () => {
    const endPage = currentPageGroup[currentPageGroup.length - 1];
    movePage(endPage + 1);
  };

  return (
    <Flex w="full" align="center" justify="center">
      {currentPageGroup ? (
        <Flex>
          {firstPageGroup[0] === currentPageGroup[0] ? (
            ""
          ) : (
            <>
              <PageButton
                onClickButton={onClickButton}
                currentPage={currentPage}
              >
                {firstPage}
              </PageButton>
              <ArrowButton onClickButton={onClickPrevArrow}>
                <Icon as={IoIosArrowBack} boxSize={3} />
              </ArrowButton>
            </>
          )}
          <Box mx={3}>
            {currentPageGroup.map((value) => (
              <PageButton
                key={value}
                currentPage={currentPage}
                onClickButton={onClickButton}
              >
                {value}
              </PageButton>
            ))}
          </Box>
          {lastPageGroup[0] === currentPageGroup[0] ? (
            ""
          ) : (
            <>
              <ArrowButton onClickButton={onClickNextArrow}>
                <Icon as={IoIosArrowForward} boxSize={3} />
              </ArrowButton>
              <PageButton
                onClickButton={onClickButton}
                currentPage={currentPage}
              >
                {lastPage}
              </PageButton>
            </>
          )}
        </Flex>
      ) : (
        "없는 페이지입니다"
      )}
    </Flex>
  );
};

export default Pagination;

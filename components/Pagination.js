import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { PageButton, ArrowButton } from "./PageButton";

import usePagination from "../hooks/usePagination";

const Pagination = ({ articles }) => {
  // console.log('Pagination')
  const router = useRouter();
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
  } = usePagination(articles);

  useEffect(() => {
    const page = parseInt(router.query.page, 10);
    setCurrentPage(page || 1);
  }, [router.query.page]);

  useEffect(() => {
    setCurrentPageGroup(memorizedCurrentPageGroup);
  }, [memorizedCurrentPageGroup]);

  const movePage = (page) => {
    const url = `${router.pathname}?page=${page}`;
    if (router.query.v) {
      return router.push(`${url}&v=${router.query.v}`);
    }
    return router.push(url);
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

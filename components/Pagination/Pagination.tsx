import { Box, Flex, Icon } from "@chakra-ui/react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import { PageButton, ArrowButton } from "@/components/Pagination/PageButton";
import getPagination from "@/components/Pagination/pagination-util";

type Props = {
  totalCount: number;
  currentPage: number;
  limit?: number;
  pageGroupSize?: number;
  getPageHref: (page: number) => string;
};

const Pagination = ({
  totalCount = 0,
  currentPage,
  limit,
  pageGroupSize,
  getPageHref,
}: Props) => {
  const { currentPageGroup, lastPage, isFirstGroup, isLastGroup } =
    getPagination({ totalCount, currentPage, limit, pageGroupSize });

  const prevPage =
    currentPageGroup.length > 0 ? currentPageGroup[0] - 1 : currentPage;

  const nextPage =
    currentPageGroup.length > 0
      ? currentPageGroup[currentPageGroup.length - 1] + 1
      : currentPage;

  return (
    <Flex w="full" align="center" justify="center">
      {isFirstGroup ? null : (
        <>
          <ArrowButton ariaLabel="to first page" href={getPageHref(1)}>
            <Icon as={FaAngleDoubleLeft} boxSize={3} />
          </ArrowButton>
          <ArrowButton
            ariaLabel="to previous page group"
            href={getPageHref(prevPage)}
          >
            <Icon as={FaAngleLeft} boxSize={3} />
          </ArrowButton>
        </>
      )}

      <Box mx={3}>
        {currentPageGroup.map((curPage) => (
          <PageButton
            key={curPage}
            value={curPage}
            selected={currentPage === curPage}
            href={getPageHref(curPage)}
          />
        ))}
      </Box>

      {isLastGroup ? null : (
        <>
          <ArrowButton
            ariaLabel="to next page group"
            href={getPageHref(nextPage)}
          >
            <Icon as={FaAngleRight} boxSize={3} />
          </ArrowButton>
          <ArrowButton ariaLabel="to last page" href={getPageHref(lastPage)}>
            <Icon as={FaAngleDoubleRight} boxSize={3} />
          </ArrowButton>
        </>
      )}
    </Flex>
  );
};

export default Pagination;

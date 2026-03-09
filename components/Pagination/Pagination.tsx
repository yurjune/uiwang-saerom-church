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
  createPageHref: (page: number) => string;
};

const Pagination = ({
  totalCount = 0,
  currentPage,
  limit,
  pageGroupSize,
  createPageHref,
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
          <ArrowButton ariaLabel="to first page" href={createPageHref(1)}>
            <Icon as={FaAngleDoubleLeft} boxSize={3} />
          </ArrowButton>
          <ArrowButton
            ariaLabel="to previous page group"
            href={createPageHref(prevPage)}
          >
            <Icon as={FaAngleLeft} boxSize={3} />
          </ArrowButton>
        </>
      )}

      <Box mx={3}>
        {currentPageGroup.map((page) => (
          <PageButton
            key={page}
            value={page}
            selected={currentPage === page}
            href={createPageHref(page)}
          />
        ))}
      </Box>

      {isLastGroup ? null : (
        <>
          <ArrowButton
            ariaLabel="to next page group"
            href={createPageHref(nextPage)}
          >
            <Icon as={FaAngleRight} boxSize={3} />
          </ArrowButton>
          <ArrowButton ariaLabel="to last page" href={createPageHref(lastPage)}>
            <Icon as={FaAngleDoubleRight} boxSize={3} />
          </ArrowButton>
        </>
      )}
    </Flex>
  );
};

export default Pagination;

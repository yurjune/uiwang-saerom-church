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
  movePage: (page: number) => void;
};

const Pagination = ({
  totalCount = 0,
  currentPage,
  limit,
  pageGroupSize,
  movePage,
}: Props) => {
  const { currentPageGroup, lastPage, isFirstGroup, isLastGroup } =
    getPagination({ totalCount, currentPage, limit, pageGroupSize });

  const onClickPrevArrow = () => {
    if (currentPageGroup.length === 0) return;
    const startPage = currentPageGroup[0];
    movePage(startPage - 1);
  };

  const onClickNextArrow = () => {
    if (currentPageGroup.length === 0) return;
    const endPage = currentPageGroup[currentPageGroup.length - 1];
    movePage(endPage + 1);
  };

  const onClickFirstArrow = () => {
    movePage(1);
  };

  const onClickLastArrow = () => {
    movePage(lastPage);
  };

  return (
    <Flex w="full" align="center" justify="center">
      {isFirstGroup ? null : (
        <>
          <ArrowButton
            ariaLabel="to first page"
            onClickButtonAction={onClickFirstArrow}
          >
            <Icon as={FaAngleDoubleLeft} boxSize={3} />
          </ArrowButton>
          <ArrowButton
            ariaLabel="to previous page group"
            onClickButtonAction={onClickPrevArrow}
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
            onClickButtonAction={movePage}
          />
        ))}
      </Box>

      {isLastGroup ? null : (
        <>
          <ArrowButton
            ariaLabel="to next page group"
            onClickButtonAction={onClickNextArrow}
          >
            <Icon as={FaAngleRight} boxSize={3} />
          </ArrowButton>
          <ArrowButton
            ariaLabel="to last page"
            onClickButtonAction={onClickLastArrow}
          >
            <Icon as={FaAngleDoubleRight} boxSize={3} />
          </ArrowButton>
        </>
      )}
    </Flex>
  );
};

export default Pagination;

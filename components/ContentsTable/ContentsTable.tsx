"use client";

import Link from "next/link";
import { useMediaQuery, useTheme } from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { categoryToContentUrl } from "@/utils/category";
import { getLimitedArticles } from "@/utils/articles";
import type { ArticleEntry } from "@/interface/article";
import { postNumberPerOnePage } from "@/constants/pagination";

const noWrap = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

type Props = {
  articles: ArticleEntry[];
  currentPage?: number;
};

const ContentsTable = ({ articles: _articles, currentPage = 1 }: Props) => {
  const articles = getLimitedArticles(
    _articles,
    currentPage,
    postNumberPerOnePage,
  );
  const theme = useTheme();
  const [isDesktop] = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  return (
    <Table colorScheme="blackAlpha" variant="striped">
      <Thead>
        <Tr>
          <Th {...noWrap}>카테고리</Th>
          {isDesktop && <Th>작성자</Th>}
          <Th>제목</Th>
          {isDesktop && (
            <Th {...noWrap} isNumeric>
              일시
            </Th>
          )}
        </Tr>
      </Thead>

      <Tbody>
        {articles.length >= 1 &&
          articles.map((article) => {
            return (
              <Tr key={article.sys.id}>
                <Td {...noWrap}>{article.fields.category}</Td>
                {isDesktop && <Td {...noWrap}>관리자</Td>}
                <Td maxWidth={0} w="60%">
                  <Link
                    href={`${categoryToContentUrl(article.fields.category)}/${article.sys.id}`}
                  >
                    {article.fields.title}
                  </Link>
                </Td>
                {isDesktop && (
                  <Td {...noWrap} isNumeric>
                    {article.sys.createdAt.slice(0, 10)}
                  </Td>
                )}
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
};

export default ContentsTable;

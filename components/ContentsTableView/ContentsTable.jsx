"use client";

import React from "react";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { categoryToContents } from "../../utils/categoryConverter";
import { getLimitedArticles } from "../../hooks/useArticle";

const noWrap = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const DesktopTable = ({ articles, tableStyle }) => {
  const title = {
    maxWidth: "0", // 레이아웃 탈영방지
    width: "60%", // 제목영역 크기조절
  };
  return (
    <Box display={{ base: "none", md: "block" }}>
      <Table {...tableStyle}>
        <Thead>
          <Tr>
            <Th {...noWrap}>카테고리</Th>
            <Th>작성자</Th>
            <Th>제목</Th>
            <Th {...noWrap} isNumeric>
              일시
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {articles.length >= 1 &&
            articles.map((article) => (
              <Tr key={article.sys.id}>
                <Td {...noWrap}>{article.fields.category}</Td>
                <Td {...noWrap}>디딤돌</Td>
                <Td {...title}>
                  <Link
                    href={`${categoryToContents(article.fields.category)}/${article.sys.id}`}
                  >
                    {article.fields.title}
                  </Link>
                </Td>
                <Td {...noWrap} isNumeric>
                  {article.sys.createdAt.slice(5, 10)}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const MobileTable = ({ articles, tableStyle }) => {
  const title = {
    maxWidth: "0",
    width: "70%",
  };
  return (
    <Box display={{ base: "block", md: "none" }}>
      <Table {...tableStyle}>
        <Thead>
          <Tr>
            <Th {...noWrap}>카테고리</Th>
            <Th>제목</Th>
          </Tr>
        </Thead>
        <Tbody>
          {articles.length >= 1 &&
            articles.map((article) => (
              <Tr key={article.sys.id}>
                <Td {...noWrap}>{article.fields.category}</Td>
                <Td {...title}>
                  <Link
                    href={`${categoryToContents(article.fields.category)}/${article.sys.id}`}
                  >
                    {article.fields.title}
                  </Link>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

const ContentsTable = ({ articles, tableStyle, currentPage = 1 }) => {
  const limitedArticles = getLimitedArticles(articles, currentPage);

  return (
    <>
      <DesktopTable articles={limitedArticles} tableStyle={tableStyle} />
      <MobileTable articles={limitedArticles} tableStyle={tableStyle} />
    </>
  );
};

export default ContentsTable;

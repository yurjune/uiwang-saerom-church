import NextLink from "next/link";
import { Badge, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { categoryToContentUrl } from "@/utils/category";
import type { ArticleSummary } from "@/lib/contentful/article";

const noWrap = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
};

const linkCellStyle = {
  display: "block",
  padding: "16px 24px",
  color: "inherit",
  textDecoration: "none",
};

type Props = {
  articles: ArticleSummary[];
};

function getNewsTypeBadgeColor(newsType: string | null) {
  return newsType === "주보" ? "blue" : "gray";
}

const ContentsTable = ({ articles }: Props) => {
  return (
    <Table colorScheme="blackAlpha" variant="striped">
      <Thead>
        <Tr>
          <Th {...noWrap}>카테고리</Th>
          <Th {...noWrap}>종류</Th>
          <Th display={{ base: "none", md: "table-cell" }}>작성자</Th>
          <Th>제목</Th>
          <Th
            {...noWrap}
            isNumeric
            display={{ base: "none", md: "table-cell" }}
          >
            일시
          </Th>
        </Tr>
      </Thead>

      <Tbody>
        {articles.length >= 1 &&
          articles.map((article) => {
            const href = `${categoryToContentUrl(article.fields.category)}/${article.sys.id}`;
            const newsType = article.fields.newsType ?? "기타";

            return (
              <Tr key={article.sys.id}>
                <Td {...noWrap} p={0}>
                  <NextLink href={href} style={linkCellStyle}>
                    {article.fields.category}
                  </NextLink>
                </Td>
                <Td {...noWrap} p={0}>
                  <NextLink href={href} style={linkCellStyle}>
                    <Badge colorScheme={getNewsTypeBadgeColor(newsType)}>
                      {newsType}
                    </Badge>
                  </NextLink>
                </Td>
                <Td
                  {...noWrap}
                  p={0}
                  display={{ base: "none", md: "table-cell" }}
                >
                  <NextLink href={href} style={linkCellStyle}>
                    관리자
                  </NextLink>
                </Td>
                <Td maxWidth={0} w="60%" p={0}>
                  <NextLink
                    href={href}
                    style={{
                      ...linkCellStyle,
                      ...noWrap,
                    }}
                  >
                    {article.fields.title}
                  </NextLink>
                </Td>
                <Td
                  {...noWrap}
                  p={0}
                  isNumeric
                  display={{ base: "none", md: "table-cell" }}
                >
                  <NextLink
                    href={href}
                    style={{
                      ...linkCellStyle,
                      textAlign: "right",
                    }}
                  >
                    {article.fields.date.slice(0, 10)}
                  </NextLink>
                </Td>
              </Tr>
            );
          })}
      </Tbody>
    </Table>
  );
};

export default ContentsTable;

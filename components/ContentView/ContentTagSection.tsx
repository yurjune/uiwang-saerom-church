import { Box, Link } from "@chakra-ui/react";
import { buildMoviesUrl } from "@/utils/category";
import type { ArticleDetail } from "@/lib/contentful/article";

type Props = {
  article: ArticleDetail;
};

const ContentTagSection = ({ article }: Props) => {
  const { tag } = article.fields;

  return (
    <Box>
      <Box>태그</Box>

      {tag && (
        <Box mt="16px">
          {tag.map((item, index) => {
            const isLast = index === tag.length - 1;
            const suffix = isLast ? "" : ", ";
            const tagName = item + suffix;
            return (
              <Link
                key={tagName + index}
                href={buildMoviesUrl({ bible: tagName })}
                mr="10px"
                fontSize="15px"
                color="grayLetter"
              >
                {tagName}
              </Link>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default ContentTagSection;

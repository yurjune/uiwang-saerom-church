import { Box, Link } from "@chakra-ui/react";
import { buildMoviesUrl } from "@/utils/category";
import type { ArticleEntry } from "@/interface/article";

type Props = {
  article: ArticleEntry;
};

const ContentTagSection = ({ article }: Props) => {
  const { tag } = article.fields;

  return (
    <Box>
      <Box>태그</Box>

      {tag && (
        <Box mt="16px">
          {tag.map((item, index) => (
            <Link
              key={item + index}
              href={buildMoviesUrl({ bible: item })}
              mr="10px"
              fontSize="15px"
              color="grayLetter"
            >
              {item},
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ContentTagSection;

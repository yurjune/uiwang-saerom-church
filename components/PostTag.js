import React from "react";
import { Box, Link, Divider } from "@chakra-ui/react";
import { categoryToUrl } from "../utils/categoryConverter";

const PostTag = ({ article }) => {
  const { category, tag } = article.fields;
  return (
    <Box>
      <Divider mt="50px" mb="20px" />
      <Box mb="15px" fontSize="16px">
        태그
      </Box>
      {tag &&
        tag.map((item, index) => (
          <Link
            key={item + index}
            href={`${categoryToUrl(category)}?v=${item}`}
            mr="10px"
            fontSize="15px"
            color="grayLetter"
          >
            {item},
          </Link>
        ))}
    </Box>
  );
};

export default PostTag;

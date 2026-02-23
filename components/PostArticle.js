import React from "react";
import { Box, AspectRatio } from "@chakra-ui/react";
import NextImage from "next/image";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const option = {
  renderNode: {
    [BLOCKS.DOCUMENT]: (node, children) => (
      <Box fontSize="16px" lineHeight="180%">
        {children}
      </Box>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      // console.log(node)
      const fields = node.data.target.fields;
      if (fields.file.details.image) {
        return (
          <NextImage
            src={`https:${fields.file.url}`}
            width={fields.file.details.image.width}
            height={fields.file.details.image.height}
          />
        );
      }
    },
    [INLINES.HYPERLINK]: (node, children) => {
      // console.log('node:', node);
      if (node.data.uri.indexOf("youtube.com") !== -1) {
        return (
          <AspectRatio ratio={16 / 9}>
            <iframe
              src={node.data.uri}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
        );
      }
    },
  },
  renderText: (text) => {
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

const PostArticle = ({ children, article }) => {
  const { paragraph } = article.fields;
  return (
    <Box>
      <Box>{documentToReactComponents(paragraph, option)}</Box>
      {children}
    </Box>
  );
};

export default PostArticle;

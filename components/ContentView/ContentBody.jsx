"use client";

import React from "react";
import { Box, AspectRatio } from "@chakra-ui/react";
import NextImage from "next/image";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const option = {
  renderNode: {
    [BLOCKS.DOCUMENT]: (_node, children) => (
      <Box fontSize="16px" lineHeight="180%">
        {children}
      </Box>
    ),
    // Quick workaround: avoid invalid <p><div/></p> nesting when inline YouTube renders AspectRatio (div).
    [BLOCKS.PARAGRAPH]: (_node, children) => <Box as="div">{children}</Box>,
    [BLOCKS.EMBEDDED_ASSET]: (node, _children) => {
      const fields = node.data.target.fields;
      if (fields.file.details.image) {
        return (
          <NextImage
            src={`https:${fields.file.url}`}
            alt="alt"
            width={fields.file.details.image.width}
            height={fields.file.details.image.height}
          />
        );
      }
    },
    [INLINES.HYPERLINK]: (node, _children) => {
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

const ContentBody = ({ article }) => {
  const { paragraph } = article.fields;

  return <Box>{documentToReactComponents(paragraph, option)}</Box>;
};

export default ContentBody;

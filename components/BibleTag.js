import React from "react";
import NextLink from "next/link";
import { Link, Grid } from "@chakra-ui/react";
import { categoryToUrl } from "../utils/categoryConverter";

const BibleTag = ({ bible, category, onClose }) => {
  return (
    <Grid
      templateColumns={{
        md: "repeat(auto-fit, minmax(17%, 1fr))",
        sm: "repeat(auto-fit, minmax(20%, 1fr))",
        base: "repeat(auto-fit, minmax(30%, 1fr))",
      }}
      columnGap={3}
      rowGap={3}
    >
      {bible.map((item) => (
        <NextLink key={item} href={`${categoryToUrl(category)}?v=${item}`}>
          <Link onClick={onClose}>{item}</Link>
        </NextLink>
      ))}
    </Grid>
  );
};

export default BibleTag;

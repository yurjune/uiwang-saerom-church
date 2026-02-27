"use client";

import React from "react";
import NextLink from "next/link";
import { Link, Grid } from "@chakra-ui/react";
import { categoryToUrl } from "@/utils/category";

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
        <Link
          key={item}
          as={NextLink}
          href={`${categoryToUrl(category)}?v=${item}`}
          onClick={onClose}
        >
          {item}
        </Link>
      ))}
    </Grid>
  );
};

export default BibleTag;

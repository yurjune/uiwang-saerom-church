"use client";

import React from "react";
import { Box, Heading, Divider } from "@chakra-ui/react";

const TitleBar = ({ title }) => {
  return (
    <Box>
      <Heading as="h2" size="lg">
        {title}
      </Heading>
      <Divider mt="20px"></Divider>
    </Box>
  );
};

export default TitleBar;

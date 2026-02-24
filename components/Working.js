"use client";

import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const Working = () => {
  return (
    <Flex
      h="100%"
      py={{ base: "30px", md: "40px" }}
      px="20px"
      justify="center"
      fontSize="17px"
    >
      <Box>준비중 입니다</Box>
    </Flex>
  );
};

export default Working;

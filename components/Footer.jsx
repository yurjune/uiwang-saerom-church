"use client";

import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { layoutWidth } from "./layouts/AppLayout";

const Footer = () => {
  return (
    <Box w="100%" h="150px" bgColor="charcole">
      <Flex
        maxW={layoutWidth}
        h="100%"
        m="0 auto"
        px={{ base: "16px", md: "24px" }}
        direction="column"
        color="grayLetter"
        fontSize="12px"
        py="40px"
        justify="flex-start"
        align={{ base: "center", md: "flex-start" }}
        textAlign="center"
        fontFamily="Nanum Gothic"
      >
        <Box mb="20px">© 2021 DIDIMDOL CHURCH. ALL RIGHT RESERVED</Box>
        <Box>경기도 의왕시 보우상가</Box>
      </Flex>
    </Box>
  );
};

export default Footer;

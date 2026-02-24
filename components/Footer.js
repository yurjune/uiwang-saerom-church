"use client";

import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { layoutWidth } from "./AppLayout";

const Footer = () => {
  return (
    <Box w="100%" h="150px" bgColor="charcole">
      <Flex
        maxW={layoutWidth}
        h="100%"
        m="0 auto"
        direction="column"
        color="grayLetter"
        fontSize="12px"
        px={{ base: "20px", sm: "30px", md: "40px", lg: "0" }}
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

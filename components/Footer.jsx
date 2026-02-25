"use client";

import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { layoutWidth } from "./layouts/AppLayout";
import { CHURCH_LOCATION } from "../constants";

const Footer = () => {
  return (
    <Box w="100%" h="150px" bgColor="charcole">
      <Flex
        maxW={layoutWidth}
        h="100%"
        m="0 auto"
        px={5}
        py={10}
        direction="column"
        color="grayLetter"
        fontSize="12px"
        justify="flex-start"
        align="center"
        // align={{ base: "center", md: "flex-start" }}
        textAlign="center"
        fontFamily="Nanum Gothic"
      >
        <Box mb="20px">© 2026 Saerom Church of Uiwang. ALL RIGHT RESERVED</Box>
        <Box>{CHURCH_LOCATION}</Box>
      </Flex>
    </Box>
  );
};

export default Footer;

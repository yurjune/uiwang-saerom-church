"use client";

import React from "react";
import Link from "next/link";
import { Flex, Box, Text } from "@chakra-ui/react";

import HeaderNav from "./HeaderNav";
import { layoutWidth } from "../layouts/AppLayout";

const DesktopHeader = () => {
  return (
    <Box
      display={{ base: "none", md: "block" }}
      width="100%"
      height="72px"
      bgGradient="linear(to-r, #3f90c7 0%, #2f80bd 45%, #1f69ab 100%)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.300"
      boxShadow="0 6px 20px rgba(0, 0, 0, 0.14)"
    >
      <Flex
        position="relative"
        maxW={layoutWidth}
        mx="auto"
        px="24px"
        width="100%"
        height="full"
        justify="space-between"
        align="center"
      >
        <Box as={Link} href="/" rounded="xl" transition="all 0.2s ease">
          <Text
            color="white"
            fontWeight={800}
            fontSize="24px"
            letterSpacing="-0.02em"
            lineHeight="1"
          >
            Use Logo here
          </Text>
        </Box>

        <HeaderNav />
      </Flex>
    </Box>
  );
};

export default DesktopHeader;

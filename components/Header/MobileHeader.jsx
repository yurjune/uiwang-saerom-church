"use client";

import React from "react";
import Link from "next/link";
import { Flex, Box, Text } from "@chakra-ui/react";

import DrawerButton from "../DrawerAccordian/DrawerButton";

const MobileHeader = () => {
  return (
    <Flex
      display={{ base: "flex", md: "none" }}
      width="100%"
      height="48px"
      justify="space-between"
      align="center"
      bgGradient="linear(to-r, #3f90c7 0%, #2f80bd 45%, #1f69ab 100%)"
      px={4}
    >
      <Box as={Link} href="/" rounded="xl" transition="all 0.2s ease">
        <Text color="white" fontWeight={800} fontSize="18px" lineHeight="1">
          Use Logo here
        </Text>
      </Box>

      <DrawerButton />
    </Flex>
  );
};

export default MobileHeader;

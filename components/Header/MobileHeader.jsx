"use client";

import React from "react";
import Link from "next/link";
import { Flex, Box } from "@chakra-ui/react";

import DrawerButton from "../DrawerAccordian/DrawerButton";

const MobileHeader = () => {
  return (
    <Flex
      display={{ base: "flex", md: "none" }}
      width="100%"
      height="56px"
      justify="space-between"
      align="center"
      bg="second"
      px={4}
    >
      <Box display={{ base: "block", md: "none" }} color="white">
        <Link href="/">Didimdol</Link>
      </Box>
      <DrawerButton />
    </Flex>
  );
};

export default MobileHeader;

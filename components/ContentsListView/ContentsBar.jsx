"use client";

import React from "react";
import { Flex, Heading, Box, HStack, Divider } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import TagButton from "../TagButton";
import BibleTagCollapse from "../BibleTags/BibleTagCollapse";

const ContentsBar = ({ category }) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex direction={{ base: "column", sm: "row" }} justify="space-between">
        <Heading as="h2" size="lg">
          {category}
        </Heading>
        <HStack mt={{ base: "20px", sm: "0" }}>
          <TagButton close={onClose} toggle={onToggle} />
        </HStack>
      </Flex>
      <BibleTagCollapse category={category} isOpen={isOpen} onClose={onClose} />
      <Divider mt="20px" />
    </Box>
  );
};

export default ContentsBar;

"use client";

import React from "react";
import { Flex, Heading, Box, HStack, Divider } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import TagButton from "./TagButton";
import TagList from "./TagList";

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
      <TagList category={category} isOpen={isOpen} onClose={onClose} />
      <Divider mt="20px" />
    </Box>
  );
};

export default ContentsBar;

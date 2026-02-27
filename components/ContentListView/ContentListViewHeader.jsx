"use client";

import React from "react";
import NextLink from "next/link";
import { Flex, Heading, Box, HStack, Divider, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import BibleTagCollapse from "@/components/BibleTagCollapse/BibleTagCollapse";
import { categoryToUrl } from "@/utils/category";

const ContentListViewHeader = ({ category }) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex direction={{ base: "column", sm: "row" }} justify="space-between">
        <Heading as="h2" size="lg">
          {category}
        </Heading>

        <HStack mt={{ base: "20px", sm: "0" }}>
          <Button
            as={NextLink}
            href={categoryToUrl(category)}
            colorScheme="blue"
            onClick={() => {
              onClose();
            }}
          >
            전체
          </Button>
          <Button colorScheme="blue" onClick={onToggle}>
            성경별
          </Button>
        </HStack>
      </Flex>

      <BibleTagCollapse category={category} isOpen={isOpen} onClose={onClose} />

      <Divider mt="20px" />
    </Box>
  );
};

export default ContentListViewHeader;

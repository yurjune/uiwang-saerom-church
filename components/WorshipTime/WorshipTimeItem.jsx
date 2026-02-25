"use client";

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const WorshipTimeItem = ({ title, day, time }) => {
  return (
    <Flex
      maxW="500px"
      w="100%"
      mb={4}
      borderRadius="16px"
      overflow="hidden"
      border="1px solid"
      borderColor="rgba(1, 85, 160, 0.18)"
      bg="white"
      boxShadow="0 10px 24px rgba(28, 32, 36, 0.08)"
      transition="all 0.2s ease"
    >
      <Flex
        minW={{ base: "108px", md: "132px" }}
        px={{ base: "12px", md: "16px" }}
        py={{ base: "16px", md: "18px" }}
        bgGradient="linear(to-b, #3F82BE, #1F6CAF)"
        color="white"
        align="center"
        justify="center"
      >
        <Text textAlign="center" fontWeight="700" letterSpacing="-0.01em">
          {title}
        </Text>
      </Flex>

      <Flex
        flex="1"
        px={{ base: "14px", md: "20px" }}
        py={{ base: "16px", md: "18px" }}
        align="center"
        justify="space-between"
        gap="10px"
      >
        <Text
          textAlign="left"
          color="gray.700"
          fontWeight="500"
          lineHeight="1.5"
        >
          {day}{" "}
          <Text as="span" color="first" fontWeight="700">
            {time}
          </Text>
        </Text>
        <Box w="8px" h="8px" borderRadius="full" bg="first" flexShrink={0} />
      </Flex>
    </Flex>
  );
};

export default WorshipTimeItem;

"use client";

import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import WorshipTimeItem from "./WorshipTimeItem";
import { worshipSchedule } from "./constant";

const WorshipTime = () => {
  return (
    <Box width="100%" bgGradient="linear(to-b, #F4F9FF 0%, #FFF 100%)">
      <Flex
        py={{ base: "56px", md: "72px" }}
        px={{ base: "16px", md: "24px" }}
        m="0 auto"
        direction="column"
        align="center"
      >
        <Box textAlign="center" mb={{ base: "28px", md: "40px" }}>
          <Heading as="h3" size="lg" color="gray.800" letterSpacing="tight">
            <div id="worship-time">예배시간 안내</div>
          </Heading>
        </Box>

        <Box w="100%">
          {worshipSchedule.map((item) => (
            <Flex key={item.title} justify="center">
              <WorshipTimeItem
                title={item.title}
                day={item.day}
                time={item.time}
              />
            </Flex>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default WorshipTime;

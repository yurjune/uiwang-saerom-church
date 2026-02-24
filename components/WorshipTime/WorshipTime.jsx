"use client";

import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import WorshipTimeItem from "./WorshipTimeItem";
import { layoutWidth } from "../layouts/AppLayout";

const schedule = [
  { title: "주일예배", day: "매주 일요일 오전", time: "11:00" },
  { title: "오후모임", day: "매주 일요일 오후", time: "14:00" },
  { title: "주일학교", day: "매주 일요일 오전", time: "10:00" },
  { title: "수요모임", day: "매주 수요일 오후", time: "20:00" },
];

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
          <Text mt="10px" fontSize={{ base: "sm", md: "md" }} color="gray.600">
            함께 모여 예배드리는 시간을 확인해보세요.
          </Text>
        </Box>

        <Box w="100%" maxW={layoutWidth}>
          {schedule.map((item) => (
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

"use client";

import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import WorshipTimeItem from "./WorshipTimeItem";
import { layoutWidth } from "./AppLayout";

const schedule = [
  { title: "주일예배", schedule: "매주 일요일 아침 11:00" },
  { title: "오후모임", schedule: "매주 일요일 점심 14:00" },
  { title: "주일학교", schedule: "매주 일요일 아침 10:00" },
  { title: "수요모임", schedule: "매주 수요일 저녁 20:00, ZOOM 모임" },
];
const WorshipTime = () => {
  return (
    <Box width="100%">
      <Flex
        py={{ base: "40px", md: "50px" }}
        px="20px"
        m="0 auto"
        direction="column"
        bgColor="#f5f5dc"
        align="center"
      >
        <Heading as="h3" size="lg" mb="50px">
          <div id="worship-time">예배시간 안내</div>
        </Heading>
        <Box w="100%" maxW={layoutWidth}>
          {schedule.map((item) => (
            <Flex key={item.title} justify="center">
              <WorshipTimeItem title={item.title} schedule={item.schedule} />
            </Flex>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default WorshipTime;

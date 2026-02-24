"use client";

import React from "react";
import { chakra, Box, Flex, Button, HStack, Text } from "@chakra-ui/react";
import { categoryToUrl } from "../utils/categoryConverter";

function Introduction({ pictures }) {
  const background = pictures.find((item) => item.fields.title === "소개배경")
    .fields.picture.fields.file.url;

  return (
    <Flex
      w="100%"
      py={{ base: "40px", md: "70px" }}
      px="16px"
      mx="auto"
      fontFamily="Gowun Dodum"
      bgImage={`url("http:${background}")`}
      backgroundPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
    >
      <Box mx="auto">
        <chakra.h1
          mb={{ base: "40px", md: "60px" }}
          fontSize={{ base: "26px", md: "3xl" }}
          fontWeight="bold"
          color="gray.900"
          textAlign="center"
          lineHeight="150%"
        >
          "너희가 서로 사랑하면 이로써 모든 사람이 너희가 내 제자인 줄 알리라"
          <Text fontSize={{ base: "xl", md: "2xl" }}>(요 13:15)</Text>
        </chakra.h1>
        <chakra.p
          mb="40px"
          // color="gray.500"
          fontSize={{ md: "lg" }}
          lineHeight="160%"
        >
          <strong>
            하나님 말씀이 가치관과 삶의 중심이 되는 교회
            <br />
          </strong>
          Church where God's Word becomes the center of values and life
          <br />
          <br />
          <strong>
            나의 이웃과 성도 간에 사랑이 넘치는 교회
            <br />
          </strong>
          Church full of love between my neighbor and the saints
          <br />
          <br />
          <strong>
            모든 성도가 하나님을 섬기고 경배드리는 교회
            <br />
          </strong>
          Church where all saints serve and worship God
          <br />
          <br />
        </chakra.p>
        <HStack justify="center">
          <Button
            as="a"
            href="#worship-time"
            colorScheme="brand"
            size="lg"
            cursor="pointer"
          >
            예배안내
          </Button>
          <Button
            as="a"
            href={categoryToUrl("오시는길")}
            size="lg"
            cursor="pointer"
          >
            오시는길
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
}

export default Introduction;

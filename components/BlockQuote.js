import { Flex, Box, Image } from "@chakra-ui/react";
import React from "react";

const BlockQuote = () => {
  return (
    <>
      <Flex
        w="100%"
        h="300px"
        direction="column"
        justify="center"
        align="center"
        bgColor="second"
        color="#ffffff"
        textAlign="center"
      >
        <Box fontSize="24px" mb="20px">
          수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라
        </Box>
        <Box fontSize="18px">마태복음 11:28</Box>
      </Flex>
    </>
  );
};

export default BlockQuote;

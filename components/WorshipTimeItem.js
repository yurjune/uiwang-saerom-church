import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";

const WorshipTimeItem = ({ title, schedule }) => {
  return (
    <Flex
      w={["100%", "100%", "90%", "80%"]}
      direction="row"
      mb="20px"
      fontSize={{ base: "16px", sm: "17px", md: "18px" }}
    >
      <Flex
        minW={{ base: "100px", md: "110px" }}
        minH="60px"
        p="8px"
        borderRadius="10px 0 0 10px"
        bgColor="second"
        bgColor="#F0C9A5"
        color="white"
        align="center"
        justify="center"
      >
        <Text textAlign="center">{title}</Text>
      </Flex>
      <Flex
        minH="60px"
        p="8px"
        borderRadius="0 10px 10px 0"
        bgColor="white"
        flexGrow="1"
        align="center"
        justify="center"
      >
        <Text textAlign="center">{schedule}</Text>
      </Flex>
    </Flex>
  );
};

export default WorshipTimeItem;

import React from "react";
import { Flex, Box, Heading, Image, Stack } from "@chakra-ui/react";
import { layoutWidth } from "./AppLayout";

const People = ({ pictures }) => {
  const people_a = pictures.find((item) => item.fields.title === "섬기는분들1")
    .fields.picture.fields.file.url;
  const people_b = pictures.find((item) => item.fields.title === "섬기는분들2")
    .fields.picture.fields.file.url;
  return (
    <Flex bgColor="#EDE7E3">
      <Flex
        maxW={layoutWidth}
        py={{ base: "40px", md: "50px" }}
        px="20px"
        mx="auto"
        direction="column"
        align="center"
      >
        <Heading as="h3" size="lg" mb="50px">
          섬기는 분들
        </Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing="2">
          <Box>
            <Image src={`http:${people_a}`} />
          </Box>
          <Box>
            <Image src={`http:${people_b}`} />
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default People;

import Image from "next/image";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";

function Introduction() {
  return (
    <Flex
      w="100%"
      py={{ base: "40px", md: "70px" }}
      px="16px"
      mx="auto"
      position="relative"
      overflow="hidden"
    >
      <Image
        src="/introduction.png"
        alt="introduction.png"
        fill
        priority
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
        }}
      />

      <Box mx="auto" textAlign="center" position="relative" zIndex={1}>
        <Box
          as="h1"
          mb={{ base: "40px", md: "60px" }}
          fontSize={{ base: "26px", md: "3xl" }}
          fontWeight="bold"
          color="gray.900"
          textAlign="center"
          lineHeight="150%"
        >
          "너희가 서로 사랑하면 이로써 모든 사람이 너희가 내 제자인 줄 알리라"
          <Text fontSize={{ base: "xl", md: "2xl" }}>(요 13:15)</Text>
        </Box>

        <Stack
          spacing={{ base: 6, md: 8 }}
          fontSize={{ md: "lg" }}
          lineHeight="160%"
        >
          <Box>
            <Text as="p" fontWeight="bold">
              하나님 말씀이 가치관과 삶의 중심이 되는 교회
            </Text>
            <Text as="p">
              Church where God&apos;s Word becomes the center of values and life
            </Text>
          </Box>

          <Box>
            <Text as="p" fontWeight="bold">
              나의 이웃과 성도 간에 사랑이 넘치는 교회
            </Text>
            <Text as="p">
              Church full of love between my neighbor and the saints
            </Text>
          </Box>

          <Box>
            <Text as="p" fontWeight="bold">
              모든 성도가 하나님을 섬기고 경배드리는 교회
            </Text>
            <Text as="p">Church where all saints serve and worship God</Text>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Introduction;

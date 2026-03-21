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
      bgImage="url('/introduction.png')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Box mx="auto" textAlign="center" position="relative" zIndex={1}>
        <Box
          as="h1"
          mb="40px"
          fontSize={{ base: "20px", md: "3xl" }}
          fontWeight="bold"
          color="gray.900"
          textAlign="center"
          lineHeight="150%"
          wordBreak="keep-all"
        >
          "너희가 서로 사랑하면 이로써 모든 사람이 너희가 내 제자인 줄 알리라"
          <Text fontSize={{ base: "18px", md: "2xl" }}>(요 13:15)</Text>
        </Box>

        <Stack
          spacing={{ base: 2, md: 4 }}
          fontSize={{ base: "sm", md: "lg" }}
          lineHeight="160%"
        >
          <Box>
            <Text as="p" fontWeight="semibold">
              하나님 말씀이 가치관과 삶의 중심이 되는 교회
            </Text>
          </Box>

          <Box>
            <Text as="p" fontWeight="semibold">
              나의 이웃과 성도 간에 사랑이 넘치는 교회
            </Text>
          </Box>

          <Box>
            <Text as="p" fontWeight="semibold">
              모든 성도가 하나님을 섬기고 경배드리는 교회
            </Text>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default Introduction;

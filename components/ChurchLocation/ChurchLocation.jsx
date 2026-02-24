import { Box, Heading, Text } from "@chakra-ui/react";
import KakaoMap from "../KaKaoMap/KakaoMap";

export const ChurchLocation = ({ appKey }) => {
  return (
    <Box bg="#fffbea" px="20px" py={{ base: "40px", md: "56px" }}>
      <Box maxW="900px" mx="auto">
        <Box textAlign="center" mb={{ base: "28px", md: "40px" }}>
          <Heading as="h3" size="lg" color="gray.800" letterSpacing="tight">
            오시는 길
          </Heading>
          <Text mt="10px" fontSize={{ base: "sm", md: "md" }} color="gray.600">
            경기 의왕시 내손로 76 보우상가 3층
          </Text>
        </Box>

        <KakaoMap appKey={appKey} />
      </Box>
    </Box>
  );
};

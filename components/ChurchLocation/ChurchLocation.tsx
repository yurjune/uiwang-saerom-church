import { Box, Heading, Text } from "@chakra-ui/react";
import KakaoMap from "@/components/KaKaoMap/KakaoMap";
import { CHURCH_INFO } from "@/constants";
import { ProjectMenu } from "@/constants/menu";

type Props = {
  appKey?: string;
};

export const ChurchLocation = ({ appKey }: Props) => {
  return (
    <Box bg="#fffbea" px="20px" py={{ base: "40px", md: "56px" }}>
      <Box maxW="900px" mx="auto">
        <Box textAlign="center" mb={{ base: "28px", md: "40px" }}>
          <Heading as="h3" size="lg" color="gray.800" letterSpacing="tight">
            {ProjectMenu.introduce.location.label}
          </Heading>

          <Text mt="10px" fontSize={{ base: "sm", md: "md" }} color="gray.600">
            {CHURCH_INFO.location}
          </Text>
        </Box>

        <KakaoMap appKey={appKey} />
      </Box>
    </Box>
  );
};

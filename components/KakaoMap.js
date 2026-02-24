"use client";

import React, { useEffect, useRef } from "react";
import { Box, Flex, AspectRatio, Divider, Stack } from "@chakra-ui/react";
import useKakaoMap from "../hooks/useKakaoMap";

const KakaoMap = () => {
  const container = useRef(null);

  useEffect(() => {
    useKakaoMap(container);
    return () => {};
  }, []);

  return (
    <>
      <Flex direction="column">
        <AspectRatio w="100%" ratio={{ base: 1 / 1, sm: 4 / 3, md: 16 / 9 }}>
          <Box ref={container} zIndex="0" />
        </AspectRatio>
        <Divider my="25px" />
        <Stack fontSize="17px">
          <Box>
            <strong>주소:</strong> 경기 의왕시 내손로 76 보우상가 3층
          </Box>
          <Box>(지번) 경기 의왕시 내손동 637</Box>
        </Stack>
      </Flex>
    </>
  );
};

export default KakaoMap;

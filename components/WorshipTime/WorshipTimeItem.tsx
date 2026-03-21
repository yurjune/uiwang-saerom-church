"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  day: string;
  time: string;
  index: number;
};

const WorshipTimeItem = ({ title, day, time, index }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px 1% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <Flex
      ref={ref}
      opacity={isVisible ? 1 : 0}
      transform={
        isVisible
          ? "translate3d(0, 0, 0) scale(1)"
          : `translate3d(${index % 2 === 0 ? "-18px" : "18px"}, 20px, 0) scale(0.98)`
      }
      transition="transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.65s ease, box-shadow 0.2s ease"
      transitionDelay={isVisible ? `${index * 0.06}s` : undefined}
      willChange="transform, opacity"
      maxW="500px"
      w="100%"
      mx="auto"
      mb={4}
      borderRadius="16px"
      overflow="hidden"
      border="1px solid"
      borderColor="rgba(1, 85, 160, 0.18)"
      bg="white"
      boxShadow="0 10px 24px rgba(28, 32, 36, 0.08)"
    >
      <Flex
        minW={{ base: "108px", md: "132px" }}
        px={{ base: "12px", md: "16px" }}
        py={{ base: "16px", md: "18px" }}
        bgGradient="linear(to-b, #3F82BE, #1F6CAF)"
        color="white"
        align="center"
        justify="center"
      >
        <Text textAlign="center" fontWeight="700" letterSpacing="-0.01em">
          {title}
        </Text>
      </Flex>

      <Flex
        flex="1"
        px={{ base: "14px", md: "20px" }}
        py={{ base: "16px", md: "18px" }}
        align="center"
        justify="space-between"
        gap="10px"
      >
        <Text
          textAlign="left"
          color="gray.700"
          fontWeight="500"
          lineHeight="1.5"
        >
          {day}
          <Text as="span" color="first" fontWeight="700" ml={1}>
            {time}
          </Text>
        </Text>
        <Box w="8px" h="8px" borderRadius="full" bg="first" flexShrink={0} />
      </Flex>
    </Flex>
  );
};

export default WorshipTimeItem;

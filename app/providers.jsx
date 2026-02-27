"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import EmotionRegistry from "./emotion-registry";

export default function Providers({ children }) {
  return (
    <EmotionRegistry>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </EmotionRegistry>
  );
}

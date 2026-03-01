"use client";

import { ChakraProvider } from "@chakra-ui/react";
import type { ReactNode } from "react";
import theme from "@/theme";
import EmotionRegistry from "./emotion-registry";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <EmotionRegistry>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </EmotionRegistry>
  );
}

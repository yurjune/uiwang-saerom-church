import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/index";

const Didimdol = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default Didimdol;

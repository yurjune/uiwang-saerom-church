"use client";

import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

const SecondLayout = ({ children, pictures }) => {
  return (
    <Flex minH="100vh" direction="column">
      <Header pictures={pictures} />
      {children}
      <Box mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
};

export default SecondLayout;

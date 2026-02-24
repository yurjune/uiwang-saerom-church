import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Introduction from "../components/Introduction";
import WorshipTime from "../components/WorshipTime/WorshipTime";
import { getPictures } from "../lib/contentful";

export const metadata = {
  title: "디딤돌교회",
};

export default async function HomePage() {
  const pictures = await getPictures();

  return (
    <Flex minH="100vh" direction="column">
      <Header pictures={pictures} />
      <Introduction pictures={pictures} />
      <WorshipTime />
      <Box mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
}

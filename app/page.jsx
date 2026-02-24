import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Introduction from "../components/Introduction";
import WorshipTime from "../components/WorshipTime/WorshipTime";
import { getPictures } from "../lib/contentful";
import DesktopHeader from "../components/Header/DesktopHeader";
import MobileHeader from "../components/Header/MobileHeader";

export const metadata = {
  title: "디딤돌교회",
};

export default async function HomePage() {
  const pictures = await getPictures();

  return (
    <Flex minH="100vh" direction="column">
      <MobileHeader />
      <DesktopHeader />
      <Introduction pictures={pictures} />
      <WorshipTime />
      <Box mt="auto">
        <Footer />
      </Box>
    </Flex>
  );
}

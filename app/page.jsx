import React from "react";
import { Flex } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Introduction from "../components/Introduction";
import WorshipTime from "../components/WorshipTime/WorshipTime";
import { getPictures } from "../lib/contentful";
import DesktopHeader from "../components/Header/DesktopHeader";
import MobileHeader from "../components/Header/MobileHeader";
import { ChurchLocation } from "../components/ChurchLocation/ChurchLocation";

export const metadata = {
  title: "디딤돌교회",
};

export default async function HomePage() {
  const pictures = await getPictures();
  const appKey = process.env.KAKAOMAP_ACCESS_KEY;

  return (
    <Flex minH="100vh" direction="column">
      <MobileHeader />
      <DesktopHeader />
      <Introduction pictures={pictures} />
      <WorshipTime />
      <ChurchLocation appKey={appKey} />
      <Footer />
    </Flex>
  );
}

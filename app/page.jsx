import React from "react";
import { Flex } from "@chakra-ui/react";
import Footer from "../components/Footer/Footer";
import Introduction from "../components/Introduction/Introduction";
import WorshipTime from "../components/WorshipTime/WorshipTime";
import { ChurchLocation } from "../components/ChurchLocation/ChurchLocation";
import Header from "../components/Header/Header";

export const metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const appKey = process.env.KAKAOMAP_ACCESS_KEY;

  return (
    <Flex minH="100vh" direction="column">
      <Header />
      <Introduction />
      <WorshipTime />
      <ChurchLocation appKey={appKey} />
      <Footer />
    </Flex>
  );
}

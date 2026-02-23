import React from "react";
import Link from "next/link";
import { Flex, Box, Image, LinkOverlay } from "@chakra-ui/react";

import SearchBar from "./SearchBar";
import Navigation from "./Navigation";
import PopoverNav from "./PopoverNav";
import { layoutWidth } from "./AppLayout";

export const menuList = ["디딤돌교회", "예배와 말씀", "커뮤니티", "교회학교"];
export const movieList = ["주일예배", "수요예배"];
export const communityList = ["교회소식", "오시는길"];
export const schoolList = ["주일학교", "중고등부", "청년부"];

const MobileHeader = ({ header }) => {
  return (
    <Flex
      display={{ base: "flex", md: "none" }}
      width="100%"
      height="40px"
      justify="space-between"
      bgImage={`url('https:${header}')`}
      bgSize="cover"
    >
      <Box ml="10px" mr="20px" height="100%" lineHeight="40px" color="white">
        <Box display={{ base: "none", sm: "block" }}>
          <Link href="/">Didimdol Church</Link>
        </Box>
        <Box display={{ base: "block", sm: "none" }}>
          <Link href="/">DidimdolCh</Link>
        </Box>
      </Box>
      <SearchBar />
    </Flex>
  );
};

const DesktopHeader = ({ header, logo }) => {
  return (
    <Box
      display={{ base: "none", md: "block" }}
      width="100%"
      height="150px"
      bgImage={`url('https:${header}')`}
      bgSize="cover"
    >
      <Flex
        pos="relative"
        maxW={layoutWidth}
        m="0 auto"
        height="100%"
        justify="flex-end"
        fontFamily="Noto Sans KR"
      >
        <Box pos="absolute" top="5px">
          <SearchBar />
        </Box>
        <Box pos="absolute" left="0" bottom="40px">
          <LinkOverlay href="/">
            <Image src={`https:${logo}`} width="120px" height="90px" />
          </LinkOverlay>
        </Box>
        <Box pos="absolute" bottom="45px">
          <Navigation />
          {/* <PopoverNav /> */}
        </Box>
      </Flex>
    </Box>
  );
};

const Header = ({ pictures }) => {
  const header = pictures.find((item) => item.fields.title === "헤더이미지2")
    .fields.picture.fields.file.url;
  const logo = pictures.find((item) => item.fields.title === "로고이미지2")
    .fields.picture.fields.file.url;
  return (
    <>
      <MobileHeader header={header} />
      <DesktopHeader header={header} logo={logo} />
    </>
  );
};

export default Header;

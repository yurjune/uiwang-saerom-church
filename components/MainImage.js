import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { layoutWidth } from "./AppLayout";

const MainImage = ({ mainImage }) => {
  return (
    <>
      <Box bgColor="#ffffff">
        <Box maxW={layoutWidth} m="0 auto">
          <Image src={"https:" + mainImage}></Image>
        </Box>
      </Box>
    </>
  );
};

export default MainImage;

import React from "react";
import { Box } from "@chakra-ui/react";
import TitleBar from "./TitleBar";

const SimplePage = ({ children, title }) => {
  return (
    <>
      <Box mb="30px">
        <TitleBar title={title}></TitleBar>
      </Box>
      {children}
    </>
  );
};

export default SimplePage;

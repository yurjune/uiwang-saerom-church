"use client";

import { Grid, GridItem } from "@chakra-ui/react";
import Footer from "../Footer";
import DesktopHeader from "../Header/DesktopHeader";
import MobileHeader from "../Header/MobileHeader";

export const layoutWidth = "1000px";

const AppLayout = ({ children, pictures }) => {
  return (
    <Grid
      templateColumns={`1fr minmax(auto, ${layoutWidth}) 1fr`}
      templateRows="auto 1fr auto"
      minH="100vh"
    >
      <GridItem colStart={1} colEnd={4} rowStart={1} rowEnd={2}>
        <MobileHeader />
        <DesktopHeader />
      </GridItem>
      <GridItem
        colStart={2}
        colEnd={3}
        rowStart={2}
        rowEnd={3}
        py={{ base: "24px", md: "32px" }}
        px={{ base: "16px", md: "24px" }}
      >
        {children}
      </GridItem>
      <GridItem colStart={1} colEnd={4} rowStart={3} rowEnd={4}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default AppLayout;

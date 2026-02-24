"use client"

import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

export const layoutWidth = "1000px";

const AppLayout = ({ children, pictures }) => {
  return (
    <Grid
      templateColumns={`1fr minmax(auto, ${layoutWidth}) 1fr`}
      templateRows="auto 1fr auto"
      minH="100vh"
    >
      <GridItem colStart={1} colEnd={4} rowStart={1} rowEnd={2}>
        <Header pictures={pictures} />
      </GridItem>
      <GridItem
        colStart={2}
        colEnd={3}
        rowStart={2}
        rowEnd={3}
        pt={["30px", "30px", "50px", "50px"]}
        pb={["60px", "60px", "80px", "80px"]}
        px={["20px", "30px", "20px", "10px"]}
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

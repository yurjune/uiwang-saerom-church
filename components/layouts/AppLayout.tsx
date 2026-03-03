import { Grid, GridItem } from "@chakra-ui/react";
import type { ReactNode } from "react";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { layoutWidth } from "@/constants/layout";

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <Grid
      templateColumns={`1fr minmax(auto, ${layoutWidth}) 1fr`}
      templateRows="auto 1fr auto"
      minH="100vh"
    >
      <GridItem colStart={1} colEnd={4} rowStart={1} rowEnd={2}>
        <Header />
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

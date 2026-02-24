"use client";

import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { menuList, movieList, communityList, schoolList } from "../Header";
import { BtnNoIcon, Btn, Pan } from "./DrawerAccordianItem";

const DrawerAccordian = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <BtnNoIcon name={menuList[0]} />
      </AccordionItem>
      <AccordionItem>
        <Btn name={menuList[1]} />
        <Pan element={movieList} />
      </AccordionItem>
      <AccordionItem>
        <Btn name={menuList[2]} />
        <Pan element={communityList} />
      </AccordionItem>
      <AccordionItem>
        <Btn name={menuList[3]} />
        <Pan element={schoolList} />
      </AccordionItem>
    </Accordion>
  );
};

export default DrawerAccordian;

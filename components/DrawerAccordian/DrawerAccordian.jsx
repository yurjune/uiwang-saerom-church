"use client";

import React from "react";
import { Accordion, AccordionItem } from "@chakra-ui/react";
import { BtnNoIcon } from "./DrawerAccordianItem";

const DrawerAccordian = ({ onMove }) => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <BtnNoIcon name={"설교 영상"} to={"/movies"} onMove={onMove} />
      </AccordionItem>
      <AccordionItem>
        <BtnNoIcon name={"교회 소식"} to={"/community/news"} onMove={onMove} />
      </AccordionItem>
      <AccordionItem>
        <BtnNoIcon name={"오시는 길"} to={"/community/map"} onMove={onMove} />
      </AccordionItem>
    </Accordion>
  );
};

export default DrawerAccordian;

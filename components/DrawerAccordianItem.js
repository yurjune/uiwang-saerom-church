import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { categoryToUrl } from "../utils/categoryConverter";

export const BtnNoIcon = ({ name }) => {
  return (
    <AccordionButton py={4} _focus="none" _hover={{ bg: "second" }}>
      <Box flex="1" textAlign="left">
        <Link href={categoryToUrl(name)}>{name}</Link>
      </Box>
    </AccordionButton>
  );
};

export const Btn = ({ name }) => {
  return (
    <AccordionButton py={4} _focus="none" _hover={{ bg: "second" }}>
      <Box flex="1" textAlign="left">
        <Link href={categoryToUrl(name)}>{name}</Link>
      </Box>
      <AccordionIcon />
    </AccordionButton>
  );
};

export const Pan = ({ element }) => {
  return (
    <>
      {element.map((item) => (
        <AccordionPanel key={item} py={4} _hover={{ bg: "third" }}>
          <Link href={categoryToUrl(item)}>{`- ${item}`}</Link>
        </AccordionPanel>
      ))}
    </>
  );
};

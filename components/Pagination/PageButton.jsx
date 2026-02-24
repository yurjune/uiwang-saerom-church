"use client";

import React from "react";
import { Button } from "@chakra-ui/react";

export const PageButton = ({ value, onClickButton, selected = false }) => {
  return (
    <Button
      mx="2px"
      size="sm"
      w="36px"
      px="0"
      colorScheme="blue"
      variant={selected ? "solid" : "outline"}
      sx={{ fontVariantNumeric: "tabular-nums" }}
      onClick={() => onClickButton(value)}
    >
      {value}
    </Button>
  );
};

export const ArrowButton = ({ children, onClickButton }) => {
  return (
    <Button
      mx="2px"
      size="sm"
      w="36px"
      px="0"
      colorScheme="blue"
      variant="outline"
      onClick={onClickButton}
    >
      {children}
    </Button>
  );
};

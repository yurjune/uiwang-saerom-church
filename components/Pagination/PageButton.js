"use client";

import React, { useEffect, useState } from "react";
import { chakra } from "@chakra-ui/react";

const activeStyle = {
  bg: "first",
  color: "white",
};

export const PageButton = (props) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    props.currentPage === props.children
      ? setIsActive(true)
      : setIsActive(false);
  }, [props.currentPage]);

  return (
    <chakra.button
      mx="2px"
      p="2px 8px"
      rounded="md"
      bg="second"
      color="gray.700"
      _hover={activeStyle}
      {...(isActive && activeStyle)}
      onClick={props.onClickButton(props.children)}
    >
      {props.children}
    </chakra.button>
  );
};

export const ArrowButton = (props) => {
  return (
    <chakra.button
      mx="2px"
      p="2px 8px"
      rounded="md"
      bg="second"
      color="gray.700"
      _hover={activeStyle}
      onClick={props.onClickButton}
    >
      {props.children}
    </chakra.button>
  );
};

"use client";

import React from "react";
import { AccordionButton } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BtnNoIcon = ({ name, to, onMove }) => {
  const pathname = usePathname();

  const normalizePath = (path) => {
    if (!path) return "/";
    return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
  };

  const isActive = normalizePath(pathname) === normalizePath(to);

  const button = (
    <AccordionButton
      py={4}
      _focus={{ boxShadow: "none" }}
      _focusVisible={{ boxShadow: "none" }}
      _hover={isActive ? {} : { bg: "second" }}
      bg={isActive ? "second" : "transparent"}
      fontWeight={isActive ? "bold" : "normal"}
      cursor={isActive ? "default" : "pointer"}
    >
      <Box flex="1" textAlign="left">
        {name}
      </Box>
    </AccordionButton>
  );

  if (isActive) {
    return button;
  }

  return (
    <Link href={to} onClick={onMove}>
      {button}
    </Link>
  );
};

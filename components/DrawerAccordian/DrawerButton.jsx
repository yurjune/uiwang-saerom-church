"use client";

import React, { useRef } from "react";
import { Box, useDisclosure, IconButton } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import DrawerAccordian from "./DrawerAccordian";

const DrawerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <Box display={{ base: "block", md: "none" }}>
      <IconButton
        aria-label="open"
        bg="none"
        color="white"
        _focus={{ boxShadow: "none" }}
        icon={<FiMenu />}
        ref={btnRef}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt="7px" />
          <DrawerHeader fontWeight="normal">Didimdol Church</DrawerHeader>
          <DrawerBody>
            <DrawerAccordian></DrawerAccordian>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DrawerButton;

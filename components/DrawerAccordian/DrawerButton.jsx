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
import DrawerAccordian from "@/components/DrawerAccordian/DrawerAccordian";

const DrawerButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <Box>
      <IconButton
        aria-label="open"
        bg="none"
        color="blue.700"
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
          <DrawerHeader fontWeight="bold">메뉴</DrawerHeader>
          <DrawerBody>
            <DrawerAccordian onMove={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default DrawerButton;

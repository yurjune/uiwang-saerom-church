"use client";

import React from "react";
import { Button } from "@chakra-ui/react";

const TagButton = ({ close, toggle }) => {
  return (
    <>
      <Button colorScheme="blue" onClick={() => close()}>
        전체
      </Button>
      <Button
        colorScheme="blue"
        onClick={() => {
          if (toggle) {
            toggle();
          } else {
            close();
          }
        }}
      >
        성경별
      </Button>
    </>
  );
};

export default TagButton;

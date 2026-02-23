import React from "react";
import { Button } from "@chakra-ui/react";

const style = (close, toggle) => {
  const style = {
    variant: "main",
    size: "cs",
    onClick: () => {
      if (toggle) {
        return toggle();
      }
      return close();
    },
  };
  return style;
};

const TagButton = ({ close, toggle }) => {
  return (
    <>
      <Button {...style(close)}>전체</Button>
      <Button {...style(close, toggle)}>성경별</Button>
    </>
  );
};

export default TagButton;

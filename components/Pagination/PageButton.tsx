"use client";

import { Button } from "@chakra-ui/react";
import type { ReactNode } from "react";

type Props = {
  value: number;
  onClickButtonAction: (value: number) => void;
  selected?: boolean;
};

export const PageButton = ({
  value,
  onClickButtonAction,
  selected = false,
}: Props) => {
  return (
    <Button
      mx="2px"
      size="sm"
      w="36px"
      px="0"
      colorScheme="blue"
      variant={selected ? "solid" : "outline"}
      sx={{ fontVariantNumeric: "tabular-nums" }}
      onClick={() => onClickButtonAction(value)}
    >
      {value}
    </Button>
  );
};

type ArrowProps = {
  children: ReactNode;
  onClickButtonAction: () => void;
};

export const ArrowButton = ({
  children,
  onClickButtonAction,
}: ArrowProps) => {
  return (
    <Button
      mx="2px"
      size="sm"
      w="36px"
      px="0"
      colorScheme="blue"
      variant="outline"
      onClick={onClickButtonAction}
    >
      {children}
    </Button>
  );
};

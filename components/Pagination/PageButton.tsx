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
      aria-current={selected ? "page" : undefined}
    >
      {value}
    </Button>
  );
};

type ArrowProps = {
  children: ReactNode;
  onClickButtonAction: () => void;
  ariaLabel?: string;
};

export const ArrowButton = ({
  children,
  onClickButtonAction,
  ariaLabel,
}: ArrowProps) => {
  return (
    <Button
      mx="2px"
      size="sm"
      w="36px"
      px="0"
      colorScheme="blue"
      variant="outline"
      aria-label={ariaLabel}
      onClick={onClickButtonAction}
    >
      {children}
    </Button>
  );
};

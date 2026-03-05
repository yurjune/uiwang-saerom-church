import { Button } from "@chakra-ui/react";
import NextLink from "next/link";
import type { ReactNode } from "react";

type Props = {
  value: number;
  selected?: boolean;
  href: string;
};

export const PageButton = ({ value, selected = false, href }: Props) => {
  return (
    <Button
      as={NextLink}
      href={href}
      mx="2px"
      size="sm"
      w="36px"
      px="0"
      colorScheme="blue"
      variant={selected ? "solid" : "outline"}
      sx={{ fontVariantNumeric: "tabular-nums" }}
      aria-current={selected ? "page" : undefined}
    >
      {value}
    </Button>
  );
};

type ArrowProps = {
  children: ReactNode;
  ariaLabel?: string;
  href: string;
};

export const ArrowButton = ({ children, ariaLabel, href }: ArrowProps) => {
  return (
    <Button
      as={NextLink}
      href={href}
      mx="2px"
      size="sm"
      w="36px"
      px="0"
      colorScheme="blue"
      variant="outline"
      aria-label={ariaLabel}
    >
      {children}
    </Button>
  );
};

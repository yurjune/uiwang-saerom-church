import { MenuButton, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  active: boolean;
  onClick: (() => void) | undefined;
}

export const HeaderNavMenuLink = ({ children, active, onClick }: Props) => {
  return (
    <MenuButton
      as={Button}
      variant="menu"
      h="48px"
      px="16px"
      bg="transparent"
      rounded="md"
      position="relative"
      fontSize="18px"
      color={active ? "blue.700" : "blue.600"}
      fontWeight={active ? 700 : 600}
      _after={{
        content: '""',
        position: "absolute",
        left: "16px",
        right: "16px",
        bottom: "4px",
        height: "3px",
        borderRadius: "full",
        transition: "all 0.2s ease",
        transformOrigin: "center",
        bg: active ? "blue.700" : "blue.300",
        opacity: active ? 1 : 0,
        transform: active ? "scaleX(1)" : "scaleX(0.45)",
      }}
      _hover={{
        bg: "transparent",
        color: "blue.700",
        _after: {
          opacity: 1,
          transform: "scaleX(1)",
        },
      }}
      _focus={{ outline: "none", boxShadow: "none" }}
      _focusVisible={{ outline: "none", boxShadow: "none" }}
      onClick={onClick}
    >
      {children}
    </MenuButton>
  );
};

import { MenuButton, Button, MenuButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

const createMenuButtonProps = (active: boolean): MenuButtonProps => {
  return {
    h: "48px",
    px: "16px",
    bg: "transparent",
    rounded: "md",
    position: "relative",
    fontSize: "18px",
    color: active ? "blue.700" : "blue.600",
    fontWeight: active ? 700 : 600,
    _after: {
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
    },
    _hover: {
      bg: "transparent",
      color: "blue.700",
      _after: {
        opacity: 1,
        transform: "scaleX(1)",
      },
    },
    _focus: {
      outline: "none",
      boxShadow: "none",
    },
    _focusVisible: {
      outline: "none",
      boxShadow: "none",
    },
  };
};

interface Props {
  children: ReactNode;
  active: boolean;
  href?: string;
}

const HeaderNavMenu = ({ children, active, href }: Props) => {
  const menuButtonProps = createMenuButtonProps(active);

  if (href) {
    return (
      <Link href={href} prefetch>
        <MenuButton as={Button} variant="menu" {...menuButtonProps}>
          {children}
        </MenuButton>
      </Link>
    );
  }

  return (
    <MenuButton as={Button} variant="menu" {...menuButtonProps}>
      {children}
    </MenuButton>
  );
};

export default HeaderNavMenu;

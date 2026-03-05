import Link from "next/link";
import { MenuItem } from "@chakra-ui/react";
import { ReactNode } from "react";

const HeaderNavSubMenu = ({
  children,
  href,
  active,
}: {
  children: ReactNode;
  href: string;
  active: boolean;
}) => {
  return (
    <MenuItem
      as={Link}
      href={href}
      rounded="sm"
      py="10px"
      fontWeight={active ? 700 : 500}
      bg={active ? "blue.50" : "transparent"}
      _hover={{ bg: "blue.100" }}
      _focus={{ bg: "blue.100" }}
    >
      {children}
    </MenuItem>
  );
};

export default HeaderNavSubMenu;

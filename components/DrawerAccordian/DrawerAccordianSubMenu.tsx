import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
  active: boolean;
  onMove: () => void;
}

const DrawerAccordianSubMenu = ({ children, href, active, onMove }: Props) => {
  return (
    <Link href={href} prefetch>
      <Box
        textDecoration="none"
        px={3}
        py={2}
        rounded="md"
        fontSize="15px"
        fontWeight={active ? 700 : 500}
        color={active ? "blue.700" : "gray.700"}
        bg={active ? "blue.100" : "transparent"}
        _hover={{
          bg: "blue.50",
          color: "blue.800",
          textDecoration: "none",
        }}
        onClick={onMove}
      >
        {children}
      </Box>
    </Link>
  );
};

export default DrawerAccordianSubMenu;

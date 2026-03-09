import Link from "next/link";
import {
  AccordionButton,
  AccordionButtonProps,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const createButtonProps = (active: boolean): AccordionButtonProps => {
  return {
    p: 3,
    bg: active ? "blue.100" : "transparent",
    fontWeight: active ? 700 : 500,
    _focus: { boxShadow: "none" },
    _focusVisible: { boxShadow: "none" },
    _active: { bg: active ? "blue.100" : "blue.50" },
    _expanded: { bg: active ? "blue.100" : "blue.50" },
  };
};

interface Props {
  href: string | undefined;
  label: string;
  active: boolean;
  onClose: () => void;
}

const DrawerAccordianMenu = ({ label, active, href, onClose }: Props) => {
  if (href) {
    return (
      <Link href={href} prefetch>
        <AccordionButton {...createButtonProps(active)} onClick={onClose}>
          {label}
        </AccordionButton>
      </Link>
    );
  }

  return (
    <AccordionButton p={3} {...createButtonProps(active)}>
      <Box flex="1" textAlign="left">
        {label}
      </Box>

      <AccordionIcon />
    </AccordionButton>
  );
};

export default DrawerAccordianMenu;

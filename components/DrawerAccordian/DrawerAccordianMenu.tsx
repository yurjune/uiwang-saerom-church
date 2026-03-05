import { AccordionButton, AccordionIcon, Box } from "@chakra-ui/react";

interface Props {
  label: string;
  active: boolean;
  hasChildren: boolean;
  onClick: () => void;
}

const DrawerAccordianMenu = ({
  label,
  active,
  hasChildren,
  onClick,
}: Props) => {
  const buttonBg = active ? "blue.100" : "blue.50";

  return (
    <AccordionButton
      p={3}
      bg={active ? "blue.100" : "transparent"}
      fontWeight={active ? 700 : 500}
      cursor={!hasChildren && active ? "default" : "pointer"}
      _focus={{ boxShadow: "none" }}
      _focusVisible={{ boxShadow: "none" }}
      _active={{ bg: buttonBg }}
      _expanded={{ bg: buttonBg }}
      onClick={onClick}
    >
      <Box flex="1" textAlign="left">
        {label}
      </Box>
      {hasChildren && <AccordionIcon />}
    </AccordionButton>
  );
};

export default DrawerAccordianMenu;

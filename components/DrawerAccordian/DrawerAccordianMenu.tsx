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
  return (
    <AccordionButton p={3} {...createButtonProps(active)} onClick={onClick}>
      <Box flex="1" textAlign="left">
        {label}
      </Box>

      {hasChildren && <AccordionIcon />}
    </AccordionButton>
  );
};

export default DrawerAccordianMenu;

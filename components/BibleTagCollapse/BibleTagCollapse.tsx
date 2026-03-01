"use client";

import { Box, Divider, Collapse } from "@chakra-ui/react";
import BibleTag from "@/components/BibleTagCollapse/BibleTag";
import { oldBible, newBible } from "@/constants/bible";

type Props = {
  category?: string;
  isOpen: boolean;
  onClose: () => void;
};

const BibleTagCollapse = ({ category, isOpen, onClose }: Props) => {
  return (
    <Collapse in={isOpen}>
      <Box
        p="20px"
        color="white"
        mt="20px"
        bg="second"
        rounded="md"
        shadow="md"
      >
        <BibleTag bible={oldBible} category={category} onClose={onClose} />
        <Divider my="20px" />
        <BibleTag bible={newBible} category={category} onClose={onClose} />
      </Box>
    </Collapse>
  );
};

export default BibleTagCollapse;

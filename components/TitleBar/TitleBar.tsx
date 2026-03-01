"use client";

import { Box, Heading, Divider } from "@chakra-ui/react";

type Props = {
  title: string;
};

const TitleBar = ({ title }: Props) => {
  return (
    <Box>
      <Heading as="h2" size="lg">
        {title}
      </Heading>

      <Divider mt="20px" mb="30px" />
    </Box>
  );
};

export default TitleBar;

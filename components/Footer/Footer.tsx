import { Box, Flex } from "@chakra-ui/react";
import { layoutWidth } from "@/components/layouts/AppLayout";
import { CHURCH_INFO } from "@/constants";

const Footer = () => {
  return (
    <Box w="100%" h="150px" bgColor="charcole">
      <Flex
        maxW={layoutWidth}
        h="100%"
        m="0 auto"
        px={5}
        py={10}
        direction="column"
        color="grayLetter"
        fontSize="12px"
        justify="flex-start"
        align="center"
        textAlign="center"
        fontFamily="Nanum Gothic"
      >
        <Box mb="20px">© 2026 Saerom Church of Uiwang. ALL RIGHT RESERVED</Box>
        <Box>{CHURCH_INFO.location}</Box>
      </Flex>
    </Box>
  );
};

export default Footer;

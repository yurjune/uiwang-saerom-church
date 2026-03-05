import { Box, Flex } from "@chakra-ui/react";
import { CHURCH_INFO } from "@/constants";
import { layoutWidth } from "@/constants/layout";

const Footer = () => {
  return (
    <Box as="footer" w="100%" h="150px" bgColor="charcole">
      <Flex
        maxW={layoutWidth}
        h="100%"
        m="0 auto"
        px={5}
        py={10}
        direction="column"
        color="#A8A8A8"
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

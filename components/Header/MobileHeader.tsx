import Image from "next/image";
import Link from "next/link";
import { Flex, Box } from "@chakra-ui/react";

import LogoImage from "@/public/logo.png";
import DrawerButton from "@/components/DrawerAccordian/DrawerButton";

const MobileHeader = () => {
  return (
    <Flex
      as="header"
      display={{ base: "flex", md: "none" }}
      width="100%"
      height="56px"
      justify="space-between"
      align="center"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={2}
    >
      <Link href="/">
        <Box rounded="xl" transition="all 0.2s ease">
          <Image src={LogoImage} alt="logo" width={120} height={46} priority />
        </Box>
      </Link>

      <DrawerButton />
    </Flex>
  );
};

export default MobileHeader;

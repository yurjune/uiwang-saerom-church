import Image from "next/image";
import Link from "next/link";
import { Flex, Box } from "@chakra-ui/react";

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
      px={4}
    >
      <Link href="/">
        <Box rounded="xl" transition="all 0.2s ease">
          <Image alt="logo" src="/logo.jpg" width={120} height={40} priority />
        </Box>
      </Link>

      <DrawerButton />
    </Flex>
  );
};

export default MobileHeader;

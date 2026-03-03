import Link from "next/link";
import Image from "next/image";
import { Flex, Box } from "@chakra-ui/react";

import HeaderNav from "@/components/Header/HeaderNav";
import { layoutWidth } from "@/constants/layout";

const DesktopHeader = () => {
  return (
    <Box
      display={{ base: "none", md: "block" }}
      width="100%"
      height="72px"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex
        position="relative"
        maxW={layoutWidth}
        mx="auto"
        px="24px"
        width="100%"
        height="full"
        justify="space-between"
        align="center"
      >
        <Link href="/">
          <Box rounded="xl" transition="all 0.2s ease">
            <Image
              src="/logo.jpg"
              alt="Church logo"
              width={150}
              height={32}
              priority
            />
          </Box>
        </Link>

        <HeaderNav />
      </Flex>
    </Box>
  );
};

export default DesktopHeader;

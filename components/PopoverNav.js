import React from "react";
import Link from "next/link";
import {
  Box,
  Flex,
  HStack,
  Text,
  Button,
  Stack,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { menuList, movieList, communityList, schoolList } from "./Header";
import { categoryToUrl } from "../utils/categoryConverter";

const PopoverNavItem = ({ children }) => {
  return (
    <HStack p="8px" role="group" rounded="sm" _hover={{ bg: "second" }}>
      <Text
        transition="all .3s ease"
        _groupHover={{ color: "black" }}
        fontWeight="500"
      >
        {children}
      </Text>
      <Flex
        transition="all .2s ease"
        transform="translateX(-10px)"
        opacity={0}
        _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
        justify="flex-end"
        align="center"
        flex="1"
      >
        <Icon color="black" w={5} h={5} as={ChevronRightIcon} />
      </Flex>
    </HStack>
  );
};

const PopoverNavMenu = ({ title, menu }) => {
  return (
    <Box>
      <Popover trigger="hover" placement="bottom-start">
        <PopoverTrigger>
          <Button variant="menu">{title}</Button>
        </PopoverTrigger>
        <PopoverContent
          w="220px"
          p="8px"
          bg="white"
          border="0"
          rounded="md"
          boxShadow="md"
          _focus="none"
        >
          {menu.map((item) => (
            <PopoverNavItem key={item}>
              <Link href={categoryToUrl(item)}>{item}</Link>
            </PopoverNavItem>
          ))}
        </PopoverContent>
      </Popover>
    </Box>
  );
};

const PopoverNav = () => {
  return (
    <HStack>
      <Button variant="menu">
        <Link href="/">{menuList[0]}</Link>
      </Button>
      <PopoverNavMenu title={menuList[1]} menu={movieList} />
      <PopoverNavMenu title={menuList[2]} menu={communityList} />
      <PopoverNavMenu title={menuList[3]} menu={schoolList} />
    </HStack>
  );
};

export default PopoverNav;

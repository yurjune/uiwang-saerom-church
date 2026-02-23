import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { HStack, Button, useDisclosure } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import { menuList, movieList, communityList, schoolList } from "./Header";
import { categoryToUrl } from "../utils/categoryConverter";

const NavMenu = ({ title, menu }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btn = useRef();
  const router = useRouter();

  const onClickBtn = () => {
    router.push(categoryToUrl(title));
  };

  // const onRef = (e) => {
  //   // console.dir(btn.current);
  //   if (!(e.pageY >= btn.current.offsetTop + btn.current.clientHeight)) {
  //     return onClose();
  //   }
  // };

  return (
    <Menu isOpen={isOpen} gutter="0">
      <MenuButton
        as={Button}
        variant="menu"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        ref={btn}
        _focus="none"
        onClick={onClickBtn}
        // onMouseLeave={onRef}
      >
        {title}
      </MenuButton>
      <MenuList
        p="5px"
        rounded="md"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        minW="180px"
      >
        {menu.map((item) => (
          <MenuItem key={item} w="100%" _focus={{ bg: "second" }}>
            <Link href={categoryToUrl(item)}>{item}</Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

const Navigation = () => {
  return (
    <HStack>
      <Button variant="menu">
        <Link href="/">{menuList[0]}</Link>
      </Button>
      <NavMenu title={menuList[1]} menu={movieList}></NavMenu>
      <NavMenu title={menuList[2]} menu={communityList}></NavMenu>
      <NavMenu title={menuList[3]} menu={schoolList}></NavMenu>
    </HStack>
  );
};

export default Navigation;

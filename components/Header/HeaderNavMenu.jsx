"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, useDisclosure } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { categoryToUrl } from "../../utils/categoryConverter";

const HeaderNavMenu = ({ title, menu, menuId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuBtnRef = useRef(null);
  const router = useRouter();

  const onClickBtn = () => {
    router.push(categoryToUrl(title));
  };

  return (
    <Menu id={menuId} isOpen={isOpen} gutter={0}>
      <MenuButton
        as={Button}
        variant="menu"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        ref={menuBtnRef}
        _focus={{ boxShadow: "none" }}
        onClick={onClickBtn}
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
          <MenuItem
            key={item}
            as={Link}
            href={categoryToUrl(item)}
            w="100%"
            _focus={{ bg: "second" }}
          >
            {item}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default HeaderNavMenu;

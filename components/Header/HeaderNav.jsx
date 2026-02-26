"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HStack,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { navItems } from "./constant";

const HeaderNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(null);

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <HStack spacing="1">
      {navItems.map((item) => {
        const hasChildren =
          Array.isArray(item.children) && item.children.length > 0;
        const active = hasChildren
          ? item.children.some((child) => isActive(child.href))
          : isActive(item.href);
        const isOpen = hasChildren && openMenu === item.label;

        return (
          <Box
            key={item.label}
            onMouseEnter={
              hasChildren ? () => setOpenMenu(item.label) : undefined
            }
            onMouseLeave={hasChildren ? () => setOpenMenu(null) : undefined}
          >
            <Menu isOpen={isOpen} gutter={0}>
              <MenuButton
                as={Button}
                onClick={
                  !hasChildren && item.href
                    ? () => router.push(item.href)
                    : undefined
                }
                variant="menu"
                h="48px"
                px="16px"
                bg="transparent"
                rounded="md"
                position="relative"
                fontSize="18px"
                color={active ? "blue.700" : "blue.600"}
                fontWeight={active ? 700 : 600}
                _after={{
                  content: '""',
                  position: "absolute",
                  left: "16px",
                  right: "16px",
                  bottom: "4px",
                  height: "3px",
                  borderRadius: "full",
                  transition: "all 0.2s ease",
                  transformOrigin: "center",
                  bg: active ? "blue.700" : "blue.300",
                  opacity: active ? 1 : 0,
                  transform: active ? "scaleX(1)" : "scaleX(0.45)",
                }}
                _hover={{
                  bg: "transparent",
                  color: "blue.700",
                  _after: {
                    opacity: 1,
                    transform: "scaleX(1)",
                  },
                }}
                _focus={{ outline: "none", boxShadow: "none" }}
                _focusVisible={{ outline: "none", boxShadow: "none" }}
              >
                {item.label}
              </MenuButton>

              {hasChildren && (
                <MenuList
                  minW="200px"
                  p="8px"
                  rounded="md"
                  borderColor="blackAlpha.200"
                >
                  {item.children.map((child) => {
                    const childActive = isActive(child.href);

                    return (
                      <MenuItem
                        key={child.href}
                        as={Link}
                        href={child.href}
                        rounded="sm"
                        py="10px"
                        fontSize="16px"
                        fontWeight={childActive ? 700 : 500}
                        bg={childActive ? "blue.50" : "transparent"}
                        _hover={{ bg: "blue.100" }}
                        _focus={{ bg: "blue.100" }}
                      >
                        {child.label}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              )}
            </Menu>
          </Box>
        );
      })}
    </HStack>
  );
};

export default HeaderNav;

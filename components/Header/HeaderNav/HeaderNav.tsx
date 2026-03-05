"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { HStack, Box, Menu, MenuList } from "@chakra-ui/react";
import { navItems } from "@/components/Header/navItems";
import { HeaderNavMenuLink } from "./HeaderNavMenu";
import { HeaderNavSubMenu } from "./HeaderNavSubMenu";

const HeaderNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isActive = (href?: string) =>
    Boolean(href) && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <HStack spacing="1">
      {navItems.map((item) => {
        const hasChildren =
          Array.isArray(item.children) && item.children.length > 0;
        const children = item.children ?? [];
        const href = item.href;
        const active = hasChildren
          ? children.some((child) => isActive(child.href))
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
              <HeaderNavMenuLink
                active={active}
                onClick={
                  !hasChildren && href ? () => router.push(href) : undefined
                }
              >
                {item.label}
              </HeaderNavMenuLink>

              {hasChildren && (
                <MenuList
                  minW="200px"
                  p="8px"
                  rounded="md"
                  borderColor="blackAlpha.200"
                >
                  {children.map((child) => {
                    return (
                      <HeaderNavSubMenu
                        key={child.href}
                        href={child.href}
                        active={isActive(child.href)}
                      >
                        {child.label}
                      </HeaderNavSubMenu>
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

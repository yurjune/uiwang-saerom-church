"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HStack, Button } from "@chakra-ui/react";

const navItems = [
  { href: "/movies", label: "설교 영상" },
  { href: "/community/news", label: "교회 소식" },
  { href: "/community/map", label: "오시는 길" },
];

const HeaderNav = () => {
  const pathname = usePathname();

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <HStack spacing="1">
      {navItems.map((item) => {
        const active = isActive(item.href);

        return (
          <Button
            key={item.href}
            as={Link}
            href={item.href}
            variant="menu"
            h="44px"
            px="14px"
            bg="transparent"
            color={active ? "white" : "whiteAlpha.900"}
            fontSize="17px"
            fontWeight={active ? 700 : 600}
            rounded="md"
            position="relative"
            _after={{
              content: '""',
              position: "absolute",
              left: "14px",
              right: "14px",
              bottom: "6px",
              height: "2px",
              borderRadius: "full",
              bg: active ? "white" : "whiteAlpha.700",
              opacity: active ? 1 : 0,
              transform: active ? "scaleX(1)" : "scaleX(0.45)",
              transformOrigin: "center",
              transition: "all 0.2s ease",
            }}
            _hover={{
              bg: "transparent",
              color: "white",
              _after: {
                opacity: 1,
                transform: "scaleX(1)",
              },
            }}
            _active={{ bg: "transparent" }}
          >
            {item.label}
          </Button>
        );
      })}
    </HStack>
  );
};

export default HeaderNav;

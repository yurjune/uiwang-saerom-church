"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
} from "@chakra-ui/react";
import { navItems } from "../Header/navItems";

const normalizePath = (path) => {
  if (!path) return "/";
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
};

const DrawerAccordian = ({ onMove }) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href) => {
    const current = normalizePath(pathname);
    const target = normalizePath(href);
    return current === target || current.startsWith(`${target}/`);
  };

  const defaultOpenIndex = navItems.findIndex(
    (item) =>
      Array.isArray(item.children) &&
      item.children.length > 0 &&
      item.children.some((child) => isActive(child.href)),
  );

  return (
    <Accordion
      allowToggle
      defaultIndex={defaultOpenIndex >= 0 ? defaultOpenIndex : undefined}
    >
      {navItems.map((item) => {
        const hasChildren =
          Array.isArray(item.children) && item.children.length > 0;
        const parentActive = hasChildren
          ? item.children.some((child) => isActive(child.href))
          : isActive(item.href);
        const buttonBg = parentActive ? "blue.100" : "blue.50";

        return (
          <AccordionItem
            key={item.label}
            border="none"
            rounded="md"
            overflow="hidden"
          >
            <AccordionButton
              py={3}
              px={3}
              _focus={{ boxShadow: "none" }}
              _focusVisible={{ boxShadow: "none" }}
              _active={{ bg: buttonBg }}
              _expanded={{ bg: buttonBg }}
              _hover={parentActive ? {} : { bg: "blue.50" }}
              bg={parentActive ? "blue.100" : "transparent"}
              fontSize="16px"
              fontWeight={parentActive ? 700 : 500}
              onClick={() => {
                if (!hasChildren && item.href && !parentActive) {
                  router.push(item.href);
                  onMove();
                }
              }}
              cursor={!hasChildren && parentActive ? "default" : "pointer"}
            >
              <Box flex="1" textAlign="left">
                {item.label}
              </Box>
              {hasChildren && <AccordionIcon />}
            </AccordionButton>

            {hasChildren && (
              <AccordionPanel pt={1} pb={3} pl={4} pr={1}>
                <VStack align="stretch" spacing={1}>
                  {item.children.map((child) => {
                    const childActive = isActive(child.href);

                    return (
                      <Box
                        key={child.href}
                        as={Link}
                        href={child.href}
                        onClick={onMove}
                        px={3}
                        py={2}
                        rounded="md"
                        fontSize="15px"
                        fontWeight={childActive ? 700 : 500}
                        color={childActive ? "blue.700" : "gray.700"}
                        bg={childActive ? "blue.100" : "transparent"}
                        _hover={{ bg: "blue.50", color: "blue.800" }}
                      >
                        {child.label}
                      </Box>
                    );
                  })}
                </VStack>
              </AccordionPanel>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default DrawerAccordian;

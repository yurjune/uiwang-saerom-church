"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  VStack,
  Link,
} from "@chakra-ui/react";
import { navItems } from "@/components/Header/navItems";

const normalizePath = (path?: string | null): string => {
  if (!path) return "/";
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
};

type Props = {
  onMove: () => void;
};

const DrawerAccordian = ({ onMove }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href?: string) => {
    if (!href) return false;
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
    <Accordion allowToggle defaultIndex={defaultOpenIndex}>
      {navItems.map((item) => {
        const hasChildren =
          Array.isArray(item.children) && item.children.length > 0;
        const children = item.children ?? [];
        const parentActive = hasChildren
          ? children.some((child) => isActive(child.href))
          : isActive(item.href);
        const buttonBg = parentActive ? "blue.100" : "blue.50";

        return (
          <AccordionItem
            key={item.label}
            border="none"
            rounded="md"
            overflow="hidden"
            gap={1}
          >
            <AccordionButton
              p={3}
              bg={parentActive ? "blue.100" : "transparent"}
              fontWeight={parentActive ? 700 : 500}
              cursor={!hasChildren && parentActive ? "default" : "pointer"}
              _focus={{ boxShadow: "none" }}
              _focusVisible={{ boxShadow: "none" }}
              _active={{ bg: buttonBg }}
              _expanded={{ bg: buttonBg }}
              onClick={() => {
                if (!hasChildren && item.href && !parentActive) {
                  router.push(item.href);
                  onMove();
                }
              }}
            >
              <Box flex="1" textAlign="left">
                {item.label}
              </Box>
              {hasChildren && <AccordionIcon />}
            </AccordionButton>

            {hasChildren && (
              <AccordionPanel py={1} pl={4} pr={0}>
                <VStack align="stretch" spacing={1}>
                  {children.map((child) => {
                    const childActive = isActive(child.href);

                    return (
                      <Box
                        key={child.href}
                        as={Link}
                        href={child.href}
                        onClick={onMove}
                        textDecoration="none"
                        px={3}
                        py={2}
                        rounded="md"
                        fontSize="15px"
                        fontWeight={childActive ? 700 : 500}
                        color={childActive ? "blue.700" : "gray.700"}
                        bg={childActive ? "blue.100" : "transparent"}
                        _hover={{
                          bg: "blue.50",
                          color: "blue.800",
                          textDecoration: "none",
                        }}
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

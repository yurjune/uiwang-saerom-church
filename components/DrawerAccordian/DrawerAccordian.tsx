"use client";

import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  VStack,
} from "@chakra-ui/react";
import { navItems } from "@/components/Header/navItems";
import DrawerAccordianMenu from "./DrawerAccordianMenu";
import DrawerAccordianSubMenu from "./DrawerAccordianSubMenu";

const normalizePath = (path?: string | null): string => {
  if (!path) return "/";
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
};

type Props = {
  onMove: () => void;
};

const DrawerAccordian = ({ onMove }: Props) => {
  const pathname = usePathname();

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
        const active = hasChildren
          ? children.some((child) => isActive(child.href))
          : isActive(item.href);

        return (
          <AccordionItem
            key={item.label}
            border="none"
            rounded="md"
            overflow="hidden"
            gap={1}
          >
            <DrawerAccordianMenu
              href={item.href}
              label={item.label}
              active={active}
              onClose={onMove}
            />

            {hasChildren && (
              <AccordionPanel py={1} pl={4} pr={0}>
                <VStack align="stretch" spacing={1}>
                  {children.map((child) => {
                    const childActive = isActive(child.href);

                    return (
                      <DrawerAccordianSubMenu
                        key={child.href}
                        href={child.href}
                        active={childActive}
                        onMove={onMove}
                      >
                        {child.label}
                      </DrawerAccordianSubMenu>
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

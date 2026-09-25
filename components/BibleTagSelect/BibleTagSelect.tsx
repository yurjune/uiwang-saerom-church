"use client";

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tag,
  TagCloseButton,
  TagLabel,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Bible, newBible, oldBible } from "@/constants/bible";

type Props = {
  labelId?: string;
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
};

function toArray(value: string | string[]) {
  return Array.isArray(value) ? value : [value];
}

function sortByBibleOrder(tags: string[]) {
  return Bible.filter((bible) => tags.includes(bible));
}

const BibleTagSelect = ({
  labelId,
  name,
  value,
  onChange,
  placeholder = "성경 본문을 선택하세요",
}: Props) => {
  const selectedOld = value.filter((tag) => oldBible.includes(tag));
  const selectedNew = value.filter((tag) => newBible.includes(tag));

  return (
    <Box>
      <Menu closeOnSelect={false} matchWidth placement="bottom-start">
        <MenuButton
          as={Button}
          aria-labelledby={labelId}
          type="button"
          variant="outline"
          w="100%"
          h="48px"
          px="16px"
          borderRadius="10px"
          textAlign="left"
          fontWeight="400"
          color={value.length > 0 ? "gray.800" : "gray.400"}
          rightIcon={<ChevronDownIcon color="gray.500" boxSize="20px" />}
        >
          {value.length > 0 ? `${value.length}개 선택됨` : placeholder}
        </MenuButton>

        <MenuList maxH="320px" overflowY="auto" borderRadius="10px" py="4px">
          <MenuOptionGroup
            type="checkbox"
            title="구약"
            value={selectedOld}
            onChange={(next) =>
              onChange(sortByBibleOrder([...toArray(next), ...selectedNew]))
            }
          >
            {oldBible.map((bible) => (
              <MenuItemOption key={bible} value={bible} fontSize="15px">
                {bible}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
          <MenuDivider />
          <MenuOptionGroup
            type="checkbox"
            title="신약"
            value={selectedNew}
            onChange={(next) =>
              onChange(sortByBibleOrder([...selectedOld, ...toArray(next)]))
            }
          >
            {newBible.map((bible) => (
              <MenuItemOption key={bible} value={bible} fontSize="15px">
                {bible}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>

      {value.length > 0 && (
        <Wrap mt="12px" spacing="8px">
          {value.map((tag) => (
            <WrapItem key={tag}>
              <Tag
                size="lg"
                borderRadius="full"
                variant="subtle"
                colorScheme="blue"
              >
                <TagLabel>{tag}</TagLabel>
                <TagCloseButton
                  aria-label={`${tag} 태그 삭제`}
                  onClick={() => onChange(value.filter((item) => item !== tag))}
                />
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      )}

      <input type="hidden" name={name} value={value.join(",")} />
    </Box>
  );
};

export default BibleTagSelect;

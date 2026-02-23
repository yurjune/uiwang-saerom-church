import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Input, IconButton, HStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import DrawerButton from "./DrawerButton";
import useInput from "../hooks/useInput";

export default function SearchBar() {
  const router = useRouter();
  const [value, onChangeValue] = useInput("");

  const onClickSearch = () => {
    router.push(`/search?s=${value}`);
  };

  const onEnter = () => {
    if (window && window.event.keyCode == 13) {
      return onClickSearch();
    }
  };

  return (
    <HStack mr="8px">
      <Input
        size="sm"
        variant="filled"
        placeholder="검색"
        _hover={{ bgColor: "none" }}
        _focus={{ bgColor: "none" }}
        value={value}
        onChange={onChangeValue}
        onKeyUp={onEnter}
      />
      <IconButton
        w="32px"
        h="32px"
        bg="none"
        color="white"
        _focus="none"
        icon={<SearchIcon />}
        onClick={onClickSearch}
      />
      <DrawerButton></DrawerButton>
    </HStack>
  );
}

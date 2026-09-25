"use client";

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  onLogin: (password: string) => Promise<boolean>;
};

type FormSubmitEvent = {
  preventDefault: () => void;
};

const AdminLogin = ({ onLogin }: Props) => {
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const ok = await onLogin(password);
      setHasError(!ok);
      if (ok) setPassword("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Flex
      w="100%"
      bg="white"
      justify="center"
      align="flex-start"
      pt={{ base: "48px", md: "96px" }}
      pb={{ base: "64px", md: "120px" }}
      px="16px"
    >
      <Box
        w="100%"
        maxW="400px"
        bg="white"
        borderRadius="16px"
        border="1px solid"
        borderColor="gray.200"
        boxShadow="sm"
        px={{ base: "24px", md: "36px" }}
        py={{ base: "32px", md: "40px" }}
      >
        <Box as="form" onSubmit={handleSubmit}>
          <Heading
            as="h1"
            fontSize="24px"
            fontWeight="700"
            letterSpacing="-0.01em"
            color="gray.800"
          >
            관리자 로그인
          </Heading>
          <Text
            fontSize="15px"
            lineHeight="1.6"
            color="gray.500"
            mt="8px"
            mb="28px"
          >
            관리자 비밀번호를 입력해 주세요.
          </Text>

          <FormControl isInvalid={hasError} mb="20px">
            <FormLabel
              htmlFor="admin-pw"
              fontSize="14px"
              fontWeight="600"
              color="gray.700"
            >
              비밀번호
            </FormLabel>
            <Input
              id="admin-pw"
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력하세요"
              h="48px"
              borderRadius="10px"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setHasError(false);
              }}
            />
            <FormErrorMessage fontSize="14px" fontWeight="500">
              비밀번호가 올바르지 않습니다. 다시 확인해 주세요.
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            w="100%"
            h="48px"
            borderRadius="10px"
            colorScheme="blue"
            fontWeight="700"
            isDisabled={!password}
            isLoading={isSubmitting}
            loadingText="확인 중…"
          >
            로그인
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminLogin;

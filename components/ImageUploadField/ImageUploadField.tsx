"use client";

import {
  AspectRatio,
  Box,
  CloseButton,
  Flex,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { useEffect, useMemo } from "react";

type Props = {
  id: string;
  value: File[];
  onChange: (value: File[]) => void;
  max: number;
  maxBytes: number;
  accept: string;
  onReject?: (message: string) => void;
};

function formatMegabytes(bytes: number) {
  return `${Math.round(bytes / (1024 * 1024))}MB`;
}

const ImageUploadField = ({
  id,
  value,
  onChange,
  max,
  maxBytes,
  accept,
  onReject,
}: Props) => {
  const previews = useMemo(
    () => value.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [value],
  );
  const isFull = value.length >= max;

  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";

    const oversized = selected.filter((file) => file.size > maxBytes);
    if (oversized.length > 0) {
      onReject?.(
        `${formatMegabytes(maxBytes)}를 넘는 이미지는 올릴 수 없습니다: ${oversized
          .map((file) => file.name)
          .join(", ")}`,
      );
    }

    const next = [
      ...value,
      ...selected.filter((file) => file.size <= maxBytes),
    ];
    if (next.length > max) {
      onReject?.(`이미지는 최대 ${max}장까지 선택할 수 있습니다.`);
    }
    onChange(next.slice(0, max));
  }

  return (
    <Box position="relative">
      <Input
        id={id}
        type="file"
        accept={accept}
        multiple
        isDisabled={isFull}
        position="absolute"
        top="0"
        left="50%"
        w="1px"
        h="1px"
        p="0"
        opacity={0}
        onChange={handleChange}
      />
      <Flex
        as="label"
        htmlFor={id}
        direction="column"
        align="center"
        justify="center"
        gap="6px"
        minH="140px"
        p="20px"
        border="1px dashed"
        borderColor="gray.400"
        borderRadius="10px"
        bg="gray.50"
        cursor={isFull ? "not-allowed" : "pointer"}
        opacity={isFull ? 0.6 : 1}
        textAlign="center"
        _hover={isFull ? undefined : { borderColor: "blue.500", bg: "blue.50" }}
      >
        <Text fontSize="15px" fontWeight="600" color="gray.700">
          {isFull ? `최대 ${max}장까지 선택했습니다` : "이미지를 선택하세요"}
        </Text>
        <Text fontSize="13px" color="gray.500">
          PNG, JPG, WEBP · 장당 {formatMegabytes(maxBytes)} 이하 ·{" "}
          {value.length}/{max}
        </Text>
      </Flex>

      {previews.length > 0 && (
        <SimpleGrid columns={{ base: 3, sm: 5 }} spacing="8px" mt="12px">
          {previews.map(({ file, url }, index) => (
            <AspectRatio
              key={url}
              ratio={1}
              borderRadius="10px"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.200"
            >
              <Box position="relative">
                <Image
                  src={url}
                  alt={file.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
                {index === 0 && (
                  <Text
                    position="absolute"
                    left="6px"
                    bottom="6px"
                    px="6px"
                    py="2px"
                    borderRadius="6px"
                    bg="blackAlpha.700"
                    color="white"
                    fontSize="11px"
                    fontWeight="600"
                  >
                    대표
                  </Text>
                )}
                <CloseButton
                  aria-label={`${file.name} 삭제`}
                  size="sm"
                  position="absolute"
                  top="4px"
                  right="4px"
                  bg="blackAlpha.600"
                  color="white"
                  borderRadius="full"
                  _hover={{ bg: "blackAlpha.800" }}
                  onClick={() =>
                    onChange(value.filter((item) => item !== file))
                  }
                />
              </Box>
            </AspectRatio>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ImageUploadField;

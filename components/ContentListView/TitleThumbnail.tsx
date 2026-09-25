import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { getThumbnailPreset } from "@/constants/thumbnail";

type Props = {
  sequence: number;
  title: string;
  reference?: string | null;
};

// 1024px 프리셋 기준 thumbnail-maker 규칙(제목 120px, 말씀 70px, 사이 간격 96px, 좌우 30px)을 비율로 옮긴 값
const TitleThumbnail = ({ sequence, title, reference }: Props) => {
  return (
    <Box
      h="0"
      pb="100%"
      position="relative"
      overflow="hidden"
      bg="gray.100"
      sx={{ containerType: "inline-size" }}
    >
      <Image
        src={getThumbnailPreset(sequence)}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{ objectFit: "cover" }}
      />
      <Flex
        position="absolute"
        inset="0"
        direction="column"
        align="center"
        justify="center"
        gap="9.4cqw"
        px="3cqw"
        textAlign="center"
        color="#f4f4ef"
        fontSize="11.7cqw"
        fontWeight="500"
        lineHeight="1.3"
        textShadow="0 2px 6px rgba(0, 0, 0, 0.16)"
        wordBreak="keep-all"
        overflowWrap="anywhere"
      >
        <Box>{title}</Box>
        {reference && <Box fontSize="6.8cqw">{reference}</Box>}
      </Flex>
    </Box>
  );
};

export default TitleThumbnail;

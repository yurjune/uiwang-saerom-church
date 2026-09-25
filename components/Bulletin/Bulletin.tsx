import NextImage from "next/image";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { getLatestBulletin } from "@/lib/contentful";

const Bulletin = async () => {
  const bulletin = await getLatestBulletin();
  if (!bulletin || bulletin.fields.images.length === 0) {
    return null;
  }

  const images = bulletin.fields.images;

  return (
    <Box
      bg="white"
      px={{ base: "16px", md: "24px" }}
      py={{ base: "48px", md: "64px" }}
    >
      <Box maxW="960px" mx="auto">
        <Box textAlign="center" mb={{ base: "28px", md: "40px" }}>
          <Heading as="h2" size="lg" color="gray.800" letterSpacing="tight">
            주보
          </Heading>

          <Text mt="10px" fontSize={{ base: "sm", md: "md" }} color="gray.600">
            {bulletin.fields.title}
          </Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: images.length === 1 ? 1 : 2 }}
          spacing="20px"
        >
          {images.map((image) => (
            <Box
              key={image.url}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="12px"
              overflow="hidden"
              boxShadow="0 10px 24px rgba(28, 32, 36, 0.08)"
              bg="white"
            >
              <NextImage
                src={image.url}
                alt={image.title || bulletin.fields.title}
                width={image.width}
                height={image.height}
                sizes="(max-width: 768px) 100vw, 480px"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Bulletin;

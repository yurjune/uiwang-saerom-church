import NextImage from "next/image";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { getLatestBulletin } from "@/lib/contentful";

const Bulletin = async () => {
  const bulletin = await getLatestBulletin();
  if (!bulletin || bulletin.fields.images.length === 0) {
    return null;
  }

  const images = bulletin.fields.images.slice(0, 3);

  return (
    <Box
      bg="white"
      px={{ base: "16px", md: "24px" }}
      py={{ base: "48px", md: "64px" }}
    >
      <Box maxW="960px" mx="auto">
        <Box textAlign="center" mb={{ base: "28px", md: "40px" }}>
          <Heading as="h2" size="lg" color="gray.800" letterSpacing="tight">
            이번 주 주보
          </Heading>
        </Box>

        <Grid
          templateColumns="repeat(auto-fit, minmax(min(100%, 280px), 1fr))"
          gap={{ base: "8px", md: "10px" }}
          justifyItems="center"
        >
          {images.map((image) => (
            <GridItem key={image.url} w="100%" maxW="520px">
              <Box
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
                  sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 320px"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Bulletin;

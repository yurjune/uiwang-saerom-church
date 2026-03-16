import { Box, Grid, GridItem, Skeleton } from "@chakra-ui/react";

const SKELETON_ITEMS = [1, 2, 3, 4];

const ContentListSkeleton = () => {
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(220px, 1fr))"
      columnGap={5}
      rowGap={6}
      px={{ base: "12px", sm: 0 }}
    >
      {SKELETON_ITEMS.map((el) => {
        return (
          <GridItem key={el}>
            <ContentItemCardSkeleton />
          </GridItem>
        );
      })}
    </Grid>
  );
};

const ContentItemCardSkeleton = () => {
  return (
    <Box>
      <Box h="0" pb="100%" position="relative" overflow="hidden">
        <Skeleton position="absolute" inset={0} />
      </Box>

      <Box p="20px 10px 0 10px" textAlign="center">
        <Skeleton h="24px" mb="3px" borderRadius="md" />
        <Skeleton h="21px" w="88px" mx="auto" borderRadius="md" />
      </Box>
    </Box>
  );
};

export default ContentListSkeleton;

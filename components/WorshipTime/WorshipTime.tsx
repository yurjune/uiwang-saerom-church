import { Box, Flex, Heading } from "@chakra-ui/react";
import WorshipTimeItem from "@/components/WorshipTime/WorshipTimeItem";
import { worshipSchedule } from "@/components/WorshipTime/constant";
import { ProjectMenu } from "@/constants/menu";

interface Props {
  enableAnimation: boolean;
}

const WorshipTime = ({ enableAnimation }: Props) => {
  return (
    <Box width="100%" bgGradient="linear(to-b, #F4F9FF 0%, #FFF 100%)">
      <Flex
        py={{ base: "56px", md: "72px" }}
        px={{ base: "16px", md: "24px" }}
        m="0 auto"
        direction="column"
        align="center"
      >
        <Box textAlign="center" mb={{ base: "28px", md: "40px" }}>
          <Heading
            as="h2"
            id="worship-time"
            size="lg"
            color="gray.800"
            letterSpacing="tight"
          >
            {ProjectMenu.introduce.time.label}
          </Heading>
        </Box>

        <Box w="100%">
          {worshipSchedule.map((item, index) => (
            <WorshipTimeItem
              key={item.title}
              index={index}
              title={item.title}
              day={item.day}
              time={item.time}
              enableAnimation={enableAnimation}
            />
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default WorshipTime;

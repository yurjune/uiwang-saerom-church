import { Button, SimpleGrid } from "@chakra-ui/react";

type Props<T extends string> = {
  options: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  isInvalid?: boolean;
};

const ToggleButtonGroup = <T extends string>({
  options,
  value,
  onChange,
  isInvalid = false,
}: Props<T>) => {
  return (
    <SimpleGrid columns={options.length} spacing="8px">
      {options.map((option) => {
        const selected = option === value;
        return (
          <Button
            key={option}
            type="button"
            h="48px"
            px="8px"
            borderRadius="10px"
            border="1px solid"
            borderColor={
              selected ? "blue.500" : isInvalid ? "red.500" : "gray.200"
            }
            bg={selected ? "blue.50" : "white"}
            color={selected ? "blue.600" : "gray.600"}
            fontWeight="700"
            _hover={{ bg: selected ? "blue.50" : "gray.50" }}
            aria-pressed={selected}
            onClick={() => onChange(option)}
          >
            {option}
          </Button>
        );
      })}
    </SimpleGrid>
  );
};

export default ToggleButtonGroup;

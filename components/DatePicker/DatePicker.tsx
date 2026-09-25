"use client";

import {
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import "react-day-picker/style.css";

type Props = {
  id?: string;
  name: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  placeholder?: string;
};

const displayFormat = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
});

const DatePicker = ({
  id,
  name,
  value,
  onChange,
  placeholder = "날짜를 선택하세요",
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSelectDay(day: Date | undefined) {
    if (!day) {
      return;
    }

    onChange(day);
    onClose();
  }

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom-start"
        isLazy
      >
        <PopoverTrigger>
          <Button
            id={id}
            type="button"
            variant="outline"
            w="100%"
            h="48px"
            px="16px"
            borderRadius="10px"
            justifyContent="space-between"
            fontWeight="400"
            color={value ? "gray.800" : "gray.400"}
            rightIcon={<FiCalendar color="var(--chakra-colors-gray-500)" />}
          >
            {value ? displayFormat.format(value) : placeholder}
          </Button>
        </PopoverTrigger>

        <PopoverContent w="auto" borderRadius="12px" boxShadow="lg">
          <PopoverBody
            p="12px"
            sx={{
              ".rdp-root": {
                "--rdp-accent-color": "var(--chakra-colors-blue-500)",
                "--rdp-accent-background-color": "var(--chakra-colors-blue-50)",
                "--rdp-today-color": "var(--chakra-colors-blue-500)",
                "--rdp-day-width": "40px",
                "--rdp-day-height": "40px",
                "--rdp-day_button-width": "38px",
                "--rdp-day_button-height": "38px",
                fontSize: "14px",
              },
              ".rdp-selected .rdp-day_button": {
                bg: "blue.500",
                color: "white",
                borderColor: "blue.500",
              },
            }}
          >
            <DayPicker
              mode="single"
              locale={ko}
              selected={value ?? undefined}
              defaultMonth={value ?? undefined}
              onSelect={handleSelectDay}
            />
          </PopoverBody>

          <PopoverFooter display="flex" justifyContent="flex-end" p="12px">
            <Button
              size="sm"
              variant="ghost"
              color="gray.600"
              onClick={() => {
                onChange(null);
                onClose();
              }}
            >
              지우기
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>

      <Box
        as="input"
        type="hidden"
        name={name}
        value={value ? value.toISOString() : ""}
      />
    </>
  );
};

export default DatePicker;

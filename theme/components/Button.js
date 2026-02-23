export default {
  baseStyle: {
    fontWeight: "",
  },
  sizes: {
    cs: {
      h: "35px",
      px: "12px",
    },
  },
  variants: {
    solid: {
      bg: "second",
      _hover: {
        bg: "first",
        color: "white",
      },
    },
    main: {
      bg: "second",
      _hover: {
        bg: "first",
        color: "white",
      },
      fontSize: "16px",
    },
    delete: {
      bg: "warning",
      _hover: {
        color: "white",
      },
    },
    modify: {
      bg: "blue",
      _hover: {
        color: "white",
      },
    },
    menu: {
      bg: "none",
      _hover: {
        bg: "first",
        color: "white",
      },
      color: "white",
      fontSize: ["20px", "20px", "20px", "22px"],
    },
    pagination: {
      mx: "2px",
      px: "8px",
      py: "2px",
      rounded: "md",
      bg: "second",
      color: "gray.700",
    },
  },
};

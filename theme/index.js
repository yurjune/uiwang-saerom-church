import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import Button from "./components/Button";

// const breakpoints = createBreakpoints({
//   sm: "30em",
//   md: "48em",
//   lg: "62em",
//   xl: "80em",
//   "2xl": "96em",
// });

const overrides = {
  // breakpoints,
  styles,
  components: {
    Button,
  },
  colors: {
    first: "#469424",
    // first: "#2B8E1B",
    second: "#9DD84B",
    third: "#9DD84B",
    fourth: "#808000",
    white: "#ffffff",
    grayLetter: "#808080",
    charcole: "#282828",
    warning: "#E53E32",
    blue: "#0081cc",
  },
};

export default extendTheme(overrides);

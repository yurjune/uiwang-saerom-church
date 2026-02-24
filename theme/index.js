import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import Button from "./components/Button";

const overrides = {
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  // breakpoints,
  styles,
  components: {
    Button,
  },
  colors: {
    first: "#0155a0",
    second: "#4d9fd1",
    white: "#ffffff",
    grayLetter: "#808080",
    charcole: "#282828",
    warning: "#E53E32",
  },
};

export default extendTheme(overrides);

import { defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const Text = defineStyleConfig({
  baseStyle: (props) => ({
    color: mode("gray.800", "gray.100")(props)
  })
});

export default Text;

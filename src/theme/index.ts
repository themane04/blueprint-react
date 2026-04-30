import { extendTheme } from "@chakra-ui/react";

import { Text } from "./components";
import { config } from "./config.ts";
import { colors, radii, shadows, typography, zIndices } from "./foundations";
import styles from "./visual/styles.ts";

const overrides = {
  config,
  colors,
  zIndices,
  shadows,
  styles,
  radii,
  fonts: typography.fonts,
  fontSizes: typography.fontSizes,
  fontWeights: typography.fontWeights,
  lineHeights: typography.lineHeights,
  letterSpacings: typography.letterSpacings,
  components: {
    Text
  }
};

export default extendTheme(overrides);

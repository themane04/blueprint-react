import { extendTheme } from '@chakra-ui/react';
import Text from './components/text.ts';
import config from './config.ts';
import colors from './foundations/colors';
import radii from './foundations/radii.ts';
import shadows from './foundations/shadows.ts';
import typography from './foundations/typography';
import zIndices from './foundations/zIndex.ts';
import styles from './styles';

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
    Text,
  },
};

export default extendTheme(overrides);

import type { ThemeConfig } from "@chakra-ui/react";

export const isLightModeDefault = true;

export const initialColorMode = isLightModeDefault ? "light" : "dark";

export const config: ThemeConfig = {
  initialColorMode: initialColorMode,
  useSystemColorMode: true
};

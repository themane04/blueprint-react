import "@chakra-ui/react";

declare module "@chakra-ui/react" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- interface required for declaration merging into chakra-ui module
  interface CustomThemeTypings {
    colors: {
      // ─── DARK MODE SURFACE TOKENS ───────────────────────────────────────
      "brand.bg": string;
      "brand.surface": string;
      "brand.elevated": string;
      "brand.border": string;
      "brand.muted": string;
      "brand.primary": string;
      "brand.primaryDim": string;
      "brand.primarySub": string;

      // ─── LIGHT MODE SURFACE TOKENS ──────────────────────────────────────
      "brandLight.bg": string;
      "brandLight.surface": string;
      "brandLight.elevated": string;
      "brandLight.border": string;
      "brandLight.muted": string;
      "brandLight.primary": string;
      "brandLight.primaryDim": string;
      "brandLight.primarySub": string;

      // ─── DARK MODE TEXT TOKENS ───────────────────────────────────────────
      "text.primary": string;
      "text.secondary": string;
      "text.muted": string;
      "text.disabled": string;
      "text.inverse": string;
      "text.hover": string;

      // ─── LIGHT MODE TEXT TOKENS ──────────────────────────────────────────
      "textLight.primary": string;
      "textLight.secondary": string;
      "textLight.muted": string;
      "textLight.disabled": string;
      "textLight.inverse": string;
      "textLight.hover": string;

      // ─── STATUS COLORS ───────────────────────────────────────────────────
      // Use .500 for default states, .100/.200 for subtle backgrounds,
      // .700/.800 for dark-mode-safe text or icon variants
      "success.100": string;
      "success.200": string;
      "success.500": string;
      "success.700": string;
      "success.800": string;

      "error.100": string;
      "error.200": string;
      "error.500": string;
      "error.700": string;
      "error.800": string;

      "warning.100": string;
      "warning.200": string;
      "warning.500": string;
      "warning.700": string;
      "warning.800": string;

      "info.100": string;
      "info.200": string;
      "info.500": string;
      "info.700": string;
      "info.800": string;
    };

    shadows: {
      // ─── ELEVATION ───────────────────────────────────────────────────────
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;

      // ─── INTERACTION ─────────────────────────────────────────────────────
      focusPrimary: string;
      focusError: string;
      surfaceInset: string;

      // ─── COMPONENT-SPECIFIC ──────────────────────────────────────────────
      // Add per-component glow or accent shadows here as needed
      primaryButton: string;
      dangerButton: string;
    };

    radii: {
      none: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      full: string;
    };

    zIndices: {
      hide: number;
      base: number;
      raised: number;
      dropdown: number;
      sticky: number;
      overlay: number;
      modal: number;
      toast: number;
    };

    textStyles: {
      // ─── SEMANTIC TEXT VARIANTS ──────────────────────────────────────────
      // These map directly to the Text component variants in theme/components/text.ts
      display: Record<string, unknown>;
      heading: Record<string, unknown>;
      subheading: Record<string, unknown>;
      body: Record<string, unknown>;
      caption: Record<string, unknown>;
      label: Record<string, unknown>;
      muted: Record<string, unknown>;
      sectionLabel: Record<string, unknown>;
    };
  }
}

# React Frontend — Design System & Styling Reference

> This document is the single source of truth for all styling decisions in the frontend.
> Read this before writing any component, page, or theme file.

---

## 1. Philosophy

Three principles govern every styling decision:

- **Controlled** — no random font fallbacks, no hardcoded values anywhere
- **Consistent** — every visual value comes from the theme; variants handle repetition, not copy-pasted props
- **Theme-ready** — every component uses `mode()` so switching the default color mode costs zero effort

---

## 2. Color Mode

### Configuration

Color mode is controlled in two places that must stay in sync. To change the default color mode for a project,
update `isLightModeDefault` in `theme/config.ts` — `initialColorMode` is derived from it and exported so other
files can import it directly without re-deriving the value.

```ts
// theme/config.ts
import type { ThemeConfig } from "@chakra-ui/react";

export const isLightModeDefault = true; // ← change this to switch the default

export const initialColorMode = isLightModeDefault ? "light" : "dark";

export const config: ThemeConfig = {
  initialColorMode: initialColorMode,
  useSystemColorMode: true
};
```

### Custom Color Mode Manager

The `customColorModeManager` in `theme/manager/customColorModeManager.ts` persists the user's theme preference
using the app's own storage layer before falling back to Chakra's `localStorageManager`. It also detects when
`initialColorMode` has changed since the user last saved a preference and clears stale localStorage values
automatically — so changing `isLightModeDefault` in `config.ts` always takes effect immediately.

The manager delegates to two utils in `theme/manager/utils/`, each in its own file per the one-function-per-file
rule:

**`isColorModeVersionValid.ts`** — compares the stored version key against `initialColorMode`. Returns `false`
the first time after `isLightModeDefault` is changed, triggering a cache bust.

**`clearColorModeStorage.ts`** — removes the stored theme preference and version key, then resets Chakra's
`localStorageManager` to `initialColorMode`.

```ts
// theme/manager/customColorModeManager.ts
import { localStorageManager } from "@chakra-ui/react";
import { storage, storageKeys } from "../../utils/storage";
import { initialColorMode } from "../config";
import type { StorageManager } from "../types";
import { clearColorModeStorage, isColorModeVersionValid } from "./utils";

export const customColorModeManager: StorageManager = {
  type: "localStorage",

  get: () => {
    if (!isColorModeVersionValid()) {
      clearColorModeStorage();
      storage.set(storageKeys.colorModeVersion, initialColorMode);
      return initialColorMode;
    }

    const pref = storage.get(storageKeys.themePreference);

    if (pref === "light" || pref === "dark") return pref;

    if (typeof pref === "string" && pref !== "system") {
      storage.set(storageKeys.themePreference, "system");
    }

    const chakraValue = localStorageManager.get();
    if (chakraValue === "light" || chakraValue === "dark") return chakraValue;

    localStorageManager.set(initialColorMode);
    return initialColorMode;
  },

  set: (value) => {
    if (value === "system") return;
    storage.set(storageKeys.colorModeVersion, initialColorMode);
    localStorageManager.set(value);
  }
};
```

`storageKeys.colorModeVersion` must be added to `utils/storage/keys.ts` alongside `themePreference`.

### Using `mode()` in theme files

Always use `mode()` inside theme component files so both color modes are handled in one place:

```ts
// ✅ correct — works in both modes
color: mode("textLight.primary", "text.primary")(props)

// ❌ avoid — breaks the inactive color mode
color: "text.primary"
```

### Using `useColorModeValue` in components

When you need to read the color mode inside a React component (e.g. for conditional logic), use
`useColorModeValue`. For styling, always prefer theme variants or `mode()` over this:

```tsx
const borderColor = useColorModeValue("brandLight.border", "brand.border");
```

---

## 3. Color Tokens

Never hardcode hex values anywhere. Always use tokens defined in `theme/foundations/colors.ts`.

### Token structure

Tokens are grouped into semantic buckets. Every project defines its own values for these tokens but the
bucket names stay consistent so components and theme files are portable across projects.

#### Surface tokens (`brand.*` / `brandLight.*`)

| Token              | Dark mode use                    | Light mode counterpart  |
|--------------------|----------------------------------|-------------------------|
| `brand.bg`         | Page background                  | `brandLight.bg`         |
| `brand.surface`    | Cards, panels                    | `brandLight.surface`    |
| `brand.elevated`   | Hover states, elevated surfaces  | `brandLight.elevated`   |
| `brand.border`     | Borders, dividers                | `brandLight.border`     |
| `brand.muted`      | Placeholder text, inactive icons | `brandLight.muted`      |
| `brand.primary`    | Primary CTA colour               | `brandLight.primary`    |
| `brand.primaryDim` | Primary hover state              | `brandLight.primaryDim` |
| `brand.primarySub` | Primary active/pressed state     | `brandLight.primarySub` |

#### Text tokens (`text.*` / `textLight.*`)

| Token            | Use                                  | Light mode counterpart |
|------------------|--------------------------------------|------------------------|
| `text.primary`   | Main body text                       | `textLight.primary`    |
| `text.secondary` | Supporting text                      | `textLight.secondary`  |
| `text.muted`     | Labels, captions                     | `textLight.muted`      |
| `text.disabled`  | Disabled state                       | `textLight.disabled`   |
| `text.inverse`   | Text on primary-coloured backgrounds | `textLight.inverse`    |

#### Status colors

Status colors are shared across both modes and defined as Chakra color scales:

```ts
success
.500   // positive states, approvals
error
.500     // errors, rejections
warning
.500   // pending, caution states
info
.500      // neutral informational
```

### Declaring a new color token

1. Add the value to the dark object and the light object in `theme/foundations/colors.ts`
2. Declare the token name in `src/types/chakra-theme.d.ts` under `CustomThemeTypings` so TypeScript knows about it

---

## 4. Typography

Fonts are defined in `theme/foundations/typography.ts`. The blueprint ships with `Inter` as a placeholder in
all three slots — replace with the project font and load it in `index.html` (Google Fonts or self-hosted):

```ts
fonts: {
  heading: `'YourFont', fallback, sans-serif`,
    body
:
  `'YourFont', fallback, sans-serif`,
    mono
:
  `'JetBrains Mono', 'Courier New', monospace`
}
```

### Font size scale

Defined in `theme/foundations/typography.ts`. Includes Chakra's standard scale plus two custom intermediate
sizes (`lsm`, `xll`) for finer control. Replace or extend as needed per project:

| Token | Value | Typical use            |
|-------|-------|------------------------|
| `xs`  | 12px  | Fine print, badge text |
| `sm`  | 14px  | Captions, helper text  |
| `lsm` | 15px  | Custom intermediate    |
| `md`  | 16px  | Body default           |
| `lg`  | 18px  | Lead paragraph         |
| `xl`  | 20px  | Card titles            |
| `2xl` | 24px  | Section subheadings    |
| `xll` | 25px  | Custom intermediate    |
| `3xl` | 30px  | Section headings       |
| `4xl` | 36px  | Page headings          |
| `5xl` | 48px  | Hero supporting        |
| `6xl` | 60px  | Hero display           |
| `7xl` | 64px  | Max display size       |

### Letter spacing scale

| Token     | Value   | Use                                     |
|-----------|---------|-----------------------------------------|
| `tighter` | -0.02em | Large display headings                  |
| `tight`   | -0.01em | Headings                                |
| `normal`  | 0       | Body text                               |
| `wide`    | 0.01em  | Nav links                               |
| `wider`   | 0.02em  | Subheadings                             |
| `widest`  | 0.08em  | Button labels, badge text, eyebrow text |
| `widest`  | 0.08em  | Button labels, badge text, eyebrow text |

---

## 5. Spacing & Radii

Use Chakra's default spacing scale (multiples of 4px). Never hardcode pixel values for spacing.

### Border radius scale

Defined in `theme/foundations/radii.ts`. The blueprint ships with these example values — adjust to match the
visual language of the project:

| Token  | Value  | Use                     |
|--------|--------|-------------------------|
| `none` | 0      | Sharp-cornered elements |
| `xs`   | 2px    | Badges, tags            |
| `sm`   | 4px    | Inputs, small cards     |
| `md`   | 6px    | Cards                   |
| `lg`   | 8px    | Modals, large panels    |
| `xl`   | 12px   | Feature cards           |
| `full` | 9999px | Pills, avatars          |

---

## 6. Shadows

Defined in `theme/foundations/shadows.ts`. The blueprint ships with example values — tune the rgba opacity
and spread to suit the project's depth language.

### Elevation shadows

```ts
xs, sm, md, lg, xl, 2
xl
```

### Focus & interaction shadows

| Token          | Use                                 |
|----------------|-------------------------------------|
| `focusPrimary` | All keyboard focus rings            |
| `focusError`   | Invalid form field focus            |
| `surfaceInset` | Top edge highlight on dark surfaces |

Add project-specific glow or accent shadow tokens here as needed (e.g. `accentSm`, `accentMd`).

---

## 6b. Z-Index Scale

Defined in `theme/foundations/zIndex.ts`. The blueprint ships with a standard layering scale:

| Token      | Value | Use                        |
|------------|-------|----------------------------|
| `hide`     | -1    | Hidden elements            |
| `base`     | 0     | Default flow               |
| `raised`   | 10    | Slightly elevated elements |
| `dropdown` | 100   | Dropdowns, popovers        |
| `sticky`   | 200   | Sticky headers             |
| `overlay`  | 300   | Dimmed overlays            |
| `modal`    | 400   | Modals, dialogs            |
| `toast`    | 500   | Toast notifications        |

Always use these tokens — never hardcode z-index numbers inline.

---

## 7. Component Variants

Use variants — never repeat the same style props across multiple instances of the same component. If you
write the same `fontSize`, `fontWeight`, `color`, `letterSpacing` combination more than once — that belongs
in a variant, not inline.

### Text variants

The `text.ts` component file ships with a base set of semantic variants. Extend or rename these per project:

| Variant      | Typical size  | Use                        |
|--------------|---------------|----------------------------|
| `display`    | 5xl–7xl       | Hero headlines             |
| `heading`    | 2xl–3xl       | Section titles             |
| `subheading` | lg–xl         | Card titles, subsections   |
| `body`       | md            | Default paragraph text     |
| `caption`    | sm            | Helper text, timestamps    |
| `label`      | xs, uppercase | Form labels, table headers |
| `muted`      | sm            | Disabled / inactive text   |

```tsx
// ✅ correct
<Text variant="label">Email address</Text>

// ❌ avoid — don't repeat style props inline
<Text fontSize="xs" fontWeight="semibold" letterSpacing="widest" textTransform="uppercase" color="text.muted">
  Email address
</Text>
```

### Button variants

Define these in `theme/components/button.ts`. Typical starting set:

| Variant     | Use                          |
|-------------|------------------------------|
| `primary`   | Main CTA — solid filled      |
| `secondary` | Outlined / bordered          |
| `ghost`     | Navigation, tertiary actions |
| `danger`    | Destructive actions          |

```tsx
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
```

### Badge variants

| Variant                     | Use                     |
|-----------------------------|-------------------------|
| `subtle`                    | Neutral informational   |
| `outline`                   | Transparent with border |
| `success / error / warning` | Status indicators       |

---

## 8. Theme Utils

Located in `src/theme/utils/`. These are helper functions used inside Chakra style functions (where `props`
is available). Do not call them directly inside React components.

```ts
import { getBorderColor, getFieldColor, getFocusBoxShadow, getStatusColor } from "../../theme/utils";

// Form field border — 3 states: error → focused → default
getBorderColor(props, isInvalid, isFocused)

// Form label / icon colour — same 3-state pattern
getFieldColor(props, isInvalid, isFocused)

// Focus ring shadow — returns "focusPrimary" or "focusError"
getFocusBoxShadow(isInvalid)

// Status colour scheme — maps domain status strings to Chakra colour schemes
getStatusColor("active")    // → "success"
getStatusColor("pending")   // → "warning"
getStatusColor("rejected")  // → "error"
getStatusColor("inactive")  // → "gray"
```

Add new utils to `src/theme/utils/newUtil.ts` and export from the folder's `index.ts`.

---

## 9. Icons

All icons live in `src/theme/icons/index.ts` as a single `Icons` object. This is the only file in the
codebase that imports from `react-icons/*` — the ESLint rule `no-restricted-imports` enforces this.

```ts
// ✅ correct
import { Icons } from "../../theme/icons";

<Icon as = { Icons.toastSuccess }
/>

// ❌ wrong — ESLint will catch this
import { FiCheckCircle } from "react-icons/fi";
```

To add a new icon: import it in `theme/icons/index.ts` and add it to the `Icons` object with a semantic name
that describes what it represents, not which icon library it comes from.

---

## 10. Assets & Visual

The `src/theme/visual/` folder holds three files all exported from its `index.ts`.

### Assets

All paths to images, SVGs, and other static assets live in `src/theme/visual/assets.ts` under the `appAssets`
object. Never hardcode paths in components.

```ts
// theme/visual/assets.ts
export const appAssets = {
  images: {
    logo: {},  // e.g. full, transparent, dark
    site: {}   // e.g. notFound, placeholder
  }
};
```

```tsx
// ✅ correct
import { appAssets } from "../../theme/visual";

<img src={appAssets.images.logo.full} />

// ❌ avoid
<img src="/images/logo/logo.svg" />
```

### Media queries

Breakpoint strings live in `src/theme/visual/media.ts` as a `MEDIA` constants object. Always use them together
with the `useMatch` hook from `src/hooks/` — never write raw media query strings in components.

```ts
// theme/visual/media.ts
export const MEDIA = {
  max700: "(max-width: 700px)"
  // add breakpoints here as needed
};
```

```tsx
// ✅ correct
import { useMatch } from "../../hooks";
import { MEDIA } from "../../theme/visual";

const isMobile = useMatch(MEDIA.max700);

// ❌ avoid — raw string, not reusable
const [isMobile] = useMediaQuery("(max-width: 700px)");
```

### Global styles

`src/theme/visual/styles.ts` contains global CSS resets and base styles (focus outline resets, scrollbar,
body background, etc.) registered in `theme/index.ts`. This file uses `export default` because Chakra's theme
`styles` key expects a default export — this is one of the accepted exceptions to the named-export rule.

---

## 11. Styling Rules — Theme Files

### Always use `mode()` for color values

```ts
// theme/components/button.ts
baseStyle: (props) => ({
  color: mode("textLight.primary", "text.primary")(props)
})
```

### Define variants for every repeating pattern

If a combination of style props repeats more than once, it belongs as a variant in the theme component file —
not inline in JSX.

### Never use `sx` for values that belong in the theme

```tsx
// ❌ avoid — this belongs as a theme variant
<Button sx={{ letterSpacing: "0.08em", textTransform: "uppercase" }}>Submit</Button>

// ✅ correct — baked into the variant
<Button variant="primary">Submit</Button>
```

`sx` is reserved for truly one-off layout adjustments (specific margin, width, or positioning for a single
context) that have no business being in the design system.

### Never hardcode color values

```tsx
// ❌ avoid
<Box bg="#1a1a1a" color="#cba35c" />

// ✅ correct
<Box bg="brand.surface" color="brand.primary" />
```

---

## 12. Styling Rules — React Components

### Inline style props are fine for layout, not for design tokens

```tsx
// ✅ fine — layout specific to this component
<Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} />

// ❌ avoid — design token masquerading as layout
<Box borderRadius="8px" color="#cba35c" fontSize="0.75rem" />
```

### Responsive props use object syntax

```tsx
// ✅ correct
<Text fontSize={{ base: "md", md: "lg", lg: "xl" }} />

// ❌ avoid — array syntax is harder to read and maintain
<Text fontSize={["md", "lg", "xl"]} />
```

---

## 13. File Placement Rules

| What                        | Where                                                                                                      |
|-----------------------------|------------------------------------------------------------------------------------------------------------|
| New Chakra component styles | `src/theme/components/ComponentName.ts` + export from `index.ts` + register in `src/theme/index.ts`        |
| New color token             | `src/theme/foundations/colors.ts` (both dark and light objects) + declare in `src/types/chakra-theme.d.ts` |
| New shadow                  | `src/theme/foundations/shadows.ts`                                                                         |
| New icon                    | `src/theme/icons/index.ts` only                                                                            |
| New asset path              | `src/theme/visual/assets.ts` only                                                                          |
| New media query breakpoint  | `src/theme/visual/media.ts` — add to the `MEDIA` object                                                    |
| New theme util              | `src/theme/utils/newUtil.ts` (one function per file) + export from `src/theme/utils/index.ts`              |
| New route path              | `src/router/routes/utils/paths.ts` only — never hardcode URL strings                                       |

---

## 14. Adding a New Theme Component

1. Create `src/theme/components/ComponentName.ts`
2. Define `baseStyle` using `mode()` for all color values
3. Define `variants` for every repeating visual pattern
4. Define `sizes` if the component has size variants
5. Set `defaultProps` for the most common use case
6. Export from `src/theme/components/index.ts`
7. Register in `src/theme/index.ts` under `components`

---

## 15. Theme Folder Reference

```
src/theme/
├── components/            ← Chakra component style overrides and variants
│   ├── text.ts            ← Text component variants (ships with blueprint)
│   └── index.ts
├── config.ts              ← isLightModeDefault, initialColorMode, ThemeConfig
├── foundations/
│   ├── colors.ts          ← all color tokens (dark + light objects)
│   ├── radii.ts           ← border radius scale
│   ├── shadows.ts         ← elevation + focus + accent shadows
│   ├── typography.ts      ← fonts, sizes, weights, line heights, letter spacings
│   ├── zIndex.ts          ← z-index scale
│   └── index.ts
├── icons/
│   └── index.ts           ← Icons object — only place react-icons are imported
├── manager/
│   ├── customColorModeManager.ts  ← custom storage-aware color mode manager
│   ├── index.ts
│   └── utils/
│       ├── clearColorModeStorage.ts   ← wipes stale theme prefs from storage
│       ├── isColorModeVersionValid.ts ← checks if stored version matches current default
│       └── index.ts
├── visual/
│   ├── assets.ts          ← all image / SVG / video paths (appAssets)
│   ├── media.ts           ← MEDIA breakpoint constants (used with useMatch)
│   ├── styles.ts          ← global base styles, export default (Chakra exception)
│   └── index.ts
├── index.ts               ← assembles and exports the full Chakra theme
├── types.ts               ← StorageManager, ThemePreference types
└── utils/                 ← theme helper functions (getBorderColor, etc.)
    └── index.ts

src/hooks/
└── useMatch.ts            ← wraps useMediaQuery, used with MEDIA constants

src/types/
├── chakra-icon.d.ts       ← IconProps variant augmentation
└── chakra-theme.d.ts      ← CustomThemeTypings — all custom color tokens declared here
```
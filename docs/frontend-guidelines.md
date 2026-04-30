# React Frontend — Developer Guidelines

## Tech Stack

- React 19 + TypeScript (strict)
- Vite + `@vitejs/plugin-react`
- Chakra UI (component library + theming)
- Zustand (global state)
- Axios (HTTP client)
- React Router v7 (routing + guards)
- i18next (internationalisation)
- React Icons (icon library, accessed only via `theme/icons`)

---

## Project Structure

```
src/
├── components/ui/       # Reusable UI components (header, form, toast, etc.)
├── config/              # Environment config, app-level data constants
├── hooks/               # Shared custom React hooks
├── i18n/                # Translations, typed keys, i18n config
├── layouts/             # Page layout wrappers (AppLayout)
├── lib/                 # Low-level shared utilities and event helpers
├── pages/               # Page components grouped by feature
├── router/              # Routes, guards, roots, paths
├── services/            # API calls grouped by domain
├── state/               # Zustand stores grouped by domain
├── theme/               # Chakra UI theme config, icons, utils
├── types/               # Global TypeScript types and Chakra augmentations
└── utils/               # Utilities grouped by domain (storage, api, validation, time, etc.)
```

---

## File & Folder Conventions

### Naming

- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utilities and helpers: `camelCase.ts`
- Types files: `types.ts` per folder
- Barrel exports: `index.ts` per folder — **every folder must have one**

### One Export Per File

Every utility, helper, constant, and hook lives in its own dedicated file — one exported function or constant per file.
Never group multiple unrelated exports into a single file.

```typescript
// ✅ correct — each function in its own file
// utils/validation/validateEmail.ts
export const validateEmail = (email: string): boolean => { ...
};

// utils/validation/validatePassword.ts
export const validatePassword = (password: string): boolean => { ...
};

// ❌ avoid — multiple unrelated exports in one file
// utils/validation/validators.ts
export const validateEmail =
...
;
export const validatePassword =
...
;
export const validatePhone =
...
;
```

### Named Exports Only

Always use inline named exports — never `export default`. The only exceptions are files that require a default export
by their tooling contract: `vite.config.ts`, `eslint.config.js`, and the axios client instance.

```typescript
// ✅ correct
export const validateEmail = (email: string): boolean => { ...
};
export const AdminListingsPage = (): JSX.Element => { ...
};

export function useAdminListings(): UseAdminListingsReturn { ...
}

// ❌ avoid
const validateEmail = (email: string): boolean => { ...
};
export default validateEmail;
```

### Folder Structure

Every feature folder follows this pattern:

```
FeatureName/
├── FeatureName.tsx       ← component or page
├── index.ts              ← re-exports everything in the folder
├── types.ts              ← props and local types
├── components/           ← sub-components, each with their own index.ts
├── hooks/                ← feature-specific hooks, each with their own index.ts
└── utils/                ← feature-specific utilities, each with their own index.ts
```

The `index.ts` rule is strict — **every folder at every depth must have a barrel export**. This includes deep utility
subfolders like `utils/search/params/maps/constants/`.

### Utils Organisation

Utilities under `src/utils/` are grouped by domain into subfolders, each with their own `index.ts`. Every utility
function lives in its own file.

```
utils/
├── api/
│   ├── backendMessageMap.ts
│   ├── index.ts
│   └── types.ts
├── storage/
│   ├── helpers/
│   │   ├── getStorage.ts
│   │   └── index.ts
│   ├── index.ts
│   ├── keys.ts
│   ├── storage.ts
│   └── types.ts
├── time/
│   ├── formatDate.ts
│   └── index.ts
└── validation/
    ├── validateEmail.ts
    ├── validatePassword.ts
    ├── index.ts
    └── ...
```

The same domain-grouping rule applies to feature-level `utils/` subfolders.

### Shared vs Feature Hooks

Hooks used by more than one feature live in `src/hooks/`. Hooks used only within a single feature live in that
feature's `hooks/` subfolder. Do not put feature-specific hooks in the global `hooks/` folder.

---

## TypeScript Conventions

### Always use `type` over `interface`

The ESLint rule `@typescript-eslint/consistent-type-definitions` enforces this. The only exception is declaration
merging into third-party modules (e.g. i18next), which requires `interface` — use an `eslint-disable` comment with an
explanation in those cases.

```typescript
// ✅ correct
export type FloatingInputProps = InputProps & {
  label: string;
  rightElement?: ReactNode;
};

// ❌ avoid
export interface FloatingInputProps extends InputProps {
  label: string;
}
```

### Never use `any`

Use `unknown` and narrow with type guards. The ESLint rule `@typescript-eslint/no-explicit-any` enforces this.

### Always declare return types

All functions — including arrow functions assigned to variables — must have an explicit return type. The ESLint rule
`@typescript-eslint/explicit-function-return-type` enforces this.

### Use `type` imports

Always use `import type` for type-only imports. The ESLint rule `@typescript-eslint/consistent-type-imports` enforces
this.

---

## Component Guidelines

### Props Pattern

Always accept `props` as a single parameter and destructure inside the function body. Never destructure in the function
signature — this avoids JSDoc `@param` linting issues and keeps the signature clean.

```typescript
// ✅ correct
export const AppFloatingInput = (props: FloatingInputProps): JSX.Element => {
  const { label, isInvalid, ...rest } = props;
...
};

// ❌ avoid
export const AppFloatingInput = ({ label, isInvalid, ...rest }: FloatingInputProps): JSX.Element => {
...
};
```

### Spreading rest props

When a component accepts `...rest` to forward props to an underlying element, explicitly destructure all
component-specific props first so `rest` only contains valid HTML/Chakra props:

```typescript
const { label, isInvalid, ...rest } = props;
// Now safe to spread {...rest} onto a Chakra Input
```

### Arrow functions only

All components and named functions use arrow function syntax. The ESLint rule `react/function-component-definition`
enforces this.

### Early returns

Use early returns for loading and empty states — do not nest them inside the main JSX tree:

```typescript
if (isLoading) return <AppSpinner / >;

return (
  <AppPageWrapper>
...
</AppPageWrapper>
)
;
```

### No renderX helper functions

Never define `renderContent()` or similar render helper functions inside a component. Use early returns and inline
conditionals instead. Render helpers obscure control flow and trigger the JSDoc requirement unnecessarily.

### Extract Data Fetching and Actions into Hooks

Never implement data fetching, mutations, or async side effects directly inside a component. Every piece of server
state or action logic must live in a dedicated hook, and the component only calls that hook and renders from its
return value.

This keeps components declarative, makes logic independently testable, and prevents business logic from getting buried
in JSX.

```typescript
// ✅ correct — logic lives in the hook
export function useAdminListings(): UseAdminListingsReturn {
  const [listings, setListings] = useState<ListingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const { showError, showSuccess } = useI18nToast();

  function runAction(
    id: string,
    action: (id: string) => Promise<ListingResponse>,
    successKey: "admin:listings.approveSuccess" | "admin:listings.rejectSuccess"
  ): void {
    setActionLoadingId(id);
    action(id)
      .then((updated) => {
        setListings((prev) => replaceListing(prev, updated));
        showSuccess(successKey);
      })
      .catch((err: unknown) => {
        if (err instanceof FrontendError) showError(err.key);
        else showError("error:unexpected");
      })
      .finally(() => setActionLoadingId(null));
  }

  useEffect(() => {
    getAllListings()
      .then((data) => setListings(data))
      .catch((err: unknown) => {
        if (err instanceof FrontendError) showError(err.key);
        else showError("error:unexpected");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { listings, isLoading, actionLoadingId, approve, reject };
}

// ✅ correct — component only calls the hook and renders
export const AdminListingsPage = (): JSX.Element => {
  const { listings, isLoading, actionLoadingId, approve, reject } = useAdminListings();
  const [activeFilter, setActiveFilter] = useState<AdminListingStatusFilter>("Pending");
...
};

// ❌ avoid — fetching and state management inline in the component
export const AdminListingsPage = (): JSX.Element => {
  const [listings, setListings] = useState<ListingResponse[]>([]);
  const { showError } = useI18nToast();

  useEffect(() => {
    getAllListings()
      .then((data) => setListings(data))
      .catch((err: unknown) => {
        if (err instanceof FrontendError) showError(err.key);
        else showError("error:unexpected");
      });
  }, []);
...
};
```

Hook placement follows the shared vs feature hook rule: if the hook is only used by one feature, it lives in that
feature's `hooks/` subfolder. If it's shared across features, it goes in `src/hooks/`.

---

## JSDoc

Every exported function, hook, and component requires a JSDoc comment. This is enforced by the ESLint
`jsdoc/require-jsdoc` rule which covers function declarations and exported PascalCase arrow functions.

### Component JSDoc

```typescript
/**
 * A controlled floating-label text input.
 * The label animates to the border when the field has focus or a value,
 * matching the design system's floating label pattern.
 * @param props - The floating input props. See FloatingInputProps for the full type definition.
 * @returns A positioned Box containing the Input and the floating label overlay.
 */
export const AppFloatingInput = (props: FloatingInputProps): JSX.Element => {
```

### Hook JSDoc

```typescript
/**
 * A custom hook for managing form state with a generic change handler.
 * Reduces boilerplate for controlled input fields across all form pages.
 * @param initialState - The initial state object for the form fields.
 * @returns An object containing the form data, a setter, and a typed change handler.
 */
export function useFormData<T extends Record<string, string>>(
  initialState: T
): UseFormDataReturn<T> {
```

### Single-line JSDoc for no-param functions

Functions with no parameters use a single-line JSDoc:

```typescript
/** Toggles the dropdown open/closed. */
const handleToggle = (): void => {
    setIsOpen((prev) => !prev);
  };
```

### `@param` for components

Since components use the `props` pattern, a single `@param props` line referencing the type is sufficient — never
repeat each prop field individually:

```typescript
// ✅ correct
@param
props - The
floating
input
props.See
FloatingInputProps
for the full
type definition
.

// ❌ avoid
@param
props.label - The
label
text.@param
props.isInvalid - Whether
the
field
is
invalid.
```

---

## JSX Conventions

### Comments between sections

Add `{/* comment */}` before each logical section when a component has more than two or three sibling elements:

```tsx
{/* Floating label */
}
<Box as="label" ...>
{
  label
}
</Box>
```

For comments inside ternary expressions, use inline `//` comments since `{/* */}` syntax does not work inside a
ternary.

### Blank lines between sections

Add a blank line between sibling JSX sections to aid readability. Prettier preserves blank lines inside JSX
expressions:

```tsx
<Box>

  {/* Input */}
  <InputGroup>
    <Input ... />
  </InputGroup>

  {/* Floating label */}
  <Box as="label" ...>
  {label}
</Box>

</Box>
```

### Inline single-prop elements

Collapse elements with only one or two short props to a single line when they fit comfortably:

```tsx
<Text fontSize="sm" color="text.primary">{value}</Text>
```

---

## Internal Function Order Inside Components

Follow this order inside every component or hook:

1. Props destructuring
2. Hooks (`useI18n`, `useNavigate`, store selectors, etc.)
3. Derived state and computed values
4. `useState` declarations
5. `useRef` declarations
6. Internal handler functions (`handleX`, `getX`, pure helpers)
7. `useEffect` — always last, right before the return

---

## Routing

### Paths

All route paths are defined in `router/routes/utils/paths.ts` — **never hardcode URL strings anywhere else**.

### Guards

Guards live in `router/guards/` and protect routes based on auth state.

| Guard          | Behaviour                                                                |
|----------------|--------------------------------------------------------------------------|
| `PublicGuard`  | Blocks authenticated users from auth pages, redirects to homepage        |
| `CompanyGuard` | Blocks unauthenticated users, redirects to login with `?redirect=` param |
| `AdminGuard`   | Blocks non-admin users, redirects to homepage                            |
| `...Guard`     | New guards follow the same pattern                                       |

All guards return `null` while the auth store is initialising. New guards go in `router/guards/index.ts` and follow
the same `props` pattern as existing ones:

```tsx
/**
 * Route guard that blocks authenticated users from accessing public-only pages.
 * Redirects authenticated users away from auth pages to the homepage.
 * Returns null while the auth store is still initializing.
 * @param props - The route children props. See GuardChildrenProps for the full type definition.
 * @returns The guarded children, a redirect, or null while initializing.
 */
export const PublicGuard = (props: GuardChildrenProps): JSX.Element | null => {
    const { children } = props;

    const { isAuthenticated, initialized } = useAuthStore();
    const location = useLocation();

    if (!initialized) return null;

    const isAuthPage = location.pathname.startsWith(paths.public.auth.root);

    if (isAuthenticated && isAuthPage)
      return (
        <Navigate
          to={paths.public.root}
          replace
        />
      );

    return children;
  };
```

### Roots

Router roots (`AdminRoot`, `CompanyRoot`, `PublicRoot`, etc.) live in `router/roots/` and apply the appropriate guard
to all nested routes:

```typescript
export const adminRoot = {
  path: paths.app.admin.root,
  element: <AppLayout / >,
  children: adminRoutes
};
```

---

## State Management (Zustand)

### Store Structure

```
state/
└── auth/
    ├── authStore.ts      ← store definition
    ├── authSelectors.ts  ← typed selector functions
    ├── index.ts          ← barrel export
    └── types.ts          ← AuthState type
```

### Selectors

Always use typed selectors — never access store properties inline:

```typescript
// ✅ correct
const isAuthenticated = useAuthStore(selectIsAuthenticated);

// ❌ avoid
const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
```

Every selector requires JSDoc:

```typescript
/**
 * Returns whether the user is currently authenticated.
 * @param state - The auth store state.
 * @returns True if the user is authenticated.
 */
export const selectIsAuthenticated = (state: AuthState): boolean =>
    state.isAuthenticated;
```

### Auth Bootstrap (If Applicable)

On app load, `App.tsx` calls `fetchUser()` which hits `/me`. If the cookie is valid the store is populated; if not
the user remains a guest. This is the single source of truth for auth state — login and register pages do not
manually set store state after success, they call `fetchUser()` instead.

---

## HTTP / Services

### Structure

```
services/
└── auth/
    ├── auth.ts      ← API functions
    ├── index.ts     ← barrel export
    └── types.ts     ← request/response types
```

### Axios Client

The global axios instance lives in `services/http/axiosClient.ts`:

- `withCredentials: true` — always, required for HttpOnly cookie auth
- `baseURL` from environment config
- Response interceptor maps backend errors to `FrontendError` instances

```typescript
/**
 * Axios instance configured for the backend:
 * - Cookie-based JWT authentication (withCredentials)
 * - Normalized error handling
 * - Maps backend messages to frontend i18n keys
 */
import axios, { type AxiosError } from "axios";

import { environment } from "../../config";
import { backendMessageMap } from "../../utils/api";

import type { ApiErrorResponse } from "./types";
import { FrontendError } from "./utils";

export const api = axios.create({
  baseURL: environment.backendApiUrl,
  withCredentials: true
});

/**
 * Request interceptor:
 * Sets Content-Type to multipart/form-data for FormData payloads.
 */
api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    throw error;
  }
);

/**
 * Response interceptor:
 * Handles network errors, maps backend messages to i18n keys,
 * and normalizes all errors into FrontendError instances.
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      throw new FrontendError("error:network");
    }

    const status = error.response.status;
    const body = error.response.data as ApiErrorResponse;
    const backendMessage = body?.message ?? null;

    if (backendMessage && backendMessageMap[backendMessage]) {
      throw new FrontendError(backendMessageMap[backendMessage], backendMessage);
    }

    if (status === 401) throw new FrontendError("error:unauthorized");
    if (status === 403) throw new FrontendError("error:forbidden");
    if (status === 404) throw new FrontendError("error:notFound");
    if (status === 409) throw new FrontendError("error:conflict", backendMessage ?? undefined);
    if (status === 429) throw new FrontendError("error:throttled");

    throw new FrontendError("error:unexpected");
  }
);
```

### Error Handling

All API errors are normalised to `FrontendError` with an i18n key:

```typescript
.
catch((err: unknown) => {
  if (err instanceof FrontendError) showError(err.key);
  else showError("error:unexpected");
})
```

Backend message → i18n key mapping lives in `utils/api/backendMessageMap.ts`. Add new entries there whenever the
backend adds new error messages:

```typescript
import type { BackendMessageMapState } from "./types";

/**
 * Maps raw backend error messages to frontend i18n translation keys.
 * Add entries here as new backend error messages are introduced.
 */
export const backendMessageMap: BackendMessageMapState = {
  "You already have an active or pending listing.": "listing:errors.duplicateListing",
  "Listing not found.": "listing:errors.notFound",
  // ...
};
```

### Promise Style

Use `.then().catch().finally()` — not `async/await` with try/catch in components or hooks. The only exception is
inside `.then()` callbacks where `await` is required:

```typescript
// ✅ correct
const handleSubmit = (): void => {
  setIsLoading(true);
  login(formData)
    .then(async () => {
      await useAuthStore.getState().fetchUser();
      navigate(paths.public.root);
    })
    .catch((err: unknown) => {
      if (err instanceof FrontendError) showError(err.key);
      else showError("error:unexpected");
    })
    .finally(() => setIsLoading(false));
};

// ❌ avoid
const handleSubmit = async (): Promise<void> => {
  try {
  ...
  } catch {
  ...
  }
};
```

---

## Internationalisation (i18n)

### Namespaces (examples — new ones can be added as needed)

| Namespace        | Used for                                    |
|------------------|---------------------------------------------|
| `common`         | Header, navigation, shared UI               |
| `authentication` | Login, signup, auth flows                   |
| `homepage`       | Homepage content, filters, search history   |
| `error`          | All error messages                          |
| `admin`          | Admin pages                                 |
| `listing`        | Listing creation, listing view, my listings |

### Adding Translations

Always add keys to all locales at the same time. Never leave a locale missing a key. Run `npm run i18n` after changes
to verify all keys are present and accounted for.

### Usage

Always use the typed `useI18n` hook — **never `useTranslation` directly**. The ESLint rule `no-restricted-imports`
enforces this.

```typescript
const { t } = useI18n();
t("authentication:login.title")
```

### Toast Messages

Always use `useI18nToast` — **never raw `useToast`**. The ESLint rule `no-restricted-imports` enforces this.

```typescript
const { showSuccess, showError, showInfo, showWarning } = useI18nToast();
showError("authentication:signup.passwordMismatch");
showSuccess("authentication:login.success");
```

### Scanner-Safe Key Maps

Any place where translation keys are built dynamically must use an explicit key map so the i18n scanner can detect all
keys statically:

```typescript
// ✅ correct — all keys explicitly referenced, scanner detects them
export const getLanguageOptionLabels = (t: TType): Record<string, string> => ({
  de: t("listing:step4.languageOptions.de"),
  en: t("listing:step4.languageOptions.en"),
  ...
});

// ❌ avoid — scanner cannot detect dynamically built keys
t(`listing:step4.languageOptions.${lang}`)
```

---

## Forms

### Form Inputs

Use the shared form components from `components/ui/form/` for all inputs. These implement the floating label pattern
where the label animates to the border when the field has focus or a value.

### Form State

Use dedicated form state hooks. Never manage individual field state with separate `useState` calls.

### Validation

Client-side validation runs before the API call using validator functions from `utils/validation/`. All validation
errors use `showError` or `fieldError` with an i18n key — never `alert` or `console.log`.

### Error Highlighting

Pass `isInvalid={errors.fieldName}` to form inputs to show field-level error highlighting. Clear the error on input
change with `clearError("fieldName")`.

---

## Scripts

### Available commands

| Command                        | What it does                                                |
|--------------------------------|-------------------------------------------------------------|
| `npm run dev`                  | Start the Vite development server                           |
| `npm run build`                | Type-check and build for production                         |
| `npm run lint`                 | Run ESLint with zero warnings allowed                       |
| `npm run lint:fix`             | Auto-fix ESLint issues                                      |
| `npm run format`               | Format all source files with Prettier                       |
| `npm run format:check`         | Check formatting without writing                            |
| `npm run i18n`                 | Extract translation keys and validate all locales           |
| `npm run i18n:check`           | Validate translations only (no extraction)                  |
| `npm run i18n:new <namespace>` | Scaffold a new i18n namespace across all locales            |
| `npm run i18n:add-lang <lang>` | Add a new locale and copy all existing namespaces into it   |
| `npm run barrel`               | Validate that every `src/` folder has a complete `index.ts` |
| `npm run rtp`                  | Full pre-push pipeline: format + i18n + barrel + lint       |

### RTP — Ready To Push

Always run `npm run rtp` before pushing. It runs format, i18n extraction and validation, barrel check, and lint in
sequence. All four must pass with zero errors and zero warnings.

### Barrel check

`npm run barrel` scans every directory under `src/` and verifies that each has an `index.ts` that re-exports all its
contents. It reports three states per directory:

- **ok** — all files are exported
- **missing index** — no `index.ts` exists
- **missing exports** — `index.ts` exists but some files are not re-exported

Directories that intentionally skip the check (e.g. type augmentation files) are configured in
`scripts/barrel/config.cjs`.

---

## ESLint Rules Enforced

| Rule                                               | What it enforces                                                          |
|----------------------------------------------------|---------------------------------------------------------------------------|
| `jsdoc/require-jsdoc`                              | All exported functions, hooks, and PascalCase arrow components need JSDoc |
| `jsdoc/require-param`                              | All `@param` tags must be documented                                      |
| `jsdoc/require-returns`                            | All `@returns` tags must be documented                                    |
| `@typescript-eslint/explicit-function-return-type` | All functions need explicit return types                                  |
| `@typescript-eslint/consistent-type-definitions`   | `type` over `interface` everywhere                                        |
| `@typescript-eslint/no-explicit-any`               | No `any` — use `unknown` and narrow                                       |
| `@typescript-eslint/consistent-type-imports`       | Always use `import type` for type imports                                 |
| `no-restricted-imports`                            | Block direct `react-icons/*`, `useTranslation`, and `useToast` imports    |
| `sonarjs/cognitive-complexity`                     | Max complexity of 15 per function — extract helpers when violated         |
| `import/order`                                     | Enforce consistent import ordering with newlines between groups           |
| `react/function-component-definition`              | Arrow functions only for components                                       |

### Legitimate `eslint-disable` Exceptions

The following are the only accepted `eslint-disable` uses in the codebase. Any new one must include a `--` explanation
and must be discussed before being added.

1. `hooks/useI18n.ts` — direct `useTranslation` import (this IS the typed wrapper)
2. `i18n/hooks/useI18nToast.ts` — direct `useToast` import (this IS the typed wrapper)
3. `i18n/types.d.ts` — `interface` for i18next declaration merging (TypeScript requires it)
4. `theme/icons/index.ts` — direct `react-icons/*` imports (this IS the icons registry, handled via ESLint config
   override)

---

## Environment Config

| File                      | Committed | Purpose                                           |
|---------------------------|-----------|---------------------------------------------------|
| `.env`                    | No        | Real values — never committed                     |
| `.env.example`            | Yes       | Placeholder values showing all required variables |
| `src/config/environment/` | Yes       | Typed config that reads from `import.meta.env`    |

The `src/config/environment/` folder structure:

```
config/
├── data.ts                   ← app-level data constants
├── index.ts                  ← re-exports data only
└── environment/
    ├── environment.dev.ts    ← dev values from import.meta.env
    ├── environment.prod.ts   ← prod values from import.meta.env
    ├── environment.ts        ← selects dev or prod based on import.meta.env.PROD
    ├── index.ts              ← barrel export
    └── types.ts              ← AppEnvironmentProps type
```

All files in `src/config/environment/` are committed and contain no secrets — only typed accessors for `VITE_`
variables. Both `environment.dev.ts` and `environment.prod.ts` use `satisfies AppEnvironmentProps` to ensure the
shape stays in sync with the type. When adding a new environment variable, add it to: the `.env` and `.env.example`
files, both `environment.dev.ts` and `environment.prod.ts`, and the `AppEnvironmentProps` type.

Note that `config/index.ts` only re-exports `data` — consumers import `environment` directly from
`config/environment`:

All env variables must be prefixed with `VITE_` to be exposed to the client. Always access them via the typed
environment config — **never directly via `import.meta.env`**:

```typescript
// ✅ correct
import { environment } from "../../config/environment";

environment.backendApiUrl

// ❌ avoid
import.meta.env.VITE_BACKEND_API_URL
```

---

## CI/CD

### GitHub Actions

The CI pipeline runs on every push and pull request to `master` and executes these steps in order:

1. Checkout
2. Node.js setup
3. `npm install`
4. `npm run format:check` — Prettier
5. `npm run i18n` — i18n key check
6. `npm run barrel` — barrel export check
7. `npm run lint` — ESLint
8. `npm run build` — Vite build

The pipeline uses `npm install` (not `npm ci`) because `package-lock.json` is not committed to the repository.

### Docker

The production Dockerfile is a two-stage build:

1. **Build stage** — Node Alpine, installs dependencies, receives `VITE_BACKEND_API_URL` as a build arg, runs
   `npm run build`
2. **Serve stage** — Nginx stable Alpine, serves the built `dist/` folder, uses `nginx.conf` for React Router support

The `docker-compose.prod.yml` passes `VITE_BACKEND_API_URL` from the server's `.env.prod` file as a build arg.
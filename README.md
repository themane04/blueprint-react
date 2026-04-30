# Blueprint React Frontend

A clean and scalable React + TypeScript frontend blueprint designed for production-ready applications.
Includes structured architecture, theming, i18n automation, and modern development tooling.

---

## Tech Stack

- React 19 + TypeScript
- Vite
- Chakra UI
- React Router
- Axios
- i18next (typed + automated workflow)

---

## Documentation

The `docs/` folder contains two reference documents that cover everything about how this project is structured
and styled. Read them before writing any code, and give them as context to any AI tool you use for code
generation — they contain all the conventions, rules, and patterns the codebase follows.

| Document                         | What it covers                                                                             |
|----------------------------------|--------------------------------------------------------------------------------------------|
| `docs/frontend-guidelines.md`    | Architecture, TypeScript conventions, component patterns, routing, services, i18n, scripts |
| `docs/frontend-design-system.md` | Color tokens, typography, spacing, shadows, component variants, theme structure            |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in the values in `.env`. Never commit this file.

### 3. Start development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

---

## Code Quality

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

---

## Ready To Push (RTP)

Always run this before pushing. It validates the entire codebase in one command:

```bash
npm run rtp
```

**RTP runs:**

1. `format` — Prettier formatting
2. `i18n` — translation key extraction and validation
3. `barrel` — barrel export completeness check
4. `lint` — ESLint with zero warnings allowed

All four must pass before a push.

### Optional: Git Hook

Automate RTP on every push with a pre-push hook:

```bash
#!/bin/sh
npm run rtp
```

---

## Internationalization (i18n)

```bash
# Extract translation keys
npm run i18n:extract

# Validate translations (missing, unused, duplicates)
npm run i18n:check

# Run full i18n pipeline
npm run i18n

# Create a new namespace
npm run i18n:new <namespace>

# Add a new language
npm run i18n:add-lang <lang>
```

---

## Barrel Check

Validates that every directory under `src/` has a complete `index.ts` barrel export.

```bash
npm run barrel
```

Reports three states per directory: **ok**, **missing index**, or **missing exports**.
Skipped directories are configured in `scripts/barrel/config.cjs`.

---

## Deployment

Docker and Nginx are included. To build and run the production container:

```bash
docker compose up --build
```

The `.env` file is copied into the image at build time, so rebuild after any environment variable changes.

---

## License

MIT
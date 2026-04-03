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

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

---

## Environment Variables

Create a `.env` file in the project root and copy values from `.env.example`.

---

## Project Structure

```
src/
├── components/     # Reusable UI components
├── config/         # App configuration & environments
├── hooks/          # Custom React hooks
├── i18n/           # Internationalization setup
├── layouts/        # Layout components
├── pages/          # Route-based pages
├── router/         # Routing configuration
├── services/       # API layer (Axios)
├── state/          # Global state management
├── theme/          # Chakra UI theme system
├── utils/          # Helper utilities
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

This project includes a helper command to ensure code quality before pushing changes:

```bash
npm run rtp
```

**RTP (Ready To Push)** runs:

- Code formatting
- i18n extraction and validation
- Linting

This ensures your codebase stays clean, consistent, and production-ready.

### Optional: Git Hooks

You can automate this by adding it to your Git workflow:

- **Pre-commit hook**
- **Pre-push hook**

Example using a pre-push hook:

```bash
#!/bin/sh
npm run rtp
```

This will automatically validate your code before every push.


---

## Internationalization (i18n)

This project includes a fully automated and typed i18n workflow.

### Commands

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

## Theming

All design tokens and styling live under:

```
src/theme/
```

Guidelines:

- Use Chakra UI tokens (colors, spacing, typography)
- Avoid inline styles when possible
- Keep styling consistent and centralized

---

## Deployment

- Docker support via `Dockerfile`
- Nginx configuration included
- Suitable for containerized environments (Docker / Kubernetes)

---

## Notes

- Environment variables are loaded per environment
- Rebuild the app after dependency changes
- Designed for scalability and maintainability

---

## License

MIT

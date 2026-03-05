# Blueprint Frontend

## ⚙️ Environment Variables

Create a `.env` file in the root of `frontend/`, copy the contents from `.env.example` and update the values as needed.
---

## 🚀 Development Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

* * * * *

#### Notes

- Environment variables are loaded from the respective `.env` files in each service directory.

- If you change dependencies, always rebuild with `--build`.

---

## 🧩 Key Libraries

- **React + TypeScript** — Strong typing & maintainable components
- **Chakra UI** — Clean, themeable component system
- **React Router DOM** — Routing and nested navigation
- **Axios** — API communication

---

## 🎨 Theming

All custom styles and overrides live under `/src/theme`.  
Use Chakra’s design tokens for colors, spacing, and typography. Keep inline styles to a minimum.

---

🌐 Internationalization (i18n)
------------------------------

This blueprint frontend includes a **fully automated typed i18n workflow** with extraction, unused key detection,
namespace creation, and language creation.

### **Available Commands**

- **Extract all translation keys used in the codebase**
  ```bash
  npm run i18n:extract
  ```

- **Validate translation usage:Detect unused keys\Detect missing keys\Detect duplicates**

  ```bash
  npm run i18n:check
  ```

- **Run extraction + check together**
  ```bash
  npm run i18n
  ```

- **Create a new namespace (e.g. "billing")**
  ```bash
  npm run i18n:new billing
  ```

- **Add a new language (e.g. "de")**
  ```bash
  npm run i18n:add-lang de
  ```

---

© Blueprint React — Designed for scalable, asset platforms.

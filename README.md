# Civix — Client

A lightweight civic issues reporting frontend built with React and Vite. Civix lets users report problems (garbage, road damage, illegal construction, etc.), view and filter issues, contribute funds to fixes, and export contribution receipts as PDFs.
backend: https://github.com/MD-Saadman-Fuad/Civix-Server
## Overview

- Purpose: Provide a simple, mobile-first interface for reporting civic issues, tracking their status, and accepting community contributions for fixes.
- Key UX decisions: theme-aware styling (DaisyUI/Tailwind theme tokens), accessible forms, compact animated theme toggle, responsive status cards and issue cards.

## Main Technologies

- React (v19)
- Vite (dev tooling)
- Tailwind CSS + DaisyUI (styles & themes)
- Firebase (authentication)
- jsPDF + jspdf-autotable (PDF exports)
- SweetAlert2 (confirmation / loading modals)

## Main Features

- Report issues with title, category, location, description, optional image and suggested budget.
- Browse and filter issues by category and status.
- User authentication with Firebase (register / login) and Google sign-in.
- My Issues page with update/delete (CRUD) for authenticated users.
- Contribution flow for issues (submit contribution form) and view contributions per issue.
- Export individual contribution receipts or full contribution reports to PDF.
- Light / Dark theme toggle persisted to localStorage and applied via `data-theme` on `<html>`.
- Responsive UI and equal-height status cards for consistent layout.

## Dependencies (selected)

From `package.json`:

- react, react-dom
- vite
- tailwindcss, daisyui
- firebase
- jspdf, jspdf-autotable
- sweetalert2
- react-router, react-router-dom
- react-hot-toast
- swiper, lottie-react (UI/animation helpers)

Full dependency list can be found in `package.json`.

## Local Setup & Run

1. Clone the repository

```bash
git clone https://github.com/MD-Saadman-Fuad/Civix-Client.git
cd Civix-Client
```

2. Install dependencies

```powershell
npm install
```

3. Set environment variables

- Create a `.env` file at the project root (Vite expects `VITE_` prefix):

```text
VITE_API_URL=https://your-backend.example.com
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_APP_ID=...
```

4. Start development server

```powershell
npm run dev
```

5. Build for production

```powershell
npm run build
npm run preview
```

Notes:

- The app expects a backend API (URL configured via `VITE_API_URL`) that exposes endpoints such as `/issues`, `/issues/recent`, `/issues/pending`, `/issues/resolved`, `/contributions` and `/users`.
- For authentication, ensure your Firebase project is configured and the `src/Firebase/Firebase.config.js` file uses the matching credentials or the `VITE_FIREBASE_*` env keys.

## Live Demo & Links

- Live site: (add your hosted URL here)
- API repo / docs: (add backend repository or API docs link)
- Issues / feature requests: https://github.com/MD-Saadman-Fuad/Civix-Client/issues

If you want, I can add a real screenshot to `public/screenshots/overview.png` and commit it, or update any section with more details.

---

Made with ❤️ — feel free to ask me to tweak the README content or add badges and CI instructions.

# Civix Client (React + Vite)

This repository contains the frontend application for the Civix civic contribution platform. It's built with React + Vite and designed as a single-page application (SPA) that communicates with a Node/Express + MongoDB backend.

## Project overview

The Civix frontend implements the public and authenticated user experience for reporting issues, contributing to clean-up efforts, and managing contributions. It includes UI features for issue creation and management, contributions, exportable PDF receipts/reports, and common UX utilities (toasts, modal confirmations, loading states).

### Key features

- Authentication (Firebase): Google and email/password sign-in flows. The app sends `Authorization: Bearer <token>` on protected requests.
- Issue lifecycle: create, view details, edit, delete, list (recent/pending/resolved), and per-user "My Issues".
- Contribution flow: pay/contribute via a modal, optional photo URL for contributors, and contributor metadata stored in the backend.
- Contributors table: per-issue contributors listing (avatar, name, amount, date) fetched from `/issues/contributions/:issueId`.
- My Contributions: list contributions filtered by email (`/contributions?email=...`) and export PDF receipts using jsPDF + jspdf-autotable.
- Global UX: dynamic document title, global loading overlay, success/error toasts, and SweetAlert2 confirmations.
- Styling and branding: Tailwind + DaisyUI, site-wide Poppins font, primary CTA gradient (emerald→sky), responsive navbar with SVG icons.

### Tech stack & libraries

- React + Vite
- react-router-dom
- Tailwind CSS + DaisyUI
- Firebase Authentication
- jsPDF and jspdf-autotable (PDF export)
- SweetAlert2 and react-hot-toast (user feedback)
- lottie-react (optional animations)
- Node.js + Express + MongoDB on the backend (separate repo / service)

### Important frontend files

- `src/lib/apiBase.js` — central API base (reads `import.meta.env.VITE_API_URL` or falls back to localhost)
- `src/Components/IssuseContributions.jsx` — contributors table used in `IssuesDetail` (renders avatar/name/amount/date)
- `src/pages/IssuesDetail.jsx` — issue detail page with contribution modal
- `src/pages/MyContribution.jsx` — user's contributions and PDF export
- `src/Components/Navbar.jsx`, `src/Components/Footer.jsx` — global navigation and footer
- `index.html` & `src/index.css` — global font (Poppins) and base CSS

### Backend endpoints (used by frontend)

- `GET /issues/contributions/:issueId` — returns contributions for a specific issue
- `GET /contributions?email={email}` — returns contributions filtered by contributor email
- `POST /contributions` — create a new contribution (payload includes `issueId`, `contributorPhoto`, `amount`, `contributorName`, `email`, `phone`, `address`, `date`, `additionalInfo`)

### Environment variables

- `VITE_API_URL` — the backend base URL used by the frontend. Examples:
  - Local: `VITE_API_URL=http://localhost:3000`
  - Production (Netlify): `VITE_API_URL=https://civix-server.onrender.com`

Make sure to restart the Vite dev server after changing env vars.

### How to run (Windows PowerShell)

1. Install dependencies

```powershell
npm install
```

2. Configure environment (create `.env.local` or `.env` at repo root):

```powershell
VITE_API_URL=http://localhost:3000
```

3. Start dev server

```powershell
npm run dev
```

4. Build for production

```powershell
npm run build
```

### Debugging tips

- If a page shows no contributions, verify the backend returns data at the expected endpoint. Example checks:

```powershell
curl "http://localhost:3000/contributions?email=you@example.com"
curl "http://localhost:3000/issues/contributions/6915b964bbe7cd9c877085d0"
```

- Contributor photos may come from Firebase/Google-hosted URLs. The UI uses multiple fallbacks (`contributorPhoto`, `photoURL`, `avatar`) and sets `crossOrigin`/`referrerPolicy` attributes to improve reliability.
- The frontend passes `Authorization` header for protected endpoints; the backend must accept and validate the token if you secure those routes.

### Styling & fonts

- Poppins is loaded in `index.html` and applied globally in `src/index.css`.
- Primary CTA uses an emerald→sky gradient (`bg-linear-to-r from-emerald-600 to-sky-500`).

### Next steps / suggestions

- Normalize contribution document shape on the backend so the frontend can rely on a single `contributorPhoto` field.
- Add a thumbnail preview in the contribution modal (helpful when contributor pastes a Photo URL).
- Optionally wire Tailwind's font family in `tailwind.config` to make `font-sans` refer to Poppins.

---

If you'd like, I can expand the README with example API payloads, screenshots, or a short contributor/developer guide.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

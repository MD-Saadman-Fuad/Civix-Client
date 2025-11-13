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

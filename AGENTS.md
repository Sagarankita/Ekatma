# EKATMA Department Pack (Next.js App Router)

This repository contains the EKATMA Department Frontend, migrated to Next.js App Router.

## Project Structure

This is the canonical project structure. Start with task-relevant files below.

- `src/app/department/` - Generic application shell and departmental workflows (M01-M39).
- `src/departments/` - Department Pack configurations (e.g., `midc`, `mpcb`).
- `src/domain/` - Canonical data types, models, and shared contracts.
- `src/data/fixtures/` - Prototype/mock data mapped to department configs.
- `src/components/` - Shared UI logic and presentation components.
- `public/` - Static assets including the scoped PWA manifest and service worker.
- `e2e/` - Playwright end-to-end tests ensuring identity and visual parity.

## Dependencies

- Runtime: Next.js 15+ (App Router), React 19, React DOM 19
- Styling: Tailwind CSS v4
- Build tooling: Next.js, TypeScript 5.7+
- Testing: Vitest (Contracts/Domain), Playwright (E2E)

## Styling

This project uses **Tailwind CSS v4**. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/app/globals.css`. This scaffold does not need a Tailwind config file or PostCSS config.

## API & Backend Integration

- Real secrets must remain server-only (via `.env.local`).
- Refer to `.env.example` for the logical API integration boundaries (Rules Engine, RAG, Dependency Graph).
- PWA scope is strictly limited to `/department/`. Do NOT intercept unrelated root routes.

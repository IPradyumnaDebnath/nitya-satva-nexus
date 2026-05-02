# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Nitya Satva** ("Eternally Pure" in Sanskrit) is a subscription-based daily essentials platform delivering products such as dairy, micro greens, and other perishables. It consists of a Next.js web app and an Expo React Native mobile app sharing common packages in a Turborepo monorepo.

---

## Monorepo Structure

```
apps/
  web/       → Next.js 16 (App Router), port 3000
  mobile/    → Expo ~54 / React Native 0.81 (new architecture enabled)
packages/
  ui/        → Shared React component library (@repo/ui)
  api/       → API client / server utilities (@repo/api)
  utils/     → Pure utility functions (@repo/utils)
  assets/    → Shared images and static files (@repo/assets)
  eslint-config/       → Shared ESLint flat-config presets
  typescript-config/   → Shared tsconfig base files
```

All packages are referenced as `@repo/<name>` via npm workspaces.

---

## Common Commands

Run all commands from the **repo root** unless noted.

```bash
# Install dependencies
npm install

# Start all dev servers (web + mobile) in parallel
npm run dev

# Build all packages and apps
npm run build

# Lint entire monorepo
npm run lint

# Type-check entire monorepo
npm run check-types

# Format code with Prettier
npm run format
```

**Scoped commands** (single app/package):

```bash
# Run only the web app dev server
npx turbo dev --filter=@repo/web

# Build only the mobile app
npx turbo build --filter=@repo/mobile

# Lint a single package
npx turbo lint --filter=@repo/ui

# Type-check a single app
npx turbo check-types --filter=@repo/web
```

---

## Architecture

### Task Graph (turbo.json)

Turborepo enforces the following dependency order:

- `build` depends on `^build` (all upstream packages must build first)
- `lint` depends on `^lint`
- `check-types` depends on `^check-types`
- `dev` is persistent (no caching)

Always run `npm run build` after adding a new export to any `packages/*` before consuming it in `apps/*`.

### Shared TypeScript Configs

Three base configs live in `packages/typescript-config/`:

| Config | Used by | Key settings |
|---|---|---|
| `base.json` | All packages | ES2022, NodeNext, strict mode |
| `nextjs.json` | `apps/web` | ESNext, Bundler resolution |
| `react-library.json` | `packages/ui` | react-jsx factory |

Always extend the appropriate base; never redefine `strict` or `target` locally.

### Shared ESLint Configs

`packages/eslint-config/` exports three flat-config presets:

- `./base` — TypeScript ESLint + Prettier + Turbo (all packages)
- `./next-js` — extends base, adds Next.js + React Hooks rules (`apps/web`)
- `./react-internal` — extends base, for React component libraries (`packages/ui`)

---

## Coding Standards

This project enforces **strict TypeScript** (`strict: true`, `strictNullChecks: true`) across all packages. The following conventions must be followed consistently.

### Naming

| Construct | Convention | Example |
|---|---|---|
| Variables / functions | `camelCase` | `subscriptionPlan`, `getDeliverySlots` |
| React components | `PascalCase` | `SubscriptionCard`, `DeliveryCalendar` |
| TypeScript interfaces | `PascalCase` with `I` prefix optional | `SubscriptionPlan`, `IDeliverySlot` |
| TypeScript enums | `PascalCase` | `SubscriptionFrequency` |
| Constants / env vars | `SCREAMING_SNAKE_CASE` | `MAX_DELIVERY_RADIUS`, `API_BASE_URL` |
| Files (components) | `PascalCase.tsx` | `SubscriptionCard.tsx` |
| Files (utils/hooks) | `camelCase.ts` | `useSubscription.ts`, `formatPrice.ts` |

Names must be **descriptive and self-documenting**. Avoid abbreviations (`sub` → `subscription`, `del` → `delivery`, `prod` → `product`).

### Comments

Comments explain **why**, not what. Add a comment when:
- A business rule or domain constraint is non-obvious (e.g., "Dairy SKUs require same-day cut-off before 10 PM IST")
- A workaround for a known library bug or API limitation is applied
- A complex algorithm or formula needs clarification

Do **not** comment self-evident code. Never leave TODO/FIXME comments without an associated issue reference.

### TypeScript

- All function parameters and return types must be explicitly typed; avoid `any`.
- Prefer `interface` for object shapes, `type` for unions/intersections.
- Use `readonly` for props and data objects that should not be mutated.
- Null checks via optional chaining (`?.`) and nullish coalescing (`??`) are preferred over explicit `if (x !== null)` guards.

### Component Structure (React / React Native)

Order within a component file:

1. Imports (external → internal `@repo/*` → relative)
2. Types / interfaces
3. Constants (module-level)
4. Component function (hooks → derived values → handlers → return JSX)
5. Styles (if applicable)
6. Default export

### Cross-Platform Considerations

`packages/ui` must remain **web and native compatible** — no DOM-only APIs. Platform-specific code belongs in `apps/web` or `apps/mobile`, not in shared packages.

---

## Environment Variables

- Web: `.env.local` at `apps/web/` (Next.js convention; never commit)
- Mobile: `.env` at `apps/mobile/` (Expo uses `EXPO_PUBLIC_` prefix for client-exposed vars)
- Never read env vars directly inside `packages/*`; pass them down via props or dependency injection.

---

## Package Manager

Use **npm** exclusively (enforced via `.npmrc`). Do not use `yarn` or `pnpm`. Minimum versions: Node ≥ 18, npm = 10.8.2.

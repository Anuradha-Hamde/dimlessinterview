## Repo overview

This is a Vite + React + TypeScript app scaffolded with shadcn-ui/Tailwind. Key entry points and folders:

- **App entry**: [src/main.tsx](src/main.tsx)
- **Top-level UI**: [src/App.tsx](src/App.tsx)
- **Pages / routes**: [src/pages](src/pages)
- **Design primitives / components**: [src/components/ui](src/components/ui)
- **Shared hooks**: [src/hooks](src/hooks)
- **App-level helpers (auth, utils)**: [src/lib/auth-context.tsx](src/lib/auth-context.tsx), [src/lib/utils.ts](src/lib/utils.ts)
- **Tests + setup**: [test](test) and [vitest.config.ts](vitest.config.ts)

## Quick developer flows

- **Run dev server**: `npm run dev` (uses Vite).
- **Build**: `npm run build` (or `npm run build:dev` for development-mode build).
- **Preview production build**: `npm run preview`.
- **Run tests**: `npm run test` (Vitest). Use `npm run test:watch` for interactive runs.
- **Lint**: `npm run lint` (ESLint configured project-wide).

## Architecture & patterns (what to know)

- The UI uses small, sharable component wrappers in [src/components/ui](src/components/ui). Prefer composing these over introducing raw HTML elements; e.g. use the existing `button.tsx`, `input.tsx`, `dialog.tsx` wrappers so styling and accessibility follow the established patterns.
- Pages live in [src/pages] and are wired via the router in `App.tsx`. Add new routes by creating a file under `src/pages` and adding an appropriate route entry in `App.tsx`.
- Global app state/auth is handled via `src/lib/auth-context.tsx`. For auth-related changes, update this provider and the consumer hooks in `src/hooks`.
- Data fetching typically uses `@tanstack/react-query`. Keep queries colocated near pages/components that use them and reuse shared fetchers in `src/lib` if present.

## Project-specific conventions

- TypeScript + JSX (`.tsx`) is used everywhere; prefer typed props and avoid `any` when feasible.
- Styling: Tailwind is used with configuration in [tailwind.config.ts] and global styles in [src/index.css]. Follow existing utility classes and the `class-variance-authority` patterns used in component wrappers.
- Radix + shadcn patterns: Many components are thin wrappers around Radix primitives. Inspect files in [src/components/ui] for examples of controlled vs. uncontrolled usage.
- Component exports: import UI components from their file paths under `src/components/ui` (no central barrel file exists currently), e.g. import `Button` from [src/components/ui/button.tsx](src/components/ui/button.tsx).

## Tests & test patterns

- Tests live under `test/`. See [test/example.test.ts](test/example.test.ts) and setup in [test/setup.ts]. Use `vitest` and `@testing-library/react` for component tests.
- Mock browser APIs with `jsdom` (devDependency) and use `test/setup.ts` to register global test utilities.

## Important files to inspect for context (examples)

- [package.json](package.json) — scripts and dependencies.
- [vite.config.ts](vite.config.ts) — dev/build config and React plugin.
- [tailwind.config.ts](tailwind.config.ts) — Tailwind customization.
- [src/lib/auth-context.tsx](src/lib/auth-context.tsx) — authentication provider used across pages.
- [src/components/ui/button.tsx](src/components/ui/button.tsx) — example UI wrapper pattern.

## Guidance for AI agents

- When adding or changing components, mirror the wrapper patterns in `src/components/ui` (props, `className` merging, forwardRef). Use existing aria/accessibility patterns found in those files.
- For routing work, update `App.tsx` and add page files in `src/pages` instead of mounting ad-hoc components.
- Use `npm run dev` to iterate locally; include a brief test run `npm run test` before pushing changes.
- Avoid changing global build configs unless necessary; prefer adding local component/files and keeping config diffs minimal.

If any of these items are unclear or you'd like more examples walked through, tell me which area to expand (components, auth, routing, tests, or build).

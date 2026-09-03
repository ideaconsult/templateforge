# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this project is

**Template Designer** (repo name `templateforge`) — a React SPA by IDEA Consult for the
eNanoMapper project. Researchers collaboratively define experimental-data templates aligned
with the [eNanoMapper common data model](https://github.com/enanomapper/nmdataparser/wiki/eNanoMapper-Data-Model).
Templates are authored as SurveyJS surveys; each blueprint can generate a downloadable Excel
template with the blueprint metadata embedded. See `README.md` for the domain description.

## Commands

Package manager: **npm** (`package-lock.json`; no yarn/pnpm files present).

| Task | Command |
|---|---|
| Install | `npm install` |
| Dev server | `npm run dev` — Vite, but open `http://localhost:5173/templates/` (the router `basename` is `/templates`; the root URL 404s to NotFoundPage) |
| Build (dev base) | `npm run build` |
| Build (deploy base) | `npm run build-docker` — same as build with `--base=/templates` |
| Build + serve | `npm run build-serve` — serves at `http://127.0.0.1:50722` under `/templates/`; this is what CI runs before Cypress |
| Lint | `npm run lint` — ESLint 9 in **eslintrc format** (`.eslintrc.cjs`), `--max-warnings 0`. Note: `--ext js,jsx` only — **`.ts`/`.tsx` files are not linted**, and there is **no `tsc`/typecheck script**, so TypeScript errors surface only in the editor |
| Cypress e2e | No npm script. Build+serve first (`npm run build-serve`), then `npx cypress run` (or `npx cypress open`). Tests expect the built app at `http://127.0.0.1:50722/templates/` |

There is no test runner wired into `package.json` and no unit-test setup; Cypress e2e is the
only automated verification.

## Architecture

Entry point is `src/main.jsx` (not `src/App.jsx`, which is unused by the render path —
though `src/App.css` **is** imported, e.g. by `SurveyComp`).

- **Routing** (`src/main.jsx`): `createBrowserRouter` with `basename: "/templates"`.
  Routes: `/` HomePage, `/:templateId` TemplatePage, `/wizard/:templateId` DataPage,
  `/preferences`, `/upload`, `/404` and `*` → NotFoundPage. Some pages also read query
  params (`?wizard`, `?uuid`, `?mode=view`).
- **Auth**: OIDC via `react-oidc-context` against `https://iam.ideaconsult.net` (realm
  `nano`, client `idea-ui`). `src/StartScreenComp/AuthComp.tsx` mirrors the OIDC access token
  into `sessionStorage["access_token"]`; all API helpers read it from there. The token is
  also posted to `public/serviceWorker.js` (download caching).
- **State**: Zustand, single store in `src/store/store.js` with per-field selector hooks
  (`useUuid`, `useSetUuid`, …) — follow this pattern when adding store fields. Some fields
  back onto `localStorage` (`project`, `projectID`, `mode`).
- **Data layer**: `src/lib/request.ts` (fetch helpers with Bearer header), `src/lib/fetcher.ts`
  (SWR fetcher), `src/utils/useFetch.tsx` (shared fetch logic + backend-error messaging).
- **The wizard**: `src/SurveyComp/SurveyComp.jsx` renders SurveyJS `Model` from template JSON
  (fetched from API or localStorage). `src/SurveyComp/json.js` (~1700 lines) is the default
  survey schema; `old_json.js` is a legacy copy kept for reference. Custom survey validator
  (`isValidOrcid`) is registered via `FunctionFactory`.
- **UI**: Radix primitives + hand-rolled components in `src/ui/` (Button, Select, Tooltip)
  and `src/DialogComp/`, `src/MenuBar/`, `src/IconsComponents/`, `src/pages/`,
  `src/DataTable/` (TanStack React Table). Styling is plain per-component `.css` files +
  PostCSS/autoprefixer; `app/globals.css` holds a shadcn-style CSS-variable palette (not
  referenced by the Vite entry — the `app/` dir looks like leftover/shell config).
- **Path alias**: `@/` → `src/` (configured in `vite.config.js` and `tsconfig.json`).

## External services (hardcoded, no env vars)

Endpoints are hardcoded — `src/utils/config.ts` for the template API (with a commented
localhost variant), and inline constants elsewhere:

- Template backend (rcAPI): `https://api.templates.ideaconsult.net/template`
- Project list: `https://enanomapper.adma.ai/api/projects.json` (`PreferencesDialog.tsx`,
  `PreferencesPage.tsx`); nanomaterials JSON used by WizardPage
- OIDC authority: `https://iam.ideaconsult.net/auth/realms/nano`

The dev server has no proxy; API calls go straight to production endpoints and need a valid
token from the OIDC flow.

## Constraints / gotchas

- **Do not upgrade SurveyJS past v1** (`survey-core`, `survey-react-ui`, `surveyjs-widgets`).
  Dependabot is explicitly configured to ignore `>= 2.0.0`; v2 is a breaking rewrite
  (see commit "deps: stick with surveyjs v1 for now"). Same pinning applies to React 18
  (ignore `>= 19`).
- **The `/templates` base path must stay consistent** across: `vite.config.js`/`build-docker`
  `--base`, router `basename`, OIDC `redirect_uri`/`post_logout_redirect_uri`, the
  service-worker registration path in `main.jsx`, and the SPA rewrites in `Dockerfile`
  (nginx) and `.htaccess` (Apache). Changing one without the others breaks routing or login.
- Codebase is mixed JS/TSX and migrating gradually; `tsconfig.json` is minimal (no strict,
  no emit — Vite strips types without checking). Match the language of the file you edit.
- Formatting follows Prettier defaults but Prettier is not installed; ESLint only enforces
  react/recommended + react-hooks + react-refresh.
- Legacy/dead code: `src/App.jsx` (unused), `test/` (Selenium specs against a live remote
  site — not in any script or CI), `src/SurveyComp/old_json.js`, `src/data/MockTemplates.js`.
  Don't refactor these as part of unrelated work; confirm before deleting.

## Tests

- `cypress/e2e/*.cy.js`: general functionality, routing, copy-a-template, table sorting.
  They run against the **production build served by `build-serve`** and stub the backend with
  `cy.intercept` fixtures from `cypress/fixtures/json/` — no live API or auth needed for e2e
  runs, as long as intercepts cover the calls your change makes.
- `cypress/tools/fixture-generator.py` (Python) regenerates the randomized template fixtures.
- UI hooks into tests via `data-cy` attributes (e.g. `create-new-btn`, `draft`,
  `preferences-btn`) — keep/add them when changing interactive elements.

## CI / deploy

`.github/workflows/docker-publish.yml` on pushes/PRs to `main` and `develop`: runs Cypress
(against `npm run build-serve`, waiting on `http://127.0.0.1:50722/templates/`), then builds
and signs the Docker image (node build stage → nginx) and pushes to
`ghcr.io/ideaconsult/template-designer` (`main` → `stable`, `develop` → `latest`).

**A change that makes Cypress fail blocks the image publish.** Run the Cypress suite locally
via `build-serve` before pushing. Dependabot (weekly, npm + Actions) is configured in
`.github/dependabot.yml`; expect "Bump …" commits and keep lockfile changes to
`package-lock.json` only.

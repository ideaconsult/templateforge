# Template Designer Repository Notes

## Runtime Shape

- This is a client-only React 18/Vite SPA. `index.html` loads `src/main.jsx`; `src/App.jsx` is not the active entrypoint, but `src/App.css` remains imported by active components.
- `src/main.jsx` owns OIDC setup and the router. The router basename is `/templates`; local and deployed checks must use that path, not `/`.
- The counterintuitive `/wizard/:templateId` route renders `DataPage`, which customizes and generates Excel. `WizardPage` is an under-development view rendered from the home-page query string.
- Existing template links use `?mode=edit` for editing and no mode query for display. `?mode=view` is not a supported display mode and can leave SurveyJS editable because `SurveyComp` only tests whether the query parameter exists.
- Route composites are in `src/pages/`; SurveyJS wiring is in `src/SurveyComp/`; global Zustand state is in `src/store/store.js`; request helpers are in `src/lib/` and `src/utils/`.
- Hard-coded origins are not centralized: OIDC is configured in `src/main.jsx`, and project feeds are in preference/wizard code. The unused `config.baseUrl` points to localhost and is not the API root.
- The source mixes JS/JSX and TS/TSX, and several TSX files use `@ts-nocheck`. `@/` resolves to `src/` through both Vite and `tsconfig.json`.

## Commands And Checks

- Use `npm ci`. No Node version is pinned; the locked Vite and Cypress versions together require Node `^20.19.0 || ^22.12.0 || >=24.0.0`.
- Run `npm run dev`, then open `http://localhost:5173/templates/`.
- `npm run build` makes the default Vite build. `npm run build-docker` sets the asset base to `/templates` but leaves output at the `dist` root, matching the current prefix-stripping deployment proxy.
- For the production-like Cypress target, run `npm run build-serve`; unlike the container build, it nests output under `dist/templates` because the local server does not strip the prefix. It serves `http://127.0.0.1:50722/templates/`; use this build, not the dev server, to exercise the service worker.
- The current deployment redirects the legacy `/designer` entrypoint to `/templates/`, normalizes the trailing slash, and strips `/templates/` before nginx. Keep router basename, Vite asset base, OIDC callbacks, service-worker path/scope, and proxy behavior aligned.
- In another terminal, run the four E2E specs with `npx cypress run --e2e`, or one with `npx cypress run --e2e --spec cypress/e2e/<name>.cy.js`. Cypress has no `baseUrl`; the specs use the full production-like URL.
- There is no `test` or typecheck script. `tsconfig.json` lacks `noEmit`, so a bare `tsc` invocation can write JavaScript beside source files; use an explicit `--noEmit` for investigation. Cypress has component-test wiring but no component specs.
- After `npm ci`, `npm run lint` aborts because ESLint 9 finds no flat `eslint.config.*`; the script would exclude TS/TSX even if configured. Do not report it as a passing gate.
- The Dockerfile uses `npm install` and an explicit `COPY` allowlist. Update that allowlist when adding root-level build inputs.
- Dependabot deliberately holds `survey-core` and `survey-react-ui` below v2, and React, React DOM, and their types below v19. React 19 currently breaks the H5Web integration ([silx-kit/h5web#1905](https://github.com/silx-kit/h5web/issues/1905)); treat both major upgrades as focused migrations.

## API And Data Flow

- `src/utils/config.ts` defines a template collection URL, currently `https://api.templates.ideaconsult.net/template`, not an API root. Code deriving `/dataset`, `/task`, or `/h5grove` must replace the terminal `/template`, as `UploadPage` and `NexusPreviewDialog` do, rather than append to it.
- Do not use `src/StartScreenComp/hooks/useNexusPreview.ts` as an API reference: its trigger is not connected to the UI, and it currently constructs invalid `/template/template/...` and `/template/dataset` paths.
- The active backend contract is [ideaconsult/templates-api](https://github.com/ideaconsult/templates-api). Ramanchada URLs in generated Cypress fixture records appear to be historical leftovers from before template functionality split from [h2020charisma/ramanchada-api](https://github.com/h2020charisma/ramanchada-api); they are not a runtime dependency and should be cleaned up when fixtures are refreshed.
- `GET /template` must return an object containing a `template` array. `template_status` drives the Draft/Finalized tabs; the table uses `uuid`, `template_name`, `template_author`, `METHOD`, `template_acknowledgment`, `PROTOCOL_CATEGORY_CODE`, and `timestamp`.
- `PROTOCOL_CATEGORY_CODE` is replaced with a human label before display and search, and `timestamp` is the default descending sort key.
- The blueprint designer loads the shared `/definition/template_designer` schema; data entry loads a per-template schema from `/template/<uuid>?format=json&data_entry=true`. `src/SurveyComp/json.js` seeds new drafts; `old_json.js` is not a runtime schema.
- Template and dataset writes are asynchronous task operations. A returned `result_uuid` does not by itself prove processing completed; inspect or poll the task contract before depending on generated output.
- Blueprint answers use the shared `my-survey` local-storage key; Excel customization uses `data-entry-<uuid>`. Clearing a project calls `localStorage.clear()` and deletes both kinds of answers plus tab state.
- Survey completion clears its active storage key. A second completion handler contains a data-entry-unsafe POST but is currently dormant behind `validationAllowComplete`; explicitly guard it with `!isDataEntry` if completion behavior changes.
- Project selection comes from the [Nanosafety Data Interface](https://enanomapper.adma.ai/) project feed and supplies a `project` query parameter for Excel generation; it is enrichment context, not an authorization scope.

## Security Boundaries

- OIDC state is currently split between React OIDC context and `sessionStorage.access_token`; one schema request incorrectly reads `localStorage.access_token`. Consolidate an existing path when touching requests rather than adding another token store.
- `src/lib/fetcher.ts` attaches the session token to any URL, including the fixed project feed. That feed is same-origin on the primary `enanomapper.adma.ai` deployment but cross-origin from aliases and local development; it does not need the IAM token. Use an unauthenticated fetcher for this feed and scope bearer headers to the intended API origin.
- Token coverage is incomplete: active create, copy, upload/task, and some generated-file paths send no bearer token, while `src/lib/request.ts` logs the token during downloads. Do not treat current behavior as a compatibility contract.
- Login-gated UI controls are not an authorization boundary. The backend source declares no application-level authentication; deployed proxy enforcement is unknown. Treat the deployed API as live and mutating, and do not probe writes.
- The service worker adds the OIDC token only to HTTPS image GETs on `*.ideaconsult.net`, excluding identity-provider origins. Its `/templates/serviceWorker.js` registration does not work under the root-based dev server; do not broaden its scope casually.
- The empty Content-Security-Policy meta element in `index.html` imposes no policy. The current deployment middleware supplies HSTS, `nosniff`, and `SAMEORIGIN` framing, but no CSP; revalidate external configuration separately from repository code.

## Test And Generated-File Traps

- Cypress is not isolated from deployed services. Register every remote intercept before `cy.visit` and give it a static response or fixture; an intercept without one passes through to the live API. `general.cy.js` currently performs such a live GET, including in CI.
- The project fixture has a doubled `.json.json` suffix, but Cypress's extension fallback resolves the `.json` reference. Do not attribute a failure to the suffix alone.
- `routing.cy.js` and `tableSorting.cy.js` currently install their template intercept after `cy.visit`, so they can race a live request.
- `test/` contains dormant Selenium/Mocha tests for a legacy live deployment. They are outside Cypress discovery, their dependencies are absent, and one performs a real write; do not run or revive them as routine verification.
- Run `cypress/tools/fixture-generator.py` only from the repository root. It rewrites `bk_rcapi_templates_generated.json` with random data and prints constants for `general.cy.js`; also synchronize `makeCopy.cy.js`'s `uuidToCopy` manually.
- `dist/`, `node_modules/`, Cypress screenshots, and downloads are generated/ignored artifacts. Do not hand-edit or commit them.
- CI runs Cypress before building the nginx image and does not run lint or typechecking. The workflow emits `stable` from `main`, `latest` from `develop`, and `pr-<number>` for PRs; production consumes `stable`, while test deployments can consume selected PR images. Do not disable PR publication blindly. Login, push, and signing are currently unconditional despite stale comments; preserve tag semantics while explicitly separating trusted same-repository PRs from forks when changing the workflow.

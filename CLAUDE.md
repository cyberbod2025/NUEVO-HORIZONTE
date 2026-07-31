# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

CodeBrain DevAcademy (`package.json` name: `codebrain-devacademy`) — a Vite/React SPA that teaches JavaScript fundamentals through Brilliant-style micro-lessons, a JS sandbox, and a simulated PowerShell terminal. All content is in Spanish. No backend or credentials are currently configured; everything runs client-side with `localStorage` persistence.

## Commands

- Install: `npm install` (commit `package-lock.json`; requires Node `^20.19.0 || >=22.12.0` per Vite 8).
- Dev server: `npm run dev`
- Build (typecheck + bundle): `npm run build` — runs `tsc` then `vite build`. Always run this (not just `vitest`) before considering a change done; several bugs only surface at the TS/build step.
- Preview a production build: `npm run preview`
- Unit tests (Vitest + jsdom): `npm test` (single run), `npm run test:watch`, `npm run test:coverage`
  - Run a single test file: `npx vitest run src/domain/progress.test.ts`
  - Test files are colocated with source as `*.test.ts`/`*.test.tsx`
- E2E (Playwright, Chromium only): `npm run test:e2e` — requires a one-time `npx playwright install chromium`. Spins up `npm run dev` on `127.0.0.1:4173` itself.

## Architecture

### Entry and composition

Vite enters through `index.html` → `src/main.tsx` → `src/App.tsx`. `App.tsx` owns essentially all mutable state (progress, active tab, lesson-in-progress state, CLI terminal state, TTS narrator state) and composes view components from `src/components/` (shell: header/footer/nav/welcome/tour) and `src/features/*` (tab content: `lesson`, `powershell`, `sandbox`, `timeline`). There is no router and no global state library — prop drilling from `App.tsx` is intentional.

Rendering assumes a browser: state initializers read `localStorage` directly at module load (`INITIAL_PROGRESS = readProgress()` etc. in `App.tsx`), and code paths use `window`, `speechSynthesis`/`SpeechSynthesisUtterance`, and `window.confirm`.

### Lesson content: v1 modules vs. v2 lessons, unified by an adapter

This is the key architectural seam — read `docs/adr/0004-lesson-v2-pedagogical-contract.md` before touching lesson content or `LessonView`.

- **v1** (`src/data/curriculum.ts`, `MODULES`): 12 legacy modules, each with exactly one guided question and one sandbox challenge with function-based (`'custom'`) test cases. Untouched and not being migrated wholesale.
- **v2** (`src/types/lesson.ts` `LessonV2`, `src/data/lessonsV2.ts` `LESSONS_V2`): the current content contract — multiple learning objectives, worked examples, a multi-step `guidedPractice` array (each step with progressive `hints`), a `challenge` with several declarative `checks`, a reflection prompt, and explicit `masteryCriteria`. 15 pilot lessons exist so far (legacy modules 1–5: fundamentals, modern JS/async, Git/Conventional Commits, TypeScript, React props/useState), shown in `TimelineView` under a separate "Piloto v2" section with its own sequential unlock (still using `isModuleUnlocked`). Modules 6–12 are not migrated yet.
- **`src/domain/lessonAdapter.ts`** (`normalizeLesson`) is the single entry point both `App.tsx` and `LessonView` use. It returns `NormalizedLesson` for either input type. **Never branch `LessonView` (or any UI) on `schemaVersion`/`sourceVersion`** — always consume the normalized shape; add new default-filling logic to the adapter instead.
- Sandbox checks are declarative and evaluated per-check (not all-or-nothing) by `src/domain/sandboxChecks.ts` (`evaluateCheck`/`allChecksPassed`), supporting `stdoutIncludes`, `stdoutEquals`, and `'custom'` (a `test: (output: string) => boolean` function, used only by the v1 adapter — not JSON-serializable, kept as documented debt for if/when content moves to remote JSON).
- `docs/examples/module.example.json` and `docs/architecture.md` describe a further-future fully-serializable JSON curriculum (with schema validation, Supabase-backed progress, AI mentor). `LessonV2` field names deliberately follow that schema where reasonable so this pilot doesn't contradict that direction, but none of the Supabase/auth/mentor/JSON-schema-validation pieces are implemented yet.

### Progress persistence

`src/services/progressStorage.ts` is the only module that touches progress-related `localStorage` keys (`codebrain_xp`, `codebrain_streak`, `codebrain_last_activity_date`, `codebrain_completed`, `codebrain_onboarding_complete`, `codebrain_progress_version`). Bumping `PROGRESS_VERSION` in that file intentionally wipes all of the above once (`initializeProgressStorage`/`PROGRESS_WAS_RESET`), so bump it deliberately, not incidentally, when the stored shape changes. Module unlock order is purely sequential: a module unlocks only when the previous `MODULES` entry is marked completed (`src/domain/progress.ts`).

### Code execution sandbox

`src/features/sandbox/`: Monaco (`@monaco-editor/react`, local package — not CDN-loaded) is lazy-loaded only when the editor opens. `runCode.ts` spins up a fresh `codeRunner.worker.ts` Web Worker per run, enforces a timeout from the main thread, captures bounded console output, and always terminates the worker. This is for reliability and DOM isolation, **not a security sandbox** — do not add code or docs implying arbitrary/hostile JS is safe to execute here (see `docs/architecture.md` "Code execution boundary" and `docs/backlog.md` "Out of scope").

### Styling

Tailwind 4 via `@tailwindcss/vite`, imported in `src/styles.css`. There is intentionally no `tailwind.config.*` file — don't add one without reason.

### PowerShell simulator

`src/features/powershell/PowerShellView.tsx` plus the CLI handling in `App.tsx` (`handleCliSubmit`) simulate a small fixed set of commands (`git init/add/commit`, `npm test`, `vercel --prod`, `help`, `clear`) by literal string matching — this is simulated curriculum content, not a real shell, and not a repository workflow tool.

## Testing notes

- Unit tests: Vitest + `@testing-library/react`, jsdom environment, setup file `src/test/setup.ts`. Pure logic (`src/domain/*.ts`) is unit-tested directly; component tests exist for `LessonView`.
- `e2e/onboarding.spec.ts` asserts on exact Spanish UI strings (e.g. `'Editor de Código JS / Sandbox'`, `'Ejecutar Código'`, and the dynamically-built `` `Has ganado +${xpReward} XP.` `` string) — if you change that copy or `xpReward` values, check this spec.

## Docs worth reading before larger changes

- `docs/architecture.md` — target V2 topology and trust boundaries (frontend/code-execution/backend/AI), useful even though Supabase/AI pieces aren't built yet.
- `docs/adr/` — numbered ADRs; `0004` (lesson v2 contract) is the most recent and most relevant to day-to-day content/UI work.
- `docs/backlog.md` — prioritized MVP/later backlog with acceptance summaries; check before assuming a feature (Supabase, mentor, Sandpack) is in scope.

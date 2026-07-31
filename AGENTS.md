# Tooling

- Use npm with the committed `package-lock.json`; Vite 8 requires Node `^20.19.0 || >=22.12.0`.
- Install with `npm install`, run locally with `npm run dev`, and verify changes with `npm run build` (TypeScript followed by the Vite production build).
- `npm run preview` serves an existing production build.
- `npm test` runs the Vitest unit suite; `npm run test:watch` keeps it open. `npm run test:e2e` runs Playwright Chromium tests and requires a one-time `npx playwright install chromium`.
- The app's `git`, `npm test`, `npx vitest`, and `vercel --prod` commands shown in the PowerShell view are simulated curriculum content, not repository workflows.

# Application

- Vite enters through `index.html` and `src/main.tsx`; `src/App.tsx` owns controller state and composes feature views.
- Curriculum and CLI content live in `src/data/curriculum.ts`; onboarding steps live in `src/data/tourSteps.ts`; reusable shell components are under `src/components/`; timeline, lesson, PowerShell, and sandbox features are under `src/features/`.
- Tailwind 4 is loaded through `@tailwindcss/vite` and `src/styles.css`; there is intentionally no `tailwind.config` file.
- Rendering assumes a browser: state initializers read `localStorage`, while narration uses `window`, `speechSynthesis`, and `SpeechSynthesisUtterance`.
- Progress persistence and migration live in `src/services/progressStorage.ts`: browser `localStorage` uses `codebrain_xp`, `codebrain_streak`, `codebrain_completed`, and `codebrain_onboarding_complete`. Bumping `codebrain_progress_version` intentionally resets all of them once.
- Module order is functional: a module unlocks only when the previous `MODULES` entry is completed. Every module also supplies the lesson, guided exercise, sandbox code, and output predicates consumed directly by the UI.
- The lesson sandbox is in `src/features/sandbox/`: Monaco is lazy-loaded from local packages, and JavaScript is dynamically evaluated only inside a disposable Worker with timeouts and output limits. This improves reliability and parent-DOM isolation but is not a hostile-code security boundary.
- `src/domain/progress.ts` contains pure progress rules; unit tests are colocated under `src/**/*.test.ts`. The first browser tests are in `e2e/`.
- Supabase, authentication, Sandpack multi-file lessons, and an AI mentor are documented future boundaries under `docs/`; no credentials or backend are configured yet.
- Lesson v2 pedagogical contract (see `docs/adr/0004-lesson-v2-pedagogical-contract.md`): `src/types/lesson.ts` defines `LessonV2`/`NormalizedLesson`; `src/domain/lessonAdapter.ts` normalizes both the 12 legacy `MODULES` entries and native v2 lessons into one shape that `App.tsx`/`LessonView` consume without branching by version; `src/domain/sandboxChecks.ts` evaluates declarative sandbox checks (`stdoutIncludes`/`stdoutEquals`/`custom`) individually, with per-check failure messages. Three real v2 lessons pilot the contract in `src/data/lessonsV2.ts` and surface in `TimelineView` under a separate "Piloto v2" section; `curriculum.ts` and the 12 legacy modules are untouched. Do not branch `LessonView` by `schemaVersion`; always render from the normalized shape.

# V2 Backlog

## Estado (2026-07-30)

Piloto vertical del contrato pedagógico de lección completado y probado: ver `docs/adr/0004-lesson-v2-pedagogical-contract.md`. Define `LessonV2`/`NormalizedLesson`, un adaptador que normaliza los 12 módulos v1 existentes sin migrarlos, y 3 lecciones v2 reales con práctica guiada de varios pasos, pistas progresivas y feedback por check individual. No toca Supabase, autenticación, mentor IA ni el resto del currículo — eso sigue siendo el alcance de "Migrate curriculum data" más abajo, ahora con un contrato ya validado con contenido real en vez de solo el ejemplo de `docs/examples/module.example.json`. Pendiente inmediato: decidir si se migran los 12 módulos restantes a este contrato antes o después de abrir el frente de Supabase (ver "Próxima microtarea recomendada" en el reporte de la iteración).

Estimates are rough focused engineering days, including implementation and direct tests but excluding credential procurement, external review, and schedule contingency. Re-estimate when a story is started.

## MVP

| Priority | Item | Acceptance summary | Estimate |
|---|---|---|---:|
| P0 | Define module schema and runtime validation | Versioned serializable shape; useful validation errors; no component, icon, or function references | 2 days |
| P0 | Migrate curriculum data | MVP modules preserve order, prerequisites, lessons, narration, guided practice, starter code, and declarative checks | 4 days |
| P0 | Extract content/progress service seams from the UI | Views consume typed adapters; anonymous learning remains functional | 4 days |
| P0 | Harden Monaco and Worker lifecycle | Lazy local editor; one disposable Worker per run; timeout, bounded output, termination, and controlled errors | 2 days |
| P0 | Add core automated coverage | Module validation, unlock logic, progress recovery, runner timeout/error, and critical UI flow tests | 4 days |
| P0 | Design Supabase schema and migrations | Profiles/progress ownership is explicit; migrations are repeatable; all exposed tables have RLS | 3 days |
| P0 | Write and test RLS policies | Same-user access succeeds; anonymous/cross-user/forged-owner access fails | 3 days |
| P0 | Add authentication adapter | Session restore, sign-in/out, anonymous fallback, and controlled unavailable state | 3 days |
| P0 | Implement progress sync and merge | Deterministic merge, idempotent writes, stale update handling, retry, and corruption recovery | 4 days |
| P1 | Define mentor Edge Function contract and mock | Bounded authenticated request, structured response, typed errors, and fixture tests | 2 days |
| P1 | Implement server-side mentor integration | AI key stays server-side; auth, timeout, rate/budget limit, and response validation are enforced | 3 days |
| P1 | Add mentor UI | Attempt-aware hint flow with loading, retry, unavailable, and accessible status states | 3 days |
| P1 | Add prompt-injection and leakage defenses | Minimal context, delimiters, refusal behavior, output validation, and adversarial contract cases | 2 days |
| P1 | Accessibility and responsive pass | Core flow is keyboard usable and works at agreed mobile/desktop widths with visible errors/focus | 3 days |
| P1 | Release and operational checklist | Build gate, environment inventory, secret scan, RLS evidence, feature disable path, and rollback notes | 2 days |

The MVP total is approximately **44 engineering days**. Credential-dependent items can be built against mocks, but hosted Supabase and real AI acceptance cannot be completed without access.

## Later

| Priority | Item | Why later | Estimate |
|---|---|---|---:|
| P2 | Sandpack React multi-file exercises | Adds a second runtime, preview/frame policy, dependency controls, and larger content contract | 6-9 days |
| P2 | Authoring/admin application | Requires roles, publishing workflow, revision history, and stronger content validation | 8-12 days |
| P2 | Offline mutation queue | Local fallback covers MVP; robust multi-device conflict resolution needs dedicated UX | 4-6 days |
| P2 | Instructor/cohort dashboards | Requires verified product need, aggregation rules, privacy review, and new RLS policies | 6-10 days |
| P2 | Learning analytics | Event definitions, consent/retention decisions, and actionable reporting must come first | 4-6 days |
| P2 | Rich mentor conversation history | Increases privacy, retention, cost, and prompt-injection surface | 4-7 days |
| P3 | Managed remote curriculum | Bundled versioned JSON is sufficient for MVP; remote publishing needs cache/version strategy | 5-8 days |
| P3 | Additional execution languages | Requires language-specific runtimes and an isolation model beyond the current Worker | 8-15 days per runtime |
| P3 | Internationalized curriculum | Requires content workflow and locale fallback decisions, not only UI translation | 5-8 days |

## Out of scope for MVP

- Claiming the Web Worker safely executes hostile code.
- Browser-held service-role, database password, or AI provider credentials.
- React multi-file execution, package installation, or arbitrary remote dependencies.
- High-stakes assessment integrity; bundled local checks are inspectable by the learner.
- Custom backend infrastructure when Supabase Auth, Postgres, RLS, and Edge Functions satisfy the accepted contract.

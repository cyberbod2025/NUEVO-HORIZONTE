# V2 Roadmap

## Schedule

The plan assumes 12 calendar weeks beginning Saturday, 2026-08-01. Estimates and scope should be reviewed weekly; dates are planning boundaries, not performance claims.

| Week | Dates | Focus | Week acceptance |
|---|---|---|---|
| 1 | 2026-08-01 to 2026-08-07 | Baseline and contracts | Current core flows are recorded; the module schema, progress contract, mentor request/response contract, and ADRs are reviewed. The example module parses as JSON. |
| 2 | 2026-08-08 to 2026-08-14 | Serializable curriculum | Content has no component/function references; schema validation reports actionable errors; representative existing modules render through an adapter. |
| 3 | 2026-08-15 to 2026-08-21 | Curriculum migration | All MVP modules use the serializable shape; order, prerequisites, guided exercises, narration, and declarative checks retain expected behavior. |
| 4 | 2026-08-22 to 2026-08-28 | Editor and runner hardening | Monaco remains lazy and locally bundled; each run gets a disposable Worker; timeout, output limits, syntax/runtime errors, and repeat runs are covered by tests. |
| 5 | 2026-08-29 to 2026-09-04 | Supabase data design | Versioned migrations and deny-by-default RLS policies exist for planned exposed tables; ownership and progress merge rules are documented and policy-testable locally. |
| 6 | 2026-09-05 to 2026-09-11 | Authentication seam | The app supports an auth adapter and anonymous fallback; with Supabase credentials, sign-in/out and session restoration pass; without them, the mock contract passes. |
| 7 | 2026-09-12 to 2026-09-18 | Progress synchronization | A signed-in user can read/write only owned progress; local-to-server merge is deterministic, retry-safe, and tested for stale and malformed data. Hosted RLS acceptance is credential-gated. |
| 8 | 2026-09-19 to 2026-09-25 | Mentor service contract | The Edge Function or local stub validates auth, payload shape, and limits; tutor prompts use explicit untrusted-data delimiters; the UI handles unavailable, loading, and error states. |
| 9 | 2026-09-26 to 2026-10-02 | AI provider integration | With an AI key, calls originate only from the Edge Function, responses are validated, and timeout/quota/provider failures are safe; without a key, fixture-based contract tests pass. |
| 10 | 2026-10-03 to 2026-10-09 | Security and abuse controls | RLS coverage is audited; mentor per-user limits and payload caps are enforced; no privileged or AI secret is present in the browser bundle or logs. |
| 11 | 2026-10-10 to 2026-10-16 | Product hardening | Keyboard, responsive, empty/error, and progress recovery flows pass the agreed browser matrix; critical curriculum and sync paths have automated coverage. |
| 12 | 2026-10-17 to 2026-10-23 | Release candidate | Production build and release checklist pass; credential-dependent gates have evidence or are explicitly marked blocked; rollback and local-only fallback are documented. |

## Acceptance milestones

| Milestone | Due | Acceptance gate |
|---|---|---|
| M1: Offline learning core | 2026-08-28 | A user can navigate, study, edit, run, and complete MVP modules without network credentials. Content is schema-valid and code execution failure cannot freeze the page beyond the configured timeout. |
| M2: Account progress | 2026-09-18 | Anonymous use still works. When Supabase is available, an authenticated user's progress survives a new browser session and cross-user access attempts fail under RLS. |
| M3: Guarded AI mentor | 2026-10-09 | The mentor gives a concise hint based on the current attempt without returning hidden answers; browser assets contain no AI secret; invalid, injected, oversized, rate-limited, and provider-failure cases produce controlled responses. |
| M4: V2 release candidate | 2026-10-23 | M1 is complete, all enabled cloud features meet their gates, no critical known defect remains in core flows, and unavailable credential-dependent features fail closed with clear UI. |

## Decision gates

- End of week 4: confirm the serializable module contract before adding more content.
- End of week 5: confirm Supabase project access and ownership policies. If credentials remain unavailable, continue against migrations and mocks but do not claim hosted acceptance.
- End of week 8: confirm AI provider, model, budget, retention settings, and key access. If unavailable, ship the mentor disabled rather than putting a key in the SPA.
- End of week 10: review whether the evidence supports enabling cloud sync and mentor independently. Either feature may remain behind a flag without blocking the offline core.
- End of week 12: release only capabilities whose acceptance gates have evidence; record blockers and owners for the rest.

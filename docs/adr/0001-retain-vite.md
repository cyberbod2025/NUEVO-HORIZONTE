# ADR 0001: Retain Vite for V2

- Status: Accepted
- Date: 2026-07-29

## Context

The existing application is a browser-focused Vite 8 SPA with React 19 and Tailwind 4. Its learning flows use browser APIs including `localStorage`, speech synthesis, Monaco, and Web Workers. V2 adds serializable content, optional Supabase persistence, and a server-mediated AI mentor, but has no confirmed requirement for server-side rendering or a framework-owned application server.

Replacing the application framework during this work would combine a platform migration with product and data changes without an identified user-facing need.

## Decision

Retain Vite as the frontend build and development platform for V2. Keep React and Tailwind on their current major versions unless a separate dependency decision requires an upgrade.

Use Supabase Auth/Data APIs directly from the SPA for user-scoped operations protected by RLS. Use Supabase Edge Functions, or an equivalent trusted server boundary, for AI calls and privileged operations. Do not add a general Node/Express backend solely to hide public Supabase configuration.

## Consequences

- Existing browser-centric flows and deployment shape remain intact.
- The team can focus on content extraction, persistence, authorization, and mentor behavior rather than framework migration.
- Every browser `VITE_*` variable remains public. Secrets require an Edge Function/server environment.
- Hosting must support SPA navigation fallback if client-side routing is introduced.
- SEO or server-rendered public curriculum pages are not addressed by this decision.
- Backend contracts must remain explicit because Vite does not provide a server application layer.

## Revisit when

Reconsider only if an accepted requirement needs server rendering, framework-level server routes, edge rendering, or another capability that cannot be met cleanly by the SPA plus Supabase boundary. Evaluate that requirement separately rather than preemptively migrating V2.

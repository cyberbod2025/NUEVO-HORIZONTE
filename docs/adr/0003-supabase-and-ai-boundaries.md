# ADR 0003: Supabase and AI Boundaries

- Status: Accepted
- Date: 2026-07-29

## Context

V2 needs optional account-based progress and an AI tutor. The current application has no backend and stores progress locally. Supabase and AI credentials are not yet available.

Browser code is observable and modifiable. Vite embeds `VITE_*` values into client assets, so those values are public regardless of repository or hosting settings. AI requests also contain untrusted student input and may return unsafe or malformed output.

## Decision

Use Supabase Auth and Postgres for authenticated identity and progress. Keep anonymous/local learning available. The browser may receive only the public Supabase project URL and anon/publishable key.

Enable RLS on every table exposed through the Supabase Data API. Exposed views must use `security_invoker` so underlying RLS applies; otherwise they remain outside the exposed schema. Policies are deny-by-default and grant only the minimum operation on rows owned by `auth.uid()`. Frontend filters and hidden UI are not authorization controls. Schema migrations and policy tests are required before enabling cloud sync.

Route every AI provider call through a Supabase Edge Function or equivalent trusted server endpoint. Store AI keys, service-role keys, and privileged configuration only in that server environment. The endpoint must authenticate the user, validate and bound the request, enforce per-user rate/budget limits, minimize context, construct the system prompt, validate provider output, and return controlled errors.

Treat user content, retrieved content, and model output as untrusted. Delimit user data in prompts, instruct the model not to follow embedded instructions, avoid sending hidden answers when hints suffice, render output safely, and never execute model-generated code automatically.

Until credentials exist, implement against typed adapters, local fixtures, migrations, and request/response contract tests. A mock passing is not evidence that hosted RLS, authentication, provider quotas, or secret deployment work.

## Consequences

- The SPA can use Supabase directly for permitted user-scoped data without a proxy that merely repeats RLS-protected operations.
- RLS is mandatory for all exposed data and must be tested as part of each schema change.
- AI availability can fail independently from lessons and local progress.
- Server-side calls add operational concerns: authentication, limits, provider errors, usage visibility, and secret rotation.
- Prompt instructions reduce risk but do not replace authorization, data minimization, output validation, or non-execution.
- Cloud features cannot reach accepted status until the relevant project access and keys are available.

## Rejected approaches

- Put an AI key or Supabase service-role key in `VITE_*`: rejected because it exposes privileged credentials to every browser user.
- Trust `user_id` sent by the client: rejected; ownership derives from the verified JWT and RLS.
- Disable RLS and rely on application queries: rejected because the Data API is directly reachable.
- Block the offline core on cloud access: rejected because credentials are unavailable and lessons do not inherently require a backend.

# ADR 0002: Editor and Code Execution

- Status: Accepted
- Date: 2026-07-29

## Context

Exercises need a capable JavaScript editor and protection against accidental infinite loops freezing the page. The current application already loads a locally installed Monaco editor through React lazy loading and executes each attempt in a new Web Worker with a main-thread timeout and bounded logs.

V2 may later add React exercises with multiple files and a rendered preview. That is a different execution model from evaluating a focused JavaScript snippet.

## Decision

Use the locally installed Monaco package and load it lazily when an exercise editor is shown. Do not depend on a Monaco CDN.

For MVP JavaScript snippets, create a disposable Web Worker for every run. Pass only the run identifier and code into the Worker, capture a bounded console result, enforce a short configurable timeout from the main thread, and always terminate the Worker after success, error, cancellation, or timeout. Keep exercise assertions declarative in module JSON and evaluate only supported assertion types.

The Worker is a reliability and DOM-isolation mechanism, not a hostile-code security sandbox. Do not describe it as secure execution, use it for secrets, or automatically execute code supplied by the AI mentor. Network-capable browser APIs and resource abuse need separate controls if the threat model expands.

Adopt Sandpack later only for an accepted React multi-file requirement. Before enabling it, define allowed dependencies, network behavior, preview isolation/CSP, time and output limits, error handling, content schema changes, and supported browsers.

## Consequences

- Monaco does not inflate the initial application path solely for users who do not open an editor, though its lazy chunk is still a meaningful download.
- Infinite loops can be stopped by terminating the per-run Worker without freezing the UI.
- Exercise code cannot directly access the page DOM through the Worker global scope.
- Arbitrary untrusted code is still outside the supported security model.
- JavaScript snippet exercises stay simple; React component previews wait for Sandpack rather than growing a custom bundler.
- Worker lifecycle, timeout, output truncation, serialization, and repeated-run behavior require automated tests.

## Alternatives considered

- A textarea or lightweight editor: smaller, but loses the editing support already present and does not solve execution isolation.
- Main-thread `eval`/`Function`: rejected because accidental infinite loops can block the page and exercise code shares the DOM context.
- Sandpack immediately: deferred because MVP does not require a multi-file React runtime and the security/content surface is larger.
- Remote code execution service: rejected for MVP because it adds infrastructure and a substantially stronger isolation requirement without a confirmed need.

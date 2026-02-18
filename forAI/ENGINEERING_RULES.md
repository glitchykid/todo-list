This document defines non-negotiable engineering rules for Codex (and humans). Follow them unless a project-specific guideline explicitly overrides a rule.

---

## Codex Commandments (10 Lines)
1. Correctness first. If uncertain, add tests and make behavior explicit.
2. KISS: simplest thing that works, explainable in 2–3 sentences.
3. SOLID: single responsibility, composition-first, stable abstractions.
4. DRY with restraint: abstract only after the rule of 3.
5. TDD mindset: red → green → refactor; test behavior, not internals.
6. Side effects at the edges: domain logic stays pure and deterministic.
7. Errors are products: typed, actionable, logged with context, no secrets.
8. Secure by default: validate inputs, least privilege, no injection, no leaks.
9. Performance has budgets: avoid N+1/unbounded work; measure before tuning.
10. Ship maintainable: consistent style, docs updated, dead code removed.

---

## 0) Prime Directive
- MUST prioritize: correctness → clarity → changeability.
- MUST choose the simplest solution that satisfies requirements and constraints.
- MUST NOT introduce speculative abstractions “for future use”.
- MUST keep domain logic independent from frameworks and I/O.

---

## 1) Architecture and Boundaries
- MUST separate:
  - Domain (pure business rules)
  - Application (use-cases/orchestration)
  - Infrastructure (DB/HTTP/FS/external services)
  - Presentation (UI/API controllers)
- MUST NOT let Domain depend on Infrastructure or Presentation.
- MUST keep side effects at boundaries; core logic stays pure.
- MUST avoid dependency cycles across modules/layers.
- MUST prefer composition over inheritance; inheritance only when it models true substitutability.

---

## 2) SOLID Enforcement

### Single Responsibility
- MUST ensure each module/class/function has one reason to change.
- MUST split files/services that contain unrelated concerns (“And” smell).

### Open/Closed
- MUST add new behavior via composition/strategies/config, not by editing stable core logic repeatedly.
- MUST keep extension points explicit (interfaces, policies, adapters).

### Liskov Substitution
- MUST NOT create subtypes that throw “not supported” for base operations.
- MUST NOT tighten preconditions or weaken postconditions in subtypes.

### Interface Segregation
- MUST depend on minimal interfaces tailored to caller needs.
- MUST NOT force consumers to implement/receive methods they don’t use.

### Dependency Inversion
- MUST define abstractions at the domain/application boundary.
- MUST inject I/O dependencies (DB, HTTP clients, filesystem, clock, random).

---

## 3) KISS Rules
- MUST keep the design explainable in 2–3 sentences.
- MUST NOT add layers unless they reduce complexity or isolate volatility.
- MUST prefer straightforward data structures over clever object graphs.
- MUST keep APIs “pit of success”: hard to misuse, easy to do right.

---

## 4) DRY Rules (With Guardrails)
- MUST NOT duplicate business rules, validation logic, mapping, or error handling patterns.
- MUST apply the “Rule of 3”: generalize only after the same concept appears ~3 times.
- MUST abstract around stable concepts, not incidental similarities.

---

## 5) TDD and Testing Rules
- MUST implement using red → green → refactor for domain logic and critical behaviors.
- MUST test behavior, not private internals.
- MUST keep tests deterministic, fast, isolated, readable (AAA pattern).
- MUST include regression tests for any bug fix.
- MUST cover:
  - domain logic with unit tests
  - boundary integrations with integration tests (fakes/containers where practical)
  - a small number of high-value end-to-end tests for critical flows
- MUST NOT ship changes that reduce reliability without replacing coverage.

---

## 6) Code Quality Rules

### Functions and modules
- MUST keep functions small, single-purpose, and total (handle edge cases).
- MUST avoid long parameter lists; use parameter objects/structs when needed.
- MUST name things clearly:
  - verbs for functions (calculateTotal)
  - nouns for types (Invoice)
  - booleans as predicates (isReady, hasItems)

### Data modeling
- MUST model domain concepts with strong types/enums.
- MUST NOT use “stringly-typed” identifiers when a dedicated type is feasible.
- MUST centralize parsing/validation at boundaries.

### Side effects
- MUST pass clock, random, and I/O clients as dependencies when used.
- MUST NOT hide state in globals/singletons unless explicitly justified.

---

## 7) Error Handling
- MUST validate inputs at system boundaries.
- MUST fail fast with actionable errors:
  - what happened
  - why (if known)
  - how to recover
- MUST classify errors (types/codes), not only free-form strings.
- MUST NOT swallow exceptions silently.
- MUST log with context; MUST NOT log secrets.

---

## 8) Security by Default
- MUST treat all external input as hostile.
- MUST use allowlists over denylists where applicable.
- MUST prevent injection (parameterized queries, proper escaping).
- MUST protect secrets (never commit/log tokens, keys, passwords).
- MUST apply least privilege and secure defaults (CORS/CSRF/auth).

---

## 9) Performance and Scalability
- MUST avoid obvious performance traps (N+1 queries, unbounded loops, repeated heavy work).
- MUST prefer algorithmic improvements over micro-optimizations.
- MUST add caching only with a clear invalidation strategy.
- MUST keep performance within defined budgets for critical paths.

---

## 10) Observability
- MUST add structured logs at boundaries and key state transitions.
- MUST include correlation/request IDs for request flows when relevant.
- MUST emit metrics for latency, errors, throughput on critical paths.

---

## 11) Maintainability and Documentation
- MUST keep formatting/linting consistent (auto-format preferred).
- MUST update docs when behavior/contract changes.
- MUST document:
  - module purpose
  - inputs/outputs
  - invariants
  - examples for tricky logic
- MUST remove dead code promptly.

---

## 12) Delivery Gates (Definition of Done)
A change is “done” only if:
- tests pass and cover new/changed behavior
- lint/format passes
- error handling is correct and messages are actionable
- security implications reviewed (inputs, secrets, auth)
- performance remains within budget
- observability exists for critical flows
- docs updated when needed

---

# Universal Repo Template (Folders + Dependency Rules)

Pick one structure and apply consistently.

## Option A: Layered (default)
\`\`\`
/docs
  architecture.md
  decisions/
/src
  /domain
    /entities
    /value-objects
    /services
    /policies
    /errors
    /contracts
    index.*
  /application
    /use-cases
    /dto
    /mappers
    /errors
    index.*
  /infrastructure
    /persistence
    /http
    /messaging
    /observability
    /config
    index.*
  /presentation
    /api
    /ui
    /view-models
    index.*
  /shared
    /types
    /utils
    /constants
    index.*
/tests
  /unit
  /integration
  /e2e
/scripts
  dev/
  ci/
\`\`\`

### Dependency Rules (hard)
- domain MUST NOT import from any other layer.
- application may import domain, but NOT infrastructure or presentation.
- infrastructure may import domain contracts and application DTOs, but MUST NOT contain business rules.
- presentation may import application (and view-models), but MUST NOT contain domain rules.
- shared is leaf-utilities only (no upward dependencies).

## Option B: Feature-first (for large products)
\`\`\`
/src
  /features
    /<feature>
      /domain
      /application
      /infrastructure
      /presentation
      /tests
  /shared
  /bootstrap
\`\`\`
Rules:
- Features MUST NOT import other features’ infrastructure or presentation.
- Cross-feature reuse goes through explicit contracts or shared, not deep imports.

## Composition Root
- All wiring happens in /bootstrap (DI/manual composition).
- No business rules in bootstrap.

---

# PR Checklist
- [ ] Scope is minimal; change is explainable in 2–3 sentences (KISS)
- [ ] Clear boundaries: domain logic separated from I/O/framework code
- [ ] No unnecessary abstraction; no speculative architecture
- [ ] No duplicated business rules/validation (DRY, rule of 3 respected)
- [ ] Tests added/updated (TDD mindset); bug fixes include regression tests
- [ ] Tests are deterministic and focus on behavior (not internals)
- [ ] Error handling is typed/categorized and actionable; no swallowed errors
- [ ] No secrets in code/logs; inputs validated; injection risks addressed
- [ ] Performance pitfalls avoided; budgets respected
- [ ] Logging/metrics for critical paths included where applicable
- [ ] Lint/format passes; naming consistent; docs updated if contract changed


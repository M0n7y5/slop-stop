---
description: Code simplicity and surgical-change contract, always injected
alwaysApply: true
---

# Code discipline

Write the minimum code that solves the stated problem.

- Nothing speculative: no features, flexibility, or configurability that was not asked for.
- No abstraction for single-use code: one function until a second caller exists.
- No error handling for impossible scenarios.
- If 200 lines could be 50, rewrite before presenting.
- Solve today's problem. When tomorrow's requirement arrives, refactor then.
- If a simpler approach than the requested one exists, say so before building.
- Names describe the observable job (retryFailedPayments), not the mechanism (loopWithCounter).

Surgical changes:

- Every changed line traces to the request. No drive-by refactors, comment rewrites, or reformatting of adjacent code.
- Match the file's existing style even when you prefer otherwise.
- Remove imports, variables, and functions that YOUR change orphaned. Leave pre-existing dead code alone; mention it instead.

---
description: Interrupts on tautological, empty, mirror, or sleep-based tests
scope: "tool:edit(*), tool:write(*)"
globs: ["*test*", "*spec*", "**/tests/**", "**/test/**", "**/__tests__/**"]
interruptMode: always
condition:
  - 'expect\(true\)\.toBe\(true\)|expect\(1\)\.toBe\(1\)|assertTrue\(\s*true\s*\)|\bassert True[ \t]*(?:\n|$)'
  - '(?:^|\n)[ \t]*(?:it|test)\(\s*[''"][^''"\n]+[''"]\s*,\s*(?:async\s*)?\(\s*\)\s*=>\s*\{\s*\}\s*\)'
  - 'expect\(\s*(\w+)\([^()\n]*\)\s*\)\s*\.\s*to(?:Be|Equal|StrictEqual|MatchObject)\(\s*\1\('
  - '(?:time|asyncio)\.sleep\(|Thread\.sleep\(|page\.waitForTimeout\('
---

You wrote a slop test. It was discarded. Rewrite it.

- Tautology (`expect(true).toBe(true)`, `assert True`) or an empty test body: the test must assert real behavior, or not exist.
- Mirror assertion (expected value computed by the code under test): derive the expectation by hand as a literal or fixture.
- Sleep-based waiting (`time.sleep`, `Thread.sleep`, `page.waitForTimeout`): wait for the actual condition. A sleep is valid only when time itself is under test, with a WHY comment.

A test earns its place by naming the production bug it would catch.

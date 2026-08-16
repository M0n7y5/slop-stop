---
description: Rewrite AGENTS.md tighter and sync the slop-stop contract section into it
---

Tighten this project's agent instruction file and sync it with the slop-stop contracts.

Target file: $ARGUMENTS (when empty: `AGENTS.md` at the repo root; if only `CLAUDE.md` exists, use that; if neither exists, create `AGENTS.md`).

1. Read the target file and the live contracts: `rule://comment-policy`, `rule://code-style`, `rule://test-style`, `rule://commit-policy`, `rule://response-style`.
2. Rewrite the existing content:
   - Preserve every project-specific fact exactly: build/test/run commands, paths, architecture notes, tool versions, warnings, domain conventions. Never invent a fact, command, or path that is not already there or verifiable from the repo.
   - Imperative register, one rule per line, no filler, hedging, narration, marketing, or duplicate statements.
   - Vague guidance ("write good tests", "keep code clean", "be careful") becomes a concrete testable rule, or gets deleted.
   - Drop anything that merely restates harness defaults or the slop-stop contracts.
   - A contradiction between two existing rules: keep the one the codebase actually follows and note the conflict in your reply.
3. Replace-or-insert one section whose heading line is exactly:

   ## Output discipline (slop-stop)

   Body: condensed contracts, 25 lines max total: comment policy (public API docs + non-obvious WHY only, no narration/restating/diff-commentary/placeholder comments, no banners), code policy (nothing speculative, no single-use abstractions, surgical changes traced to the request), test policy (name the bug it catches, hand-derived expectations, no mock-assertions, condition waits not sleeps), commit policy (imperative concrete subject under 72 chars, WHY-only body), no em/en dashes anywhere.

   Idempotency: if a section with that exact heading exists, replace it wholesale (through the next `## ` heading or end of file). Delete any legacy output-discipline section under a different heading or wrapped in HTML comment markers. The file must end up with exactly one such section and no duplicated rules outside it.
4. Report tersely: before/after line counts, what was deleted or made concrete, any contradictions found. Do not touch other files.

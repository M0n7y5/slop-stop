---
description: Comment discipline contract, always injected
alwaysApply: true
---

# Comment discipline

Code MUST explain itself through names and structure. A comment is a last resort, not a habit.

Allowed comments, nothing else:

1. Public API docs on exported/public symbols, in the language's doc-comment format. One line when one line suffices.
2. Non-obvious WHY: invariants, safety/perf constraints, workarounds with an issue or spec link, deliberate deviations from the expected approach.
3. Required machinery: license headers, pragmas, lint/format directives, shebangs.

PROHIBITED:

- Narration of your process: "Now we", "First,", "Let's", "Here we".
- Restating the code: "increment the counter", "check if the file exists", "loop through items".
- Diff commentary describing the edit instead of the code: "added", "changed", "renamed from", "removed the old".
- Placeholder elisions: "rest of the code", "existing code unchanged", a lone "...". Emit the real code.
- Section banners and dividers.
- TODO/FIXME without an owner or issue reference.

Style, applies to comments, docs, and prose alike:

- No em-dashes or en-dashes. Use a comma, colon, period, or parentheses.
- No semicolon-chained sentences. Write short separate sentences.
- Comments state facts tersely. No filler ("simply", "basically", "note that"), no marketing, no apologies.
- When touching code near an existing slop comment you wrote, delete it. Prefer deleting a comment over rewording it.

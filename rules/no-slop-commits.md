---
description: Interrupts on slop in git commit and gh pr/issue commands
scope: "tool:bash"
interruptMode: always
condition:
  - '(?s)\bgit commit\b.*[—–]'
  - '(?s)\bgh (?:pr|issue) (?:create|edit|comment)\b.*[—–]'
  - '(?i)\bgit commit\b[^\n]*(?:-\w*m|--message)[= ]["'']\s*(?:wip|updates?|fix(?:es)?|changes?|stuff|misc|cleanup|tweaks?|improvements?|minor (?:fix(?:es)?|changes?|updates?)|various \w+|small (?:fix(?:es)?|changes?))\s*\.?["'']'
---

Your commit or PR command contained slop. It was discarded before running. Rewrite it.

- Em/en dash in the message: replace with a comma, colon, or period.
- Vague subject ("wip", "fix stuff", "various improvements"): name the actual change in imperative mood, under 72 chars, e.g. "Fix TOCTOU race in session reload".
- Body only if the diff cannot explain itself: WHY, constraints, verification. Never a line-by-line diff narration.

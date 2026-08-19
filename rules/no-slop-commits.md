---
description: Interrupts on slop in git commit and gh pr/issue commands
scope: "tool:bash"
interruptMode: always
condition:
  - '(?s)\bgit(?:\s+(?:-C\s+\S+|-c\s+\S+|--[\w-]+(?:=\S+)?))*\s+commit\b(?:(?!&&|\|\|).)*[\u2014\u2013\u2015]'
  - '(?s)\bgh (?:pr|issue) (?:create|edit|comment)\b(?:(?!&&|\|\|).)*[\u2014\u2013\u2015]'
  - '(?i)\bgit(?:\s+(?:-C\s+\S+|-c\s+\S+|--[\w-]+(?:=\S+)?))*\s+commit\b(?:[^\n]|\\\n)*?(?:-\w*m|--message)[= ]["'']\s*(?:wip|updates?|fix(?:es)?|changes?|stuff|misc|cleanup|tweaks?|improvements?|minor (?:fix(?:es)?|changes?|updates?)|more (?:fix(?:es)?|changes?|updates?)|bug ?fix(?:es)?|quick fix(?:es)?|various \w+|small (?:fix(?:es)?|changes?))\s*\.?["'']'
---

Your commit or PR command contained slop. It was discarded before running. Rewrite it.

- Em/en dash in the message: replace with a comma, colon, or period.
- Vague subject ("wip", "fix stuff", "various improvements"): name the actual change in imperative mood, under 72 chars, e.g. "Fix TOCTOU race in session reload".
- Body only if the diff cannot explain itself: WHY, constraints, verification. Never a line-by-line diff narration.

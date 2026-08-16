---
description: Commit and PR message contract, always injected
alwaysApply: true
---

# Commit and PR messages

- Subject: imperative mood, concrete, under 72 chars. "Fix TOCTOU race in session reload", never "fix stuff", "WIP", "various improvements", "cleanup".
- Body only when the diff cannot explain itself: state WHY, constraints, and tradeoffs. Never narrate the diff line by line.
- Same style bans as everywhere: no em/en dashes, no filler, no emojis.
- PR titles and bodies follow the same rules. PR body: what changed, why, how it was verified.

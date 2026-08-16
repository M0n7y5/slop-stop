---
description: Interrupts on em/en dashes in prose or written files
scope: "text, tool:edit(*), tool:write(*)"
interruptMode: always
condition:
  - '[—–―]'
---

You used an em-dash or en-dash. That output was discarded. Rewrite it without any dash punctuation.

Replace the dash with a comma, colon, period, or parentheses. Numeric ranges use the word "to" or a hyphen. This applies to prose, comments, docs, and string literals alike.

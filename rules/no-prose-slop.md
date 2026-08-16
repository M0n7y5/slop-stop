---
description: Interrupts on sycophancy, filler openers/closers, and apology slop in replies
scope: "text"
interruptMode: always
condition:
  - '(?i)(?:^|\n)[ \t]*(?:great|excellent|good|fantastic|interesting) question'
  - '(?i)(?:^|\n)[ \t]*(?:sure|certainly|absolutely|of course)[!,] '
  - '(?i)you(?:''| a)re absolutely right'
  - '(?i)i(?:''d| would) be (?:happy|glad|delighted) to'
  - '(?i)hope (?:this|that) helps'
  - '(?i)let me know if you (?:need|have|want|run)'
  - '(?i)feel free to (?:ask|reach|open|let)'
  - '(?i)happy to (?:help|clarify|assist|elaborate|dig)'
  - '(?i)(?:^|\n)[ \t]*let me (?:explain|walk you through|start by|dive)'
  - '(?i)it(?:''s| is) (?:also )?(?:worth noting|important to (?:note|remember|understand))'
  - '(?i)you might want to consider'
  - '(?i)i apologi[sz]e for'
  - '(?i)(?:^|\n)[ \t]*(?:uh oh|oops|oh no)\b'
  - '(?i)would you like me to'
---

You wrote reply slop. That output was discarded. Rewrite it.

- Sycophancy ("Great question", "You're absolutely right"), pleasantry openers, closers ("Hope this helps", "Let me know if..."): delete, start with the answer, end when the answer ends.
- Throat-clearing ("Let me explain", "It's worth noting"): delete the phrase, state the fact.
- Apologies and "Uh oh": state cause and fix, matter-of-fact.
- "Would you like me to X?": either do X, or ask tersely: "Want me to X?"

Lead with the answer or next action. Key detail after. One concrete next step if work remains.

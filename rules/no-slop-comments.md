---
description: Interrupts generation when a slop comment appears in edit/write output
scope: "tool:edit(*), tool:write(*)"
interruptMode: always
condition:
  - '(?i)(?:^|\n)[ \t]*(?://|--|@\*|<!\x2d\x2d)[ \t]+(?:(?:now|first|next|then|finally),? we\b|(?:first|next|then|finally), |now, |let''s\b|lets |here we\b|we (?:now|then|need|want|will|can|just|simply)\b)'
  - '(?i)(?:^|\n)[ \t]*#[ \t]+(?:(?:now|first|next|then|finally),? we\b|(?:first|next|then|finally), |let''s\b|here we\b|we (?:now|then|need|want|will|can|just|simply)\b)'
  - '(?i)(?:^|\n)[ \t]*(?://|#|--|@\*|<!\x2d\x2d)[ \t]+(?:creates?|initializes?|instantiates?|defines?|declares?|sets?|gets?|updates?|increments?|decrements?|computes?|calculates?|parses?|builds?|constructs?|handles?|processes?|stores?|saves?|reads?|writes?|sends?|fetch(?:es)?|validates?|converts?|returns?|calls?|invokes?|imports?|adds?|removes?|deletes?|opens?|closes?|starts?|stops?|prints?|logs?) (?:the|a|an|all|each|our|this|that|new)\b'
  - '(?i)(?:^|\n)[ \t]*(?://|#|--|@\*|<!\x2d\x2d)[ \t]+(?:checks? (?:if|whether)|loops? (?:through|over)|iterates? (?:through|over)|make sure)\b'
  - '(?i)(?:^|\n)[ \t]*(?://|#|--|@\*|<!\x2d\x2d)[ \t]+(?:added|changed|updated|modified|renamed|moved|removed|deleted|refactored|new:|now (?:uses|using|takes|returns|handles))\b'
  - '(?i)(?:^|\n)[ \t]*(?://|#|--|/\*|@\*|<!\x2d\x2d)[ \t.]*(?:rest of (?:the )?(?:code|file|function|class|method|implementation)|existing (?:code|implementation|logic)|unchanged[ \t]*\.?[ \t]*(?:\*/|\*@|\x2d\x2d>)?[ \t]*(?:\n|$)|no changes? (?:here|needed)|same as (?:above|before)|as before\b|remaining (?:code|methods|functions)|(?:methods|functions|implementation) omitted)'
  - '(?:^|\n)[ \t]*(?://|#|--|@\*|<!\x2d\x2d)[ \t]*(?:\.\.\.|…)[ \t]*(?:\*/|\*@|\x2d\x2d>)?[ \t]*(?:\n|$)'
  - '(?:^|\n)[ \t]*(?://|#|--)[ \t]*[=~*-]{5,}'
  - '(?i)(?:^|\n)[ \t]*(?://|#|--)[ \t]*(?:todo|fixme):?[ \t]+(?:implement|add|fix|handle|finish|complete)\b'
  - '(?i)(?:^|\n)[ \t]*(?://|#|--)[ \t]+(?:this (?:function|method|class|module) (?:is responsible for|handles|is used to|will|takes|returns|creates|defines|implements|provides|checks)\b|(?:a |the )?helper (?:function|method|class) (?:to|for|that)\b|(?:function|method) (?:to|that)\b)'
  - '(?i)(?:^|\n)[ \t]*(?://|#|--)[ \t]*(?:add (?:appropriate |proper |more |some )?(?:error handling|validation)|handle edge cases)[ \t]*\.?[ \t]*(?:\n|$)'
---

You wrote a slop comment. It was discarded. Rewrite the edit without it.

- Narration, restating the code, diff commentary, self-description, banners: delete the comment entirely. The code already says it.
- Placeholder elision ("rest of the code", "..."): PROHIBITED. Emit the complete real code for the region you are editing.
- TODO-style stub: implement it now or state the missing prerequisite to the user. Do not leave a stub.

Comments are only for public API docs and genuinely non-obvious WHY (invariants, workarounds with issue links, safety/perf constraints). Everything else: no comment.

---
description: Interrupts on tautological, empty, mirror, or sleep-based tests
scope: "tool:edit(*), tool:write(*)"
globs: ["*test*", "*Test*", "*TEST*", "*spec*", "*Spec*", "**/*test*/**", "**/*Test*/**", "**/*spec*/**", "**/*Spec*/**"]
interruptMode: always
condition:
  - '(?i)\b(?:assert|expect|check)[._]?(?:is)?true\s*\(\s*true\s*\)|\bxctasserttrue\s*\(\s*true\s*\)|expect\(true\)\.toBe\(true\)|expect\(\s*true\s*,\s*(?:isTrue|true)\s*\)|expect\(1\)\.toBe\(1\)|\bassert True[ \t]*(?:\n|$)|\bassert\s*\(\s*true\s*\)\s*;|\bassert\.ok\(\s*true\s*\)'
  - '(?:^|\n)[ \t]*(?:it|test|testWidgets)\(\s*[''"][^''"\n]+[''"]\s*,\s*(?:async\s*)?\(\s*\)\s*(?:=>\s*)?\{\s*\}\s*[,)]'
  - 'expect\(\s*(\w+)\([^()\n]*\)\s*\)\s*\.\s*to(?:Be|Equal|StrictEqual|MatchObject)\(\s*\1\('
  - '(?i)\b(?:assert[._]?(?:are)?equals?|(?:expect|assert)_eq|expect|check)\s*\(\s*(\w+)\([^()\n]*\)\s*,\s*\1\('
  - '(?i)\b(?:assert|expect)\w*\s*\(\s*(\w+)\([^()\n]*\)\s*==\s*\1\('
  - '\[(?:Test|Fact|TestMethod)[^\]]*\]\s*(?:public\s+|private\s+|internal\s+|static\s+|async\s+)*(?:void|Task)\s+\w+\s*\(\s*\)\s*\{\s*\}'
  - '(?i)(?:^|\n)(?![^\n]*\b(?:while|for)\b\s*[({])[^\n]*(?:\bthread\.sleep\(|\btask\.delay\(|\bfuture\.delayed\(|(?:time|asyncio)\.sleep\(|\bsleep_for\(|\busleep\(|page\.waitfortimeout\()'
---

You wrote a slop test. It was discarded. Rewrite it.

- Tautology (`Assert.True(true)`, `EXPECT_TRUE(true)`, `expect(true, isTrue)`, `assert True`) or an empty test body: the test must assert real behavior, or not exist.
- Mirror assertion (expected value computed by the same code under test, any framework): derive the expectation by hand as a literal or fixture.
- Sleep-based waiting (`Thread.Sleep`, `Task.Delay`, `Future.delayed`, `time.sleep`, `sleep_for`, `page.waitForTimeout`): wait for the actual condition. A sleep is valid only when time itself is under test, with a WHY comment.

A test earns its place by naming the production bug it would catch.

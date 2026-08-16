---
description: Test honesty contract, always injected
alwaysApply: true
---

# Test discipline

- A test earns its place by naming the production bug it would catch. Cannot name one: do not write it.
- Derive expected values by hand: literals or fixtures, never computed by the code under test or its helpers.
- Assert behavior of the real thing. An assertion that can only fail if the mock is absent tests nothing; the mock earns no assertions.
- One behavior per test. "and" in the name means split it.
- No production methods that only tests call. Test-only cleanup lives in test utilities.
- If you must mock, mirror the real payload completely; a fake that accepts anything verifies nothing.
- Wait for conditions, never guessed durations. Never green a flaky test by raising its timeout; find the race. A sleep is valid only when time itself is under test, with a WHY comment.
- Tests run silent: no warnings, deprecations, or leaked logs in the output.

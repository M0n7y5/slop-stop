# slop-stop

All-in-one omp pack for better LLM output: no comment slop, no reply slop, dense and actionable responses. Two mechanisms per concern: an always-injected contract that tells the model what good output is, and TTSR (Time-Traveling Stream Rules) enforcement that aborts, discards, and retries generation the moment slop appears in the live stream.

## Layers

| File | Kind | Governs |
| --- | --- | --- |
| `rules/comment-policy.md` | contract (always-apply) | Code comments: public API docs, non-obvious WHY, and required pragmas only |
| `rules/response-style.md` | contract (always-apply) | Replies: answer first, numbered steps, one next action, no filler/hedging/preamble/closers, concrete estimates, matter-of-fact errors |
| `rules/commit-policy.md` | contract (always-apply) | Commit/PR messages: imperative concrete subject under 72 chars, WHY-only body |
| `rules/code-style.md` | contract (always-apply) | Code: nothing speculative, no single-use abstractions, surgical changes that trace to the request, what-not-how names |
| `rules/test-style.md` | contract (always-apply) | Tests: name the bug they catch, hand-derived expectations, no mock-assertions, condition waits over sleeps, silent output |
| `rules/no-slop-comments.md` | TTSR on `edit`/`write` | Narrative comments, code-restating, diff commentary, placeholder elisions, banners, ownerless TODOs |
| `rules/no-prose-slop.md` | TTSR on `text` | Sycophancy ("Great question", "You're absolutely right"), closers ("Hope this helps"), throat-clearing, apology slop |
| `rules/no-slop-commits.md` | TTSR on `bash` | Dashes and vague subjects ("wip", "various improvements") in `git commit` / `gh pr` commands, blocked before the command runs |
| `rules/no-slop-tests.md` | TTSR on `edit`/`write` of test paths | Tautologies (`expect(true).toBe(true)`), empty test bodies, mirror assertions, sleep-based waits (`time.sleep`, `page.waitForTimeout`) |
| `rules/no-dashes.md` | TTSR on `text` + `edit`/`write` | Em/en dashes anywhere |

On a TTSR match the offending partial output is discarded, a corrective `<system-interrupt>` is injected, and the model retries; tool-stream matches abort before the command executes. Contracts cost ~700 tokens per request; enforcement costs one re-generation per trigger.

## Install

```sh
omp plugin link /path/to/slop-stop   # local checkout
# or: omp install <this-repo>
```

Recommended, so rules re-arm within a session instead of firing once:

```sh
omp config set ttsr.repeatMode after-gap
omp config set ttsr.repeatGap 5
```

## Test

```sh
omp ttsr list
echo '// Now we initialize the client' | omp ttsr test --rule rules/no-slop-comments.md --file - --source tool --tool edit --path src/foo.ts
echo 'Hope this helps!' | omp ttsr test --rule rules/no-prose-slop.md --file - --source text
omp ttsr scan src/   # find pre-existing slop in a repo
```

Regression corpus: `evals/cases.jsonl` replays 144 slop/legit cases through the real matcher (scope and glob gates included). Run `bun evals/run.ts` after any `condition` or `globs` change; CI runs it on every push.

## Known false-positive classes (accepted)

- Ruby/YARD API docs of the form `# Returns the ...` (verb-plus-article pattern).
- Tutorial markdown headings like `# First, install dependencies` or `# Create a new project`.
- Quoting third-party prose that itself contains slop phrases or dashes.

An interrupt is recoverable: the model rewrites without the flagged phrase. Tune by editing `condition` lists or narrowing `scope` globs, then re-run `bun evals/run.ts`.

## Disable

```sh
omp config set ttsr.disabledRules '["no-dashes"]'   # drop one TTSR rule
omp plugin disable slop-stop                        # drop the whole pack
```

Contracts (`comment-policy`, `response-style`, `code-style`, `test-style`, `commit-policy`) have no per-rule toggle; delete or edit the file.

## Credits

Adapted, all MIT: [i-have-adhd](https://github.com/ayghri/i-have-adhd) (reply structure: action first, numbered steps, visible progress), [concise](https://github.com/o4f6bgpac3/concise) (reply density: filler and hedging removal, answer-first pattern), [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) (code discipline: nothing speculative, surgical changes), [superpowers](https://github.com/obra/superpowers) (test honesty: name the break, no mirror asserts, condition waits; weasel-claim bans). Workflow and process content from those projects was deliberately not taken: the omp harness owns workflow.

## License

MIT.

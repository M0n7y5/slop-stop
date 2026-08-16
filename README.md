# slop-stop

omp rule pack against LLM comment slop. Two layers:

1. `rules/comment-policy.md` (always-apply): injected into every system prompt. Comments are allowed only for public API docs, non-obvious WHY (invariants, workarounds with issue links, safety/perf constraints), and required machinery (pragmas, license headers). Bans narration, code-restating, diff commentary, placeholder elisions, banners, ownerless TODOs, em/en dashes, semicolon-chained prose.
2. TTSR enforcement (Time-Traveling Stream Rules), matched against the model's live output:
   - `rules/no-slop-comments.md`: fires on slop comments in `edit`/`write` streams.
   - `rules/no-dashes.md`: fires on em/en dashes in prose and written files.

   On match, generation is aborted, the offending partial output is discarded, a corrective `<system-interrupt>` is injected, and the model retries.

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
omp ttsr scan src/   # find pre-existing slop in a repo
```

## Known false-positive classes (accepted)

- Ruby/YARD API docs of the form `# Returns the ...` (verb-plus-article pattern).
- Tutorial markdown headings like `# First, install dependencies` or `# Create a new project`.
- Legit em/en dashes in prose files the model rewrites (the point of the rule).

An interrupt is recoverable: the model rewrites the hunk without the flagged phrase. Tune by editing the `condition` lists or narrowing `scope` globs (e.g. `tool:edit(*.py)`), then re-run `omp ttsr test`.

## Disable

```sh
omp config set ttsr.disabledRules '["no-dashes"]'   # drop one rule
omp plugin disable slop-stop                        # drop the pack
```

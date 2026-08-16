#!/usr/bin/env bun
// Regression harness: replays evals/cases.jsonl through `omp ttsr test`
// (the real parser, scope and glob gates included). Exit 1 on any mismatch.

import { join, dirname } from "node:path";

const root = dirname(import.meta.dir);
const casesFile = join(import.meta.dir, "cases.jsonl");

type Case = {
  rule: string;
  source: "text" | "tool" | "thinking";
  expect: boolean;
  snippet: string;
  tool?: string;
  path?: string;
};

const cases: Case[] = (await Bun.file(casesFile).text())
  .split("\n")
  .filter(Boolean)
  .map((l) => JSON.parse(l));

async function runCase(c: Case): Promise<string | null> {
  const args = [
    "ttsr", "test",
    "--rule", join(root, "rules", `${c.rule}.md`),
    "--file", "-",
    "--source", c.source,
    "--json",
  ];
  if (c.tool) args.push("--tool", c.tool);
  if (c.path) args.push("--path", c.path);
  const proc = Bun.spawn(["omp", ...args], { stdin: "pipe", stdout: "pipe", stderr: "pipe" });
  proc.stdin.write(c.snippet + "\n");
  proc.stdin.end();
  const raw = await new Response(proc.stdout).text();
  await proc.exited;
  let triggered: boolean;
  try {
    triggered = JSON.parse(raw).triggered.length > 0;
  } catch {
    return `UNPARSEABLE (${c.rule}): ${raw.slice(0, 120)}`;
  }
  if (triggered === c.expect) return null;
  return `${c.expect ? "MISS" : "FALSE-POSITIVE"} [${c.rule}${c.path ? ` @ ${c.path}` : ""}]: ${JSON.stringify(c.snippet.slice(0, 90))}`;
}

const POOL = 8;
const failures: string[] = [];
for (let i = 0; i < cases.length; i += POOL) {
  const results = await Promise.all(cases.slice(i, i + POOL).map(runCase));
  for (const r of results) if (r) failures.push(r);
}

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`\n${failures.length}/${cases.length} cases failed`);
  process.exit(1);
}
console.log(`OK: ${cases.length} cases pass`);

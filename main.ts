// The Meeting That Should Have Been One Line
// Writes the single sentence that could have replaced an entire pointless
// meeting to /output/entry.txt. The gate requires UTF-8 text of 1-200
// characters, so the program assembles the line from its clauses and
// refuses to write anything that breaks the gate instead of shipping a
// bad entry.
//
// The line itself: the meeting had no update and no moved deadline, so the
// only thing it produced was an hour spent learning that together — the
// exact email everyone avoided sending. It kills the meeting outright
// (there was nothing to meet about), it is drawn from real office life
// (the status meeting with no status), and its sting is the last clause:
// an hour of twelve people, replaceable by one email nobody read.
import { mkdirSync, writeFileSync } from "node:fs";

const CLAUSES = [
  "There is no update",
  "the deadline hasn't moved",
  "and we just spent an hour discovering that together instead of reading it in one email",
];

const ENTRY = CLAUSES.join(", ") + ".";

// Gate self-check: 1-200 chars, exactly one sentence, no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} chars, outside the 1-200 gate`);
}
if ((ENTRY.match(/\./g) ?? []).length !== 1 || !ENTRY.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

// Never delete /output: create it if missing, overwrite entry.txt in place.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

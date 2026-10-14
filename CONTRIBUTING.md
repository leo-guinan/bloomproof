# Contributing to Bloom Proof

## The bar

Every entry needs three things: the story (a real human's problem), the code (an open-source repo, or an open dataset), and a named human shown actually using the artifact for its stated purpose. The human may be the author — "used" is the test, not "built".

A live site or app is welcome but optional. Entries with one get a "See it live" or "Get the app" badge; code-only entries get "See the code". The badge always matches what the entry has — nothing more.

## How to add an entry

1. Copy `entries/template.md` to `entries/draft-your-entry-name.md`.
2. Fill in every section: Problem, Solution, Artifact, Human, License.
3. Open a pull request. The maintainer assigns the entry number on merge (next is 008; numbers are never reused, see `entries/failed/`).

## PR checklist

Your PR is reviewed against this checklist. Missing any item? It gets closed with the checklist pasted back — no hard feelings, fix it and reopen.

- [ ] Story present (a real human's problem, one paragraph)
- [ ] Code URL included (open-source repo, or open dataset)
- [ ] Named human with real use shown (quote, photo, video, or documented outcome)
- [ ] Open license stated (MIT, Apache-2.0, CC BY-SA 4.0, CC0, or similar)
- [ ] Live site/app URL included if one exists (a repo alone is allowed — the badge will read "See the code")

## What gets rejected

- Vaporware: announcements, roadmaps, "coming soon"
- Closed source: if the artifact isn't open, it's not an entry
- No real use: a human must be shown actually using it, not just building it
- Marketing: entries document real help, not product launches

## Review process

Maintainers review PRs in the open. Discussion happens on the PR. Merges are fast when the checklist is clean.

Before anything publishes, a human reviewer also runs the safety checklist on the code:

- Public repo, open to inspection
- OSI-approved license
- README explains what it does
- No obfuscated code or unexplained binaries
- Dependencies come from reputable registries

No review can promise absolute safety. The claim is "reviewed by a human" — nothing more.

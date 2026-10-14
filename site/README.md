# Bloom Proof site

React + Vite frontend for the Bloom Proof collection. It is a fully static site
hosted on GitHub Pages at bloomproof.org — there is no backend. Submissions made
in the browser are kept in localStorage on that device.

## Run

```sh
cd site
npm install
npm run dev
```

Open http://127.0.0.1:5173 in a browser.

## Sharing a story (v1 path)

The share form composes the story as entry markdown and opens a pre-filled
GitHub issue for one-click sending (or a pre-filled email to the owner as a
fallback). The lasting record is a GitHub pull request, reviewed in the open
per [CONTRIBUTING.md](../CONTRIBUTING.md): copy `entries/template.md`, fill in
every section, and open a PR.

## Shape

Every story follows `entries/template.md`: Problem, Solution, Artifact (type +
URL + open license), Human (name + quote), plus an optional link to a photo or
video.

## Deploy

Pushing to `main` builds and deploys automatically via
[.github/workflows/deploy.yml](../.github/workflows/deploy.yml). The custom
domain is pinned by `public/CNAME`.

## Build from markdown

`npm run build` does three things: `prebuild` parses `entries/NNN-*.md`
into `src/data/entries.generated.json` (gitignored — never hand-edit it),
`vite build` bundles the client, and `postbuild` prerenders every route to
static HTML plus `sitemap.xml`, `robots.txt`, and `search-index.json`. A
contributor's PR touches one markdown file; the build does everything else.

## Workflow: test before main

No direct commits to `main`. All work happens on feature branches:

1. Create a branch, make your change.
2. Test locally with `npm run dev` (hot-reload dev server).
3. Test the production build: `npm run build`, then `npm run preview`
   (serves `dist/` exactly as deployed).
4. Merge to `main` only after visual QA in a real browser. Nothing
   untested goes to `main`.

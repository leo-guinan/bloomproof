# Entry template

The bar in one line: every entry needs the story, the code, and a named human shown actually using the artifact for its stated purpose (the human may be the author; "used" is the test, not "built").

Submit as `entries/draft-<slug>.md` — the maintainer assigns the entry number on merge. Never reuse numbers. Only files named `entries/NNN-<slug>.md` publish; drafts and this template are skipped by the build.

The site is built from these files: a contributor's PR touches one markdown file and the build does everything else. Keep the five `##` sections and the labeled lines below exactly as shown — the parser reads them.

## Problem

Who had what problem? One paragraph, a real human's problem.

## Solution

What does the AI do about it? Plain language, no jargon.

## Artifact

- Code: (open-source repo URL — or the open dataset URL if the open artifact is data, not code)
- Open license: (e.g. MIT, Apache-2.0, CC BY-SA 4.0, CC0)
- Live site: (browser, no install, works now — include at most one of this or the App line)
- App: (mobile/desktop app URL — include at most one of this or the Live site line)
- Project site: (optional — the project's homepage; becomes the main "Open the project" button)
- (Optional extra labeled lines for other relevant URLs: dataset, paper, demo. Each appears on the story page as a link under its own label.)

How the site uses these lines: the story badge reads "See it live" for Live site entries, "Get the app" for App entries, and "See the code" for code-only entries. The main button points at the Project site when present, otherwise at the Live site / App / Code URL. Every other line carrying a URL appears beneath it as a labeled link.

## Human

Name the human and show the artifact in real use — a quote, a photo, a video, or a documented outcome they got from it.

Then, on their own lines at the end of this section, the two structured lines the site displays. Name is required; Quote is optional (leave it out when there is no direct quote).

Name: (the human, as shown on the site — e.g. Amina Diallo, Dakar rice farmer)
Quote: (their own words, plain sentence, no quotation marks — the site adds those)

## License

The open license covering this entry's artifact, exactly as it should appear on the site (e.g. MIT).

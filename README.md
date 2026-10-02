# FAIRLEA website

React foundation for [fairlea.de](https://fairlea.de). The application uses
React Router framework mode, Vite, Tailwind CSS, shadcn/ui, and local MDX
content. Every public route is rendered to static HTML and can be hosted by
GitHub Pages without a runtime server.

The previous Jekyll implementation is preserved in `old-stack/` as a migration
reference. It is intentionally excluded from the current build and tooling.

## Requirements

- Node.js 22 (`>=22.12.0 <23`)
- npm 10

Use the version from `.nvmrc` when a Node version manager is available.

## Commands

```sh
npm ci
npm run dev
```

| Command                | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start the React Router development server.  |
| `npm run build`        | Build and verify the static Pages artifact. |
| `npm run preview`      | Preview the generated `dist/client` output. |
| `npm run lint`         | Run ESLint.                                 |
| `npm run format`       | Format maintained files with Prettier.      |
| `npm run format:check` | Check formatting without changing files.    |
| `npm run check`        | Run lint, formatting checks, and the build. |

## Architecture

- `site.config.js` is the source of truth for locales, site metadata,
  navigation, canonical URLs, legacy redirects, prerender paths, and sitemap
  entries.
- `src/routes.js` maps the route manifest to React Router route modules.
- `src/root.jsx` provides the document shell, global layout, and root error
  boundary. Its early bootstrap applies the saved theme and resolves `/` to a
  language before hydration.
- `src/content/pages/` holds automatically discovered, paired long-form MDX
  content. Home and About both render the same `project-overview` pair.
- `src/content/data/` validates and collects structured team, event, and
  research entries.
- `scripts/finalize-static-build.js` creates Pages-specific output and verifies
  that every public route was generated.

Every canonical page is generated below `/en/` and `/de/` with trailing-slash
URLs. The language switch keeps the current route, query, and fragment. The URL
is the source of truth; `fairlea:locale` is only used when resolving `/`.

The appearance setting supports `system`, `light`, and `dark`. It is stored in
`fairlea:theme`; `system` follows live operating-system color-scheme changes.

## Content

Use paired `.en.mdx` and `.de.mdx` files for long-form editorial pages. Shared
renderers in `src/components/mdx/` provide consistent and accessible markup.
The build fails if either language is missing. Migration-specific editorial
follow-ups are tracked in `CONTENT_REVIEW.md`.

Global branding belongs in `public/` when it needs a stable URL (for example
the favicon) or in `src/assets/brand/` when it is imported by a component.
Entity-specific images live beside the entity's `index.js` and are imported so
Vite can validate and fingerprint them.

Team members, events, and research entries live in individual directories:

```text
src/content/team/christian-rueckert/index.js
src/content/events/project-meeting-2026/index.js
src/content/research/example-publication/index.js
```

The collections discover every `index.js` automatically. IDs must be unique,
both translations are mandatory for translatable fields, and validation errors
fail the production build.

### Team member

```js
import portrait from './portrait.jpg'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'example-person',
  name: 'Example Person',
  image: {
    src: portrait,
    alt: 'Example Person',
    width: 1200,
    height: 1600,
  },
  order: 10,
  links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/' }],
  translations: {
    en: { role: 'Researcher', biography: ['English biography.'] },
    de: { role: 'Wissenschaftlerin', biography: ['Deutsche Biografie.'] },
  },
})
```

`role` is optional. If supplied, it is required in both languages. Biography
paragraphs are always arrays and must contain at least one non-empty paragraph
per language.

### Event

```js
import photo from './photo-01.jpg'
import { defineEvent } from '../../data/schema.js'

export default defineEvent({
  id: 'example-event',
  startDate: '2027-03-10T09:00:00+01:00',
  endDate: '2027-03-10T17:00:00+01:00',
  timeZone: 'Europe/Berlin',
  order: 10,
  images: [
    {
      src: photo,
      width: 1600,
      height: 900,
      kind: 'photo',
      translations: {
        en: { alt: 'English description' },
        de: { alt: 'Deutsche Beschreibung' },
      },
    },
  ],
  links: [
    {
      href: 'https://example.com/',
      translations: {
        en: { label: 'Further information' },
        de: { label: 'Weitere Informationen' },
      },
    },
  ],
  translations: {
    en: { title: 'Example event', location: 'Bayreuth', summary: 'Summary.' },
    de: {
      title: 'Beispielveranstaltung',
      location: 'Bayreuth',
      summary: 'Zusammenfassung.',
    },
  },
})
```

Date-only values use `YYYY-MM-DD`; date-times require an explicit UTC offset.
The renderer formats them with `en-GB` or `de-DE` and the configured IANA time
zone. `summary` is optional; when present it is required in both languages.
Use `kind: 'poster'` for prominent event artwork and `kind: 'photo'` for the
gallery.

### Research entry

```js
import { defineResearchEntry } from '../../data/schema.js'

export default defineResearchEntry({
  id: 'example-publication',
  citation: 'Author (2027): Original publication title.',
  href: 'https://doi.org/example',
  year: 2027,
  order: 10,
  category: 'project',
  translations: {
    en: { summary: 'English contextual summary.' },
    de: { summary: 'Deutsche Einordnung.' },
  },
})
```

Bibliographic citations remain in their published language. The optional
contextual summary must be supplied in both languages when used.

For a long, formatted biography, event description, or research explanation,
add `body.en.mdx` and `body.de.mdx` next to the entry's `index.js`. Both files
are required as a pair and replace the short text when rendered. Content files
never define layout JSX; shared React components own the presentation.

Repository content is trusted at build time. Do not accept or compile arbitrary
user-provided MDX.

## GitHub Pages deployment

The workflow in `.github/workflows/pages.yml` validates pull requests and
deploys `dist/client` after successful pushes to `main`. Pull requests never
deploy.

Before the first React deployment:

1. Finish and review the content migration on the feature branch.
2. Open **Settings → Pages → Build and deployment** in GitHub.
3. Change **Source** from **Deploy from a branch** to **GitHub Actions**.
4. Merge the completed migration into `main`.
5. Verify the new workflow, custom domain, HTTPS, direct route loads, and the
   custom 404 page.

The existing `pages-build-deployment` history belongs to GitHub's managed
branch/Jekyll workflow. It remains visible in Actions but is superseded after
the Pages source is changed. The custom domain remains configured in GitHub;
`public/CNAME` mirrors it into the generated artifact.

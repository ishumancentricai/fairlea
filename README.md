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

- `site.config.js` is the source of truth for site metadata, navigation,
  canonical URLs, prerender paths, and sitemap entries.
- `src/routes.js` maps the route manifest to React Router route modules.
- `src/root.jsx` provides the document shell, global layout, and root error
  boundary.
- `src/content/pages/` holds long-form MDX content.
- `src/content/data/` holds structured JavaScript collections for team members,
  events, and publications.
- `scripts/finalize-static-build.js` creates Pages-specific output and verifies
  that every public route was generated.

The route manifest uses canonical trailing-slash URLs. When adding a public
page, update the manifest and add its route module. Prerendering and the sitemap
then update from the same definition.

## Content

Use MDX for long-form editorial pages. Shared renderers in
`src/components/mdx/` provide consistent and accessible markup. Use the JSDoc
contracts in `src/content/data/collections.js` for structured collections.

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

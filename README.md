# FAIRLEA Website

Die Website für [fairlea.de](https://fairlea.de) basiert auf React 19, React
Router, Vite, Tailwind CSS und shadcn/ui. Alle deutschen und englischen Seiten
werden beim Build als statische Dateien erzeugt und über GitHub Pages
veröffentlicht.

## Lokal ausführen

### Voraussetzungen

- Node.js 22 (`>=22.12.0 <23`)
- npm 10

Die vorgesehene Node-Version steht zusätzlich in `.nvmrc`. Mit einem Node
Version Manager kann sie beispielsweise so aktiviert werden:

```sh
nvm use
```

Anschließend im Repository-Verzeichnis die exakt im Lockfile festgehaltenen
Abhängigkeiten installieren und den Entwicklungsserver starten:

```sh
npm ci
npm run dev
```

Die lokale Adresse wird anschließend im Terminal ausgegeben. Änderungen an
Komponenten und Content werden während der Entwicklung automatisch übernommen.

Vor einem Commit sollte die vollständige lokale Prüfung ausgeführt werden:

```sh
npm run check
```

Weitere Befehle:

| Befehl                 | Zweck                                                          |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Startet den lokalen Entwicklungsserver.                        |
| `npm run build`        | Erstellt und validiert die statische Website in `dist/client`. |
| `npm run preview`      | Zeigt den zuvor erzeugten Produktions-Build lokal an.          |
| `npm run lint`         | Prüft den JavaScript- und React-Code mit ESLint.               |
| `npm run format`       | Formatiert die gepflegten Dateien mit Prettier.                |
| `npm run format:check` | Prüft die Formatierung, ohne Dateien zu verändern.             |
| `npm run check`        | Führt Lint, Format-Check und Produktions-Build aus.            |

## Deployment

Das Deployment wird vollständig durch
[`.github/workflows/pages.yml`](.github/workflows/pages.yml) übernommen. Ein
Push beziehungsweise ein Merge auf `main` reicht aus:

```sh
git push origin main
```

Der Workflow führt automatisch folgende Schritte aus:

1. Abhängigkeiten mit `npm ci` installieren.
2. Lint und Formatierung prüfen.
3. Den statischen Produktions-Build erstellen.
4. Ausschließlich `dist/client` als GitHub-Pages-Artefakt veröffentlichen.

Pull Requests werden ebenfalls vollständig geprüft, aber niemals deployt. Den
Status eines Deployments findet man im GitHub-Repository unter **Actions** im
Workflow **Validate and deploy Pages**. Bei Bedarf kann derselbe Workflow dort
auch manuell gestartet werden.

Voraussetzung ist, dass unter **Settings → Pages → Build and deployment** als
Quelle **GitHub Actions** ausgewählt ist. Die Domain wird weiterhin über
GitHub Pages verwaltet; `public/CNAME` enthält zusätzlich `fairlea.de` für das
erzeugte Artefakt.

## Content hinzufügen

Teammitglieder, Events und Research-Einträge liegen jeweils in einem eigenen
Unterordner:

```text
src/content/team/<id>/index.js
src/content/events/<id>/index.js
src/content/research/<id>/index.js
```

Alle `index.js`-Dateien in diesen Verzeichnissen werden automatisch gefunden.

Für alle Content-Typen gelten folgende Regeln:

- `id` verwendet ausschließlich Kleinbuchstaben, Zahlen und Bindestriche
  (`kebab-case`) und ist innerhalb der jeweiligen Collection eindeutig.
- Der Verzeichnisname sollte der `id` entsprechen, damit Dateien leicht
  auffindbar bleiben.
- `visible: true` veröffentlicht den Eintrag. Mit `visible: false` kann ein
  vollständiger Entwurf im Repository verbleiben, ohne angezeigt zu werden.
- Übersetzbare Inhalte werden vollständig unter `translations.en` und
  `translations.de` gepflegt. Es gibt keine automatische Übersetzung.
- Bilder liegen direkt neben dem zugehörigen `index.js` und werden importiert.
  `width` und `height` geben die intrinsische Pixelgröße der Originaldatei an.
- Änderungen mit `npm run check` prüfen. Fehlende Übersetzungen, doppelte IDs,
  ungültige Werte oder unvollständige MDX-Paare lassen den Build fehlschlagen.

### Teammitglied hinzufügen

Beispielstruktur:

```text
src/content/team/example-person/
├── index.js
└── portrait.jpg
```

Beispiel für `index.js`:

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
  visible: true,
  former: false,
  order: 10,
  links: [
    { label: 'Email', href: 'mailto:person@example.org' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/example' },
    {
      label: 'Google Scholar',
      href: 'https://scholar.google.com/citations?user=example',
    },
  ],
  translations: {
    en: {
      role: 'Researcher',
      biography: ['First English paragraph.', 'Second English paragraph.'],
    },
    de: {
      role: 'Wissenschaftliche Mitarbeiterin',
      biography: ['Erster deutscher Absatz.', 'Zweiter deutscher Absatz.'],
    },
  },
})
```

| Attribut                       | Bedeutung                                                                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                           | Eindeutige ID und Anker der Person, beispielsweise `#example-person`.                                                                                              |
| `name`                         | Vollständiger, nicht übersetzter Name.                                                                                                                             |
| `image`                        | Pflichtbild mit importierter Quelle, Alt-Text sowie Breite und Höhe.                                                                                               |
| `visible`                      | Steuert, ob die Person auf der Website erscheint.                                                                                                                  |
| `former`                       | `true` zeigt die Person im separaten Abschnitt „Ehemalige“ an.                                                                                                     |
| `order`                        | Positive Ganzzahl für die Reihenfolge. Sie muss innerhalb der sichtbaren aktuellen beziehungsweise ehemaligen Mitglieder eindeutig sein.                           |
| `links`                        | Liste aus `label` und `href`; eine leere Liste ist erlaubt. E-Mail, LinkedIn und Google Scholar erhalten anhand von URL beziehungsweise Label ihr jeweiliges Icon. |
| `translations.en/de.role`      | Optionale Rolle. Sobald sie in einer Sprache gesetzt ist, muss sie in beiden vorhanden sein.                                                                       |
| `translations.en/de.biography` | Pflichtfeld mit mindestens einem Absatz als String-Array.                                                                                                          |

### Event hinzufügen

Beispielstruktur:

```text
src/content/events/example-event/
├── index.js
├── poster.png
└── photo-01.jpg
```

Beispiel für `index.js`:

```js
import photo from './photo-01.jpg'
import poster from './poster.png'
import { defineEvent } from '../../data/schema.js'

export default defineEvent({
  id: 'example-event',
  startDate: '2027-03-10T09:00:00+01:00',
  endDate: '2027-03-10T17:00:00+01:00',
  timeZone: 'Europe/Berlin',
  visible: true,
  images: [
    {
      src: poster,
      width: 1200,
      height: 1600,
      kind: 'poster',
      translations: {
        en: { alt: 'English description of the poster' },
        de: { alt: 'Deutsche Beschreibung des Posters' },
      },
    },
    {
      src: photo,
      width: 1600,
      height: 900,
      kind: 'photo',
      translations: {
        en: { alt: 'English description', caption: 'Optional caption' },
        de: {
          alt: 'Deutsche Beschreibung',
          caption: 'Optionale Bildunterschrift',
        },
      },
    },
  ],
  links: [
    {
      href: 'https://example.org/',
      translations: {
        en: { label: 'Further information' },
        de: { label: 'Weitere Informationen' },
      },
    },
  ],
  translations: {
    en: {
      title: 'Example event',
      location: 'Bayreuth',
      summary: 'Short English description.',
    },
    de: {
      title: 'Beispielveranstaltung',
      location: 'Bayreuth',
      summary: 'Kurze deutsche Beschreibung.',
    },
  },
})
```

| Attribut                              | Bedeutung                                                                                                                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                                  | Eindeutige ID und Anker des Events.                                                                                                  |
| `startDate`                           | Start als ISO-Datum (`YYYY-MM-DD`) oder ISO-Zeitstempel mit explizitem UTC-Offset.                                                   |
| `endDate`                             | Optionales Ende im gleichen Format; darf nicht vor dem Start liegen.                                                                 |
| `timeZone`                            | Gültige IANA-Zeitzone für die lokalisierte Anzeige, üblicherweise `Europe/Berlin`.                                                   |
| `visible`                             | Steuert, ob das Event angezeigt wird.                                                                                                |
| `images`                              | Geordnete Bildliste; eine leere Liste ist erlaubt. `poster` wird direkt vollständig angezeigt, `photo` als Vorschau und im Carousel. |
| `images[].translations.en/de.alt`     | Verpflichtender Alt-Text in beiden Sprachen.                                                                                         |
| `images[].translations.en/de.caption` | Optionale Bildunterschrift. Sobald sie gesetzt ist, muss sie in beiden Sprachen vorhanden sein.                                      |
| `links`                               | Geordnete Liste externer Links mit zweisprachigem Linktext; eine leere Liste ist erlaubt.                                            |
| `translations.en/de.title`            | Verpflichtender lokalisierter Veranstaltungstitel.                                                                                   |
| `translations.en/de.location`         | Verpflichtender lokalisierter Veranstaltungsort.                                                                                     |
| `translations.en/de.summary`          | Optionale Kurzbeschreibung. Sobald sie gesetzt ist, muss sie in beiden Sprachen vorhanden sein.                                      |

Events besitzen kein `order`-Attribut. Sie werden automatisch nach
`startDate` absteigend sortiert, das neueste Event steht also zuerst.

### Research-Eintrag hinzufügen

Beispielstruktur:

```text
src/content/research/example-publication/
└── index.js
```

Beispiel für `index.js`:

```js
import { defineResearchEntry } from '../../data/schema.js'

export default defineResearchEntry({
  id: 'example-publication',
  citation: 'Author (2027): Original publication title.',
  href: 'https://doi.org/example',
  year: 2027,
  visible: true,
  order: 1,
  category: 'project',
  translations: {
    en: { summary: 'English contextual summary.' },
    de: { summary: 'Deutsche Einordnung.' },
  },
})
```

| Attribut                     | Bedeutung                                                                                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                         | Eindeutige ID und Anker der Publikation.                                                                                                       |
| `citation`                   | Vollständige bibliografische Angabe in der veröffentlichten Originalsprache.                                                                   |
| `href`                       | Externe Zieladresse, beispielsweise DOI oder Publikationsseite.                                                                                |
| `year`                       | Publikationsjahr als Ganzzahl größer als 1900.                                                                                                 |
| `visible`                    | Steuert, ob der Eintrag angezeigt wird.                                                                                                        |
| `order`                      | Positive Ganzzahl für die Reihenfolge innerhalb desselben Jahres und derselben Kategorie. Dort muss sie für sichtbare Einträge eindeutig sein. |
| `category`                   | `project` für FAIRLEA-Projektpublikationen oder `related` für verwandte Forschung.                                                             |
| `translations.en/de.summary` | Optionale zweisprachige Einordnung. Wird `translations` verwendet, sind beide Zusammenfassungen Pflicht.                                       |

Research-Einträge werden zuerst nach Jahr absteigend und innerhalb eines Jahres
nach `order` aufsteigend sortiert. Die Zitation selbst wird nicht übersetzt.

### Längere Texte mit MDX

Wenn eine Biografie, Eventbeschreibung oder Research-Einordnung Überschriften,
Listen oder eingebettete Links benötigt, können neben `index.js` zwei MDX-Dateien
angelegt werden:

```text
body.en.mdx
body.de.mdx
```

Beide Dateien sind immer gemeinsam erforderlich. Der lokalisierte MDX-Body wird
anstelle der kurzen Biografie, `summary` beziehungsweise Research-Einordnung
gerendert. Die strukturellen Pflichtfelder des jeweiligen `index.js` bleiben
trotzdem gültig; insbesondere benötigt ein Teammitglied weiterhin die
zweisprachigen `biography`-Arrays.

Content-Dateien enthalten ausschließlich Inhalte. Layout und Darstellung
bleiben in den gemeinsamen React-Komponenten.

import poster from './poster.png'
import { defineEvent } from '../../data/schema.js'

export default defineEvent({
  id: 'crypto-crime-2026',
  startDate: '2026-10-08T09:30:00+02:00',
  endDate: '2026-10-08T18:15:00+02:00',
  timeZone: 'Europe/Berlin',
  order: 1,
  images: [
    {
      src: poster,
      width: 1448,
      height: 1086,
      kind: 'poster',
      translations: {
        en: {
          alt: 'Official poster for the 3rd Bayreuther IT-Strafrechtstag, “Crypto Crime – Auf der Spur des digitalen Geldes”',
        },
        de: {
          alt: 'Offizielles Plakat zum 3. Bayreuther IT-Strafrechtstag „Crypto Crime – Auf der Spur des digitalen Geldes“',
        },
      },
    },
  ],
  links: [
    {
      href: 'https://www.strafrecht2.uni-bayreuth.de/de/Bayreuther-IT-Strafrechtstag/index.php',
      translations: {
        en: { label: 'Further information and registration' },
        de: { label: 'Weitere Informationen und Anmeldung' },
      },
    },
    {
      href: 'https://www.strafrecht2.uni-bayreuth.de/pool/dokumente/Tagungsflyer-2026-_Digital_.pdf',
      translations: {
        en: { label: 'Download programme flyer' },
        de: { label: 'Programmflyer herunterladen' },
      },
    },
  ],
  translations: {
    en: {
      title:
        '3rd Bayreuther IT-Strafrechtstag: “Crypto Crime – Auf der Spur des digitalen Geldes”',
      location: 'University of Bayreuth, FZA Conference Room',
    },
    de: {
      title:
        '3. Bayreuther IT-Strafrechtstag: „Crypto Crime – Auf der Spur des digitalen Geldes“',
      location: 'Universität Bayreuth, FZA-Konferenzraum',
    },
  },
})

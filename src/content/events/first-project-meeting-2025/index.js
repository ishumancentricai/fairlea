import photo01 from './photo-01.png'
import photo02 from './photo-02.jpeg'
import { defineEvent } from '../../data/schema.js'

export default defineEvent({
  id: 'first-project-meeting-2025',
  startDate: '2025-12-02',
  endDate: '2025-12-03',
  timeZone: 'Europe/Vienna',
  order: 3,
  images: [
    {
      src: photo01,
      width: 2268,
      height: 4032,
      kind: 'photo',
      translations: {
        en: { alt: 'First project meeting in Vienna, photo 1' },
        de: { alt: 'Erstes Projekttreffen in Wien, Foto 1' },
      },
    },
    {
      src: photo02,
      width: 4032,
      height: 3024,
      kind: 'photo',
      translations: {
        en: { alt: 'First project meeting in Vienna, photo 2' },
        de: { alt: 'Erstes Projekttreffen in Wien, Foto 2' },
      },
    },
  ],
  links: [],
  translations: {
    en: {
      title: 'First Project Meeting',
      location: 'Complexity Science Hub Vienna, Iknaio',
    },
    de: {
      title: 'First Project Meeting',
      location: 'Complexity Science Hub Vienna, Iknaio',
    },
  },
})

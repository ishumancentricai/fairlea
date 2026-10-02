import photo01 from './photo-01.png'
import photo02 from './photo-02.png'
import { defineEvent } from '../../data/schema.js'

export default defineEvent({
  id: 'second-project-meeting-2026',
  startDate: '2026-06-17',
  endDate: '2026-06-18',
  timeZone: 'Europe/Berlin',
  order: 2,
  images: [
    {
      src: photo01,
      width: 1024,
      height: 576,
      kind: 'photo',
      translations: {
        en: { alt: 'Bamberg meeting group photo' },
        de: { alt: 'Gruppenfoto des Projekttreffens in Bamberg' },
      },
    },
    {
      src: photo02,
      width: 575,
      height: 1024,
      kind: 'photo',
      translations: {
        en: { alt: 'Sign at the Bamberg public prosecutor general’s office' },
        de: { alt: 'Schild der Generalstaatsanwaltschaft Bamberg' },
      },
    },
  ],
  links: [],
  translations: {
    en: {
      title: 'Second Project Meeting',
      location:
        'Generalstaatsanwaltschaft Bamberg, Zentralstelle Cybercrime Bayern',
    },
    de: {
      title: 'Second Project Meeting',
      location:
        'Generalstaatsanwaltschaft Bamberg, Zentralstelle Cybercrime Bayern',
    },
  },
})

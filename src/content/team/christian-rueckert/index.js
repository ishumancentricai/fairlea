import portrait from './portrait.jpeg'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'christian-rueckert',
  name: 'Prof. Dr. Christian Rückert',
  image: {
    src: portrait,
    alt: 'Prof. Dr. Christian Rückert',
    width: 2362,
    height: 3543,
  },
  order: 1,
  links: [
    { label: 'Email', href: 'mailto:lehrstuhl.str2@uni-bayreuth.de' },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/christian-rückert-296122189',
    },
  ],
  translations: {
    en: {
      biography: [
        'Christian Rückert is one of the leading legal experts on both the use of AI for law enforcement and the fight against crypotasset-related crime. He has presented on both research areas at high-level conferences and published in top-tier journals, legal practice handbooks, and commentaries. He has also advised the German Federal Government and the Bundestag on issues relating to cybercrime.',
      ],
    },
    de: {
      biography: [
        'Christian Rückert ist einer der führenden Rechtsexperten sowohl für den Einsatz von KI in der Strafverfolgung als auch für die Bekämpfung von Kryptoasset-bezogener Kriminalität. Er hat zu beiden Forschungsgebieten auf hochrangigen Konferenzen vorgetragen und in führenden Fachzeitschriften, Praxishandbüchern und Kommentaren veröffentlicht. Zudem hat er die Bundesregierung und den Bundestag zu Fragen der Cyberkriminalität beraten.',
      ],
    },
  },
})

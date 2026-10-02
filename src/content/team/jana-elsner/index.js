import portrait from './portrait.png'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'jana-elsner',
  name: 'Jana Elsner',
  image: { src: portrait, alt: 'Jana Elsner', width: 1278, height: 1496 },
  visible: true,
  former: false,
  order: 5,
  links: [
    { label: 'Email', href: 'mailto:jana.elsner@uni-bayreuth.de' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jana-elsner-40a798382/',
    },
  ],
  translations: {
    en: {
      biography: [
        'Jana Elsner is a legal doctoral candidate and research associate specializing in criminal procedure law, with a focus on the use of artificial intelligence in criminal prosecution and law enforcement in the cryptocurrency sector.',
      ],
    },
    de: {
      biography: [
        'Jana Elsner ist Doktorandin der Rechtswissenschaften und wissenschaftliche Mitarbeiterin mit Spezialisierung auf das Strafprozessrecht. Ihr Schwerpunkt liegt auf dem Einsatz künstlicher Intelligenz in der Strafverfolgung und bei Ermittlungen im Bereich der Kryptowährungen.',
      ],
    },
  },
})

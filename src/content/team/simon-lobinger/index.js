import portrait from './portrait.png'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'simon-lobinger',
  name: 'Simon Lobinger',
  image: { src: portrait, alt: 'Simon Lobinger', width: 675, height: 803 },
  visible: true,
  former: false,
  order: 10,
  links: [
    { label: 'Email', href: 'mailto:simon.lobinger@uni-bayreuth.de' },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/simon-lobinger-87108926b',
    },
  ],
  translations: {
    en: {
      biography: [
        'Simon Lobinger is a student research assistant at the Chair of Criminal Law, Criminal Procedure and IT Criminal Law (Prof. Dr. Christian Rückert) with a special interest in the law of digitization and the digitization of law.',
      ],
    },
    de: {
      biography: [
        'Simon Lobinger ist studentische Hilfskraft am Lehrstuhl für Strafrecht, Strafprozessrecht und IT-Strafrecht von Prof. Dr. Christian Rückert. Sein besonderes Interesse gilt dem Recht der Digitalisierung und der Digitalisierung des Rechts.',
      ],
    },
  },
})

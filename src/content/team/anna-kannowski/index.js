import portrait from './portrait.jpg'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'anna-kannowski',
  name: 'Anna Kannowski',
  image: { src: portrait, alt: 'Anna Kannowski', width: 2738, height: 3327 },
  visible: true,
  former: false,
  order: 12,
  links: [
    { label: 'Email', href: 'mailto:anna.kannowski@uni-bayreuth.de' },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/thomas-goger-134342353',
    },
  ],
  translations: {
    en: {
      biography: [
        'Anna Kannowski is a student research assistant at the Chair of Criminal Law, Criminal Procedure and IT Criminal Law of Prof. Dr. Christian Rückert at the University of Bayreuth with a special interest in the use of AI for law enforcement and cryptoasset forensics.',
      ],
    },
    de: {
      biography: [
        'Anna Kannowski ist studentische Hilfskraft am Lehrstuhl für Strafrecht, Strafprozessrecht und IT-Strafrecht von Prof. Dr. Christian Rückert an der Universität Bayreuth. Ihr besonderes Interesse gilt dem Einsatz von KI in der Strafverfolgung und der Kryptoasset-Forensik.',
      ],
    },
  },
})

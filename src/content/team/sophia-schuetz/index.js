import portrait from './portrait.jpg'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'sophia-schuetz',
  name: 'Sophia Schütz',
  image: { src: portrait, alt: 'Sophia Schütz', width: 480, height: 640 },
  visible: true,
  former: false,
  order: 10,
  links: [{ label: 'Email', href: 'mailto:sophia.schuetz@uni-bayreuth.de' }],
  translations: {
    en: {
      biography: [
        'Sophia Schütz is a student research assistant at the Chair of Criminal Law, Criminal Procedure and IT Criminal Law of Prof. Dr. Christian Rückert at the University of Bayreuth with a special interest in the use of AI for law enforcement.',
      ],
    },
    de: {
      biography: [
        'Sophia Schütz ist studentische Hilfskraft am Lehrstuhl für Strafrecht, Strafprozessrecht und IT-Strafrecht von Prof. Dr. Christian Rückert an der Universität Bayreuth. Ihr besonderes Interesse gilt dem Einsatz von KI in der Strafverfolgung.',
      ],
    },
  },
})

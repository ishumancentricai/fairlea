import portrait from './portrait.jpeg'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'leopold-mueller',
  name: 'Leopold Müller',
  image: { src: portrait, alt: 'Leopold Müller', width: 639, height: 955 },
  visible: true,
  former: false,
  order: 6,
  links: [
    { label: 'Email', href: 'mailto:leopold.mueller@uni-bayreuth.de' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/leopoldmueller' },
  ],
  translations: {
    en: {
      biography: [
        'Leopold Müller is a researcher at the Branch Business & Information Systems Engineering of the Fraunhofer FIT and a PhD candidate at the University of Bayreuth at the Chair of Information Systems and Human-Centric AI. In his research, he focuses on developing LLM solutions for real-world applications and AI-based decision support systems in minimal invasive surgeries.',
      ],
    },
    de: {
      biography: [
        'Leopold Müller ist wissenschaftlicher Mitarbeiter am Institutsteil Wirtschaftsinformatik des Fraunhofer FIT und Doktorand am Lehrstuhl für Wirtschaftsinformatik und humanzentrische KI der Universität Bayreuth. In seiner Forschung beschäftigt er sich mit der Entwicklung von LLM-Lösungen für reale Anwendungsszenarien und KI-basierten Entscheidungsunterstützungssystemen in der minimalinvasiven Chirurgie.',
      ],
    },
  },
})

import portrait from './portrait.jpg'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'arian-javaheri',
  name: 'Arian Javaheri',
  image: { src: portrait, alt: 'Arian Javaheri', width: 1080, height: 998 },
  visible: true,
  former: false,
  order: 12,
  links: [
    { label: 'Email', href: 'mailto:arian.javaheri@uni-bayreuth.de' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/arian-javaheri-38a79921a/',
    },
  ],
  translations: {
    en: {
      biography: [
        'Arian Javaheri is a student research assistant at Fraunhofer FIT and a computer science student at the University of Bayreuth. He develops LLM-based AI agents to enhance business processes in platform and innovation management and supports AI-driven automation projects at Siemens Healthineers.',
      ],
    },
    de: {
      biography: [
        'Arian Javaheri ist studentische Hilfskraft am Fraunhofer FIT und Informatikstudent an der Universität Bayreuth. Er entwickelt LLM-basierte KI-Agenten zur Verbesserung von Geschäftsprozessen im Plattform- und Innovationsmanagement und unterstützt KI-gestützte Automatisierungsprojekte bei Siemens Healthineers.',
      ],
    },
  },
})

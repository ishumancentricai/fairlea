import portrait from './portrait.jpg'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'niklas-kuehl',
  name: 'Prof Dr. Niklas Kühl',
  image: {
    src: portrait,
    alt: 'Prof Dr. Niklas Kühl',
    width: 2519,
    height: 3778,
  },
  visible: true,
  former: false,
  order: 2,
  links: [
    { label: 'Email', href: 'mailto:kuehl@uni-bayreuth.de' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/niklaskuehl' },
    {
      label: 'Google Scholar',
      href: 'https://scholar.google.com/citations?user=79KpdDQAAAAJ',
    },
  ],
  translations: {
    en: {
      biography: [
        'Niklas Kühl is a full professor of information systems and human-centric AI at the University of Bayreuth, with roles at Fraunhofer FIT, FIM Research Institute, and IBM. His research spans machine learning, human-AI collaboration, fairness, and appropriate reliance. Previously, he led AI projects at IBM and earned his PhD (information systems) and habilitation (applied computer science) at the Karlsruhe Institute of Technology. He has published over 130 peer-reviewed articles and collaborates with global institutions like CMU, UT Austin, and MIT-IBM Watson AI Lab.',
      ],
    },
    de: {
      biography: [
        'Niklas Kühl ist Professor für Wirtschaftsinformatik und humanzentrische KI an der Universität Bayreuth und zudem am Fraunhofer FIT, am FIM Forschungsinstitut und bei IBM tätig. Seine Forschung umfasst maschinelles Lernen, die Zusammenarbeit zwischen Mensch und KI, Fairness und angemessenes Vertrauen. Zuvor leitete er KI-Projekte bei IBM und schloss am Karlsruher Institut für Technologie (KIT) seine Promotion in Wirtschaftsinformatik sowie seine Habilitation in Angewandter Informatik ab. Er hat mehr als 130 peer-reviewte Artikel veröffentlicht und arbeitet mit internationalen Forschungseinrichtungen wie der CMU, der UT Austin und dem MIT-IBM Watson AI Lab zusammen.',
      ],
    },
  },
})

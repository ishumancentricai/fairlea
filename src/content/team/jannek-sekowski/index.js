import portrait from './portrait.jpg'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'jannek-sekowski',
  name: 'Jannek Sekowski',
  image: { src: portrait, alt: 'Jannek Sekowski', width: 1580, height: 1580 },
  visible: true,
  former: false,
  order: 7,
  links: [
    { label: 'Email', href: 'mailto:jannek.sekowski@uni-bayreuth.de' },
    { label: 'LinkedIn', href: 'https://de.linkedin.com/in/jannek-sekowski' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=rf9UGl8AAAAJ' }
  ],
  translations: {
    en: {
      biography: [
        'Jannek Sekowski is a computer scientist, researcher at the Business & Information Systems Engineering branch of Fraunhofer FIT, and a PhD candidate at the Chair of Information Systems and Human-Centric AI at the University of Bayreuth. His research combines machine learning with human-computer interaction and human-centered AI, spanning from end-to-end model development to the design and evaluation of intelligent interactive systems, as well as effective human oversight of high-risk AI systems.',
      ],
    },
    de: {
      biography: [
        'Jannek Sekowski ist Informatiker, wissenschaftlicher Mitarbeiter am Institutsteil Wirtschaftsinformatik des Fraunhofer FIT und Doktorand am Lehrstuhl für Wirtschaftsinformatik und menschenzentrierte KI der Universität Bayreuth. Seine Forschung verbindet maschinelles Lernen mit Mensch-Computer-Interaktion (HCI) und menschenzentrierter KI. Sie reicht von der End-to-End-Modellentwicklung über die Gestaltung und Evaluation intelligenter interaktiver Systeme bis hin zur wirksamen menschlichen Aufsicht über Hochrisiko-KI-Systeme.',
      ],
    },
  },
})

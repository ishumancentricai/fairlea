import portrait from './portrait.jpg'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'thomas-niedermayer',
  name: 'Thomas Niedermayer',
  image: {
    src: portrait,
    alt: 'Thomas Niedermayer',
    width: 1500,
    height: 1500,
  },
  visible: true,
  former: false,
  order: 8,
  links: [
    { label: 'Email', href: 'mailto:thomas.niedermayer@iknaio.io' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/thomas-niedermayer' },
  ],
  translations: {
    en: {
      biography: [
        "Thomas Niedermayer is a data engineer at Iknaio Cryptoasset Analytics specializing in crypto data processing and investigative analytics. He works on developing Graphsense, an open source cryptoasset analytics software and creates crypto analytics solutions to combat crime at scale. Thomas holds a Master's degree in data science from Vienna University of Technology and a Bachelor's in mathematics from the University of Vienna.",
      ],
    },
    de: {
      biography: [
        'Thomas Niedermayer ist Data Engineer bei Iknaio Cryptoasset Analytics und auf die Verarbeitung von Kryptodaten sowie investigative Analysen spezialisiert. Er arbeitet an der Entwicklung von Graphsense, einer Open-Source-Software für Kryptoasset-Analysen, und entwickelt skalierbare Kryptoanalyselösungen zur Kriminalitätsbekämpfung. Thomas hat einen Masterabschluss in Data Science von der Technischen Universität Wien und einen Bachelorabschluss in Mathematik von der Universität Wien.',
      ],
    },
  },
})

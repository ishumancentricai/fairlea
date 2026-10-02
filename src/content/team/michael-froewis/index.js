import portrait from './portrait.png'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'michael-froewis',
  name: 'Michael Fröwis',
  image: { src: portrait, alt: 'Michael Fröwis', width: 512, height: 512 },
  visible: true,
  former: false,
  order: 9,
  links: [
    { label: 'Email', href: 'mailto:michael.froewis@iknaio.com' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/michael-f-470b37287',
    },
  ],
  translations: {
    en: {
      biography: [
        'Michael Fröwis is a software engineer at Iknaio Cryptoasset Analytics specializing in smart contract analysis and cryptoasset analytics. He works on developing GraphSense, an open source cryptoasset analytics software, and builds crypto analytics solutions to combat crime at scale. Michael holds a PhD in computer science from the University of Innsbruck, where his research focused on Ethereum and blockchain analysis, including smart contract immutability, token system detection, and cryptocurrency forensics.',
      ],
    },
    de: {
      biography: [
        'Michael Fröwis ist Softwareentwickler bei Iknaio Cryptoasset Analytics und auf Smart-Contract-Analysen sowie Kryptoasset-Analysen spezialisiert. Er arbeitet an der Entwicklung von GraphSense, einer Open-Source-Software für Kryptoasset-Analysen, und entwickelt skalierbare Kryptoanalyselösungen zur Kriminalitätsbekämpfung. Michael promovierte in Informatik an der Universität Innsbruck. Seine Forschung konzentrierte sich auf Ethereum- und Blockchain-Analysen, darunter die Unveränderlichkeit von Smart Contracts, die Erkennung von Token-Systemen und Kryptowährungsforensik.',
      ],
    },
  },
})

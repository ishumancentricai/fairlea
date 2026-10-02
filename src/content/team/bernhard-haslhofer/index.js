import portrait from './portrait.jpg'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'bernhard-haslhofer',
  name: 'Dr. Bernhard Haslhofer',
  image: {
    src: portrait,
    alt: 'Dr. Bernhard Haslhofer',
    width: 248,
    height: 248,
  },
  visible: true,
  former: false,
  order: 3,
  links: [
    { label: 'Email', href: 'mailto:haslhofer@csh.ac.at' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/bernhardhaslhofer' },
  ],
  translations: {
    en: {
      biography: [
        'Bernhard Haslhofer is a faculty member and the leader of the Digital Currency Ecosystems research group at the Complexity Science Hub. His general research interest lies in developing and applying data science methods to extract insights from large-scale and interconnected datasets. Currently, he mostly focuses on analyzing cryptoasset and decentralized finance ecosystems. Previously, he was a thematic coordinator in the Data Science & Artificial Intelligence research group at the Austrian Institute of Technology (AIT), a Marie Curie fellow at Cornell Information Science, and an assistant professor at the University of Vienna. He received his doctorate in Computer Science from the University of Vienna and his M.S. in Economics and Computer Science from the Technical University of Vienna. Bernhard frequently collaborates in multidisciplinary settings and has published over 60 scientific articles in journals and conferences. He also contributed to international standardization efforts and has led many basic and applied research projects.',
      ],
    },
    de: {
      biography: [
        'Bernhard Haslhofer ist Faculty-Mitglied und Leiter der Forschungsgruppe „Digital Currency Ecosystems“ am Complexity Science Hub. Sein Forschungsschwerpunkt liegt auf der Entwicklung und Anwendung von Data-Science-Methoden, um Erkenntnisse aus großen, vernetzten Datensätzen zu gewinnen. Aktuell konzentriert er sich vor allem auf die Analyse von Krypto-Assets und dezentralen Finanz-Ökosystemen (DeFi). Zuvor war er Thematic Coordinator in der Forschungsgruppe „Data Science & Artificial Intelligence“ am Austrian Institute of Technology (AIT), Marie-Curie-Stipendiat an der Cornell University (Information Science) sowie Assistenzprofessor an der Universität Wien. Er promovierte in Informatik an der Universität Wien und erwarb seinen Masterabschluss in Wirtschaftsinformatik an der Technischen Universität Wien. Er arbeitet regelmäßig in multidisziplinären Forschungsumfeldern und hat mehr als 60 wissenschaftliche Artikel in Fachzeitschriften und auf Konferenzen veröffentlicht. Darüber hinaus wirkte er an internationalen Standardisierungsinitiativen mit und leitete zahlreiche Projekte in der Grundlagen- und angewandten Forschung.',
      ],
    },
  },
})

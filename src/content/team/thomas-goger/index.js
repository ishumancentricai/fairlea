import portrait from './portrait.jpg'
import { defineTeamMember } from '../../data/schema.js'

export default defineTeamMember({
  id: 'thomas-goger',
  name: 'Thomas Goger',
  image: { src: portrait, alt: 'Thomas Goger', width: 2012, height: 2002 },
  order: 4,
  links: [
    { label: 'Email', href: 'mailto:pressestelle@gensta-ba.bayern.de' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/thomas-goger-134342353' },
  ],
  translations: {
    en: {
      biography: [
        'Thomas Goger is Chief Public Prosecutor and Deputy Director of the Bavarian Central Office for the Prosecution of Cybercrime since it has been established in 2015. This office with currently 30 prosecutors and several IT specialists supporting them is one of the largest dedicated units in Europe for the prosecution of high-profile cyber cases. Thomas Goger has worked as a local prosecutor and district judge earlier in his career. He has been called upon as adviser to ministries and parliament on various cybercrime related topics. In 2016, he was seconded to the INTERPOL Global Complex for Innovation in Singapore for a few months. He has appeared as a speaker at and facilitator of various international events ever since. He is author of various articles in law journals on asset recovery regarding cryptocurrencies, on CSAM investigations and on MLAT reform. He has been a presenter at national and international conferences in Germany, Australia, France, Singapore, India, Croatia, Montenegro and the Philippines. He also is associated scientist with the research training group "Cybercrime & Forensic Computing" at the Friedrich-Alexander-University Erlangen-Nuremberg.',
      ],
    },
    de: {
      biography: [
        'Thomas Goger ist Leitender Oberstaatsanwalt und seit der Gründung im Jahr 2015 stellvertretender Leiter der Zentralstelle Cybercrime Bayern. Diese Behörde mit derzeit 30 Staatsanwältinnen und Staatsanwälten sowie mehreren unterstützenden IT-Fachkräften ist eine der größten spezialisierten Einheiten Europas für die Verfolgung bedeutender Cybercrime-Fälle. Zu Beginn seiner Laufbahn war Thomas Goger als Staatsanwalt und Amtsrichter tätig. Er wurde von Ministerien und Parlamenten wiederholt als Berater zu verschiedenen Themen der Cyberkriminalität hinzugezogen. Im Jahr 2016 war er für einige Monate an den INTERPOL Global Complex for Innovation in Singapur abgeordnet. Seither tritt er als Redner und Moderator bei zahlreichen internationalen Veranstaltungen auf. Er ist Autor diverser Beiträge in juristischen Fachzeitschriften zur Vermögensabschöpfung bei Kryptowährungen, zu Ermittlungen im Bereich von Darstellungen sexuellen Kindesmissbrauchs und zur Reform der Rechtshilfe. Er hielt bereits Vorträge auf nationalen und internationalen Konferenzen in Deutschland, Australien, Frankreich, Singapur, Indien, Kroatien, Montenegro und auf den Philippinen. Außerdem ist er assoziierter Wissenschaftler des Graduiertenkollegs „Cybercrime & Forensic Computing“ an der Friedrich-Alexander-Universität Erlangen-Nürnberg.'
      ],
    },
  },
})

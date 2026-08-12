import type { Term } from '../types'

export const viseSkjule: Term[] = [
  {
    slug: 'accordion',
    name: 'Accordion',
    english: 'accordion',
    aliases: [
      'trekkspill',
      'trekkspillmeny',
      'utvidbare rader',
      'fold ut liste',
      'spørsmål og svar',
      'faq',
    ],
    category: 'vise-skjule',
    short:
      'Rader som kan foldes ut én og én for å vise mer innhold – som en FAQ der svaret åpnes under spørsmålet.',
    sayIt: ['Vis spørsmålene som en accordion der svaret foldes ut under.'],
    related: ['details', 'sammenleggbar-seksjon', 'tabs'],
    confusedWith: ['tabs'],
    demo: 'accordion',
  },
  {
    slug: 'details',
    name: 'Details',
    english: 'details / disclosure',
    aliases: [
      'disclosure',
      'fold ut',
      'utvidbar rad',
      'pil som åpner',
      'vis skjult innhold',
      'ekspander',
    ],
    category: 'vise-skjule',
    short:
      'Én enkelt «fold ut»-rad med pil, som åpner og lukker innholdet under. En accordion er flere slike etter hverandre.',
    sayIt: ['Legg de avanserte valgene i en details-rad som er lukket som standard.'],
    related: ['accordion', 'sammenleggbar-seksjon', 'vis-mer'],
    demo: 'details',
  },
  {
    slug: 'sammenleggbar-seksjon',
    name: 'Sammenleggbar seksjon',
    english: 'collapsible section',
    aliases: [
      'collapsible',
      'kollaps',
      'slå sammen',
      'fold sammen',
      'ekspanderbar seksjon',
      'minimer',
      'klapp sammen',
    ],
    category: 'vise-skjule',
    short:
      'En hel seksjon eller et panel som kan slås sammen til bare overskriften, og foldes ut igjen ved behov.',
    sayIt: ['Gjør «Avanserte innstillinger» til en sammenleggbar seksjon som starter lukket.'],
    related: ['accordion', 'details', 'seksjon'],
    demo: 'sammenleggbar-seksjon',
  },
  {
    slug: 'vis-mer',
    name: 'Vis mer / vis mindre',
    english: 'show more',
    aliases: [
      'show more',
      'vis mer',
      'vis mindre',
      'les mer',
      'utvid teksten',
      'se alle',
      'avkortet tekst',
      'tre linjer med les mer',
    ],
    category: 'vise-skjule',
    short:
      'En knapp som utvider avkortet innhold – lang tekst eller en lang liste – og kan skjule det igjen.',
    sayIt: ['Kort ned beskrivelsen til tre linjer, med en «Vis mer»-knapp under.'],
    related: ['details', 'pagination', 'overflow'],
    demo: 'vis-mer',
  },
]

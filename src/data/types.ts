import type { DemoId } from '../demos/registry'

export type CategoryId =
  | 'byggeklosser'
  | 'layout'
  | 'tekst'
  | 'knapper'
  | 'felt'
  | 'menyer'
  | 'dialoger'
  | 'vise-skjule'
  | 'lister-data'
  | 'interaksjon'

export interface Category {
  id: CategoryId
  title: string
  /** Én kort setning til temakortet på forsiden. */
  short: string
  /** Innledning øverst på temasiden. */
  intro: string
  /** Slugs for noen representative begreper som vises på temakortet. */
  highlights: string[]
}

export interface Term {
  /** Stabil id som brukes i URL-er: /tema/<kategori>#<slug> */
  slug: string
  /** Norsk/primært navn. */
  name: string
  /** Vanlig engelsk eller teknisk navn, når det er nyttig. */
  english?: string
  /** Søkeord og hverdagslige formuleringer som skal treffe begrepet. */
  aliases: string[]
  category: CategoryId
  /** Svært kort forklaring, én til to setninger. */
  short: string
  /** Eksempler under «Slik kan du si det». */
  sayIt: string[]
  /** Slugs til relaterte begreper. */
  related?: string[]
  /** Slugs til begreper dette ofte forveksles med. */
  confusedWith?: string[]
  /** Hvilken demo som vises for begrepet. */
  demo: DemoId
}

export interface Comparison {
  /** Brukes i URL-en: /sammenlign/<slug> */
  slug: string
  title: string
  /** Én kort setning til lenkelister. */
  short: string
  /** Innledning på sammenligningssiden. */
  intro: string
  /** Begrepene som sammenlignes. */
  termSlugs: string[]
  demo: DemoId
  /** Kort oppsummering per begrep, vist under demoen. */
  points: { term: string; text: string }[]
}

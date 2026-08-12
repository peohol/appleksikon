import type { Category } from './types'

export const categories: Category[] = [
  {
    id: 'byggeklosser',
    title: 'Sider og byggeklosser',
    short: 'De store delene en app er bygget opp av – fra hele siden ned til kort og paneler.',
    intro:
      'Alt du ser i en app er satt sammen av noen få, store byggeklosser. Kjenner du navnene deres, kan du peke presist på hvilken del du vil endre.',
    highlights: ['kort', 'header', 'sidepanel', 'seksjon'],
  },
  {
    id: 'layout',
    title: 'Plassering, størrelse og luft',
    short: 'Ordene for hvor ting står, hvor store de er og hvor mye luft de har rundt seg.',
    intro:
      'Mye av det som «ser feil ut» handler om plassering, størrelse eller luft. Her er ordene som gjør at du kan si nøyaktig hvilken avstand du mener.',
    highlights: ['margin', 'padding', 'gap', 'sentrering'],
  },
  {
    id: 'tekst',
    title: 'Tekst og små markører',
    short: 'Tekstene, merkelappene og småsymbolene som forklarer og markerer ting.',
    intro:
      'Tekst er mer enn tekst: overskrifter, labels, hjelpetekster og små markører har hver sin jobb – og hvert sitt navn.',
    highlights: ['label', 'placeholder', 'badge', 'ikon'],
  },
  {
    id: 'knapper',
    title: 'Knapper og handlinger',
    short: 'Knappene og lenkene man trykker på – og tilstandene de kan være i.',
    intro:
      'Knapper finnes i flere varianter med hver sin rolle. Her lærer du å skille dem, og å beskrive tilstander som deaktivert og lastende.',
    highlights: ['hovedknapp', 'ikonknapp', 'menyknapp', 'disabled'],
  },
  {
    id: 'felt',
    title: 'Felt og skjemaer',
    short: 'Feltene brukeren fyller ut, og kontrollene for å velge og justere.',
    intro:
      'Skjemaer består av mange små kontroller med presise navn. Riktig ord her sparer deg for mange misforståelser.',
    highlights: ['checkbox', 'select', 'toggle', 'autocomplete'],
  },
  {
    id: 'menyer',
    title: 'Menyer og navigasjon',
    short: 'Måtene brukeren finner frem på – menyer, faner og stier.',
    intro:
      'Navigasjon er alt som hjelper brukeren å finne frem og vite hvor de er. «Meny» kan bety mange ting – her er de vanligste variantene.',
    highlights: ['tabs', 'handlingsmeny', 'breadcrumbs', 'wizard'],
  },
  {
    id: 'dialoger',
    title: 'Dialoger, lag og meldinger',
    short: 'Alt som legger seg oppå siden – fra små hint til vinduer som krever svar.',
    intro:
      'Noe innhold ligger ikke i siden, men oppå den. Disse lagene forstyrrer ulikt – fra en flyktig tooltip til en dialogboks som stopper alt.',
    highlights: ['modal', 'tooltip', 'toast', 'drawer'],
  },
  {
    id: 'vise-skjule',
    title: 'Vise, skjule og folde ut',
    short: 'Mønstrene for å folde ut og gjemme innhold, så siden holder seg ryddig.',
    intro:
      'Når det blir mye innhold, kan noe gjemmes til brukeren trenger det. Disse mønstrene folder innhold ut og inn.',
    highlights: ['accordion', 'details', 'vis-mer'],
  },
  {
    id: 'lister-data',
    title: 'Lister, data og tilstand',
    short: 'Å vise mange ting på en gang – og tilstandene mens data hentes eller mangler.',
    intro:
      'Lister og tabeller viser mange ting samtidig. Like viktig er tilstandene rundt: mens det laster, når det er tomt, og hvor langt noe er kommet.',
    highlights: ['tabell', 'filtrering', 'spinner', 'empty-state'],
  },
  {
    id: 'interaksjon',
    title: 'Interaksjon og skjermoppførsel',
    short: 'Ordene for det som skjer når du peker, klikker, drar og scroller.',
    intro:
      'Grensesnitt reagerer på det du gjør: peker, trykker, drar og scroller. Her er ordene for oppførselen – og for hvordan appen tilpasser seg skjermen.',
    highlights: ['hover', 'fokus', 'dra-og-slipp', 'responsiv'],
  },
]

export const categoriesById: Record<string, Category> = Object.fromEntries(
  categories.map((category) => [category.id, category]),
)

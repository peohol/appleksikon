import type { Comparison } from './types'

export const comparisons: Comparison[] = [
  {
    slug: 'margin-padding-gap',
    title: 'Margin, padding og gap',
    short: 'Tre typer luft: utenfor, inni og mellom.',
    intro:
      'Alle tre handler om luft, men på hver sin kant: margin er luften utenfor et element, padding er luften inni, og gap er den felles avstanden mellom elementer i samme rad eller rutenett. Juster gliderne og se hvilken luft som endrer seg.',
    termSlugs: ['margin', 'padding', 'gap'],
    demo: 'sml-margin-padding-gap',
    points: [
      { term: 'margin', text: 'Luft utenfor boksen – dytter naboene unna.' },
      { term: 'padding', text: 'Luft inni boksen – mellom kanten og innholdet.' },
      { term: 'gap', text: 'Én felles avstand mellom elementene i en rad eller et rutenett.' },
    ],
  },
  {
    slug: 'tooltip-popover-modal-toast',
    title: 'Tooltip, popover, modal og toast',
    short: 'Fire ting som legger seg oppå siden – med ulik styrke.',
    intro:
      'Alle fire dukker opp oppå siden, men de forstyrrer ulikt: tooltipen hinter når du peker, popoveren åpnes med klikk og henger fast i knappen sin, dialogboksen (modalen) stopper alt til du svarer, og toasten melder fra og forsvinner av seg selv. Prøv alle fire.',
    termSlugs: ['tooltip', 'popover', 'modal', 'toast'],
    demo: 'sml-overlays',
    points: [
      { term: 'tooltip', text: 'Vises ved hover/fokus. Bare kort tekst, aldri knapper.' },
      { term: 'popover', text: 'Åpnes med klikk, festet til knappen. Lukkes ved klikk utenfor.' },
      { term: 'modal', text: 'Legger seg over alt og må lukkes før du kan fortsette.' },
      { term: 'toast', text: 'Kommer i kanten av skjermen og forsvinner selv. Avbryter ikke.' },
    ],
  },
  {
    slug: 'checkbox-radio-toggle',
    title: 'Checkbox, radio og toggle',
    short: 'Velg flere, velg én – eller skru av og på.',
    intro:
      'Samme spørsmål kan trenge ulike kontroller: avmerkingsbokser når man kan velge flere, radioknapper når bare ett valg er mulig, og en av/på-bryter når valget skal gjelde med én gang. Her er alle tre brukt på samme tema – varsler.',
    termSlugs: ['checkbox', 'radiogruppe', 'toggle'],
    demo: 'sml-valg',
    points: [
      { term: 'checkbox', text: 'Velg null, én eller flere. Trer ofte i kraft ved «Lagre».' },
      { term: 'radiogruppe', text: 'Velg nøyaktig én av noen få muligheter.' },
      { term: 'toggle', text: 'Av eller på – og det skjer umiddelbart.' },
    ],
  },
  {
    slug: 'select-handlingsmeny-autocomplete',
    title: 'Select, handlingsmeny og autocomplete',
    short: 'Tre «nedtrekksmenyer» med helt ulike jobber.',
    intro:
      '«Nedtrekksmeny» kan bety tre forskjellige ting: et select-felt der du velger en verdi som blir stående, en handlingsmeny der du velger noe som skal skje, og en autocomplete der du skriver og velger blant forslag. Si hvilken du mener, så unngår du misforståelser.',
    termSlugs: ['select', 'handlingsmeny', 'autocomplete'],
    demo: 'sml-nedtrekk',
    points: [
      { term: 'select', text: 'Velger en verdi. Verdien blir stående i feltet.' },
      { term: 'handlingsmeny', text: 'Velger en handling. Menyen lukkes, noe skjer.' },
      { term: 'autocomplete', text: 'Du skriver, får forslag og velger ett av dem.' },
    ],
  },
  {
    slug: 'label-placeholder',
    title: 'Label og placeholder',
    short: 'Teksten som blir stående – og teksten som forsvinner.',
    intro:
      'Labelen står ved feltet hele tiden og sier hva feltet er. Placeholderen er eksempelteksten inni feltet – den forsvinner i det du begynner å skrive. Derfor kan ikke placeholderen gjøre jobben til en label alene.',
    termSlugs: ['label', 'placeholder'],
    demo: 'sml-label-placeholder',
    points: [
      { term: 'label', text: 'Navnet på feltet. Synlig hele tiden.' },
      { term: 'placeholder', text: 'Eksempel inni feltet. Borte i det du skriver.' },
    ],
  },
  {
    slug: 'sticky-fixed',
    title: 'Sticky og fixed',
    short: 'Begge blir liggende på skjermen – men de starter ulikt.',
    intro:
      'Et sticky element ligger i innholdet og scroller med – helt til det treffer kanten og fester seg der. Et fixed element ligger fast i vinduet hele tiden og er aldri med i scrollingen. Scroll i de to rutene og se forskjellen.',
    termSlugs: ['sticky', 'fixed'],
    demo: 'sml-sticky-fixed',
    points: [
      { term: 'sticky', text: 'Starter i innholdet, fester seg når det når kanten.' },
      { term: 'fixed', text: 'Ligger alltid samme sted i vinduet, uansett scrolling.' },
    ],
  },
  {
    slug: 'tabs-accordion',
    title: 'Faner og accordion',
    short: 'To måter å dele opp innhold – bortover eller nedover.',
    intro:
      'Begge deler innholdet i biter du åpner én og én. Faner bytter visning i samme flate og passer for få, likeverdige deler. En accordion folder innhold ut nedover på siden og passer for lengre lister, som spørsmål og svar. Her er samme innhold i begge mønstrene.',
    termSlugs: ['tabs', 'accordion'],
    demo: 'sml-tabs-accordion',
    points: [
      { term: 'tabs', text: 'Bytter innhold i samme flate. Én fane er alltid åpen.' },
      { term: 'accordion', text: 'Folder ut nedover. Alt kan være lukket, flere kan være åpne.' },
    ],
  },
]

export const comparisonsBySlug: Record<string, Comparison> = Object.fromEntries(
  comparisons.map((comparison) => [comparison.slug, comparison]),
)

/** Sammenligninger som inneholder et gitt begrep. */
export function comparisonsForTerm(termSlug: string): Comparison[] {
  return comparisons.filter((comparison) => comparison.termSlugs.includes(termSlug))
}

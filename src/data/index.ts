import type { CategoryId, Term } from './types'
import { byggeklosser } from './terms/byggeklosser'
import { layout } from './terms/layout'
import { tekst } from './terms/tekst'
import { knapper } from './terms/knapper'
import { felt } from './terms/felt'
import { menyer } from './terms/menyer'
import { dialoger } from './terms/dialoger'
import { viseSkjule } from './terms/viseSkjule'
import { listerData } from './terms/listerData'
import { interaksjon } from './terms/interaksjon'

export { categories, categoriesById } from './categories'

export const terms: Term[] = [
  ...byggeklosser,
  ...layout,
  ...tekst,
  ...knapper,
  ...felt,
  ...menyer,
  ...dialoger,
  ...viseSkjule,
  ...listerData,
  ...interaksjon,
]

export const termsBySlug: Record<string, Term> = Object.fromEntries(
  terms.map((term) => [term.slug, term]),
)

export function termsInCategory(categoryId: CategoryId): Term[] {
  return terms.filter((term) => term.category === categoryId)
}

/** URL til et begrep, f.eks. «/tema/felt#checkbox». */
export function termHref(slug: string): string {
  const term = termsBySlug[slug]
  return term ? `/tema/${term.category}#${term.slug}` : '/'
}

import { describe, expect, it } from 'vitest'
import { categories, categoriesById, terms, termsBySlug, termHref } from './index'
import { comparisons } from './comparisons'
import { demoRegistry } from '../demos/registry'

describe('leksikondata', () => {
  it('har alle de ti temaene', () => {
    expect(categories.map((category) => category.id)).toEqual([
      'byggeklosser',
      'layout',
      'tekst',
      'knapper',
      'felt',
      'menyer',
      'dialoger',
      'vise-skjule',
      'lister-data',
      'interaksjon',
    ])
  })

  it('har unike slugs for alle begreper', () => {
    const slugs = terms.map((term) => term.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('har kjernebegrepene fra spesifikasjonen', () => {
    for (const slug of [
      'side',
      'viewport',
      'header',
      'sidepanel',
      'kort',
      'margin',
      'padding',
      'gap',
      'sticky',
      'fixed',
      'label',
      'placeholder',
      'badge',
      'knapp',
      'hovedknapp',
      'disabled',
      'tekstfelt',
      'checkbox',
      'radiogruppe',
      'toggle',
      'select',
      'autocomplete',
      'validering',
      'navigasjonsmeny',
      'tabs',
      'breadcrumbs',
      'pagination',
      'wizard',
      'tooltip',
      'popover',
      'modal',
      'drawer',
      'bottom-sheet',
      'toast',
      'banner',
      'accordion',
      'details',
      'vis-mer',
      'liste',
      'tabell',
      'filtrering',
      'sortering',
      'empty-state',
      'spinner',
      'skeleton',
      'progress',
      'hover',
      'fokus',
      'dra-og-slipp',
      'inline-redigering',
      'angre',
      'scrollbar',
      'overflow',
      'responsiv',
      'mobilvisning',
      'desktopvisning',
    ]) {
      expect(termsBySlug[slug], `mangler begrep: ${slug}`).toBeDefined()
    }
  })

  it('alle begreper har gyldig kategori, innhold og demo', () => {
    for (const term of terms) {
      expect(categoriesById[term.category], `${term.slug}: ukjent kategori`).toBeDefined()
      expect(term.short.length, `${term.slug}: mangler forklaring`).toBeGreaterThan(10)
      expect(term.sayIt.length, `${term.slug}: mangler «Slik kan du si det»`).toBeGreaterThan(0)
      expect(term.aliases.length, `${term.slug}: mangler aliaser`).toBeGreaterThan(0)
      expect(demoRegistry[term.demo], `${term.slug}: ukjent demo «${term.demo}»`).toBeDefined()
    }
  })

  it('alle interne referanser peker på eksisterende begreper', () => {
    for (const term of terms) {
      for (const slug of [...(term.related ?? []), ...(term.confusedWith ?? [])]) {
        expect(termsBySlug[slug], `${term.slug} refererer til ukjent begrep «${slug}»`).toBeDefined()
        expect(slug, `${term.slug} refererer til seg selv`).not.toBe(term.slug)
      }
    }
  })

  it('alle kategorier har begreper, og highlights hører til kategorien', () => {
    for (const category of categories) {
      const categoryTerms = terms.filter((term) => term.category === category.id)
      expect(categoryTerms.length, `${category.id}: ingen begreper`).toBeGreaterThan(3)
      for (const slug of category.highlights) {
        const highlighted = termsBySlug[slug]
        expect(highlighted, `${category.id}: ukjent highlight «${slug}»`).toBeDefined()
        expect(highlighted.category, `${category.id}: highlight «${slug}» i feil kategori`).toBe(
          category.id,
        )
      }
    }
  })

  it('sammenligningene peker på eksisterende begreper og demoer', () => {
    const slugs = comparisons.map((comparison) => comparison.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const comparison of comparisons) {
      expect(demoRegistry[comparison.demo as keyof typeof demoRegistry]).toBeDefined()
      for (const slug of comparison.termSlugs) {
        expect(termsBySlug[slug], `${comparison.slug}: ukjent begrep «${slug}»`).toBeDefined()
      }
      for (const point of comparison.points) {
        expect(termsBySlug[point.term], `${comparison.slug}: ukjent punkt «${point.term}»`).toBeDefined()
      }
    }
  })

  it('termHref bygger dyplenker med tema og anker', () => {
    expect(termHref('checkbox')).toBe('/tema/felt#checkbox')
    expect(termHref('popover')).toBe('/tema/dialoger#popover')
    expect(termHref('padding')).toBe('/tema/layout#padding')
  })
})

import { describe, expect, it } from 'vitest'
import { searchTerms } from './search'

const slugsFor = (query: string) => searchTerms(query).map((term) => term.slug)

describe('searchTerms', () => {
  it('gir tomt resultat for tomt søk', () => {
    expect(searchTerms('')).toEqual([])
    expect(searchTerms('   ')).toEqual([])
  })

  it('finner begreper på eksakt navn først', () => {
    expect(slugsFor('padding')[0]).toBe('padding')
    expect(slugsFor('margin')[0]).toBe('margin')
    expect(slugsFor('gap')[0]).toBe('gap')
    expect(slugsFor('tooltip')[0]).toBe('tooltip')
  })

  it('finner modal via hverdagslige aliaser', () => {
    for (const query of [
      'modal',
      'dialog',
      'dialogboks',
      'popup',
      'pop-up',
      'sprettoppvindu',
      'vindu oppå siden',
      'boks som åpner seg',
    ]) {
      expect(slugsFor(query), `søk: ${query}`).toContain('modal')
    }
  })

  it('finner padding via hverdagslige aliaser', () => {
    for (const query of [
      'padding',
      'innvendig avstand',
      'luft inni',
      'luft inni boks',
      'avstand til kanten',
    ]) {
      expect(slugsFor(query), `søk: ${query}`).toContain('padding')
    }
  })

  it('finner gap via hverdagslige aliaser', () => {
    for (const query of [
      'gap',
      'mellomrom',
      'avstand mellom',
      'luft mellom kort',
      'avstand mellom elementer',
    ]) {
      expect(slugsFor(query), `søk: ${query}`).toContain('gap')
    }
  })

  it('er robust mot store bokstaver og ekstra mellomrom', () => {
    expect(slugsFor('  POP-UP  ')).toContain('modal')
    expect(slugsFor('LUFT   MELLOM kort')).toContain('gap')
  })

  it('finner begreper via engelsk navn', () => {
    expect(slugsFor('card')).toContain('kort')
    expect(slugsFor('breadcrumbs')).toContain('breadcrumbs')
    expect(slugsFor('combobox')).toContain('autocomplete')
  })

  it('takler flerordssøk der ordene står i ulike felt', () => {
    expect(slugsFor('meny med handlinger')).toContain('handlingsmeny')
    expect(slugsFor('runde hjørner')).toContain('border-radius')
  })

  it('gir ingen treff for tulleord', () => {
    expect(searchTerms('xyzzyq')).toEqual([])
  })
})

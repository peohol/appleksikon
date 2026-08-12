import { terms } from '../data'
import type { Term } from '../data/types'

/** Normaliserer tekst for søk: små bokstaver, uten tegnsetting, enkle mellomrom. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[-_/+.]/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

interface IndexedTerm {
  term: Term
  name: string
  english: string
  aliases: string[]
  /** Enkeltord fra navn, engelsk navn og aliaser. */
  primaryWords: string[]
  /** Enkeltord fra forklaringen i tillegg. */
  allWords: string[]
}

function toWords(values: string[]): string[] {
  const words = new Set<string>()
  for (const value of values) {
    for (const word of value.split(' ')) {
      if (word) words.add(word)
    }
  }
  return [...words]
}

const index: IndexedTerm[] = terms.map((term) => {
  const name = normalize(term.name)
  const english = term.english ? normalize(term.english) : ''
  const aliases = term.aliases.map(normalize)
  const primary = [name, english, ...aliases].filter(Boolean)
  return {
    term,
    name,
    english,
    aliases,
    primaryWords: toWords(primary),
    allWords: toWords([...primary, normalize(term.short)]),
  }
})

function scoreEntry(entry: IndexedTerm, query: string, queryWords: string[]): number {
  if (entry.name === query || entry.english === query) return 100
  if (entry.aliases.includes(query)) return 95
  if (entry.name.startsWith(query) || (entry.english && entry.english.startsWith(query))) {
    return 85
  }
  if (entry.aliases.some((alias) => alias.startsWith(query))) return 75
  if (entry.name.includes(query) || (entry.english && entry.english.includes(query))) {
    return 65
  }
  if (entry.aliases.some((alias) => alias.includes(query))) return 60
  if (queryWords.every((word) => entry.primaryWords.some((w) => w.startsWith(word)))) {
    return 50
  }
  if (queryWords.every((word) => entry.allWords.some((w) => w.startsWith(word)))) {
    return 30
  }
  return 0
}

/** Søk etter begreper på navn, engelsk navn, aliaser og forklaring. */
export function searchTerms(rawQuery: string, limit = 12): Term[] {
  const query = normalize(rawQuery)
  if (!query) return []
  const queryWords = query.split(' ')

  return index
    .map((entry) => ({ entry, score: scoreEntry(entry, query, queryWords) }))
    .filter((hit) => hit.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.entry.name.length - b.entry.name.length ||
        a.entry.name.localeCompare(b.entry.name, 'nb'),
    )
    .slice(0, limit)
    .map((hit) => hit.entry.term)
}

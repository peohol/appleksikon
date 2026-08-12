import { useId, useMemo, useState, type KeyboardEvent } from 'react'
import { categoriesById } from '../data'
import type { Term } from '../data/types'
import { navigate } from '../lib/router'
import { searchTerms } from '../lib/search'
import { Icon } from './Icon'

export const SEARCH_PLACEHOLDER = 'Søk etter f.eks. popup, avstand, boks eller meny …'

export function SearchPanel({
  variant,
  labelledBy,
  onDone,
}: {
  variant: 'hero' | 'dialog'
  /** Id til synlig overskrift som fungerer som label for søkefeltet. */
  labelledBy?: string
  /** Kalles når et treff er valgt (for å lukke dialogen). */
  onDone?: () => void
}) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)
  const listId = useId()
  const results = useMemo(() => searchTerms(query), [query])
  const showResults = query.trim().length > 0

  const go = (term: Term) => {
    setQuery('')
    setActiveIndex(-1)
    onDone?.()
    navigate(`/tema/${term.category}#${term.slug}`)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter') {
      const target = results[activeIndex] ?? results[0]
      if (target) {
        event.preventDefault()
        go(target)
      }
    } else if (event.key === 'Escape' && query) {
      event.stopPropagation()
      setQuery('')
      setActiveIndex(-1)
    }
  }

  return (
    <div className={`search search--${variant}`}>
      <div className="search-box">
        <span className="search-box-ikon" aria-hidden="true">
          <Icon name="sok" size={18} />
        </span>
        <input
          type="search"
          role="combobox"
          aria-expanded={showResults && results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 && results[activeIndex] ? `${listId}-${activeIndex}` : undefined
          }
          aria-labelledby={labelledBy}
          aria-label={labelledBy ? undefined : 'Hva er det du prøver å beskrive?'}
          placeholder={SEARCH_PLACEHOLDER}
          autoFocus={variant === 'dialog'}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActiveIndex(-1)
          }}
          onKeyDown={onKeyDown}
        />
        {query && (
          <button
            type="button"
            className="search-box-x"
            aria-label="Tøm søket"
            onClick={() => {
              setQuery('')
              setActiveIndex(-1)
            }}
          >
            <Icon name="kryss" size={16} />
          </button>
        )}
      </div>
      {showResults && results.length > 0 && (
        <ul className="search-results" id={listId} role="listbox" aria-label="Søketreff">
          {results.map((term, index) => (
            <li
              key={term.slug}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={'search-result' + (index === activeIndex ? ' is-active' : '')}
              onMouseMove={() => setActiveIndex(index)}
              onClick={() => go(term)}
            >
              <span className="search-result-navn">
                {term.name}
                {term.english && term.english.toLowerCase() !== term.name.toLowerCase() && (
                  <em> · {term.english}</em>
                )}
              </span>
              <span className="search-result-kort">{term.short}</span>
              <span className="search-result-kategori">
                {categoriesById[term.category].title}
              </span>
            </li>
          ))}
        </ul>
      )}
      {showResults && results.length === 0 && (
        <p className="search-empty" role="status">
          Ingen treff på «{query.trim()}». Prøv et annet ord – eller bla i temaene.
        </p>
      )}
    </div>
  )
}

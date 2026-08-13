import { Fragment } from 'react'
import { termHref, termsBySlug } from '../data'
import { comparisonsForTerm } from '../data/comparisons'
import type { Term } from '../data/types'
import { Link } from '../lib/router'
import { DemoFrame } from './DemoFrame'

function TermRefLink({ slug }: { slug: string }) {
  const target = termsBySlug[slug]
  if (!target) return null
  return (
    <Link className="term-ref" href={termHref(slug)}>
      {target.name}
    </Link>
  )
}

function RefList({ label, slugs }: { label: string; slugs: string[] }) {
  return (
    <p className="term-refs">
      <span className="term-refs-label">{label}</span>{' '}
      {slugs.map((slug, index) => (
        <Fragment key={slug}>
          {index > 0 && <span aria-hidden="true"> · </span>}
          <TermRefLink slug={slug} />
        </Fragment>
      ))}
    </p>
  )
}

export function TermCard({ term, targeted = false }: { term: Term; targeted?: boolean }) {
  const comparisons = comparisonsForTerm(term.slug)
  const showEnglish =
    term.english && term.english.toLowerCase() !== term.name.toLowerCase()
  return (
    <article
      className={'term' + (targeted ? ' is-target' : '')}
      id={term.slug}
      tabIndex={-1}
      aria-labelledby={`${term.slug}-tittel`}
    >
      <header className="term-header">
        <h2 id={`${term.slug}-tittel`}>{term.name}</h2>
        {showEnglish && <span className="term-english">engelsk: {term.english}</span>}
      </header>
      <div className="term-body">
        <div className="term-info">
          <p className="term-short">{term.short}</p>
          <div className="term-sayit">
            <h3>Slik kan du si det</h3>
            {term.sayIt.map((quote) => (
              <p key={quote} className="term-quote">
                «{quote}»
              </p>
            ))}
          </div>
          {term.confusedWith && term.confusedWith.length > 0 && (
            <RefList label="Ikke bland med:" slugs={term.confusedWith} />
          )}
          {comparisons.map((comparison) => (
            <Link
              key={comparison.slug}
              className="term-compare"
              href={`/sammenlign/${comparison.slug}`}
            >
              Se forskjellen: {comparison.title} →
            </Link>
          ))}
          {term.related && term.related.length > 0 && (
            <RefList label="Relatert:" slugs={term.related} />
          )}
        </div>
        <div className="term-demo">
          <DemoFrame demo={term.demo} />
        </div>
      </div>
    </article>
  )
}

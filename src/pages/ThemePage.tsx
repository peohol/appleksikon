import { categories, termsInCategory } from '../data'
import type { Category } from '../data/types'
import { Link, useLocation } from '../lib/router'
import { usePageTitle } from '../lib/usePageTitle'
import { Icon } from '../components/Icon'
import { TermCard } from '../components/TermCard'

function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav className="crumbs" aria-label="Brødsmulesti">
      <Link href="/">Hjem</Link>
      <span className="crumbs-skille" aria-hidden="true">
        <Icon name="chevron-hoyre" size={12} />
      </span>
      <span aria-current="page">{current}</span>
    </nav>
  )
}

function PrevNextTheme({ category }: { category: Category }) {
  const index = categories.findIndex((c) => c.id === category.id)
  const prev = categories[index - 1]
  const next = categories[index + 1]
  return (
    <nav className="tema-prevnext" aria-label="Flere temaer">
      {prev ? (
        <Link href={`/tema/${prev.id}`} className="tema-prevnext-lenke">
          <Icon name="pil-venstre" size={14} /> {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/tema/${next.id}`} className="tema-prevnext-lenke tema-prevnext-lenke--neste">
          {next.title} <Icon name="pil-hoyre" size={14} />
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}

export function ThemePage({ category }: { category: Category }) {
  const { hash } = useLocation()
  const terms = termsInCategory(category.id)
  usePageTitle(`${category.title} – Appleksikon`)

  return (
    <div className="tema-side">
      <Breadcrumbs current={category.title} />
      <header className="page-header">
        <h1>{category.title}</h1>
        <p className="page-intro">{category.intro}</p>
      </header>
      <nav className="toc" aria-label={`Begreper under ${category.title}`}>
        {terms.map((term) => (
          <Link key={term.slug} className="toc-chip" href={`/tema/${category.id}#${term.slug}`}>
            {term.name}
          </Link>
        ))}
      </nav>
      <div className="term-liste">
        {terms.map((term) => (
          <TermCard key={term.slug} term={term} targeted={hash === term.slug} />
        ))}
      </div>
      <PrevNextTheme category={category} />
    </div>
  )
}

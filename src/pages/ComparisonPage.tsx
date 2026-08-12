import { termHref, termsBySlug } from '../data'
import type { Comparison } from '../data/types'
import { Link } from '../lib/router'
import { usePageTitle } from '../lib/usePageTitle'
import { DemoFrame } from '../components/DemoFrame'
import { Icon } from '../components/Icon'

export function ComparisonPage({ comparison }: { comparison: Comparison }) {
  usePageTitle(`${comparison.title} – Appleksikon`)
  return (
    <div className="sml-side">
      <nav className="crumbs" aria-label="Brødsmulesti">
        <Link href="/">Hjem</Link>
        <span className="crumbs-skille" aria-hidden="true">
          <Icon name="chevron-hoyre" size={12} />
        </span>
        <span aria-current="page">{comparison.title}</span>
      </nav>
      <header className="page-header">
        <p className="page-eyebrow">Sammenligning</p>
        <h1>{comparison.title}</h1>
        <p className="page-intro">{comparison.intro}</p>
      </header>
      <DemoFrame demo={comparison.demo} />
      <section className="sml-punkter" aria-label="Kort forklart">
        <h2>Kort forklart</h2>
        <ul>
          {comparison.points.map((point) => {
            const term = termsBySlug[point.term]
            if (!term) return null
            return (
              <li key={point.term}>
                <Link className="term-ref" href={termHref(term.slug)}>
                  {term.name}
                </Link>{' '}
                – {point.text}
              </li>
            )
          })}
        </ul>
        <p className="sml-tilbake">
          <Link href="/#temaer">← Til temaoversikten</Link>
        </p>
      </section>
    </div>
  )
}

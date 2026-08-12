import { useEffect, type ReactNode } from 'react'
import { Header } from './components/Header'
import { categoriesById } from './data'
import { comparisonsBySlug } from './data/comparisons'
import { prefersReducedMotion } from './lib/motion'
import { getNavigationKind, Link, useLocation, type RouteLocation } from './lib/router'
import { ComparisonPage } from './pages/ComparisonPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ThemePage } from './pages/ThemePage'

function resolvePage(path: string): ReactNode {
  const segments = path.split('/').filter(Boolean)
  if (segments.length === 0) return <HomePage />
  if (segments[0] === 'tema' && segments.length === 2) {
    const category = categoriesById[segments[1]]
    if (category) return <ThemePage key={category.id} category={category} />
  }
  if (segments[0] === 'sammenlign' && segments.length === 2) {
    const comparison = comparisonsBySlug[segments[1]]
    if (comparison) return <ComparisonPage key={comparison.slug} comparison={comparison} />
  }
  return <NotFoundPage />
}

/** Scroll og fokus etter navigering: til anker ved hash, ellers til toppen. */
function useNavigationEffects(location: RouteLocation) {
  useEffect(() => {
    const kind = getNavigationKind()
    if (kind === 'pop') return // nettleseren gjenoppretter scrollposisjonen selv
    if (location.hash) {
      const element = document.getElementById(location.hash)
      if (element) {
        element.focus({ preventScroll: true })
        element.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        })
      }
    } else if (kind === 'push') {
      window.scrollTo({ top: 0 })
      document.getElementById('innhold')?.focus({ preventScroll: true })
    }
  }, [location])
}

export default function App() {
  const location = useLocation()
  useNavigationEffects(location)

  return (
    <>
      <a className="skip-link" href="#innhold">
        Hopp til innholdet
      </a>
      <Header />
      <main id="innhold" className="site-main" tabIndex={-1}>
        {resolvePage(location.path)}
      </main>
      <footer className="site-footer">
        <p>
          Appleksikon hjelper deg å sette ord på det du ser i en app – så du kan be en kodeagent om
          akkurat det du mener. Alt kjører i nettleseren din; ingenting lagres eller sendes noe
          sted.
        </p>
        <p>
          <Link href="/#temaer">Alle temaer</Link>
        </p>
      </footer>
    </>
  )
}

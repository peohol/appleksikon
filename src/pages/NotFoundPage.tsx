import { Link } from '../lib/router'
import { usePageTitle } from '../lib/usePageTitle'

export function NotFoundPage() {
  usePageTitle('Fant ikke siden – Appleksikon')
  return (
    <div className="notfound">
      <h1>Fant ikke siden</h1>
      <p>Denne siden finnes ikke. Kanskje lenken er gammel, eller adressen er skrevet feil.</p>
      <p>
        <Link href="/">Gå til forsiden</Link> og prøv søket der.
      </p>
    </div>
  )
}

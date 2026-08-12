import { categories, termsBySlug } from '../data'
import { comparisons } from '../data/comparisons'
import { Link } from '../lib/router'
import { usePageTitle } from '../lib/usePageTitle'
import { SearchPanel } from '../components/SearchPanel'
import { ThemeMini } from '../components/ThemeMini'

const steg = [
  {
    tittel: 'Søk med dine egne ord',
    tekst: 'Du trenger ikke fagordet – «boks som åpner seg» holder lenge.',
  },
  {
    tittel: 'Se og prøv',
    tekst: 'Hvert begrep har en liten demo, så du kjenner igjen det du ser i din egen app.',
  },
  {
    tittel: 'Si det videre',
    tekst: 'Bruk formuleringen under «Slik kan du si det» når du beskriver endringen.',
  },
]

export function HomePage() {
  usePageTitle('Appleksikon – finn ordet for det du ser')
  return (
    <div className="home">
      <section className="hero">
        <h1 id="hero-sporsmal">Hva er det du prøver å beskrive?</h1>
        <p className="hero-lead">
          Ser du noe i appen din du vil endre, men mangler ordet for det? Søk med dine egne ord,
          lær begrepet – og få en formulering du kan bruke.
        </p>
        <SearchPanel variant="hero" labelledBy="hero-sporsmal" />
      </section>

      <section className="home-steg" aria-label="Slik bruker du leksikonet">
        <ol>
          {steg.map((punkt, index) => (
            <li key={punkt.tittel}>
              <span className="home-steg-tall" aria-hidden="true">
                {index + 1}
              </span>
              <strong>{punkt.tittel}</strong>
              <p>{punkt.tekst}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="temaer" className="home-temaer">
        <h2>Bla i temaene</h2>
        <div className="tema-grid">
          {categories.map((category) => (
            <Link key={category.id} className="tema-kort" href={`/tema/${category.id}`}>
              <ThemeMini id={category.id} />
              <h3>{category.title}</h3>
              <p>{category.short}</p>
              <p className="tema-kort-begreper">
                {category.highlights
                  .map((slug) => termsBySlug[slug]?.name ?? slug)
                  .join(' · ')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-sml" aria-labelledby="sml-tittel">
        <h2 id="sml-tittel">Begreper som ofte blandes sammen</h2>
        <p className="home-sml-lead">
          Noen begreper ligner på hverandre, men betyr forskjellige ting. Se dem side om side:
        </p>
        <ul className="sml-liste">
          {comparisons.map((comparison) => (
            <li key={comparison.slug}>
              <Link className="sml-kort" href={`/sammenlign/${comparison.slug}`}>
                <strong>{comparison.title}</strong>
                <span>{comparison.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

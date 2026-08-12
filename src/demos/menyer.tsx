import { useRef, useState } from 'react'
import { Icon } from '../components/Icon'
import { prefersReducedMotion } from '../lib/motion'
import { ActionMenu, DemoNote, DemoStatus, MiniScreen, TabsCore } from './shared'

export function NavigasjonsmenyDemo() {
  const [aktiv, setAktiv] = useState('Hjem')
  return (
    <div className="demo-stack">
      <MiniScreen>
        <nav className="demo-nav" aria-label="Eksempelmeny">
          <span className="demo-nav-logo" aria-hidden="true" />
          {['Hjem', 'Prosjekter', 'Om oss'].map((navn) => (
            <button
              key={navn}
              type="button"
              className={'demo-nav-lenke' + (aktiv === navn ? ' is-active' : '')}
              aria-current={aktiv === navn ? 'page' : undefined}
              onClick={() => setAktiv(navn)}
            >
              {navn}
            </button>
          ))}
        </nav>
        <div className="demo-nav-innhold">Du er på: {aktiv}</div>
      </MiniScreen>
    </div>
  )
}

export function HandlingsmenyDemo() {
  const [valg, setValg] = useState<string | null>(null)
  return (
    <div className="demo-stack">
      <ActionMenu
        label="Handlinger"
        items={[
          { id: 'Rediger', label: 'Rediger' },
          { id: 'Dupliser', label: 'Dupliser' },
          { id: 'Del', label: 'Del …' },
          { id: 'Slett', label: 'Slett', danger: true },
        ]}
        onSelect={setValg}
      />
      <DemoStatus>
        {valg ? `Du valgte: ${valg}. Menyen lukket seg.` : 'Åpne menyen og velg en handling.'}
      </DemoStatus>
    </div>
  )
}

export function TabsDemo() {
  return (
    <TabsCore
      label="Produktinformasjon"
      items={[
        {
          id: 'beskrivelse',
          label: 'Beskrivelse',
          content: <p>En solid tursekk på 45 liter med god ryggstøtte.</p>,
        },
        {
          id: 'detaljer',
          label: 'Detaljer',
          content: <p>Vekt: 1,4 kg. Materiale: resirkulert nylon. Farge: skogsgrønn.</p>,
        },
        {
          id: 'omtaler',
          label: 'Omtaler',
          content: <p>«Beste sekken jeg har hatt» – 4,6 av 5 fra 128 kunder.</p>,
        },
      ]}
    />
  )
}

export function BreadcrumbsDemo() {
  const [klikket, setKlikket] = useState<string | null>(null)
  return (
    <div className="demo-stack">
      <nav aria-label="Brødsmulesti" className="demo-smulesti">
        <ol>
          {['Hjem', 'Kunder'].map((navn) => (
            <li key={navn}>
              <button type="button" className="demo-lenkeknapp" onClick={() => setKlikket(navn)}>
                {navn}
              </button>
              <span aria-hidden="true" className="demo-smulesti-skille">
                <Icon name="chevron-hoyre" size={12} />
              </span>
            </li>
          ))}
          <li>
            <span aria-current="page">Kari Nordmann</span>
          </li>
        </ol>
      </nav>
      <DemoStatus>
        {klikket ? `Ville tatt deg tilbake til «${klikket}».` : 'Stien viser hvor du er – hvert ledd er en lenke tilbake.'}
      </DemoStatus>
    </div>
  )
}

export function PaginationDemo() {
  const [side, setSide] = useState(1)
  const antallSider = 5
  return (
    <div className="demo-stack">
      <DemoStatus>
        Side {side} av {antallSider} – viser rad {(side - 1) * 20 + 1}–{side * 20}
      </DemoStatus>
      <nav aria-label="Sidenummerering" className="demo-pagination">
        <button
          type="button"
          className="demo-iconbtn"
          aria-label="Forrige side"
          disabled={side === 1}
          onClick={() => setSide(side - 1)}
        >
          <Icon name="chevron-venstre" size={16} />
        </button>
        {Array.from({ length: antallSider }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            className={'demo-sideknapp' + (n === side ? ' is-active' : '')}
            aria-current={n === side ? 'page' : undefined}
            onClick={() => setSide(n)}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          className="demo-iconbtn"
          aria-label="Neste side"
          disabled={side === antallSider}
          onClick={() => setSide(side + 1)}
        >
          <Icon name="chevron-hoyre" size={16} />
        </button>
      </nav>
    </div>
  )
}

const tocSeksjoner = ['Innledning', 'Priser', 'Levering', 'Kontakt']

export function InnholdsfortegnelseDemo() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const hoppTil = (navn: string) => {
    const container = scrollRef.current
    const target = container?.querySelector<HTMLElement>(`[data-seksjon="${navn}"]`)
    if (container && target) {
      container.scrollTo({
        top: target.offsetTop - container.offsetTop,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      })
    }
  }

  return (
    <div className="demo-toc">
      <nav aria-label="Innhold på siden" className="demo-toc-meny">
        <p className="demo-toc-tittel">På denne siden</p>
        <ul>
          {tocSeksjoner.map((navn) => (
            <li key={navn}>
              <button type="button" className="demo-lenkeknapp" onClick={() => hoppTil(navn)}>
                {navn}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div
        className="demo-toc-innhold"
        ref={scrollRef}
        tabIndex={0}
        aria-label="Eksempelside med seksjoner"
      >
        {tocSeksjoner.map((navn) => (
          <section key={navn} data-seksjon={navn}>
            <h4>{navn}</h4>
            <p>Litt innhold under «{navn}», nok til at siden må scrolles.</p>
          </section>
        ))}
      </div>
    </div>
  )
}

const wizardSteg = ['Kontakt', 'Levering', 'Bekreft']

export function WizardDemo() {
  const [steg, setSteg] = useState(0)
  const [ferdig, setFerdig] = useState(false)

  if (ferdig) {
    return (
      <div className="demo-stack">
        <DemoStatus>Bestillingen er fullført! 🎉</DemoStatus>
        <button
          type="button"
          className="demo-btn demo-btn--secondary"
          onClick={() => {
            setFerdig(false)
            setSteg(0)
          }}
        >
          Start på nytt
        </button>
      </div>
    )
  }

  return (
    <div className="demo-stack">
      <ol className="demo-wizard-steg">
        {wizardSteg.map((navn, index) => (
          <li
            key={navn}
            className={index === steg ? 'is-active' : index < steg ? 'is-done' : undefined}
            aria-current={index === steg ? 'step' : undefined}
          >
            <span className="demo-wizard-punkt" aria-hidden="true">
              {index < steg ? <Icon name="hake" size={12} /> : index + 1}
            </span>
            {navn}
          </li>
        ))}
      </ol>
      <div className="demo-wizard-innhold">
        {steg === 0 && <p>Steg 1: Hvem bestiller? (navn og e-post)</p>}
        {steg === 1 && <p>Steg 2: Hvor skal det leveres? (adresse)</p>}
        {steg === 2 && <p>Steg 3: Se over og bekreft bestillingen.</p>}
      </div>
      <div className="demo-kontrollrad">
        <button
          type="button"
          className="demo-btn demo-btn--secondary"
          disabled={steg === 0}
          onClick={() => setSteg(steg - 1)}
        >
          Tilbake
        </button>
        {steg < wizardSteg.length - 1 ? (
          <button type="button" className="demo-btn" onClick={() => setSteg(steg + 1)}>
            Neste
          </button>
        ) : (
          <button type="button" className="demo-btn" onClick={() => setFerdig(true)}>
            Fullfør
          </button>
        )}
      </div>
    </div>
  )
}

const historikkSider: Record<string, { tittel: string; lenker: string[] }> = {
  Forside: { tittel: 'Forside', lenker: ['Produkter'] },
  Produkter: { tittel: 'Produkter', lenker: ['Tursekk 45 l'] },
  'Tursekk 45 l': { tittel: 'Tursekk 45 l', lenker: [] },
}

export function TilbakeFremDemo() {
  const [stack, setStack] = useState<string[]>(['Forside'])
  const [index, setIndex] = useState(0)
  const gjeldende = historikkSider[stack[index]]

  const gaaTil = (navn: string) => {
    const nyStack = [...stack.slice(0, index + 1), navn]
    setStack(nyStack)
    setIndex(nyStack.length - 1)
  }

  return (
    <div className="demo-stack">
      <MiniScreen>
        <div className="demo-hist-bar">
          <button
            type="button"
            className="demo-iconbtn"
            aria-label="Tilbake"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            <Icon name="pil-venstre" size={16} />
          </button>
          <button
            type="button"
            className="demo-iconbtn"
            aria-label="Fremover"
            disabled={index === stack.length - 1}
            onClick={() => setIndex(index + 1)}
          >
            <Icon name="pil-hoyre" size={16} />
          </button>
          <span className="demo-hist-url">app.no / {gjeldende.tittel}</span>
        </div>
        <div className="demo-hist-innhold">
          <h4>{gjeldende.tittel}</h4>
          {gjeldende.lenker.map((navn) => (
            <button key={navn} type="button" className="demo-lenkeknapp" onClick={() => gaaTil(navn)}>
              Gå til {navn} →
            </button>
          ))}
          {gjeldende.lenker.length === 0 && <p>Du er innerst – prøv tilbakeknappen.</p>}
        </div>
      </MiniScreen>
      <DemoNote>Klikk deg innover, og bruk pilene for å gå tilbake og frem igjen.</DemoNote>
    </div>
  )
}

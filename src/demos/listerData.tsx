import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/Icon'
import { DemoNote, DemoStatus } from './shared'

export function ListeDemo() {
  const kontakter = [
    { navn: 'Anna Berg', epost: 'anna@firma.no' },
    { navn: 'Bjørn Dahl', epost: 'bjorn@firma.no' },
    { navn: 'Clara Eng', epost: 'clara@firma.no' },
  ]
  return (
    <ul className="demo-liste">
      {kontakter.map((kontakt) => (
        <li key={kontakt.navn}>
          <span className="demo-avatar" aria-hidden="true">
            {kontakt.navn[0]}
          </span>
          <span className="demo-liste-tekst">
            <strong>{kontakt.navn}</strong>
            <span>{kontakt.epost}</span>
          </span>
        </li>
      ))}
    </ul>
  )
}

export function TabellDemo() {
  return (
    <table className="demo-tabell">
      <caption className="sr-only">Eksempel på ordretabell</caption>
      <thead>
        <tr>
          <th scope="col">Ordre</th>
          <th scope="col">Kunde</th>
          <th scope="col" className="demo-tabell-tall">
            Beløp
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#1041</td>
          <td>Anna Berg</td>
          <td className="demo-tabell-tall">890 kr</td>
        </tr>
        <tr>
          <td>#1042</td>
          <td>Bjørn Dahl</td>
          <td className="demo-tabell-tall">1 249 kr</td>
        </tr>
        <tr>
          <td>#1043</td>
          <td>Clara Eng</td>
          <td className="demo-tabell-tall">312 kr</td>
        </tr>
      </tbody>
    </table>
  )
}

const oppgaver = [
  { navn: 'Skrive rapport', status: 'Aktiv' },
  { navn: 'Rydde arkivet', status: 'Pause' },
  { navn: 'Svare kunder', status: 'Aktiv' },
  { navn: 'Planlegge møte', status: 'Pause' },
  { navn: 'Sende faktura', status: 'Aktiv' },
]

export function FiltreringDemo() {
  const [filter, setFilter] = useState('Alle')
  const synlige = oppgaver.filter((oppgave) => filter === 'Alle' || oppgave.status === filter)
  return (
    <div className="demo-stack">
      <div className="demo-chiprad" role="group" aria-label="Filtrer på status">
        {['Alle', 'Aktiv', 'Pause'].map((valg) => (
          <button
            key={valg}
            type="button"
            className={'demo-filterchip' + (filter === valg ? ' is-active' : '')}
            aria-pressed={filter === valg}
            onClick={() => setFilter(valg)}
          >
            {valg}
          </button>
        ))}
      </div>
      <ul className="demo-enkleliste">
        {synlige.map((oppgave) => (
          <li key={oppgave.navn}>
            <span
              className={'demo-statusprikk' + (oppgave.status === 'Aktiv' ? ' is-aktiv' : '')}
              aria-hidden="true"
            />
            {oppgave.navn} <span className="demo-note-inline">({oppgave.status})</span>
          </li>
        ))}
      </ul>
      <DemoStatus>
        Viser {synlige.length} av {oppgaver.length} oppgaver.
      </DemoStatus>
    </div>
  )
}

const produkter = [
  { navn: 'Blyant', pris: 12 },
  { navn: 'Notatbok', pris: 79 },
  { navn: 'Ryggsekk', pris: 549 },
  { navn: 'Termos', pris: 249 },
]

export function SorteringDemo() {
  const [kolonne, setKolonne] = useState<'navn' | 'pris'>('navn')
  const [stigende, setStigende] = useState(true)

  const sortert = [...produkter].sort((a, b) => {
    const diff = kolonne === 'navn' ? a.navn.localeCompare(b.navn, 'nb') : a.pris - b.pris
    return stigende ? diff : -diff
  })

  const klikk = (valgt: 'navn' | 'pris') => {
    if (kolonne === valgt) setStigende(!stigende)
    else {
      setKolonne(valgt)
      setStigende(true)
    }
  }

  const ariaSort = (valgt: 'navn' | 'pris') =>
    kolonne === valgt ? (stigende ? 'ascending' : 'descending') : undefined

  return (
    <div className="demo-stack">
      <table className="demo-tabell">
        <caption className="sr-only">Sorterbar produkttabell</caption>
        <thead>
          <tr>
            <th scope="col" aria-sort={ariaSort('navn')}>
              <button type="button" className="demo-sorterknapp" onClick={() => klikk('navn')}>
                Navn{' '}
                {kolonne === 'navn' && <Icon name={stigende ? 'pil-opp' : 'pil-ned'} size={12} />}
              </button>
            </th>
            <th scope="col" aria-sort={ariaSort('pris')} className="demo-tabell-tall">
              <button type="button" className="demo-sorterknapp" onClick={() => klikk('pris')}>
                Pris{' '}
                {kolonne === 'pris' && <Icon name={stigende ? 'pil-opp' : 'pil-ned'} size={12} />}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortert.map((produkt) => (
            <tr key={produkt.navn}>
              <td>{produkt.navn}</td>
              <td className="demo-tabell-tall">{produkt.pris} kr</td>
            </tr>
          ))}
        </tbody>
      </table>
      <DemoNote>Klikk på kolonneoverskriftene for å endre rekkefølgen.</DemoNote>
    </div>
  )
}

export function EmptyStateDemo() {
  const [oppgaveliste, setOppgaveliste] = useState(['Vanne blomstene', 'Bestille kaffe'])
  return (
    <div className="demo-stack">
      {oppgaveliste.length > 0 ? (
        <>
          <ul className="demo-enkleliste">
            {oppgaveliste.map((oppgave) => (
              <li key={oppgave}>
                <span className="demo-statusprikk is-aktiv" aria-hidden="true" />
                {oppgave}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="demo-btn demo-btn--small demo-btn--secondary"
            onClick={() => setOppgaveliste([])}
          >
            Fullfør alle
          </button>
        </>
      ) : (
        <div className="demo-empty">
          <span className="demo-empty-ikon" aria-hidden="true">
            <Icon name="stjerne" size={24} />
          </span>
          <p className="demo-empty-tittel">Ingen oppgaver igjen</p>
          <p className="demo-empty-tekst">Godt jobbet! Legg til nye når du trenger det.</p>
          <button
            type="button"
            className="demo-btn demo-btn--small"
            onClick={() => setOppgaveliste(['Vanne blomstene', 'Bestille kaffe'])}
          >
            Legg til eksempler
          </button>
        </div>
      )}
    </div>
  )
}

export function SpinnerDemo() {
  const [laster, setLaster] = useState(false)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  const hent = () => {
    setLaster(true)
    timerRef.current = window.setTimeout(() => setLaster(false), 1800)
  }

  return (
    <div className="demo-stack">
      <div className="demo-lasteflate">
        {laster ? (
          <>
            <span className="demo-spinner" aria-hidden="true" />
            <span className="sr-only">Henter innhold …</span>
          </>
        ) : (
          <p className="demo-avsnitt">Innholdet er hentet.</p>
        )}
      </div>
      <button type="button" className="demo-btn demo-btn--secondary" disabled={laster} onClick={hent}>
        Hent på nytt
      </button>
    </div>
  )
}

export function SkeletonDemo() {
  const [laster, setLaster] = useState(true)
  return (
    <div className="demo-stack">
      {laster ? (
        <div className="demo-kort demo-kort--skeleton" aria-hidden="true">
          <div className="demo-skeleton demo-skeleton--bilde" />
          <div className="demo-kort-innhold">
            <div className="demo-skeleton demo-skeleton--linje" style={{ width: '70%' }} />
            <div className="demo-skeleton demo-skeleton--linje" />
            <div className="demo-skeleton demo-skeleton--linje" style={{ width: '40%' }} />
          </div>
        </div>
      ) : (
        <div className="demo-kort">
          <div className="demo-kort-bilde" aria-hidden="true">
            <Icon name="bilde" size={26} />
          </div>
          <div className="demo-kort-innhold">
            <h4>Fjelltur til Besseggen</h4>
            <p>Nå er innholdet lastet inn.</p>
          </div>
        </div>
      )}
      <label className="demo-check">
        <input
          type="checkbox"
          checked={laster}
          onChange={(event) => setLaster(event.target.checked)}
        />
        Vis lasteplassholder (skeleton)
      </label>
    </div>
  )
}

export function ProgressDemo() {
  const [prosent, setProsent] = useState<number | null>(null)
  const intervalRef = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearInterval(intervalRef.current), [])

  const start = () => {
    window.clearInterval(intervalRef.current)
    setProsent(0)
    intervalRef.current = window.setInterval(() => {
      setProsent((verdi) => {
        if (verdi === null || verdi >= 100) {
          window.clearInterval(intervalRef.current)
          return verdi
        }
        return Math.min(verdi + 4, 100)
      })
    }, 120)
  }

  return (
    <div className="demo-stack">
      <button type="button" className="demo-btn" onClick={start} disabled={prosent !== null && prosent < 100}>
        {prosent === null ? 'Last opp fil' : prosent < 100 ? 'Laster opp …' : 'Last opp igjen'}
      </button>
      {prosent !== null && (
        <>
          <div
            className="demo-progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={prosent}
            aria-label="Opplasting"
          >
            <div className="demo-progress-fyll" style={{ width: `${prosent}%` }} />
          </div>
          <DemoStatus>{prosent < 100 ? `${prosent} %` : 'Ferdig! ✓'}</DemoStatus>
        </>
      )}
    </div>
  )
}

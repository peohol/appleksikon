import { useId, useState, type FormEvent } from 'react'
import { Icon } from '../components/Icon'
import { Combobox, DemoNote, DemoStatus } from './shared'

export function TekstfeltDemo() {
  const [navn, setNavn] = useState('')
  const id = useId()
  return (
    <div className="demo-stack">
      <div className="demo-felt">
        <label className="demo-label" htmlFor={id}>
          Navn
        </label>
        <input
          id={id}
          className="demo-input"
          type="text"
          value={navn}
          onChange={(event) => setNavn(event.target.value)}
        />
      </div>
      <DemoStatus>{navn ? `Hei, ${navn}!` : 'Skriv noe i feltet.'}</DemoStatus>
    </div>
  )
}

export function TextareaDemo() {
  const [tekst, setTekst] = useState('')
  const id = useId()
  return (
    <div className="demo-stack">
      <div className="demo-felt">
        <label className="demo-label" htmlFor={id}>
          Kommentar
        </label>
        <textarea
          id={id}
          className="demo-input demo-textarea"
          rows={4}
          value={tekst}
          onChange={(event) => setTekst(event.target.value)}
        />
      </div>
      <DemoStatus>{tekst.length} tegn</DemoStatus>
    </div>
  )
}

export function TallfeltDemo() {
  const [antall, setAntall] = useState('2')
  const id = useId()
  return (
    <div className="demo-stack">
      <div className="demo-felt demo-felt--smal">
        <label className="demo-label" htmlFor={id}>
          Antall (1–10)
        </label>
        <input
          id={id}
          className="demo-input"
          type="number"
          min={1}
          max={10}
          value={antall}
          onChange={(event) => setAntall(event.target.value)}
        />
      </div>
      <DemoNote>Feltet tar bare imot tall, og pilene justerer verdien.</DemoNote>
    </div>
  )
}

const personer = ['Anna Berg', 'Bjørn Dahl', 'Clara Eng', 'David Foss', 'Eva Grande']

export function SokefeltDemo() {
  const [sok, setSok] = useState('')
  const id = useId()
  const treff = personer.filter((navn) => navn.toLowerCase().includes(sok.trim().toLowerCase()))
  return (
    <div className="demo-stack">
      <div className="demo-sokefelt">
        <span className="demo-sokefelt-ikon" aria-hidden="true">
          <Icon name="sok" size={16} />
        </span>
        <label className="sr-only" htmlFor={id}>
          Søk etter person
        </label>
        <input
          id={id}
          className="demo-input"
          type="search"
          placeholder="Søk etter person …"
          value={sok}
          onChange={(event) => setSok(event.target.value)}
        />
        {sok && (
          <button
            type="button"
            className="demo-sokefelt-x"
            aria-label="Tøm søket"
            onClick={() => setSok('')}
          >
            <Icon name="kryss" size={14} />
          </button>
        )}
      </div>
      <ul className="demo-navneliste">
        {treff.map((navn) => (
          <li key={navn}>{navn}</li>
        ))}
        {treff.length === 0 && <li className="demo-note">Ingen treff.</li>}
      </ul>
    </div>
  )
}

/** Tolker «YYYY-MM-DD» som lokal dato – new Date(streng) ville gitt UTC og feil dag vest for UTC. */
function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function DatofeltDemo() {
  const [dato, setDato] = useState('')
  const id = useId()
  const formatert = dato
    ? new Intl.DateTimeFormat('nb-NO', { dateStyle: 'long' }).format(parseLocalDate(dato))
    : null
  return (
    <div className="demo-stack">
      <div className="demo-felt demo-felt--smal">
        <label className="demo-label" htmlFor={id}>
          Leveringsdato
        </label>
        <input
          id={id}
          className="demo-input"
          type="date"
          value={dato}
          onChange={(event) => setDato(event.target.value)}
        />
      </div>
      <DemoStatus>{formatert ? `Valgt: ${formatert}` : 'Velg en dato i kalenderen.'}</DemoStatus>
    </div>
  )
}

export function TidsfeltDemo() {
  const [tid, setTid] = useState('')
  const id = useId()
  return (
    <div className="demo-stack">
      <div className="demo-felt demo-felt--smal">
        <label className="demo-label" htmlFor={id}>
          Møtet starter
        </label>
        <input
          id={id}
          className="demo-input"
          type="time"
          value={tid}
          onChange={(event) => setTid(event.target.value)}
        />
      </div>
      <DemoStatus>{tid ? `Valgt: kl. ${tid}` : 'Velg et klokkeslett.'}</DemoStatus>
    </div>
  )
}

export function SelectDemo() {
  const [land, setLand] = useState('')
  const id = useId()
  return (
    <div className="demo-stack">
      <div className="demo-felt demo-felt--smal">
        <label className="demo-label" htmlFor={id}>
          Land
        </label>
        <select
          id={id}
          className="demo-input demo-select"
          value={land}
          onChange={(event) => setLand(event.target.value)}
        >
          <option value="">Velg land …</option>
          <option>Norge</option>
          <option>Sverige</option>
          <option>Danmark</option>
          <option>Finland</option>
        </select>
      </div>
      <DemoStatus>{land ? `Valgt: ${land}` : 'Verdien du velger blir stående i feltet.'}</DemoStatus>
    </div>
  )
}

const kommuner = [
  'Asker',
  'Bergen',
  'Bodø',
  'Drammen',
  'Kristiansand',
  'Oslo',
  'Stavanger',
  'Tromsø',
  'Trondheim',
  'Ålesund',
]

export function AutocompleteDemo() {
  return (
    <div className="demo-stack">
      <Combobox label="Kommune" options={kommuner} placeholder="Begynn å skrive …" />
      <DemoNote>Skriv for eksempel «tr» og velg blant forslagene.</DemoNote>
    </div>
  )
}

export function CheckboxDemo() {
  const [valgte, setValgte] = useState<string[]>(['Pølser'])
  const ting = ['Pølser', 'Lomper', 'Sennep']
  const toggle = (navn: string) =>
    setValgte((liste) =>
      liste.includes(navn) ? liste.filter((x) => x !== navn) : [...liste, navn],
    )
  return (
    <div className="demo-stack">
      <fieldset className="demo-fieldset">
        <legend>Hva skal med i handlekurven?</legend>
        {ting.map((navn) => (
          <label key={navn} className="demo-check">
            <input type="checkbox" checked={valgte.includes(navn)} onChange={() => toggle(navn)} />
            {navn}
          </label>
        ))}
      </fieldset>
      <DemoStatus>
        {valgte.length === 0 ? 'Ingenting valgt – det er også lov.' : `Valgt: ${valgte.join(', ')}`}
      </DemoStatus>
    </div>
  )
}

export function RadiogruppeDemo() {
  const [valg, setValg] = useState('Post')
  const gruppeNavn = useId()
  return (
    <div className="demo-stack">
      <fieldset className="demo-fieldset">
        <legend>Leveringsmåte</legend>
        {['Hent selv', 'Post', 'Bud'].map((navn) => (
          <label key={navn} className="demo-check">
            <input
              type="radio"
              name={gruppeNavn}
              checked={valg === navn}
              onChange={() => setValg(navn)}
            />
            {navn}
          </label>
        ))}
      </fieldset>
      <DemoStatus>Valgt: {valg} – bare ett valg kan være aktivt.</DemoStatus>
    </div>
  )
}

export function ToggleDemo() {
  const [pa, setPa] = useState(false)
  const labelId = useId()
  return (
    <div className="demo-stack">
      <div className="demo-togglerad">
        <span id={labelId}>Ikke forstyrr</span>
        <button
          type="button"
          role="switch"
          aria-checked={pa}
          aria-labelledby={labelId}
          className={'demo-switch' + (pa ? ' is-on' : '')}
          onClick={() => setPa(!pa)}
        >
          <span className="demo-switch-knott" aria-hidden="true" />
        </button>
      </div>
      <DemoStatus>{pa ? 'På – varsler er pauset fra nå.' : 'Av – bryteren virker med én gang.'}</DemoStatus>
    </div>
  )
}

export function SliderDemo() {
  const [pris, setPris] = useState(600)
  const id = useId()
  return (
    <div className="demo-stack">
      <div className="demo-felt">
        <label className="demo-label" htmlFor={id}>
          Maksimal pris: <strong>{pris} kr</strong>
        </label>
        <input
          id={id}
          type="range"
          min={100}
          max={1500}
          step={50}
          value={pris}
          onChange={(event) => setPris(Number(event.target.value))}
        />
      </div>
      <DemoNote>Dra knotten – eller bruk piltastene når den har fokus.</DemoNote>
    </div>
  )
}

export function StepperDemo() {
  const [antall, setAntall] = useState(2)
  const labelId = useId()
  return (
    <div className="demo-stack">
      <div className="demo-stepper">
        <span id={labelId}>Billetter</span>
        <div className="demo-stepper-kontroll" role="group" aria-labelledby={labelId}>
          <button
            type="button"
            className="demo-iconbtn"
            aria-label="Færre billetter"
            disabled={antall <= 1}
            onClick={() => setAntall(antall - 1)}
          >
            <Icon name="minus" size={16} />
          </button>
          <output className="demo-stepper-verdi">{antall}</output>
          <button
            type="button"
            className="demo-iconbtn"
            aria-label="Flere billetter"
            disabled={antall >= 8}
            onClick={() => setAntall(antall + 1)}
          >
            <Icon name="pluss" size={16} />
          </button>
        </div>
      </div>
      <DemoNote>Fra 1 til 8 – knappene deaktiveres ved grensene.</DemoNote>
    </div>
  )
}

export function FargevelgerDemo() {
  const [farge, setFarge] = useState('#b1441a')
  const id = useId()
  return (
    <div className="demo-stack">
      <div className="demo-fargerad">
        <label className="demo-label" htmlFor={id}>
          Temafarge
        </label>
        <input
          id={id}
          type="color"
          className="demo-farge"
          value={farge}
          onChange={(event) => setFarge(event.target.value)}
        />
        <span className="demo-fargekode">{farge}</span>
      </div>
      <div className="demo-fargeprove" style={{ background: farge }}>
        Fargen brukes her
      </div>
    </div>
  )
}

export function FilopplastingDemo() {
  const [filnavn, setFilnavn] = useState<string | null>(null)
  const id = useId()
  return (
    <div className="demo-stack">
      <div className="demo-felt">
        <label className="demo-label" htmlFor={id}>
          Profilbilde
        </label>
        <input
          id={id}
          type="file"
          className="demo-fil"
          onChange={(event) => setFilnavn(event.target.files?.[0]?.name ?? null)}
        />
      </div>
      <DemoStatus>{filnavn ? `Valgt fil: ${filnavn}` : 'Ingen fil er valgt ennå.'}</DemoStatus>
      <DemoNote>Filen lastes ikke opp noe sted – dette er bare en demo.</DemoNote>
    </div>
  )
}

export function ValideringDemo() {
  const [epost, setEpost] = useState('')
  const [feil, setFeil] = useState<string | null>(null)
  const [ok, setOk] = useState(false)
  const id = useId()
  const feilId = useId()

  const send = (event: FormEvent) => {
    event.preventDefault()
    if (!epost.trim()) {
      setFeil('E-post må fylles ut.')
      setOk(false)
    } else if (!epost.includes('@')) {
      setFeil('E-postadressen må inneholde @.')
      setOk(false)
    } else {
      setFeil(null)
      setOk(true)
    }
  }

  return (
    <form className="demo-stack" onSubmit={send} noValidate>
      <div className="demo-felt">
        <label className="demo-label" htmlFor={id}>
          E-post
        </label>
        <input
          id={id}
          className={'demo-input' + (feil ? ' is-invalid' : '')}
          type="email"
          value={epost}
          aria-invalid={feil ? true : undefined}
          aria-describedby={feil ? feilId : undefined}
          onChange={(event) => {
            setEpost(event.target.value)
            setOk(false)
          }}
        />
        {feil && (
          <p className="demo-feiltekst" id={feilId}>
            <Icon name="advarsel" size={14} /> {feil}
          </p>
        )}
      </div>
      <button type="submit" className="demo-btn">
        Meld meg på
      </button>
      {ok && <DemoStatus>Alt gyldig – du er påmeldt! ✓</DemoStatus>}
    </form>
  )
}

export function FeilmeldingDemo() {
  const feltId = useId()
  const tekstId = useId()
  return (
    <div className="demo-stack">
      <div className="demo-felt">
        <label className="demo-label" htmlFor={feltId}>
          Kortnummer
        </label>
        <input
          id={feltId}
          className="demo-input is-invalid"
          type="text"
          defaultValue="1234"
          aria-invalid="true"
          aria-describedby={tekstId}
        />
        <p className="demo-feiltekst" id={tekstId}>
          <Icon name="advarsel" size={14} /> Kortnummeret er for kort – det skal ha 16 sifre.
        </p>
      </div>
      <DemoNote>God feilmelding: står ved feltet, sier hva som er galt og hvordan det rettes.</DemoNote>
    </div>
  )
}

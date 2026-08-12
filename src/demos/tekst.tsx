import { useId, useState } from 'react'
import { Icon } from '../components/Icon'
import { DemoNote } from './shared'

export function TypografiDemo() {
  return (
    <div className="demo-typografi">
      <span className="demo-deletikett">Overskrift</span>
      <h4 className="demo-typografi-overskrift">Vårens turprogram</h4>
      <span className="demo-deletikett">Brødtekst</span>
      <p className="demo-typografi-brodtekst">
        Her er den vanlige teksten – selve innholdet leseren skal gjennom. Overskriften over sier
        hva den handler om.
      </p>
    </div>
  )
}

export function FeltdelerDemo() {
  const [verdi, setVerdi] = useState('')
  const inputId = useId()
  return (
    <div className="demo-stack">
      <div className="demo-feltdeler">
        <div className="demo-feltdeler-rad">
          <label className="demo-label" htmlFor={inputId}>
            E-post
          </label>
          <span className="demo-deletikett">label</span>
        </div>
        <div className="demo-feltdeler-rad">
          <input
            id={inputId}
            className="demo-input"
            type="text"
            placeholder="navn@firma.no"
            value={verdi}
            onChange={(event) => setVerdi(event.target.value)}
          />
          <span className="demo-deletikett">placeholder</span>
        </div>
        <div className="demo-feltdeler-rad">
          <p className="demo-hjelpetekst">Vi deler den aldri med andre.</p>
          <span className="demo-deletikett">hjelpetekst</span>
        </div>
      </div>
      <DemoNote>
        Skriv i feltet: placeholderen forsvinner, mens labelen og hjelpeteksten blir stående.
      </DemoNote>
    </div>
  )
}

export function IkonDemo() {
  const ikoner = [
    { name: 'sok', label: 'Søk' },
    { name: 'blyant', label: 'Rediger' },
    { name: 'soppel', label: 'Slett' },
    { name: 'tannhjul', label: 'Innstillinger' },
    { name: 'bjelle', label: 'Varsler' },
    { name: 'pluss', label: 'Legg til' },
  ] as const
  return (
    <ul className="demo-ikonliste">
      {ikoner.map((ikon) => (
        <li key={ikon.name}>
          <span className="demo-ikonrute">
            <Icon name={ikon.name} size={20} />
          </span>
          <span className="demo-ikonnavn">{ikon.label}</span>
        </li>
      ))}
    </ul>
  )
}

export function BadgeDemo() {
  const [antall, setAntall] = useState(3)
  return (
    <div className="demo-stack">
      <div className="demo-badgerad">
        <span className="demo-badgeanker">
          <span className="demo-ikonrute">
            <Icon name="bjelle" size={20} />
          </span>
          {antall > 0 && (
            <span className="demo-badge" aria-hidden="true">
              {antall}
            </span>
          )}
          <span className="sr-only">{antall} uleste varsler</span>
        </span>
        <span className="demo-pill demo-pill--ny">Ny</span>
        <span className="demo-pill demo-pill--ok">Betalt</span>
        <span className="demo-pill">Utkast</span>
      </div>
      <div className="demo-kontrollrad">
        <button type="button" className="demo-btn demo-btn--small" onClick={() => setAntall(antall + 1)}>
          Nytt varsel
        </button>
        <button
          type="button"
          className="demo-btn demo-btn--small demo-btn--secondary"
          onClick={() => setAntall(0)}
        >
          Merk som lest
        </button>
      </div>
    </div>
  )
}

const alleTags = ['Fjell', 'Sjø', 'Skog', 'By']

export function ChipDemo() {
  const [tags, setTags] = useState(alleTags)
  return (
    <div className="demo-stack">
      <div className="demo-chiprad">
        {tags.map((tag) => (
          <span key={tag} className="demo-chip">
            {tag}
            <button
              type="button"
              className="demo-chip-x"
              aria-label={`Fjern ${tag}`}
              onClick={() => setTags(tags.filter((t) => t !== tag))}
            >
              <Icon name="kryss" size={12} />
            </button>
          </span>
        ))}
        {tags.length === 0 && <span className="demo-note">Alle tags er fjernet.</span>}
      </div>
      {tags.length < alleTags.length && (
        <button
          type="button"
          className="demo-btn demo-btn--small demo-btn--secondary"
          onClick={() => setTags(alleTags)}
        >
          Tilbakestill
        </button>
      )}
    </div>
  )
}

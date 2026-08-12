import { useState } from 'react'
import { Icon } from '../components/Icon'
import { AccordionCore, DemoNote } from './shared'

export function AccordionDemo() {
  return (
    <AccordionCore
      items={[
        {
          id: 'frakt',
          label: 'Hva koster frakten?',
          content: <p>Frakt koster 59 kr, og er gratis over 500 kr.</p>,
        },
        {
          id: 'levering',
          label: 'Hvor lang er leveringstiden?',
          content: <p>Normalt 2–4 virkedager i hele landet.</p>,
        },
        {
          id: 'retur',
          label: 'Kan jeg returnere varer?',
          content: <p>Ja, du har 30 dagers åpent kjøp.</p>,
        },
      ]}
    />
  )
}

export function DetailsDemo() {
  return (
    <div className="demo-stack">
      <details className="demo-details">
        <summary>Avanserte valg</summary>
        <div className="demo-details-innhold">
          <label className="demo-check">
            <input type="checkbox" defaultChecked />
            Send kvittering på e-post
          </label>
          <label className="demo-check">
            <input type="checkbox" />
            Husk meg på denne enheten
          </label>
        </div>
      </details>
      <DemoNote>Én enkelt rad som folder innholdet ut og inn – lukket som standard.</DemoNote>
    </div>
  )
}

export function SammenleggbarSeksjonDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="demo-panel demo-panel--kollaps">
      <h4 className="demo-panel-tittel demo-panel-tittel--knapp">
        <button
          type="button"
          className="demo-kollaps-trigger"
          aria-expanded={open}
          aria-controls="kollaps-demo-innhold"
          onClick={() => setOpen(!open)}
        >
          <span className={'demo-accordion-chevron' + (open ? ' is-open' : '')}>
            <Icon name="chevron-ned" size={16} />
          </span>
          Avanserte innstillinger
        </button>
      </h4>
      {open && (
        <div id="kollaps-demo-innhold" className="demo-kollaps-innhold">
          <label className="demo-check">
            <input type="checkbox" />
            Bruk eksperimentelle funksjoner
          </label>
          <label className="demo-check">
            <input type="checkbox" defaultChecked />
            Logg detaljert aktivitet
          </label>
        </div>
      )}
    </div>
  )
}

const langTekst =
  'Denne beskrivelsen er ganske lang. Den forteller om produktets historie, hvem som lager det, ' +
  'hvordan det brukes og hvorfor akkurat denne modellen har blitt en favoritt blant kundene. ' +
  'Alt dette trenger ikke å synes hele tiden – derfor kortes teksten ned, og resten gjemmes bak en knapp.'

export function VisMerDemo() {
  const [utvidet, setUtvidet] = useState(false)
  return (
    <div className="demo-stack">
      <p className={'demo-avsnitt' + (utvidet ? '' : ' demo-klippet')}>{langTekst}</p>
      <button
        type="button"
        className="demo-lenkeknapp"
        aria-expanded={utvidet}
        onClick={() => setUtvidet(!utvidet)}
      >
        {utvidet ? 'Vis mindre' : 'Vis mer'}
      </button>
    </div>
  )
}

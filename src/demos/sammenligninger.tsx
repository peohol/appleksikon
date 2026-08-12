import { useId, useState } from 'react'
import {
  AccordionCore,
  ActionMenu,
  Combobox,
  DemoNote,
  DemoSlider,
  TabsCore,
  TooltipButton,
  ToastViewport,
  useDemoDialog,
  useToasts,
  type PanelItem,
} from './shared'
import { PopoverDemo } from './dialoger'

export function SmlMarginPaddingGap() {
  const [margin, setMargin] = useState(12)
  const [padding, setPadding] = useState(12)
  const [gap, setGap] = useState(12)
  return (
    <div className="demo-stack">
      <div className="demo-mpg" style={{ gap }}>
        {['Kort A', 'Kort B'].map((navn) => (
          <div key={navn} className="demo-mpg-margin">
            <div className="demo-mpg-kort" style={{ margin, padding }}>
              <div className="demo-mpg-innhold">{navn}</div>
            </div>
          </div>
        ))}
      </div>
      <ul className="demo-fargeforklaring">
        <li>
          <span className="demo-fargelapp demo-fargelapp--margin" aria-hidden="true" /> Margin – luft
          utenfor kortet
        </li>
        <li>
          <span className="demo-fargelapp demo-fargelapp--padding" aria-hidden="true" /> Padding –
          luft inni kortet
        </li>
        <li>
          <span className="demo-fargelapp demo-fargelapp--gap" aria-hidden="true" /> Gap – avstanden
          mellom kortene
        </li>
      </ul>
      <DemoSlider label="Margin" min={0} max={28} value={margin} color="margin" onChange={setMargin} />
      <DemoSlider label="Padding" min={0} max={28} value={padding} color="padding" onChange={setPadding} />
      <DemoSlider label="Gap" min={0} max={28} value={gap} color="gap" onChange={setGap} />
    </div>
  )
}

export function SmlOverlays() {
  const { ref, open, close, onBackdropClick } = useDemoDialog()
  const { toasts, push, dismiss } = useToasts()
  return (
    <div className="demo-stack">
      <div className="demo-sml-rutenett">
        <div className="demo-sml-celle">
          <p className="demo-sml-navn">Tooltip</p>
          <TooltipButton tip="Jeg er en tooltip!">Pek på meg</TooltipButton>
          <p className="demo-sml-hint">Vises ved hover/fokus</p>
        </div>
        <div className="demo-sml-celle">
          <p className="demo-sml-navn">Popover</p>
          <PopoverDemo />
        </div>
        <div className="demo-sml-celle">
          <p className="demo-sml-navn">Modal</p>
          <button type="button" className="demo-btn" onClick={open}>
            Åpne modal
          </button>
          <p className="demo-sml-hint">Stopper alt til du lukker</p>
        </div>
        <div className="demo-sml-celle">
          <p className="demo-sml-navn">Toast</p>
          <button type="button" className="demo-btn" onClick={() => push('Jeg er en toast!')}>
            Vis toast
          </button>
          <p className="demo-sml-hint">Kommer og går av seg selv</p>
        </div>
      </div>
      <dialog ref={ref} className="demo-dialog" aria-labelledby="sml-modal-tittel" onMouseDown={onBackdropClick}>
        <h4 id="sml-modal-tittel">Jeg er en modal</h4>
        <p>Legg merke til at siden bak er mørklagt og låst.</p>
        <div className="demo-dialog-knapper">
          <button type="button" className="demo-btn" onClick={close}>
            Lukk
          </button>
        </div>
      </dialog>
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </div>
  )
}

export function SmlValg() {
  const [kanaler, setKanaler] = useState<string[]>(['E-post'])
  const [frekvens, setFrekvens] = useState('Bare viktige')
  const [ikkeForstyrr, setIkkeForstyrr] = useState(false)
  const frekvensNavn = useId()
  const toggleLabelId = useId()

  const toggleKanal = (navn: string) =>
    setKanaler((liste) =>
      liste.includes(navn) ? liste.filter((x) => x !== navn) : [...liste, navn],
    )

  return (
    <div className="demo-sml-rutenett demo-sml-rutenett--tre">
      <div className="demo-sml-celle demo-sml-celle--venstre">
        <p className="demo-sml-navn">Checkbox – velg flere</p>
        <fieldset className="demo-fieldset">
          <legend>Hvilke kanaler?</legend>
          {['E-post', 'SMS', 'Push'].map((navn) => (
            <label key={navn} className="demo-check">
              <input
                type="checkbox"
                checked={kanaler.includes(navn)}
                onChange={() => toggleKanal(navn)}
              />
              {navn}
            </label>
          ))}
        </fieldset>
      </div>
      <div className="demo-sml-celle demo-sml-celle--venstre">
        <p className="demo-sml-navn">Radio – velg én</p>
        <fieldset className="demo-fieldset">
          <legend>Hvor ofte?</legend>
          {['Alle varsler', 'Bare viktige', 'Ingen'].map((navn) => (
            <label key={navn} className="demo-check">
              <input
                type="radio"
                name={frekvensNavn}
                checked={frekvens === navn}
                onChange={() => setFrekvens(navn)}
              />
              {navn}
            </label>
          ))}
        </fieldset>
      </div>
      <div className="demo-sml-celle demo-sml-celle--venstre">
        <p className="demo-sml-navn">Toggle – av/på nå</p>
        <div className="demo-togglerad">
          <span id={toggleLabelId}>Ikke forstyrr</span>
          <button
            type="button"
            role="switch"
            aria-checked={ikkeForstyrr}
            aria-labelledby={toggleLabelId}
            className={'demo-switch' + (ikkeForstyrr ? ' is-on' : '')}
            onClick={() => setIkkeForstyrr(!ikkeForstyrr)}
          >
            <span className="demo-switch-knott" aria-hidden="true" />
          </button>
        </div>
        <p className="demo-sml-hint">{ikkeForstyrr ? 'Gjelder umiddelbart.' : 'Virker med én gang.'}</p>
      </div>
    </div>
  )
}

export function SmlNedtrekk() {
  const [sortering, setSortering] = useState('Nyeste først')
  const [handling, setHandling] = useState<string | null>(null)
  const selectId = useId()
  return (
    <div className="demo-sml-rutenett demo-sml-rutenett--tre">
      <div className="demo-sml-celle demo-sml-celle--venstre">
        <p className="demo-sml-navn">Select – velg en verdi</p>
        <label className="demo-label" htmlFor={selectId}>
          Sorter etter
        </label>
        <select
          id={selectId}
          className="demo-input demo-select"
          value={sortering}
          onChange={(event) => setSortering(event.target.value)}
        >
          <option>Nyeste først</option>
          <option>Eldste først</option>
          <option>Pris, lav til høy</option>
        </select>
        <p className="demo-sml-hint">Verdien blir stående: {sortering}</p>
      </div>
      <div className="demo-sml-celle demo-sml-celle--venstre">
        <p className="demo-sml-navn">Handlingsmeny – gjør noe</p>
        <ActionMenu
          label="Handlinger"
          items={[
            { id: 'Rediger', label: 'Rediger' },
            { id: 'Dupliser', label: 'Dupliser' },
            { id: 'Slett', label: 'Slett', danger: true },
          ]}
          onSelect={setHandling}
        />
        <p className="demo-sml-hint">
          {handling ? `Utførte: ${handling}` : 'Menyen lukkes når noe velges.'}
        </p>
      </div>
      <div className="demo-sml-celle demo-sml-celle--venstre">
        <p className="demo-sml-navn">Autocomplete – skriv og velg</p>
        <Combobox
          label="Kommune"
          options={['Asker', 'Bergen', 'Bodø', 'Oslo', 'Stavanger', 'Tromsø', 'Trondheim']}
          placeholder="Skriv «o» …"
        />
      </div>
    </div>
  )
}

export function SmlLabelPlaceholder() {
  const [verdi, setVerdi] = useState('')
  const inputId = useId()
  return (
    <div className="demo-stack">
      <div className="demo-feltdeler">
        <div className="demo-feltdeler-rad">
          <label className="demo-label" htmlFor={inputId}>
            E-post
          </label>
          <span className="demo-deletikett">label – blir stående</span>
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
          <span className="demo-deletikett">placeholder – forsvinner</span>
        </div>
      </div>
      <div className="demo-kontrollrad">
        <button
          type="button"
          className="demo-btn demo-btn--small demo-btn--secondary"
          onClick={() => setVerdi(verdi ? '' : 'kari@firma.no')}
        >
          {verdi ? 'Tøm feltet' : 'Fyll inn eksempel'}
        </button>
      </div>
      <DemoNote>
        {verdi
          ? 'Nå er placeholderen borte – men labelen sier fortsatt hva feltet er.'
          : 'Placeholderen («navn@firma.no») synes bare når feltet er tomt.'}
      </DemoNote>
    </div>
  )
}

export function SmlStickyFixed() {
  return (
    <div className="demo-stack">
      <div className="demo-sml-rutenett">
        <div className="demo-sml-celle demo-sml-celle--venstre">
          <p className="demo-sml-navn">Sticky</p>
          <div className="demo-scrollflate demo-scrollflate--lav" tabIndex={0} aria-label="Sticky-eksempel">
            <p className="demo-avsnitt">Scroll her ↓</p>
            <div className="demo-stickybar">Fester seg øverst</div>
            {[1, 2, 3, 4].map((n) => (
              <p key={n} className="demo-avsnitt">
                Innhold {n} – raden over ble med et stykke, og satte seg fast.
              </p>
            ))}
          </div>
        </div>
        <div className="demo-sml-celle demo-sml-celle--venstre">
          <p className="demo-sml-navn">Fixed</p>
          <div className="demo-fixedramme demo-scrollflate--lav">
            <div className="demo-fixedscroll" tabIndex={0} aria-label="Fixed-eksempel">
              <p className="demo-avsnitt">Scroll her ↓</p>
              {[1, 2, 3, 4].map((n) => (
                <p key={n} className="demo-avsnitt">
                  Innhold {n} – linjen ligger fast og er aldri med i scrollingen.
                </p>
              ))}
            </div>
            <div className="demo-fixedbar">Ligger alltid her</div>
          </div>
        </div>
      </div>
      <DemoNote>Sticky starter i innholdet og fester seg. Fixed ligger fast hele tiden.</DemoNote>
    </div>
  )
}

const smlInnhold: PanelItem[] = [
  { id: 'beskrivelse', label: 'Beskrivelse', content: <p>En solid tursekk på 45 liter.</p> },
  { id: 'frakt', label: 'Frakt', content: <p>Gratis frakt over 500 kr, ellers 59 kr.</p> },
  { id: 'retur', label: 'Retur', content: <p>30 dagers åpent kjøp med gratis retur.</p> },
]

export function SmlTabsAccordion() {
  return (
    <div className="demo-sml-rutenett">
      <div className="demo-sml-celle demo-sml-celle--venstre">
        <p className="demo-sml-navn">Faner – bytter i samme flate</p>
        <TabsCore label="Produktinfo som faner" items={smlInnhold} />
      </div>
      <div className="demo-sml-celle demo-sml-celle--venstre">
        <p className="demo-sml-navn">Accordion – folder ut nedover</p>
        <AccordionCore items={smlInnhold} />
      </div>
    </div>
  )
}

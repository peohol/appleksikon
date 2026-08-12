import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Icon } from '../components/Icon'
import {
  DemoNote,
  DemoStatus,
  MiniScreen,
  TooltipButton,
  ToastViewport,
  useClickOutside,
  useDemoDialog,
  useToasts,
} from './shared'

export function TooltipDemo() {
  return (
    <div className="demo-stack">
      <div className="demo-knapperad">
        <TooltipButton tip="Lagres trygt i skyen">Lagre</TooltipButton>
        <TooltipButton iconOnly tip="Slett rad" aria-label="Slett rad">
          <Icon name="soppel" />
        </TooltipButton>
      </div>
      <DemoNote>Hold pekeren over knappene – eller flytt fokus dit med Tab.</DemoNote>
    </div>
  )
}

export function PopoverDemo() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const knappRef = useRef<HTMLButtonElement>(null)

  useClickOutside(rootRef, open, () => setOpen(false))

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  const lukkMedEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false)
      knappRef.current?.focus()
    }
  }

  return (
    <div className="demo-stack">
      <div className="demo-popover-anker" ref={rootRef} onKeyDown={lukkMedEsc}>
        <button
          ref={knappRef}
          type="button"
          className="demo-btn"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Icon name="del" size={16} /> Del
        </button>
        {open && (
          <div
            className="demo-popover"
            role="dialog"
            aria-label="Delingsvalg"
            ref={panelRef}
            tabIndex={-1}
          >
            <p className="demo-popover-tittel">Del dokumentet</p>
            <button type="button" className="demo-menu-item" onClick={() => setOpen(false)}>
              Kopier lenke
            </button>
            <button type="button" className="demo-menu-item" onClick={() => setOpen(false)}>
              Send på e-post
            </button>
          </div>
        )}
      </div>
      <DemoNote>Popoveren er festet til knappen. Lukk med Escape eller klikk utenfor.</DemoNote>
    </div>
  )
}

export function ModalDemo() {
  const { ref, open, close, onBackdropClick } = useDemoDialog()
  return (
    <div className="demo-stack">
      <button type="button" className="demo-btn" onClick={open}>
        Åpne dialogboks
      </button>
      <dialog ref={ref} className="demo-dialog" aria-labelledby="modal-demo-tittel" onMouseDown={onBackdropClick}>
        <h4 id="modal-demo-tittel">En ekte dialogboks</h4>
        <p>
          Resten av siden er mørklagt og kan ikke brukes nå. Lukk med knappen, Escape eller klikk
          utenfor.
        </p>
        <div className="demo-dialog-knapper">
          <button type="button" className="demo-btn" onClick={close}>
            Lukk
          </button>
        </div>
      </dialog>
    </div>
  )
}

export function BekreftelsesdialogDemo() {
  const { ref, open, close, onBackdropClick } = useDemoDialog()
  const [slettet, setSlettet] = useState(false)
  return (
    <div className="demo-stack">
      {!slettet ? (
        <div className="demo-menyknapprad">
          <span>Rapport.pdf</span>
          <button type="button" className="demo-iconbtn" aria-label="Slett Rapport.pdf" onClick={open}>
            <Icon name="soppel" />
          </button>
        </div>
      ) : (
        <div className="demo-kontrollrad">
          <DemoStatus>Filen er slettet.</DemoStatus>
          <button
            type="button"
            className="demo-btn demo-btn--small demo-btn--secondary"
            onClick={() => setSlettet(false)}
          >
            Gjenopprett
          </button>
        </div>
      )}
      <dialog
        ref={ref}
        className="demo-dialog"
        aria-labelledby="bekreft-demo-tittel"
        onMouseDown={onBackdropClick}
      >
        <h4 id="bekreft-demo-tittel">Slette «Rapport.pdf»?</h4>
        <p>Dette kan ikke angres.</p>
        <div className="demo-dialog-knapper">
          <button type="button" className="demo-btn demo-btn--secondary" onClick={close}>
            Avbryt
          </button>
          <button
            type="button"
            className="demo-btn demo-btn--danger"
            onClick={() => {
              close()
              setSlettet(true)
            }}
          >
            Slett
          </button>
        </div>
      </dialog>
    </div>
  )
}

export function PromptDemo() {
  const { ref, open, close, onBackdropClick } = useDemoDialog()
  const [navn, setNavn] = useState('')
  const [mapper, setMapper] = useState<string[]>(['Kvitteringer'])

  const opprett = () => {
    const trimmet = navn.trim()
    if (trimmet) setMapper([...mapper, trimmet])
    setNavn('')
    close()
  }

  return (
    <div className="demo-stack">
      <div className="demo-chiprad">
        {mapper.map((mappe) => (
          <span key={mappe} className="demo-chip">
            {mappe}
          </span>
        ))}
      </div>
      <button type="button" className="demo-btn demo-btn--secondary" onClick={open}>
        <Icon name="pluss" size={16} /> Ny mappe
      </button>
      <dialog
        ref={ref}
        className="demo-dialog"
        aria-labelledby="prompt-demo-tittel"
        onMouseDown={onBackdropClick}
      >
        <h4 id="prompt-demo-tittel">Ny mappe</h4>
        <label className="demo-label" htmlFor="prompt-demo-input">
          Navn på mappen
        </label>
        <input
          id="prompt-demo-input"
          className="demo-input"
          type="text"
          value={navn}
          onChange={(event) => setNavn(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              opprett()
            }
          }}
        />
        <div className="demo-dialog-knapper">
          <button type="button" className="demo-btn demo-btn--secondary" onClick={close}>
            Avbryt
          </button>
          <button type="button" className="demo-btn" onClick={opprett}>
            Opprett
          </button>
        </div>
      </dialog>
    </div>
  )
}

export function DrawerDemo() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const knappRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  const lukk = () => {
    setOpen(false)
    knappRef.current?.focus()
  }

  return (
    <div className="demo-stack">
      <MiniScreen>
        <div className="demo-scene">
          <div className="demo-scene-innhold">
            <p className="demo-avsnitt">Ordre #1042 – Kari Nordmann</p>
            <button ref={knappRef} type="button" className="demo-btn demo-btn--small" onClick={() => setOpen(true)}>
              Vis detaljer
            </button>
          </div>
          {open && <button type="button" className="demo-scrim" aria-label="Lukk panelet" onClick={lukk} />}
          <div
            className={'demo-drawer' + (open ? ' is-open' : '')}
            role="dialog"
            aria-label="Ordredetaljer"
            aria-hidden={!open}
            ref={panelRef}
            tabIndex={-1}
            onKeyDown={(event) => {
              if (event.key === 'Escape') lukk()
            }}
          >
            <div className="demo-drawer-topp">
              <h4>Ordredetaljer</h4>
              <button type="button" className="demo-iconbtn" aria-label="Lukk" onClick={lukk} disabled={!open}>
                <Icon name="kryss" size={16} />
              </button>
            </div>
            <p>3 varer · 1 249 kr · sendes i morgen.</p>
          </div>
        </div>
      </MiniScreen>
      <DemoNote>Paneler som glir inn fra siden og legger seg over innholdet kalles drawer.</DemoNote>
    </div>
  )
}

export function BottomSheetDemo() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const knappRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) panelRef.current?.focus()
  }, [open])

  const lukk = () => {
    setOpen(false)
    knappRef.current?.focus()
  }

  return (
    <div className="demo-stack">
      <MiniScreen narrow>
        <div className="demo-scene demo-scene--telefon">
          <div className="demo-scene-innhold">
            <p className="demo-avsnitt">feriebilde.jpg</p>
            <button ref={knappRef} type="button" className="demo-btn demo-btn--small" onClick={() => setOpen(true)}>
              <Icon name="del" size={14} /> Del
            </button>
          </div>
          {open && <button type="button" className="demo-scrim" aria-label="Lukk arket" onClick={lukk} />}
          <div
            className={'demo-sheet' + (open ? ' is-open' : '')}
            role="dialog"
            aria-label="Delingsvalg"
            aria-hidden={!open}
            ref={panelRef}
            tabIndex={-1}
            onKeyDown={(event) => {
              if (event.key === 'Escape') lukk()
            }}
          >
            <span className="demo-sheet-hank" aria-hidden="true" />
            {['Send i melding', 'Kopier lenke', 'Lagre i album'].map((valg) => (
              <button key={valg} type="button" className="demo-menu-item" onClick={lukk} disabled={!open}>
                {valg}
              </button>
            ))}
          </div>
        </div>
      </MiniScreen>
      <DemoNote>Mest brukt på mobil – arket glir opp fra bunnen av skjermen.</DemoNote>
    </div>
  )
}

export function ToastDemo() {
  const { toasts, push, dismiss } = useToasts()
  return (
    <div className="demo-stack">
      <div className="demo-knapperad">
        <button type="button" className="demo-btn" onClick={() => push('Endringen er lagret')}>
          Lagre
        </button>
        <button
          type="button"
          className="demo-btn demo-btn--secondary"
          onClick={() => push('Kunne ikke lagre – prøv igjen', 'error')}
        >
          Vis feil-toast
        </button>
      </div>
      <DemoNote>Meldingen dukker opp nede i hjørnet og forsvinner av seg selv.</DemoNote>
      <ToastViewport toasts={toasts} dismiss={dismiss} />
    </div>
  )
}

export function BannerDemo() {
  const [frakoblet, setFrakoblet] = useState(false)
  return (
    <div className="demo-stack">
      <MiniScreen>
        {frakoblet && (
          <div className="demo-banner" role="status">
            <Icon name="advarsel" size={16} />
            <span>Du er frakoblet – endringer lagres når du er på nett igjen.</span>
            <button
              type="button"
              className="demo-toast-x"
              aria-label="Lukk banneret"
              onClick={() => setFrakoblet(false)}
            >
              <Icon name="kryss" size={14} />
            </button>
          </div>
        )}
        <div className="demo-nav-innhold">Vanlig sideinnhold under banneret.</div>
      </MiniScreen>
      <label className="demo-check">
        <input
          type="checkbox"
          checked={frakoblet}
          onChange={(event) => setFrakoblet(event.target.checked)}
        />
        Simuler at nettet forsvinner
      </label>
    </div>
  )
}

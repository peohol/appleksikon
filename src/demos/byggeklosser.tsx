import { useState } from 'react'
import { Icon } from '../components/Icon'
import { DemoNote, DemoStatus, MiniScreen } from './shared'

type LayoutPart = 'side' | 'header' | 'sidebar' | 'main' | 'seksjon'

/** Miniatyr av en typisk appside der én del kan fremheves. */
function MiniLayout({ highlight, showSidebar = true }: { highlight: LayoutPart; showSidebar?: boolean }) {
  const cls = (part: LayoutPart, base: string) =>
    base + (highlight === part ? ' is-highlight' : '')
  return (
    <MiniScreen className={highlight === 'side' ? 'mini-screen--highlight' : undefined}>
      <div className="mini-layout">
        <div className={cls('header', 'mini-layout-header')}>Toppfelt</div>
        <div className="mini-layout-row">
          {showSidebar && <div className={cls('sidebar', 'mini-layout-sidebar')}>Sidepanel</div>}
          <div className={cls('main', 'mini-layout-main')}>
            <span className="mini-layout-main-label">Hovedinnhold</span>
            <div className={cls('seksjon', 'mini-layout-seksjon')}>Seksjon</div>
            <div className={cls('seksjon', 'mini-layout-seksjon')}>Seksjon</div>
          </div>
        </div>
      </div>
    </MiniScreen>
  )
}

export function SideDemo() {
  return (
    <div className="demo-stack">
      <div className="demo-sider">
        <MiniScreen className="mini-screen--highlight">
          <div className="mini-layout">
            <div className="mini-layout-header">Hjem</div>
            <div className="mini-layout-row">
              <div className="mini-layout-main">
                <div className="mini-layout-seksjon">Seksjon</div>
                <div className="mini-layout-seksjon">Seksjon</div>
              </div>
            </div>
          </div>
        </MiniScreen>
        <span className="demo-sider-pil" aria-hidden="true">
          <Icon name="pil-hoyre" />
        </span>
        <MiniScreen>
          <div className="mini-layout">
            <div className="mini-layout-header">Innstillinger</div>
            <div className="mini-layout-row">
              <div className="mini-layout-main">
                <div className="mini-layout-seksjon">Profil</div>
                <div className="mini-layout-seksjon">Varsler</div>
              </div>
            </div>
          </div>
        </MiniScreen>
      </div>
      <DemoNote>En app består gjerne av flere sider – her «Hjem» og «Innstillinger».</DemoNote>
    </div>
  )
}

export function ViewportDemo() {
  return (
    <div className="demo-stack">
      <div className="demo-viewport">
        <MiniScreen>
          <div className="demo-viewport-scroll" tabIndex={0} aria-label="Scrollbart eksempelinnhold">
            <div className="mini-layout-header">Toppfelt</div>
            {['Nyheter', 'Produkter', 'Omtaler', 'Kontakt', 'Om oss', 'Bunntekst'].map((label) => (
              <div key={label} className="mini-layout-seksjon demo-viewport-blokk">
                {label}
              </div>
            ))}
          </div>
        </MiniScreen>
        <span className="demo-viewport-merke">Synlig område</span>
      </div>
      <DemoNote>
        Scroll inni vinduet: innholdet flytter seg, men det synlige området (rammen) er det samme.
      </DemoNote>
    </div>
  )
}

export function MiniHeaderDemo() {
  return <MiniLayout highlight="header" />
}

export function MiniSidebarDemo() {
  const [visible, setVisible] = useState(true)
  return (
    <div className="demo-stack">
      <MiniLayout highlight="sidebar" showSidebar={visible} />
      <button type="button" className="demo-btn demo-btn--secondary" onClick={() => setVisible(!visible)}>
        {visible ? 'Skjul sidepanelet' : 'Vis sidepanelet'}
      </button>
    </div>
  )
}

export function MiniMainDemo() {
  return <MiniLayout highlight="main" />
}

export function MiniSeksjonDemo() {
  return <MiniLayout highlight="seksjon" />
}

export function ContainerDemo() {
  const [contained, setContained] = useState(true)
  return (
    <div className="demo-stack">
      <MiniScreen>
        <div className={'demo-container' + (contained ? ' is-contained' : '')}>
          <div className="demo-container-inner">
            <div className="demo-textline demo-textline--heading" />
            <div className="demo-textline" />
            <div className="demo-textline" />
            <div className="demo-textline demo-textline--short" />
          </div>
        </div>
      </MiniScreen>
      <label className="demo-check">
        <input
          type="checkbox"
          checked={contained}
          onChange={(event) => setContained(event.target.checked)}
        />
        Legg innholdet i en beholder med maks-bredde
      </label>
      <DemoNote>
        Beholderen er usynlig, men du ser effekten: innholdet samles på midten i stedet for å flyte
        helt ut til kantene.
      </DemoNote>
    </div>
  )
}

export function KortDemo() {
  return (
    <div className="demo-kort">
      <div className="demo-kort-bilde" aria-hidden="true">
        <Icon name="bilde" size={26} />
      </div>
      <div className="demo-kort-innhold">
        <h4>Fjelltur til Besseggen</h4>
        <p>Guidet dagstur med avreise fra Gjendesheim. Passer for de fleste.</p>
        <div className="demo-kort-bunn">
          <span className="demo-pill">Populær</span>
          <button type="button" className="demo-btn demo-btn--small">
            Les mer
          </button>
        </div>
      </div>
    </div>
  )
}

export function PanelDemo() {
  const [lyd, setLyd] = useState(true)
  const [epost, setEpost] = useState(false)
  return (
    <div className="demo-panel">
      <h4 className="demo-panel-tittel">
        <Icon name="tannhjul" size={16} /> Varslinger
      </h4>
      <label className="demo-check">
        <input type="checkbox" checked={lyd} onChange={(event) => setLyd(event.target.checked)} />
        Spill lyd ved nye meldinger
      </label>
      <label className="demo-check">
        <input type="checkbox" checked={epost} onChange={(event) => setEpost(event.target.checked)} />
        Send e-post ved omtale
      </label>
    </div>
  )
}

export function VerktoylinjeDemo() {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)
  return (
    <div className="demo-stack">
      <div className="demo-toolbar" role="toolbar" aria-label="Tekstformatering">
        <button
          type="button"
          className={'demo-iconbtn' + (bold ? ' is-on' : '')}
          aria-pressed={bold}
          onClick={() => setBold(!bold)}
        >
          <span className="demo-bokstav" style={{ fontWeight: 700 }}>
            F
          </span>
          <span className="sr-only">Fet</span>
        </button>
        <button
          type="button"
          className={'demo-iconbtn' + (italic ? ' is-on' : '')}
          aria-pressed={italic}
          onClick={() => setItalic(!italic)}
        >
          <span className="demo-bokstav" style={{ fontStyle: 'italic' }}>
            K
          </span>
          <span className="sr-only">Kursiv</span>
        </button>
        <button
          type="button"
          className={'demo-iconbtn' + (underline ? ' is-on' : '')}
          aria-pressed={underline}
          onClick={() => setUnderline(!underline)}
        >
          <span className="demo-bokstav" style={{ textDecoration: 'underline' }}>
            U
          </span>
          <span className="sr-only">Understreket</span>
        </button>
        <span className="demo-toolbar-divider" aria-hidden="true" />
        <button type="button" className="demo-iconbtn" aria-label="Sett inn bilde">
          <Icon name="bilde" />
        </button>
      </div>
      <p
        className="demo-toolbar-tekst"
        style={{
          fontWeight: bold ? 700 : 400,
          fontStyle: italic ? 'italic' : 'normal',
          textDecoration: underline ? 'underline' : 'none',
        }}
      >
        Knappene i verktøylinjen formaterer denne teksten.
      </p>
    </div>
  )
}

export function SkillelinjeDemo() {
  return (
    <div className="demo-stack">
      <div className="demo-dividerliste">
        <div className="demo-dividerliste-rad">Faktura mars.pdf</div>
        <hr className="demo-hr" />
        <div className="demo-dividerliste-rad">Faktura april.pdf</div>
        <hr className="demo-hr" />
        <div className="demo-dividerliste-rad">Faktura mai.pdf</div>
      </div>
      <DemoStatus>De tynne strekene mellom radene er skillelinjer.</DemoStatus>
    </div>
  )
}

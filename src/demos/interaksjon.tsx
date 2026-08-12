import { useRef, useState, type DragEvent, type KeyboardEvent } from 'react'
import { Icon } from '../components/Icon'
import { DemoNote, DemoSeg, DemoStatus } from './shared'

export function HoverFokusDemo() {
  const [hover, setHover] = useState(false)
  const [fokus, setFokus] = useState(false)
  return (
    <div className="demo-stack">
      <button
        type="button"
        className="demo-hoverfokus"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setFokus(true)}
        onBlur={() => setFokus(false)}
      >
        Pek på meg – eller tabb hit
      </button>
      <DemoStatus>
        Hover: {hover ? 'ja' : 'nei'} · Fokus: {fokus ? 'ja' : 'nei'}
      </DemoStatus>
      <DemoNote>
        Hover følger musepekeren, fokus følger tastaturet. Fokusringen vises når du bruker Tab.
      </DemoNote>
    </div>
  )
}

export function ValgtDemo() {
  const [valgt, setValgt] = useState<string | null>(null)
  return (
    <div className="demo-stack">
      <div className="demo-velgeliste" role="group" aria-label="Velg by">
        {['Oslo', 'Bergen', 'Tromsø'].map((by) => (
          <button
            key={by}
            type="button"
            className={'demo-velgerad' + (valgt === by ? ' is-valgt' : '')}
            aria-pressed={valgt === by}
            onClick={() => setValgt(valgt === by ? null : by)}
          >
            <span>{by}</span>
            {valgt === by && <Icon name="hake" size={16} />}
          </button>
        ))}
      </div>
      <DemoStatus>{valgt ? `Valgt: ${valgt} – raden forblir markert.` : 'Klikk på en rad.'}</DemoStatus>
    </div>
  )
}

export function AktivDemo() {
  const [trykkes, setTrykkes] = useState(false)
  return (
    <div className="demo-stack">
      <button
        type="button"
        className="demo-btn demo-aktivknapp"
        onPointerDown={() => setTrykkes(true)}
        onPointerUp={() => setTrykkes(false)}
        onPointerLeave={() => setTrykkes(false)}
        onKeyDown={(event) => {
          if (event.key === ' ' || event.key === 'Enter') setTrykkes(true)
        }}
        onKeyUp={() => setTrykkes(false)}
      >
        Hold meg inne
      </button>
      <DemoStatus>{trykkes ? 'Aktiv/pressed – akkurat nå trykkes knappen.' : 'Ikke trykket.'}</DemoStatus>
    </div>
  )
}

interface DndOppgave {
  id: string
  navn: string
  sone: 'todo' | 'ferdig'
}

const dndStart: DndOppgave[] = [
  { id: 'a', navn: 'Skrive utkast', sone: 'todo' },
  { id: 'b', navn: 'Lage skisser', sone: 'todo' },
  { id: 'c', navn: 'Sende tilbud', sone: 'ferdig' },
]

export function DraOgSlippDemo() {
  const [oppgaver, setOppgaver] = useState(dndStart)
  const [over, setOver] = useState<'todo' | 'ferdig' | null>(null)
  const [melding, setMelding] = useState('Dra kortene mellom kolonnene – eller bruk pilknappene.')

  const flytt = (id: string, sone: 'todo' | 'ferdig') => {
    setOppgaver((liste) => liste.map((o) => (o.id === id ? { ...o, sone } : o)))
    const oppgave = oppgaver.find((o) => o.id === id)
    if (oppgave) setMelding(`«${oppgave.navn}» ble flyttet til ${sone === 'todo' ? 'Å gjøre' : 'Ferdig'}.`)
  }

  const slipp = (event: DragEvent, sone: 'todo' | 'ferdig') => {
    event.preventDefault()
    const id = event.dataTransfer.getData('text/plain')
    if (id) flytt(id, sone)
    setOver(null)
  }

  const soner: { id: 'todo' | 'ferdig'; tittel: string }[] = [
    { id: 'todo', tittel: 'Å gjøre' },
    { id: 'ferdig', tittel: 'Ferdig' },
  ]

  return (
    <div className="demo-stack">
      <div className="demo-dnd">
        {soner.map((sone) => (
          <div
            key={sone.id}
            className={'demo-dnd-sone' + (over === sone.id ? ' is-over' : '')}
            onDragOver={(event) => {
              event.preventDefault()
              setOver(sone.id)
            }}
            onDragLeave={() => setOver(null)}
            onDrop={(event) => slipp(event, sone.id)}
          >
            <p className="demo-dnd-tittel">{sone.tittel}</p>
            {oppgaver
              .filter((oppgave) => oppgave.sone === sone.id)
              .map((oppgave) => (
                <div
                  key={oppgave.id}
                  className="demo-dnd-kort"
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData('text/plain', oppgave.id)
                    event.dataTransfer.effectAllowed = 'move'
                  }}
                >
                  <span className="demo-dnd-grip" aria-hidden="true">
                    <Icon name="grip" size={14} />
                  </span>
                  <span>{oppgave.navn}</span>
                  <button
                    type="button"
                    className="demo-iconbtn demo-iconbtn--mini"
                    aria-label={`Flytt «${oppgave.navn}» til ${sone.id === 'todo' ? 'Ferdig' : 'Å gjøre'}`}
                    onClick={() => flytt(oppgave.id, sone.id === 'todo' ? 'ferdig' : 'todo')}
                  >
                    <Icon name={sone.id === 'todo' ? 'pil-hoyre' : 'pil-venstre'} size={14} />
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
      <DemoStatus>{melding}</DemoStatus>
    </div>
  )
}

export function ReorganisereDemo() {
  const [rekkefolge, setRekkefolge] = useState(['Forrett', 'Hovedrett', 'Dessert', 'Kaffe'])
  const [melding, setMelding] = useState('Bruk pilknappene (eller dra) for å endre rekkefølgen.')
  const dragIndex = useRef<number | null>(null)

  const flytt = (fra: number, til: number) => {
    if (til < 0 || til >= rekkefolge.length) return
    const kopi = [...rekkefolge]
    const [element] = kopi.splice(fra, 1)
    kopi.splice(til, 0, element)
    setRekkefolge(kopi)
    setMelding(`«${element}» er nå nummer ${til + 1}.`)
  }

  return (
    <div className="demo-stack">
      <ol className="demo-reorder">
        {rekkefolge.map((navn, index) => (
          <li
            key={navn}
            draggable
            className="demo-reorder-rad"
            onDragStart={() => {
              dragIndex.current = index
            }}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (dragIndex.current !== null) flytt(dragIndex.current, index)
              dragIndex.current = null
            }}
          >
            <span className="demo-dnd-grip" aria-hidden="true">
              <Icon name="grip" size={14} />
            </span>
            <span className="demo-reorder-navn">{navn}</span>
            <button
              type="button"
              className="demo-iconbtn demo-iconbtn--mini"
              aria-label={`Flytt «${navn}» opp`}
              disabled={index === 0}
              onClick={() => flytt(index, index - 1)}
            >
              <Icon name="pil-opp" size={14} />
            </button>
            <button
              type="button"
              className="demo-iconbtn demo-iconbtn--mini"
              aria-label={`Flytt «${navn}» ned`}
              disabled={index === rekkefolge.length - 1}
              onClick={() => flytt(index, index + 1)}
            >
              <Icon name="pil-ned" size={14} />
            </button>
          </li>
        ))}
      </ol>
      <DemoStatus>{melding}</DemoStatus>
    </div>
  )
}

export function InlineRedigeringDemo() {
  const [navn, setNavn] = useState('Nettbutikk-prosjektet')
  const [utkast, setUtkast] = useState(navn)
  const [redigerer, setRedigerer] = useState(false)

  const lagre = () => {
    setNavn(utkast.trim() || navn)
    setRedigerer(false)
  }

  return (
    <div className="demo-stack">
      {redigerer ? (
        <div className="demo-inline-rad">
          <label className="sr-only" htmlFor="inline-demo-input">
            Prosjektnavn
          </label>
          <input
            id="inline-demo-input"
            className="demo-input"
            value={utkast}
            autoFocus
            onChange={(event) => setUtkast(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') lagre()
              if (event.key === 'Escape') setRedigerer(false)
            }}
          />
          <button type="button" className="demo-btn demo-btn--small" onClick={lagre}>
            Lagre
          </button>
        </div>
      ) : (
        <div className="demo-inline-rad">
          <span className="demo-inline-verdi">{navn}</span>
          <button
            type="button"
            className="demo-iconbtn"
            aria-label={`Rediger «${navn}»`}
            onClick={() => {
              setUtkast(navn)
              setRedigerer(true)
            }}
          >
            <Icon name="blyant" size={16} />
          </button>
        </div>
      )}
      <DemoNote>Verdien endres rett der den vises. Enter lagrer, Escape avbryter.</DemoNote>
    </div>
  )
}

export function TastatursnarveiDemo() {
  const [lagret, setLagret] = useState(false)

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
      event.preventDefault()
      setLagret(true)
    } else if (lagret) {
      setLagret(false)
    }
  }

  return (
    <div className="demo-stack">
      <div className="demo-felt">
        <label className="demo-label" htmlFor="snarvei-demo-notat">
          Notat
        </label>
        <textarea
          id="snarvei-demo-notat"
          className="demo-input demo-textarea"
          rows={3}
          defaultValue="Skriv her, og trykk Ctrl+S (⌘+S på Mac) for å lagre."
          onKeyDown={onKeyDown}
        />
      </div>
      <DemoStatus>
        {lagret ? 'Lagret med tastatursnarvei! ✓' : (
          <>
            Snarveien er <kbd>Ctrl</kbd> + <kbd>S</kbd> mens du står i feltet.
          </>
        )}
      </DemoStatus>
    </div>
  )
}

const angreFarger = ['#5b8def', '#58b57c', '#e2a33c', '#c96f6f', '#8a63d2']

export function AngreDemo() {
  const [fortid, setFortid] = useState<number[][]>([])
  const [prikker, setPrikker] = useState<number[]>([])
  const [fremtid, setFremtid] = useState<number[][]>([])

  const leggTil = () => {
    setFortid([...fortid, prikker])
    setPrikker([...prikker, prikker.length % angreFarger.length])
    setFremtid([])
  }

  const angre = () => {
    const forrige = fortid[fortid.length - 1]
    if (!forrige) return
    setFortid(fortid.slice(0, -1))
    setFremtid([prikker, ...fremtid])
    setPrikker(forrige)
  }

  const gjorOm = () => {
    const neste = fremtid[0]
    if (!neste) return
    setFremtid(fremtid.slice(1))
    setFortid([...fortid, prikker])
    setPrikker(neste)
  }

  return (
    <div className="demo-stack">
      <div className="demo-angreflate" aria-label={`${prikker.length} prikker`}>
        {prikker.map((farge, index) => (
          <span key={index} className="demo-angreprikk" style={{ background: angreFarger[farge] }} />
        ))}
        {prikker.length === 0 && <span className="demo-note">Tomt lerret.</span>}
      </div>
      <div className="demo-kontrollrad">
        <button type="button" className="demo-btn demo-btn--small" onClick={leggTil}>
          Legg til prikk
        </button>
        <button
          type="button"
          className="demo-btn demo-btn--small demo-btn--secondary"
          disabled={fortid.length === 0}
          onClick={angre}
        >
          Angre
        </button>
        <button
          type="button"
          className="demo-btn demo-btn--small demo-btn--secondary"
          disabled={fremtid.length === 0}
          onClick={gjorOm}
        >
          Gjør om
        </button>
      </div>
    </div>
  )
}

export function ScrollbarDemo() {
  return (
    <div className="demo-stack">
      <div className="demo-scrollflate demo-scrollflate--synlig" tabIndex={0} aria-label="Tekst med scrollbar">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <p key={n} className="demo-avsnitt">
            Avsnitt {n}. Stripen til høyre er scrollbaren – den viser hvor du er i innholdet.
          </p>
        ))}
      </div>
      <DemoNote>Scrollbaren kan dras, og den blir kortere jo mer innhold det finnes.</DemoNote>
    </div>
  )
}

export function ScrollomradeDemo() {
  const meldinger = [
    'Hei! Er pakken sendt?',
    'Ja, den ble sendt i går 📦',
    'Supert, takk!',
    'Sporingsnummer kommer på e-post.',
    'Fikk det nå – tusen takk for hjelpen!',
    'Bare hyggelig. God dag!',
  ]
  return (
    <div className="demo-stack">
      <div className="demo-chat">
        <p className="demo-chat-tittel">Kundechat</p>
        <div className="demo-chat-logg" tabIndex={0} aria-label="Meldingslogg med egen scrolling">
          {meldinger.map((melding, index) => (
            <p key={index} className={'demo-chat-boble' + (index % 2 ? ' is-svar' : '')}>
              {melding}
            </p>
          ))}
        </div>
        <div className="demo-chat-felt">
          <input className="demo-input" type="text" placeholder="Skriv en melding …" aria-label="Ny melding" />
        </div>
      </div>
      <DemoNote>Bare meldingsloggen scroller – tittelen og skrivefeltet står stille.</DemoNote>
    </div>
  )
}

export function HorisontalScrollingDemo() {
  return (
    <div className="demo-stack">
      <div className="demo-hscroll" tabIndex={0} aria-label="Kortrad med horisontal scrolling">
        {['Fjell', 'Sjø', 'Skog', 'By', 'Vidde', 'Bre'].map((navn) => (
          <div key={navn} className="demo-hscroll-kort">
            {navn}
          </div>
        ))}
      </div>
      <DemoNote>Raden scroller sidelengs – resten av siden står stille.</DemoNote>
    </div>
  )
}

export function OverflowDemo() {
  const [modus, setModus] = useState('klipp')
  return (
    <div className="demo-stack">
      <div className="demo-overflow-scene">
        <div
          className="demo-overflow-boks"
          style={{
            overflow: modus === 'klipp' ? 'hidden' : modus === 'scroll' ? 'auto' : 'visible',
          }}
          tabIndex={modus === 'scroll' ? 0 : undefined}
          aria-label="Boks med mye innhold"
        >
          <p>
            Denne boksen har fast størrelse, men innholdet er større enn boksen. Da må noe skje:
            innholdet kan klippes ved kanten, få sin egen scrolling – eller bare renne utenfor og
            legge seg over det som er rundt.
          </p>
        </div>
      </div>
      <DemoSeg
        legend="Hva skjer med innhold som ikke får plass?"
        options={[
          { value: 'klipp', label: 'Klippes' },
          { value: 'scroll', label: 'Scrolles' },
          { value: 'synlig', label: 'Renner utenfor' },
        ]}
        value={modus}
        onChange={setModus}
      />
    </div>
  )
}

export function ResponsivDemo() {
  const [visning, setVisning] = useState('desktop')
  const bredder: Record<string, string> = { mobil: '240px', nettbrett: '420px', desktop: '100%' }
  return (
    <div className="demo-stack">
      <DemoSeg
        legend="Skjermstørrelse"
        options={[
          { value: 'mobil', label: 'Mobil' },
          { value: 'nettbrett', label: 'Nettbrett' },
          { value: 'desktop', label: 'Desktop' },
        ]}
        value={visning}
        onChange={setVisning}
      />
      <div className="demo-responsiv-ytre">
        <div className="demo-responsiv-ramme" style={{ width: bredder[visning] }}>
          <div className="demo-responsiv-innhold">
            <div className="mini-layout-header">
              {visning === 'mobil' ? '☰  Meny' : 'Logo · Hjem · Produkter · Om oss'}
            </div>
            <div className="demo-responsiv-grid">
              {[1, 2, 3].map((n) => (
                <div key={n} className="demo-brikke demo-brikke--fyll">
                  Kort {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DemoNote>
        {visning === 'mobil' && 'Smal skjerm: kortene stables i én kolonne, og menyen gjemmes bak ☰.'}
        {visning === 'nettbrett' && 'Mellomstor skjerm: kortene står to i bredden.'}
        {visning === 'desktop' && 'Bred skjerm: plass til alle tre kortene ved siden av hverandre.'}
      </DemoNote>
    </div>
  )
}

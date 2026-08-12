import { useEffect, useRef, useState } from 'react'
import { Icon } from '../components/Icon'
import { ActionMenu, DemoNote, DemoStatus, TooltipButton } from './shared'

export function KnappDemo() {
  const [antall, setAntall] = useState(0)
  return (
    <div className="demo-stack">
      <button type="button" className="demo-btn" onClick={() => setAntall(antall + 1)}>
        Klikk meg
      </button>
      <DemoStatus>
        {antall === 0 ? 'Knappen er ikke trykket ennå.' : `Du har klikket ${antall} ganger.`}
      </DemoStatus>
    </div>
  )
}

export function KnappevarianterDemo() {
  return (
    <div className="demo-stack">
      <div className="demo-knapperad">
        <button type="button" className="demo-btn">
          Lagre
        </button>
        <button type="button" className="demo-btn demo-btn--secondary">
          Avbryt
        </button>
        <button type="button" className="demo-btn demo-btn--danger">
          Slett
        </button>
      </div>
      <DemoNote>
        Hovedknapp (fylt), sekundærknapp (ramme) og destruktiv knapp (rød) – i den rekkefølgen.
      </DemoNote>
    </div>
  )
}

export function IkonknappDemo() {
  return (
    <div className="demo-stack">
      <div className="demo-knapperad">
        <TooltipButton iconOnly tip="Rediger" aria-label="Rediger">
          <Icon name="blyant" />
        </TooltipButton>
        <TooltipButton iconOnly tip="Kopier" aria-label="Kopier">
          <Icon name="kopier" />
        </TooltipButton>
        <TooltipButton iconOnly tip="Slett" aria-label="Slett">
          <Icon name="soppel" />
        </TooltipButton>
      </div>
      <DemoNote>Bare ikon – derfor har hver knapp en tooltip som forklarer den.</DemoNote>
    </div>
  )
}

export function LenkeDemo() {
  return (
    <div className="demo-stack">
      <p className="demo-avsnitt">
        Les mer i <a href="#lenke">brukervilkårene</a> før du fortsetter.
      </p>
      <DemoNote>
        En lenke tar deg et sted (denne peker hit til begrepet). En knapp utfører en handling.
      </DemoNote>
    </div>
  )
}

export function MenyknappDemo() {
  const [valg, setValg] = useState<string | null>(null)
  return (
    <div className="demo-stack">
      <div className="demo-menyknapprad">
        <span>Rapport-2026.pdf</span>
        <ActionMenu
          label="Flere handlinger"
          iconOnly
          items={[
            { id: 'Rediger', label: 'Rediger' },
            { id: 'Dupliser', label: 'Dupliser' },
            { id: 'Slett', label: 'Slett', danger: true },
          ]}
          onSelect={setValg}
        />
      </div>
      <DemoStatus>{valg ? `Du valgte: ${valg}` : 'Åpne menyen med tre-prikker-knappen.'}</DemoStatus>
    </div>
  )
}

export function DisabledDemo() {
  const [klar, setKlar] = useState(false)
  return (
    <div className="demo-stack">
      <label className="demo-check">
        <input type="checkbox" checked={klar} onChange={(event) => setKlar(event.target.checked)} />
        Jeg godtar vilkårene
      </label>
      <button type="button" className="demo-btn" disabled={!klar}>
        Send inn
      </button>
      <DemoNote>Knappen er deaktivert (grået ut) til vilkårene er godtatt.</DemoNote>
    </div>
  )
}

export function LasteTilstandDemo() {
  const [tilstand, setTilstand] = useState<'klar' | 'laster' | 'ferdig'>('klar')
  const timerRef = useRef<number[]>([])

  useEffect(() => {
    const timers = timerRef.current
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const start = () => {
    setTilstand('laster')
    timerRef.current.push(
      window.setTimeout(() => {
        setTilstand('ferdig')
        timerRef.current.push(window.setTimeout(() => setTilstand('klar'), 2000))
      }, 1600),
    )
  }

  return (
    <div className="demo-stack">
      <button
        type="button"
        className="demo-btn"
        disabled={tilstand === 'laster'}
        onClick={start}
      >
        {tilstand === 'laster' && <span className="demo-spinner demo-spinner--liten" aria-hidden="true" />}
        {tilstand === 'klar' && 'Lagre'}
        {tilstand === 'laster' && 'Lagrer …'}
        {tilstand === 'ferdig' && 'Lagret ✓'}
      </button>
      <DemoNote>Mens den jobber viser knappen en spinner og kan ikke trykkes igjen.</DemoNote>
    </div>
  )
}

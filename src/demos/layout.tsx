import { useState } from 'react'
import { DemoNote, DemoSeg, DemoSlider, MiniScreen } from './shared'

export function RadKolonneDemo() {
  const [retning, setRetning] = useState('rad')
  return (
    <div className="demo-stack">
      <div
        className="demo-flexboks"
        style={{ flexDirection: retning === 'rad' ? 'row' : 'column' }}
      >
        <div className="demo-brikke">A</div>
        <div className="demo-brikke">B</div>
        <div className="demo-brikke">C</div>
      </div>
      <DemoSeg
        legend="Retning"
        options={[
          { value: 'rad', label: 'Rad (bortover)' },
          { value: 'kolonne', label: 'Kolonne (nedover)' },
        ]}
        value={retning}
        onChange={setRetning}
      />
    </div>
  )
}

export function GridDemo() {
  const [kolonner, setKolonner] = useState(3)
  return (
    <div className="demo-stack">
      <div
        className="demo-grid"
        style={{ gridTemplateColumns: `repeat(${kolonner}, 1fr)` }}
      >
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="demo-brikke">
            {n}
          </div>
        ))}
      </div>
      <DemoSlider label="Kolonner" min={1} max={4} value={kolonner} unit="" onChange={setKolonner} />
    </div>
  )
}

export function JusteringDemo() {
  const [valg, setValg] = useState('flex-start')
  return (
    <div className="demo-stack">
      <div className="demo-flexboks demo-flexboks--ramme" style={{ justifyContent: valg }}>
        <div className="demo-brikke">A</div>
        <div className="demo-brikke">B</div>
        <div className="demo-brikke">C</div>
      </div>
      <DemoSeg
        legend="Justering"
        options={[
          { value: 'flex-start', label: 'Venstre' },
          { value: 'center', label: 'Midt på' },
          { value: 'flex-end', label: 'Høyre' },
          { value: 'space-between', label: 'Jevnt fordelt' },
        ]}
        value={valg}
        onChange={setValg}
      />
    </div>
  )
}

export function SentreringDemo() {
  const [vannrett, setVannrett] = useState(true)
  const [loddrett, setLoddrett] = useState(true)
  return (
    <div className="demo-stack">
      <div
        className="demo-sentrering"
        style={{
          justifyContent: vannrett ? 'center' : 'flex-start',
          alignItems: loddrett ? 'center' : 'flex-start',
        }}
      >
        <div className="demo-brikke demo-brikke--bred">Logg inn</div>
      </div>
      <div className="demo-kontrollrad">
        <label className="demo-check">
          <input
            type="checkbox"
            checked={vannrett}
            onChange={(event) => setVannrett(event.target.checked)}
          />
          Sentrer vannrett
        </label>
        <label className="demo-check">
          <input
            type="checkbox"
            checked={loddrett}
            onChange={(event) => setLoddrett(event.target.checked)}
          />
          Sentrer loddrett
        </label>
      </div>
    </div>
  )
}

export function BreddeDemo() {
  const [bredde, setBredde] = useState(60)
  return (
    <div className="demo-stack">
      <div className="demo-ytre">
        <div className="demo-brikke demo-brikke--fyll" style={{ width: `${bredde}%` }}>
          {bredde} %
        </div>
      </div>
      <DemoSlider label="Bredde" min={20} max={100} value={bredde} unit="%" onChange={setBredde} />
    </div>
  )
}

export function MaksBreddeDemo() {
  const [plass, setPlass] = useState(100)
  const stoppet = plass > 62
  return (
    <div className="demo-stack">
      <div className="demo-ytre" style={{ width: `${plass}%` }}>
        <div className="demo-brikke demo-brikke--fyll demo-maksbredde">
          maks-bredde: 220 px
        </div>
      </div>
      <DemoSlider
        label="Plass rundt boksen"
        min={30}
        max={100}
        value={plass}
        unit="%"
        onChange={setPlass}
      />
      <DemoNote>
        {stoppet
          ? 'Selv om det er mer plass, vokser ikke boksen forbi maks-bredden sin.'
          : 'Med lite plass krymper boksen som normalt.'}
      </DemoNote>
    </div>
  )
}

export function HoydeDemo() {
  const [hoyde, setHoyde] = useState(80)
  return (
    <div className="demo-stack">
      <div className="demo-hoyde-rad">
        <div className="demo-brikke demo-brikke--fyll demo-hoyde-boks" style={{ height: hoyde }}>
          Boks
        </div>
        <span className="demo-maal" aria-hidden="true">
          {hoyde} px
        </span>
      </div>
      <DemoSlider label="Høyde" min={40} max={160} value={hoyde} onChange={setHoyde} />
    </div>
  )
}

export function MarginDemo() {
  const [margin, setMargin] = useState(16)
  return (
    <div className="demo-stack">
      <div className="demo-ytre demo-ytre--kolonne">
        <div className="demo-marginflate">
          <div className="demo-innholdsboks" style={{ margin }}>
            Kort
          </div>
        </div>
        <div className="demo-naboboks">Naboen under</div>
      </div>
      <DemoSlider
        label="Margin"
        min={0}
        max={40}
        value={margin}
        color="margin"
        onChange={setMargin}
      />
      <DemoNote>Det oransje feltet er marginen – luften utenfor boksen.</DemoNote>
    </div>
  )
}

export function PaddingDemo() {
  const [padding, setPadding] = useState(16)
  return (
    <div className="demo-stack">
      <div className="demo-paddingboks" style={{ padding }}>
        <div className="demo-innholdsboks demo-innholdsboks--tekst">
          Teksten inni boksen. Avstanden ut til kanten er padding.
        </div>
      </div>
      <DemoSlider
        label="Padding"
        min={0}
        max={40}
        value={padding}
        color="padding"
        onChange={setPadding}
      />
      <DemoNote>Det grønne feltet er paddingen – luften inni boksen.</DemoNote>
    </div>
  )
}

export function GapDemo() {
  const [gap, setGap] = useState(12)
  return (
    <div className="demo-stack">
      <div className="demo-gapflate" style={{ gap }}>
        <div className="demo-brikke demo-brikke--fyll">A</div>
        <div className="demo-brikke demo-brikke--fyll">B</div>
        <div className="demo-brikke demo-brikke--fyll">C</div>
      </div>
      <DemoSlider label="Gap" min={0} max={32} value={gap} color="gap" onChange={setGap} />
      <DemoNote>Det lilla feltet er gapet – én felles avstand mellom elementene.</DemoNote>
    </div>
  )
}

export function BorderDemo() {
  const [tykkelse, setTykkelse] = useState(2)
  return (
    <div className="demo-stack">
      <div className="demo-borderboks" style={{ borderWidth: tykkelse }}>
        Boks med ramme
      </div>
      <DemoSlider label="Rammetykkelse" min={0} max={6} value={tykkelse} onChange={setTykkelse} />
    </div>
  )
}

export function BorderRadiusDemo() {
  const [radius, setRadius] = useState(10)
  return (
    <div className="demo-stack">
      <div className="demo-radiusrad">
        <div className="demo-radiusboks" style={{ borderRadius: radius }}>
          Kort
        </div>
        <div className="demo-radiusavatar" style={{ borderRadius: radius }} aria-hidden="true">
          KN
        </div>
      </div>
      <DemoSlider label="Avrunding" min={0} max={32} value={radius} onChange={setRadius} />
      <DemoNote>Ved høy nok verdi blir små, kvadratiske elementer helt runde.</DemoNote>
    </div>
  )
}

export function SkyggeDemo() {
  const [niva, setNiva] = useState('1')
  return (
    <div className="demo-stack">
      <div className="demo-skyggeflate">
        <div className={`demo-skyggeboks demo-skyggeboks--${niva}`}>Kort</div>
      </div>
      <DemoSeg
        legend="Skygge"
        options={[
          { value: '0', label: 'Ingen' },
          { value: '1', label: 'Svak' },
          { value: '2', label: 'Middels' },
          { value: '3', label: 'Tydelig' },
        ]}
        value={niva}
        onChange={setNiva}
      />
    </div>
  )
}

export function StickyDemo() {
  return (
    <div className="demo-stack">
      <div className="demo-scrollflate" tabIndex={0} aria-label="Scrollbart eksempel med sticky overskrift">
        <p className="demo-avsnitt">Scroll nedover i denne ruten.</p>
        <div className="demo-stickybar">Denne raden er sticky</div>
        {['Første avsnitt', 'Andre avsnitt', 'Tredje avsnitt', 'Fjerde avsnitt', 'Femte avsnitt'].map(
          (tekst) => (
            <p key={tekst} className="demo-avsnitt">
              {tekst} med litt innhold, slik at det blir nok å scrolle i.
            </p>
          ),
        )}
      </div>
      <DemoNote>Raden scroller med til den treffer toppen – og blir hengende der.</DemoNote>
    </div>
  )
}

export function FixedDemo() {
  return (
    <div className="demo-stack">
      <MiniScreen>
        <div className="demo-fixedramme">
          <div className="demo-fixedscroll" tabIndex={0} aria-label="Scrollbart eksempel med fast knapp">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <p key={n} className="demo-avsnitt">
                Innhold {n} – scroll videre nedover.
              </p>
            ))}
          </div>
          <button type="button" className="demo-btn demo-fixedknapp">
            Hjelp
          </button>
        </div>
      </MiniScreen>
      <DemoNote>«Hjelp»-knappen ligger fast i hjørnet uansett hvor langt du scroller.</DemoNote>
    </div>
  )
}

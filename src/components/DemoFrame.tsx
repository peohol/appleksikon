import { demoRegistry, type DemoEntry, type DemoId } from '../demos/registry'

/** Rammen rundt alle demonstrasjoner, med «Prøv selv»- eller «Eksempel»-merke. */
export function DemoFrame({ demo }: { demo: DemoId }) {
  const entry: DemoEntry = demoRegistry[demo]
  const Demo = entry.Component
  return (
    <div className="demo-frame">
      <span className="demo-frame-label" aria-hidden="true">
        {entry.isStatic ? 'Eksempel' : 'Prøv selv'}
      </span>
      <div className="demo-frame-body">
        <Demo />
      </div>
    </div>
  )
}

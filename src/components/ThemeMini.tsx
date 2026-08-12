import type { CategoryId } from '../data/types'

/** Liten dekorativ miniatyr som antyder hva temaet handler om. */
export function ThemeMini({ id }: { id: CategoryId }) {
  return (
    <div className={`tmini tmini--${id}`} aria-hidden="true">
      {id === 'byggeklosser' && (
        <>
          <div className="tmini-bar" />
          <div className="tmini-rad">
            <div className="tmini-side" />
            <div className="tmini-flate" />
          </div>
        </>
      )}
      {id === 'layout' && (
        <div className="tmini-bokser">
          <span />
          <span />
          <span />
        </div>
      )}
      {id === 'tekst' && (
        <div className="tmini-tekst">
          <div className="tmini-linje tmini-linje--tykk" />
          <div className="tmini-linje" />
          <div className="tmini-linje tmini-linje--kort" />
          <span className="tmini-badge" />
        </div>
      )}
      {id === 'knapper' && (
        <div className="tmini-knapper">
          <span className="tmini-knapp tmini-knapp--fylt" />
          <span className="tmini-knapp" />
        </div>
      )}
      {id === 'felt' && (
        <div className="tmini-felt">
          <div className="tmini-linje tmini-linje--kort" />
          <div className="tmini-input" />
          <div className="tmini-checkrad">
            <span className="tmini-checkboks">✓</span>
            <div className="tmini-linje tmini-linje--kort" />
          </div>
        </div>
      )}
      {id === 'menyer' && (
        <div className="tmini-tabs">
          <span className="is-active" />
          <span />
          <span />
        </div>
      )}
      {id === 'dialoger' && (
        <div className="tmini-scene">
          <div className="tmini-dialog" />
        </div>
      )}
      {id === 'vise-skjule' && (
        <div className="tmini-accordion">
          <div className="tmini-accrad">
            <span className="tmini-pil">›</span>
          </div>
          <div className="tmini-accrad is-open">
            <span className="tmini-pil is-open">›</span>
          </div>
          <div className="tmini-accinnhold" />
        </div>
      )}
      {id === 'lister-data' && (
        <div className="tmini-liste">
          <div className="tmini-listerad" />
          <div className="tmini-listerad" />
          <div className="tmini-listerad" />
        </div>
      )}
      {id === 'interaksjon' && (
        <div className="tmini-interaksjon">
          <span className="tmini-fokusboks" />
          <span className="tmini-peker">➜</span>
        </div>
      )}
    </div>
  )
}

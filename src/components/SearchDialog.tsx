import { useEffect, useRef } from 'react'
import { Icon } from './Icon'
import { SearchPanel } from './SearchPanel'

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
      // showModal flytter fokus til første knapp – vi vil starte i søkefeltet.
      dialog.querySelector('input')?.focus()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      className="search-dialog"
      aria-label="Søk i leksikonet"
      onClose={onClose}
      onMouseDown={(event) => {
        if (event.target === ref.current) ref.current?.close()
      }}
    >
      <div className="search-dialog-topp">
        <p className="search-dialog-tittel">Hva er det du prøver å beskrive?</p>
        <button
          type="button"
          className="demo-iconbtn"
          aria-label="Lukk søket"
          onClick={() => ref.current?.close()}
        >
          <Icon name="kryss" size={16} />
        </button>
      </div>
      {open && <SearchPanel variant="dialog" onDone={() => ref.current?.close()} />}
    </dialog>
  )
}

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '../components/Icon'

/* ---------- Små byggeklosser brukt på tvers av demoene ---------- */

export function DemoNote({ children }: { children: ReactNode }) {
  return <p className="demo-note">{children}</p>
}

export function DemoStatus({ children }: { children: ReactNode }) {
  return (
    <p className="demo-status" role="status">
      {children}
    </p>
  )
}

export function DemoSlider({
  label,
  min,
  max,
  step = 1,
  value,
  unit = 'px',
  color,
  onChange,
}: {
  label: string
  min: number
  max: number
  step?: number
  value: number
  unit?: string
  color?: 'margin' | 'padding' | 'gap'
  onChange: (value: number) => void
}) {
  const id = useId()
  return (
    <div className={'demo-slider' + (color ? ` demo-slider--${color}` : '')}>
      <label htmlFor={id}>
        {label}:{' '}
        <strong>
          {value}
          {unit ? ` ${unit}` : ''}
        </strong>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  )
}

export function DemoSeg({
  legend,
  options,
  value,
  onChange,
  hideLegend = false,
}: {
  legend: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  hideLegend?: boolean
}) {
  const name = useId()
  return (
    <fieldset className="demo-seg">
      <legend className={hideLegend ? 'sr-only' : undefined}>{legend}</legend>
      <div className="demo-seg-row">
        {options.map((option) => (
          <label
            key={option.value}
            className={'demo-seg-item' + (option.value === value ? ' is-active' : '')}
          >
            <input
              type="radio"
              className="sr-only"
              name={name}
              value={option.value}
              checked={option.value === value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** En liten «app-skjerm» som demoer kan foregå inni. */
export function MiniScreen({
  children,
  className,
  height,
  narrow = false,
}: {
  children: ReactNode
  className?: string
  height?: number
  narrow?: boolean
}) {
  return (
    <div
      className={
        'mini-screen' + (narrow ? ' mini-screen--narrow' : '') + (className ? ` ${className}` : '')
      }
    >
      <div className="mini-screen-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="mini-screen-body" style={height ? { height } : undefined}>
        {children}
      </div>
    </div>
  )
}

/* ---------- Tooltip ---------- */

type TooltipButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tip: string
  iconOnly?: boolean
}

/** Knapp med tooltip som vises både ved hover og tastaturfokus. */
export function TooltipButton({ tip, iconOnly = false, children, ...rest }: TooltipButtonProps) {
  const [visible, setVisible] = useState(false)
  const id = useId()
  return (
    <span
      className="demo-tipwrap"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <button
        type="button"
        className={iconOnly ? 'demo-iconbtn' : 'demo-btn'}
        aria-describedby={id}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setVisible(false)
        }}
        {...rest}
      >
        {children}
      </button>
      <span role="tooltip" id={id} className={'demo-tooltip' + (visible ? ' is-visible' : '')}>
        {tip}
      </span>
    </span>
  )
}

/* ---------- Klikk utenfor ---------- */

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onOutside: () => void,
) {
  useEffect(() => {
    if (!active) return
    const handler = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onOutside()
    }
    document.addEventListener('pointerdown', handler)
    return () => document.removeEventListener('pointerdown', handler)
  }, [ref, active, onOutside])
}

/* ---------- Handlingsmeny (menyknapp) ---------- */

export interface MenuItem {
  id: string
  label: string
  danger?: boolean
}

export function ActionMenu({
  label,
  iconOnly = false,
  items,
  onSelect,
}: {
  label: string
  iconOnly?: boolean
  items: MenuItem[]
  onSelect: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const menuId = useId()

  useClickOutside(rootRef, open, () => setOpen(false))

  useEffect(() => {
    if (open) itemRefs.current[activeIndex]?.focus()
  }, [open, activeIndex])

  const openMenu = (index: number) => {
    setActiveIndex(index)
    setOpen(true)
  }

  const closeMenu = (refocus: boolean) => {
    setOpen(false)
    if (refocus) buttonRef.current?.focus()
  }

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      closeMenu(true)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % items.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (index - 1 + items.length) % items.length)
    } else if (event.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div className="demo-menu" ref={rootRef}>
      <button
        type="button"
        ref={buttonRef}
        className={iconOnly ? 'demo-iconbtn' : 'demo-btn'}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={iconOnly ? label : undefined}
        onClick={() => (open ? closeMenu(true) : openMenu(0))}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            openMenu(0)
          } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            openMenu(items.length - 1)
          }
        }}
      >
        {iconOnly ? (
          <Icon name="prikker" />
        ) : (
          <>
            {label} <Icon name="chevron-ned" size={14} />
          </>
        )}
      </button>
      {open && (
        <div
          className="demo-menu-list"
          role="menu"
          id={menuId}
          aria-label={label}
          onKeyDown={onMenuKeyDown}
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              tabIndex={-1}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              className={'demo-menu-item' + (item.danger ? ' is-danger' : '')}
              onClick={() => {
                closeMenu(true)
                onSelect(item.id)
              }}
              onMouseMove={() => setActiveIndex(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------- Autocomplete / combobox ---------- */

export function Combobox({
  label,
  options,
  placeholder,
}: {
  label: string
  options: string[]
  placeholder?: string
}) {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [chosen, setChosen] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const inputId = useId()
  const listId = useId()

  useClickOutside(rootRef, open, () => setOpen(false))

  const filtered = options.filter((option) =>
    option.toLowerCase().includes(text.trim().toLowerCase()),
  )

  const choose = (option: string) => {
    setText(option)
    setChosen(option)
    setOpen(false)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) setOpen(true)
      else setActiveIndex((index) => Math.min(index + 1, filtered.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter') {
      if (open && filtered[activeIndex]) {
        event.preventDefault()
        choose(filtered[activeIndex])
      }
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className="demo-combobox" ref={rootRef}>
      <label className="demo-label" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        className="demo-input"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          open && filtered[activeIndex] ? `${listId}-${activeIndex}` : undefined
        }
        placeholder={placeholder}
        value={text}
        onChange={(event) => {
          setText(event.target.value)
          setOpen(true)
          setActiveIndex(0)
        }}
        onKeyDown={onKeyDown}
      />
      {open && (
        <ul className="demo-combobox-list" role="listbox" id={listId} aria-label={label}>
          {filtered.length === 0 && <li className="demo-combobox-empty">Ingen treff</li>}
          {filtered.map((option, index) => (
            <li
              key={option}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              className={index === activeIndex ? 'is-active' : undefined}
              onMouseMove={() => setActiveIndex(index)}
              onClick={() => choose(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {chosen && <DemoStatus>Valgt: {chosen}</DemoStatus>}
    </div>
  )
}

/* ---------- Faner og accordion (gjenbrukes i sammenligninger) ---------- */

export interface PanelItem {
  id: string
  label: string
  content: ReactNode
}

export function TabsCore({ items, label }: { items: PanelItem[]; label: string }) {
  const [active, setActive] = useState(items[0].id)
  const baseId = useId()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = items.findIndex((item) => item.id === active)
    let next = -1
    if (event.key === 'ArrowRight') next = (index + 1) % items.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = items.length - 1
    if (next >= 0) {
      event.preventDefault()
      const item = items[next]
      setActive(item.id)
      tabRefs.current[item.id]?.focus()
    }
  }

  return (
    <div className="demo-tabs">
      <div role="tablist" aria-label={label} className="demo-tablist" onKeyDown={onKeyDown}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${baseId}-tab-${item.id}`}
            aria-selected={item.id === active}
            aria-controls={`${baseId}-panel-${item.id}`}
            tabIndex={item.id === active ? 0 : -1}
            ref={(el) => {
              tabRefs.current[item.id] = el
            }}
            className="demo-tab"
            onClick={() => setActive(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== active}
          className="demo-tabpanel"
        >
          {item.content}
        </div>
      ))}
    </div>
  )
}

export function AccordionCore({ items }: { items: PanelItem[] }) {
  const [openIds, setOpenIds] = useState<string[]>([])
  const baseId = useId()

  const toggle = (id: string) => {
    setOpenIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))
  }

  return (
    <div className="demo-accordion">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        return (
          <div key={item.id} className="demo-accordion-item">
            <h4 className="demo-accordion-heading">
              <button
                type="button"
                className="demo-accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={`${baseId}-${item.id}`}
                onClick={() => toggle(item.id)}
              >
                <span>{item.label}</span>
                <span className={'demo-accordion-chevron' + (isOpen ? ' is-open' : '')}>
                  <Icon name="chevron-ned" size={16} />
                </span>
              </button>
            </h4>
            {isOpen && (
              <div
                id={`${baseId}-${item.id}`}
                role="region"
                aria-label={item.label}
                className="demo-accordion-panel"
              >
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Toast ---------- */

export interface ToastItem {
  id: number
  text: string
  tone: 'success' | 'error'
}

export function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((timer) => window.clearTimeout(timer))
  }, [])

  const dismiss = (id: number) => setToasts((items) => items.filter((item) => item.id !== id))

  const push = (text: string, tone: 'success' | 'error' = 'success') => {
    nextId.current += 1
    const id = nextId.current
    setToasts((items) => [...items, { id, text, tone }])
    timers.current.push(window.setTimeout(() => dismiss(id), 4500))
  }

  return { toasts, push, dismiss }
}

export function ToastViewport({
  toasts,
  dismiss,
}: {
  toasts: ToastItem[]
  dismiss: (id: number) => void
}) {
  return createPortal(
    <div className="demo-toast-region" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={'demo-toast' + (toast.tone === 'error' ? ' is-error' : '')}
        >
          <Icon name={toast.tone === 'error' ? 'advarsel' : 'hake'} size={16} />
          <span>{toast.text}</span>
          <button
            type="button"
            className="demo-toast-x"
            onClick={() => dismiss(toast.id)}
            aria-label="Lukk melding"
          >
            <Icon name="kryss" size={14} />
          </button>
        </div>
      ))}
    </div>,
    document.body,
  )
}

/* ---------- Dialog ---------- */

export function useDemoDialog() {
  const ref = useRef<HTMLDialogElement>(null)
  const open = () => ref.current?.showModal()
  const close = () => ref.current?.close()
  /** Lukk når man klikker på bakteppet (utenfor selve dialogen). */
  const onBackdropClick = (event: { target: EventTarget | null }) => {
    if (event.target === ref.current) close()
  }
  return { ref, open, close, onBackdropClick }
}

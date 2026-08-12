import { useEffect, useState } from 'react'
import { Link } from '../lib/router'
import { Icon } from './Icon'
import { SearchDialog } from './SearchDialog'

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable
}

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen((open) => !open)
      } else if (event.key === '/' && !isTypingTarget(event.target)) {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="site-brand" href="/">
          <svg
            className="site-brand-merke"
            aria-hidden="true"
            viewBox="0 0 64 64"
            width="26"
            height="26"
          >
            <rect width="64" height="64" rx="14" fill="var(--accent)" />
            <rect x="12" y="13" width="40" height="9" rx="4.5" fill="#fff" opacity="0.95" />
            <rect x="12" y="28" width="18" height="23" rx="4.5" fill="#fff" opacity="0.8" />
            <rect x="34" y="28" width="18" height="23" rx="4.5" fill="#fff" opacity="0.55" />
          </svg>
          <span>Appleksikon</span>
        </Link>
        <nav className="site-nav" aria-label="Hovedmeny">
          <Link href="/#temaer">Temaer</Link>
        </nav>
        <button type="button" className="site-sok" onClick={() => setSearchOpen(true)}>
          <Icon name="sok" size={16} />
          <span>Søk</span>
          <kbd aria-hidden="true">Ctrl K</kbd>
        </button>
      </div>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}

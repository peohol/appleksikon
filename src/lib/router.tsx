import {
  createContext,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'

export interface RouteLocation {
  /** Sti uten hash, f.eks. «/tema/felt» */
  path: string
  /** Hash uten «#», f.eks. «checkbox» */
  hash: string
}

export type NavigationKind = 'initial' | 'push' | 'pop'

let currentNavigationKind: NavigationKind = 'initial'

export function getNavigationKind(): NavigationKind {
  return currentNavigationKind
}

/** Dekoder URL-biter uten å kaste på ugyldige %-sekvenser (f.eks. «/#%»). */
function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function readLocation(): RouteLocation {
  return {
    path: window.location.pathname,
    hash: safeDecode(window.location.hash.replace(/^#/, '')),
  }
}

const RouterContext = createContext<RouteLocation>({ path: '/', hash: '' })

const NAV_EVENT = 'appleksikon:navigate'

/** Naviger internt i appen. Bruker History API, så tilbake/frem i nettleseren fungerer. */
export function navigate(to: string, options: { replace?: boolean } = {}) {
  const url = new URL(to, window.location.origin)
  const sameUrl =
    url.pathname === window.location.pathname && url.hash === window.location.hash
  if (options.replace || sameUrl) {
    window.history.replaceState(null, '', url)
  } else {
    window.history.pushState(null, '', url)
  }
  currentNavigationKind = 'push'
  window.dispatchEvent(new Event(NAV_EVENT))
}

export function Router({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<RouteLocation>(readLocation)

  useEffect(() => {
    const onNavigate = () => setLocation(readLocation())
    const onPopState = () => {
      currentNavigationKind = 'pop'
      setLocation(readLocation())
    }
    window.addEventListener(NAV_EVENT, onNavigate)
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener(NAV_EVENT, onNavigate)
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  return <RouterContext.Provider value={location}>{children}</RouterContext.Provider>
}

export function useLocation(): RouteLocation {
  return useContext(RouterContext)
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

/** Intern lenke som navigerer uten å laste siden på nytt. */
export function Link({ href, onClick, children, ...rest }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented) return
    if (event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (rest.target && rest.target !== '_self') return
    event.preventDefault()
    navigate(href)
  }
  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

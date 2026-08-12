import '@testing-library/jest-dom/vitest'

// jsdom mangler disse – demoene og navigasjonen bruker dem.
window.scrollTo = () => {}
Element.prototype.scrollIntoView = () => {}
Element.prototype.scrollTo = (() => {}) as typeof Element.prototype.scrollTo

if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

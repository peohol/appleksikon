import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Link, Router, useLocation } from './router'

function LocationProbe() {
  const location = useLocation()
  return <output data-testid="loc">{`${location.path}|${location.hash}`}</output>
}

describe('router', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
  })

  afterEach(cleanup)

  it('oppdaterer plasseringen når en Link klikkes, uten full sidelasting', async () => {
    const user = userEvent.setup()
    render(
      <Router>
        <Link href="/tema/felt#checkbox">Til checkbox</Link>
        <LocationProbe />
      </Router>,
    )
    expect(screen.getByTestId('loc')).toHaveTextContent('/|')

    await user.click(screen.getByRole('link', { name: 'Til checkbox' }))

    expect(window.location.pathname).toBe('/tema/felt')
    expect(screen.getByTestId('loc')).toHaveTextContent('/tema/felt|checkbox')
  })

  it('lar nettleseren håndtere klikk med ctrl/cmd (åpne i ny fane)', async () => {
    const user = userEvent.setup()
    render(
      <Router>
        <Link href="/tema/layout">Layout</Link>
        <LocationProbe />
      </Router>,
    )

    await user.keyboard('{Control>}')
    await user.click(screen.getByRole('link', { name: 'Layout' }))
    await user.keyboard('{/Control}')

    // Ruteren skal ikke ha navigert selv.
    expect(screen.getByTestId('loc')).toHaveTextContent('/|')
  })

  it('krasjer ikke på ugyldig prosent-koding i hash', () => {
    window.history.replaceState(null, '', '/#%')
    render(
      <Router>
        <LocationProbe />
      </Router>,
    )
    expect(screen.getByTestId('loc')).toHaveTextContent('/|%')
  })

  it('erstatter historikkoppføringen når man navigerer til samme adresse', async () => {
    const user = userEvent.setup()
    render(
      <Router>
        <Link href="/tema/felt">Felt</Link>
        <LocationProbe />
      </Router>,
    )
    const lengdeFoer = window.history.length
    await user.click(screen.getByRole('link', { name: 'Felt' }))
    const lengdeEtterFoerste = window.history.length
    expect(lengdeEtterFoerste).toBe(lengdeFoer + 1)

    await user.click(screen.getByRole('link', { name: 'Felt' }))
    expect(window.history.length).toBe(lengdeEtterFoerste)
  })
})

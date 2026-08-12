import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { Router } from '../lib/router'

function renderApp(startUrl = '/') {
  window.history.replaceState(null, '', startUrl)
  return render(
    <Router>
      <App />
    </Router>,
  )
}

describe('Appleksikon', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
  })

  afterEach(cleanup)

  it('viser forsiden med søk, temakort og sammenligninger', () => {
    renderApp()
    expect(
      screen.getByRole('heading', { level: 1, name: 'Hva er det du prøver å beskrive?' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Plassering, størrelse og luft/ })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Margin, padding og gap/ })).toBeInTheDocument()
  })

  it('søker med alias og navigerer til begrepet', async () => {
    const user = userEvent.setup()
    renderApp()

    const input = screen.getByRole('combobox', { name: 'Hva er det du prøver å beskrive?' })
    await user.type(input, 'sprettoppvindu')

    const treff = await screen.findByRole('option', { name: /Dialogboks/ })
    await user.click(treff)

    expect(window.location.pathname).toBe('/tema/dialoger')
    expect(window.location.hash).toBe('#modal')
    expect(
      await screen.findByRole('heading', { level: 2, name: 'Dialogboks' }),
    ).toBeInTheDocument()
  })

  it('kan navigere fra temakort til temaside med begreper og demo', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('link', { name: /Plassering, størrelse og luft/ }))

    expect(
      screen.getByRole('heading', { level: 1, name: 'Plassering, størrelse og luft' }),
    ).toBeInTheDocument()
    const paddingKort = document.getElementById('padding')
    expect(paddingKort).not.toBeNull()
    expect(within(paddingKort as HTMLElement).getByText(/Slik kan du si det/)).toBeInTheDocument()
  })

  it('viser riktig begrep ved direkte URL med anker', () => {
    renderApp('/tema/felt#checkbox')
    expect(screen.getByRole('heading', { level: 2, name: 'Avmerkingsboks' })).toBeInTheDocument()
    expect(document.getElementById('checkbox')).not.toBeNull()
  })

  it('viser sammenligningsside med demo', () => {
    renderApp('/sammenlign/margin-padding-gap')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Margin, padding og gap' }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Kort forklart/)).toBeInTheDocument()
  })

  it('viser 404-side for ukjente adresser', () => {
    renderApp('/finnes-ikke')
    expect(screen.getByRole('heading', { level: 1, name: 'Fant ikke siden' })).toBeInTheDocument()
  })

  it('accordion-demoen kan åpnes og lukkes uten å påvirke resten', async () => {
    const user = userEvent.setup()
    renderApp('/tema/vise-skjule')

    const trigger = screen.getAllByRole('button', { name: /Hva koster frakten/ })[0]
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/gratis over 500 kr/)).toBeInTheDocument()

    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('faner i demoen bytter panel med klikk', async () => {
    const user = userEvent.setup()
    renderApp('/tema/menyer')

    const fane = screen.getByRole('tab', { name: 'Detaljer' })
    await user.click(fane)
    expect(fane).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/resirkulert nylon/)).toBeInTheDocument()
  })
})

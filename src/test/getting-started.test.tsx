import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { Router } from '../lib/router'

function renderApp(path = '/') {
  window.history.replaceState(null, '', path)
  return render(<Router><App /></Router>)
}

describe('Kom i gang-guiden', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
  })
  afterEach(cleanup)

  it('kan åpnes fra forsiden og er tilgjengelig som egen side', async () => {
    const user = userEvent.setup()
    renderApp()

    await user.click(screen.getByRole('link', { name: /Slik kommer du i gang/ }))
    expect(window.location.pathname).toBe('/kom-i-gang')
    expect(screen.getByRole('heading', { level: 1, name: 'Lag din første nettapp' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Hva er en nettapp?' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Opprett GitHub-konto og repo' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Koble GitHub til en kodeagent' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Gi Vercel GitHub-tilgang og publiser' })).toBeInTheDocument()
  })

  it('viser en fungerende nettapp uten å vise eller kreve kode', async () => {
    const user = userEvent.setup()
    const { container } = renderApp('/kom-i-gang')

    expect(screen.getByRole('status')).toHaveTextContent('0 av 2 punkter fullført.')
    await user.click(screen.getByRole('checkbox', { name: 'Velg et navn til appen' }))
    expect(screen.getByRole('status')).toHaveTextContent('1 av 2 punkter fullført.')
    await user.click(screen.getByRole('checkbox', { name: 'Fortell språkmodellen hva appen skal gjøre' }))
    expect(screen.getByRole('status')).toHaveTextContent('2 av 2 punkter fullført.')
    expect(container.querySelector('.guide pre, .guide code')).toBeNull()
    expect(screen.queryByText(/index\.html/i)).not.toBeInTheDocument()
  })

  it('forklarer autorisasjon før import og gir separate oppskrifter for begge skyagentene', () => {
    const { container } = renderApp('/kom-i-gang')
    const guide = container.querySelector('.guide')
    expect(guide).not.toBeNull()

    expect(screen.getByRole('link', { name: /Installer Vercel på GitHub/ })).toHaveAttribute(
      'href', 'https://github.com/apps/vercel/installations/new',
    )
    expect(screen.getByRole('link', { name: /Anthropics oppdaterte oppstartsguide/ })).toHaveAttribute(
      'href', 'https://code.claude.com/docs/en/web-quickstart',
    )
    expect(screen.getByRole('link', { name: /OpenAIs veiledning for skyarbeidsmiljøer/ })).toHaveAttribute(
      'href', 'https://learn.chatgpt.com/docs/environments/cloud-environments',
    )
    expect(within(guide as HTMLElement).getByText(/Sign in with GitHub/)).toBeInTheDocument()
    expect(within(guide as HTMLElement).getAllByText(/Connect GitHub/).length).toBeGreaterThan(0)

    const vercelSection = container.querySelector('#vercel')
    const text = vercelSection?.textContent ?? ''
    expect(text.indexOf('Gi Vercel tilgang på GitHub')).toBeLessThan(
      text.indexOf('Opprett Vercel-prosjektet'),
    )
  })

  it('har kopierbar oppgavetekst fremfor kodeinstrukser', async () => {
    const user = userEvent.setup()
    renderApp('/kom-i-gang')
    expect(screen.getByText(/Jeg har opprettet et nytt GitHub-repo/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Kopier oppgaven' }))
    expect(screen.getByRole('button', { name: 'Kopiert' })).toBeInTheDocument()
  })
})

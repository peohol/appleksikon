import { useState, type ReactNode } from 'react'
import { Link } from '../lib/router'
import { usePageTitle } from '../lib/usePageTitle'
import { Icon } from '../components/Icon'

const firstTask = [
  'Jeg har opprettet et nytt GitHub-repo som foreløpig bare inneholder en README.',
  'Lag en enkel, pen nettapp som fungerer som en huskeliste: Jeg skal kunne legge til punkter, krysse dem av og slette dem.',
  'Appen skal fungere på mobil og PC. Velg selv et enkelt, gjennomprøvd oppsett som kan publiseres på Vercel.',
  'Ikke bruk database, innlogging eller betalte tjenester. Sørg for at appen virker, og opprett et endringsforslag (pull request) på GitHub. Ikke skriv rett til hovedversjonen.',
  'Forklar kort med vanlige ord hvordan jeg kan se og godkjenne resultatet.',
].join('\n\n')

function SourceLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="guide-external" href={href} target="_blank" rel="noopener noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  )
}

function GuideStep({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="guide-step">
      <h3>{title}</h3>
      {children}
    </li>
  )
}

function WorkingExample() {
  const [checked, setChecked] = useState([false, false])
  const done = checked.filter(Boolean).length
  const items = ['Velg et navn til appen', 'Fortell språkmodellen hva appen skal gjøre']

  return (
    <figure className="guide-browser">
      <div className="guide-browser-top" aria-hidden="true">
        <span className="guide-dots"><i /><i /><i /></span>
        <span className="guide-browser-url">En liten nettapp</span>
      </div>
      <div className="guide-browser-body">
        <figcaption className="guide-demo-kicker">Prøv selv</figcaption>
        <h3>Min lille huskeliste</h3>
        <p>En nettapp gjør noe når du bruker den. Prøv å krysse av punktene:</p>
        <div className="guide-demo-todos">
          {items.map((item, index) => (
            <label key={item} className={checked[index] ? 'guide-demo-done' : ''}>
              <input
                type="checkbox"
                checked={checked[index]}
                onChange={() => setChecked((prev) => prev.map((val, i) => i === index ? !val : val))}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <p className="guide-demo-status" role="status">{done} av 2 punkter fullført.</p>
      </div>
    </figure>
  )
}

function TaskPrompt() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(firstTask)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="guide-prompt">
      <div className="guide-prompt-head">
        <span>Eksempel: Be agenten lage din første nettapp</span>
        <button type="button" className="guide-copy" onClick={copy}>
          <Icon name={copied ? 'hake' : 'kopier'} size={16} />
          {copied ? 'Kopiert' : 'Kopier oppgaven'}
        </button>
      </div>
      <p className="guide-prompt-body">{firstTask}</p>
    </div>
  )
}

function Milestone({ children }: { children: ReactNode }) {
  return (
    <p className="guide-milestone">
      <Icon name="hake" size={19} />
      <span>{children}</span>
    </p>
  )
}

export function GettingStartedPage() {
  usePageTitle('Lag din første nettapp – Appleksikon')

  return (
    <article className="guide">
      <nav className="crumbs" aria-label="Brødsmulesti">
        <Link href="/">Hjem</Link>
        <span className="crumbs-skille" aria-hidden="true"><Icon name="chevron-hoyre" size={12} /></span>
        <span aria-current="page">Kom i gang</span>
      </nav>

      <header className="guide-hero">
        <p className="page-eyebrow">For deg som aldri har programmert før</p>
        <h1>Lag din første nettapp</h1>
        <p className="guide-lead">
          Lær hvordan GitHub, Claude Code eller Codex og Vercel brukes sammen.
          Du trenger bare nettleseren og en idé. Du skal ikke skrive kode.
        </p>
        <nav aria-label="Kapitler i guiden" className="guide-toc">
          <a href="#hva-er-en-app">Hva er en nettapp?</a>
          <a href="#tre-tjenester">Hvordan virker det?</a>
          <a href="#github">1. GitHub</a>
          <a href="#kodeagent">2. Claude eller Codex</a>
          <a href="#vercel">3. Vercel</a>
          <a href="#videre">4. Bygg videre</a>
        </nav>
      </header>

      <section className="guide-section" id="hva-er-en-app">
        <div className="guide-reading">
          <p className="guide-overline">Før du begynner</p>
          <h2>Hva er en nettapp?</h2>
          <p>
            En <strong>nettapp</strong> er et program som åpnes i nettleseren, for eksempel i
            Chrome, Edge eller Safari. Du trenger ikke installere noe. Nettappen har en vanlig
            nettadresse som du kan dele med andre.
          </p>
          <p>
            En vanlig nettside kan først og fremst vise informasjon. En nettapp kan også <em>gjøre
            noe</em> når du trykker, skriver eller velger — for eksempel legge noe i en
            huskeliste, regne ut en sum eller vise en kalender. Forskjellen er ikke absolutt:
            mange nettsider er også nettapper.
          </p>
        </div>
        <WorkingExample />
        <p className="guide-reading guide-aside">
          Denne lille huskelisten er en ekte, interaktiv demonstrasjon. Den husker avkrysningene
          mens du er på siden, men ikke etter at du laster den inn på nytt. Mer avanserte apper kan
          lagre informasjon og ha innlogging, men det trenger du ikke i starten.
        </p>
      </section>

      <section className="guide-section" id="tre-tjenester">
        <div className="guide-reading">
          <p className="guide-overline">Slik henger det sammen</p>
          <h2>Tre tjenester med hver sin jobb</h2>
          <p>Du bruker ikke tre forskjellige steder for å gjøre det samme. Hver tjeneste har en tydelig oppgave.</p>
        </div>
        <figure className="guide-flow">
          <figcaption className="guide-flow-title">Fra idé til en nettadresse andre kan åpne</figcaption>
          <div className="guide-flow-grid">
            <div className="guide-flow-box">
              <span className="guide-flow-kind">1 · Lagring</span>
              <strong>GitHub</strong>
              <span>Holder orden på filene og tidligere versjoner av appen.</span>
            </div>
            <span className="guide-flow-arrow" aria-hidden="true">→</span>
            <div className="guide-flow-box guide-flow-box--ai">
              <span className="guide-flow-kind">2 · Bygging</span>
              <strong>Claude Code <small>eller</small> Codex</strong>
              <span>Du forteller hva du vil lage. Modellen lager filene i GitHub.</span>
            </div>
            <span className="guide-flow-arrow" aria-hidden="true">→</span>
            <div className="guide-flow-box guide-flow-box--vercel">
              <span className="guide-flow-kind">3 · Publisering</span>
              <strong>Vercel</strong>
              <span>Henter den godkjente versjonen og gjør appen tilgjengelig på nett.</span>
            </div>
          </div>
          <div className="guide-flow-end">
            <span className="guide-flow-end-symbol" aria-hidden="true">↳</span>
            <span><strong>Resultatet:</strong> En adresse du kan åpne i nettleseren.</span>
          </div>
          <p className="guide-flow-note">
            Når du senere ønsker en endring, ber du språkmodellen oppdatere GitHub. Vercel
            publiserer den nye versjonen etter at du har godkjent endringen.
          </p>
        </figure>
        <div className="guide-terms">
          <div><strong>Repo</strong><p>En mappe på GitHub som inneholder prosjektet ditt.</p></div>
          <div><strong>Pull request (PR)</strong><p>Et forslag til endring som du kan kontrollere før du godkjenner.</p></div>
          <div><strong>Hovedversjonen (main)</strong><p>Den godkjente versjonen av appen. Det er vanligvis denne Vercel viser til alle.</p></div>
        </div>
      </section>

      <section className="guide-section" id="github">
        <header className="guide-chapter">
          <span className="guide-chapter-number">1</span>
          <div><p className="guide-overline">Først: Et sted å lagre appen</p><h2>Opprett GitHub-konto og repo</h2></div>
        </header>
        <ol className="guide-steps">
          <GuideStep title="Lag en GitHub-konto">
            <p>Gå til <SourceLink href="https://github.com/signup">GitHub</SourceLink>, registrer deg og bekreft e-postadressen. Gratisplanen er tilstrekkelig.</p>
          </GuideStep>
          <GuideStep title="Opprett et nytt repo">
            <p>
              Når du er logget inn, åpner du <SourceLink href="https://github.com/new">New repository</SourceLink>.
              Velg din egen konto under <strong>Owner</strong>, og skriv for eksempel
              <strong> min-forste-nettapp</strong> i feltet <strong>Repository name</strong>.
            </p>
            <p>
              Velg <strong>Public</strong> hvis andre kan få se filene, eller <strong>Private</strong>
              hvis du ønsker at filene skal være private. Det valget kan endres senere.
            </p>
          </GuideStep>
          <GuideStep title="Lag repoet uten å skrive kode">
            <p>
              Huk av <strong>Add README</strong> (en fil som beskriver prosjektet), og velg
              <strong> Create repository</strong>. La de andre valgene stå som de er.
            </p>
            <p>Det er helt riktig at du foreløpig bare ser en beskrivelsesfil. Språkmodellen skal lage selve appen.</p>
          </GuideStep>
        </ol>
        <Milestone>GitHub-repoet ditt er opprettet. Ingen programmering er nødvendig.</Milestone>
      </section>

      <section className="guide-section" id="kodeagent">
        <header className="guide-chapter">
          <span className="guide-chapter-number">2</span>
          <div><p className="guide-overline">Deretter: Få hjelp til å bygge</p><h2>Koble GitHub til en kodeagent</h2></div>
        </header>
        <p className="guide-reading guide-lead-small">
          Velg <strong>enten Claude Code eller Codex Cloud</strong>. Begge kan brukes i nettleseren
          uten terminal eller skrivebordsapp. Du trenger ikke begge.
        </p>

        <div className="guide-choices">
          <section className="guide-choice" aria-labelledby="claude-choice">
            <header className="guide-choice-header">
              <p className="guide-choice-eyebrow">Alternativ A · Anthropic</p>
              <h3 id="claude-choice">Claude Code i nettleseren</h3>
              <p>Forutsetter tilgang til skyøkter, blant annet gjennom Claude Pro eller Max.</p>
            </header>
            <ol className="guide-choice-steps">
              <li><strong>Registrer deg.</strong> Opprett konto hos <SourceLink href="https://claude.ai/">Claude</SourceLink>.</li>
              <li>
                <strong>Åpne riktig tjeneste.</strong> Gå til <SourceLink href="https://claude.ai/code">claude.ai/code</SourceLink>.
                Hvis du får forslag om å installere et program, velg <strong>Continue on web</strong>
                nederst. Du skal bli i nettleseren.
              </li>
              <li>
                <strong>Gi GitHub-tilgang før du velger prosjekt.</strong> Velg
                <strong> Sign in with GitHub</strong>. Du sendes til GitHub for å godkjenne
                tilkoblingen. Kontroller hvilken GitHub-konto som står øverst, les
                tilgangsforespørselen, og velg <strong>Authorize</strong> for å gå tilbake
                til Claude. Claude kan da bruke repoer denne kontoen har tilgang til.
              </li>
              <li>
                <strong>Gjør klar skyen.</strong> På Pro/Max opprettes vanligvis
                <strong> Default</strong> automatisk. På Team/Enterprise kan du bli bedt
                om å velge <strong>Create &amp; finish</strong>. På jobb- eller teamkontoer
                må administrator noen ganger aktivere GitHub under
                <strong> Admin settings → Connectors</strong> først.
              </li>
              <li>
                <strong>Velg repoet.</strong> Under tekstfeltet velger du repoet
                <strong> min-forste-nettapp</strong>. Bruk gjerne <strong>Plan</strong> hvis du
                vil gjennomgå planen før modellen begynner.
              </li>
            </ol>
            <div className="guide-choice-note">
              <Icon name="info" size={18} />
              <p>
                Claude kan spørre om du vil installere <strong>Claude GitHub App</strong>.
                Den er <strong>ikke nødvendig</strong> for en vanlig skyøkt. Velg
                <strong> Skip</strong> hvis du bare vil komme i gang; appen er valgfri for
                automatisk oppfølging av endringsforslag.
              </p>
            </div>
            <p className="guide-choice-source"><SourceLink href="https://code.claude.com/docs/en/web-quickstart">Anthropics oppdaterte oppstartsguide</SourceLink></p>
          </section>

          <section className="guide-choice" aria-labelledby="codex-choice">
            <header className="guide-choice-header">
              <p className="guide-choice-eyebrow">Alternativ B · OpenAI</p>
              <h3 id="codex-choice">Codex Cloud i ChatGPT</h3>
              <p>Forutsetter tilgang til Codex Cloud, blant annet gjennom ChatGPT Plus, Pro eller Business.</p>
            </header>
            <ol className="guide-choice-steps">
              <li><strong>Registrer deg.</strong> Opprett konto hos <SourceLink href="https://chatgpt.com/">ChatGPT</SourceLink>.</li>
              <li>
                <strong>Åpne Codex i nettleseren.</strong> Gå til <SourceLink href="https://chatgpt.com/codex">Codex</SourceLink>.
                I en ny oppgave velger du <strong>Work in → Cloud</strong>, deretter
                <strong> Select environment → Create environment</strong>.
              </li>
              <li>
                <strong>Gi GitHub-tilgang før du velger prosjekt.</strong> Når du ser
                <strong> Connect GitHub</strong>, velger du denne. Logg inn på den riktige
                GitHub-kontoen og godkjenn forespørselen. Hvis GitHub ber deg velge en konto
                eller repoer for installasjonen, velger du kontoen som eier
                <strong> min-forste-nettapp</strong> og gir tilgang til dette repoet
                (for eksempel med <strong>Only select repositories</strong>).
                Fullfør med <strong>Install</strong> eller <strong>Authorize</strong>,
                alt etter hva GitHub viser.
              </li>
              <li>
                <strong>Gjør klar arbeidsmiljøet.</strong> Velg repoet og
                <strong> Get started</strong>. Codex forbereder prosjektet. Siden repoet bare
                inneholder en README, kan du forklare at det skal bli en enkel nettapp.
                Se gjennom resultatet, svar på eventuelle spørsmål og velg
                <strong> Publish</strong>.
              </li>
              <li>
                <strong>Start første oppgave.</strong> Når du ser
                <strong> Environment published</strong>, velger du
                <strong> Start a new task</strong>.
              </li>
            </ol>
            <div className="guide-choice-note">
              <Icon name="info" size={18} />
              <p>
                Tilkoblingen inne i <strong>Codex Cloud</strong> er den viktige her.
                Det er ikke tilstrekkelig å bare bruke GitHub som en lesetilkobling i
                en vanlig ChatGPT-samtale.
              </p>
            </div>
            <p className="guide-choice-source"><SourceLink href="https://learn.chatgpt.com/docs/environments/cloud-environments">OpenAIs veiledning for skyarbeidsmiljøer</SourceLink></p>
          </section>
        </div>

        <div className="guide-prompt-section" id="forste-oppgave">
          <p className="guide-overline">Første oppgave</p>
          <h3>Beskriv appen du vil lage</h3>
          <p>
            Lim inn denne oppgaven i Claude Code eller Codex, eller skriv din egen beskrivelse.
            Oppgaven inneholder <strong>bare vanlig tekst</strong> — du trenger ikke se eller skrive kode.
          </p>
          <TaskPrompt />
          <p>
            La modellen lage filene og åpne et <strong>pull request (PR)</strong> på GitHub.
            Se gjennom forklaringen og kontrollene, og velg
            <strong> Merge pull request</strong> når du ønsker å godkjenne.
            Da finnes den første appen i hovedversjonen av repoet ditt.
          </p>
        </div>
        <Milestone>Språkmodellen har laget appen. Nå kan Vercel publisere den.</Milestone>
      </section>

      <section className="guide-section" id="vercel">
        <header className="guide-chapter">
          <span className="guide-chapter-number">3</span>
          <div><p className="guide-overline">Så: Gjør appen tilgjengelig</p><h2>Gi Vercel GitHub-tilgang og publiser</h2></div>
        </header>
        <div className="guide-important">
          <Icon name="info" size={20} />
          <p>
            Å bruke GitHub-kontoen til å <em>logge inn</em> på Vercel er ikke helt det samme
            som å gi Vercel tilgang til repoet. Før du importerer prosjektet, må
            <strong> Vercel GitHub App</strong> være installert med tilgang til repoet.
          </p>
        </div>
        <ol className="guide-steps">
          <GuideStep title="Opprett en Vercel-konto">
            <p>
              Åpne <SourceLink href="https://vercel.com/signup">Vercel</SourceLink>.
              Velg <strong>Continue with GitHub</strong>, logg inn på riktig konto og
              godkjenn innloggingen. Til et enkelt, personlig og ikke-kommersielt
              øvingsprosjekt kan du velge gratisplanen <strong>Hobby</strong>.
            </p>
          </GuideStep>
          <GuideStep title="Gi Vercel tilgang på GitHub – før importen">
            <p>
              Åpne <SourceLink href="https://github.com/apps/vercel/installations/new">Installer Vercel på GitHub</SourceLink>.
              Velg kontoen som eier <strong>min-forste-nettapp</strong>. Under
              <strong> Repository access</strong> velger du helst
              <strong> Only select repositories</strong>, finner repoet ditt i
              <strong> Select repositories</strong>, leser tillatelsene og velger
              <strong> Install</strong>.
            </p>
            <p>
              <strong>Er Vercel allerede installert?</strong> Åpne
              <SourceLink href="https://github.com/settings/installations">Installed GitHub Apps</SourceLink>,
              velg <strong>Configure</strong> ved Vercel, finn
              <strong> Repository access</strong>, legg til repoet og lagre.
            </p>
          </GuideStep>
          <GuideStep title="Opprett Vercel-prosjektet">
            <p>
              Gå tilbake til Vercels oversikt og velg <strong>Add New… → Project</strong>
              (eller <strong>New Project</strong>). Under GitHub finner du
              <strong> min-forste-nettapp</strong> og velger <strong>Import</strong>.
            </p>
            <p>
              Vercel vil vanligvis kjenne igjen oppsettet språkmodellen laget.
              Behold de foreslåtte innstillingene hvis de ser riktige ut. Ikke
              velg en annen type prosjekt bare fordi et eksempel på nettet sier det.
            </p>
          </GuideStep>
          <GuideStep title="Publiser og åpne appen">
            <p>
              Trykk <strong>Deploy</strong>. Når Vercel sier at publiseringen er ferdig,
              åpner du prosjektets nettadresse med <strong>Visit</strong>.
              Den vil vanligvis slutte på <strong>.vercel.app</strong>.
              Prøv at huskelisten fungerer på både mobil og PC.
            </p>
          </GuideStep>
        </ol>
        <Milestone>Den første nettappen din er nå tilgjengelig på en nettadresse.</Milestone>
      </section>

      <section className="guide-section" id="videre">
        <header className="guide-chapter">
          <span className="guide-chapter-number">4</span>
          <div><p className="guide-overline">Når du vil endre noe</p><h2>Bygg videre uten å miste oversikten</h2></div>
        </header>
        <div className="guide-loop" role="list" aria-label="Slik oppdaterer du en eksisterende app">
          <div role="listitem"><span>1</span><strong>Fortell agenten hva du vil endre</strong></div>
          <div role="listitem"><span>2</span><strong>Be om et endringsforslag på GitHub</strong></div>
          <div role="listitem"><span>3</span><strong>Se og prøv Vercels forhåndsvisning</strong></div>
          <div role="listitem"><span>4</span><strong>Godkjenn forslaget – Vercel oppdaterer appen</strong></div>
        </div>
        <p className="guide-reading guide-after-loop">
          Du kan normalt åpne et endringsforslag under <strong>Pull requests</strong> på GitHub.
          Vercel lager ofte en egen forhåndsvisning av forslaget før du godkjenner.
          Hvis noe ikke fungerer, be modellen rette det i <em>det samme forslaget</em>.
          Når endringen er godkjent og slått sammen med hovedversjonen, publiserer
          Vercel den automatisk.
        </p>
      </section>

      <section className="guide-section" id="problemer">
        <div className="guide-reading">
          <p className="guide-overline">Hvis noe stopper opp</p>
          <h2>Vanlige spørsmål</h2>
        </div>
        <div className="guide-faq">
          <details>
            <summary>Jeg finner ikke repoet mitt i Vercel.</summary>
            <p>
              Kontroller at <strong>Vercel GitHub App</strong> er installert hos riktig GitHub-konto.
              Åpne <SourceLink href="https://github.com/settings/installations">GitHubs installasjoner</SourceLink>,
              velg <strong>Configure</strong> ved Vercel og se om repoet er valgt under
              <strong> Repository access</strong>. Gå deretter tilbake til Vercel.
            </p>
          </details>
          <details>
            <summary>Jeg finner ikke repoet i Claude Code eller Codex.</summary>
            <p>
              Begynn med å kontrollere hvilken GitHub-konto du koblet til. I Claude Code på nett
              vises repoene kontoen har tilgang til; en ekstra Claude GitHub App er ikke påkrevd.
              I Codex åpner du skyoppsettet og kontrollerer GitHub-tilkoblingen og
              tilgangsvalget for repoet. En organisasjon kan kreve administratorgodkjenning.
            </p>
          </details>
          <details>
            <summary>Vercel viser en feil eller ingen app.</summary>
            <p>
              Sjekk først at du faktisk ba Claude Code eller Codex <strong>lage appen</strong>,
              og at du godkjente endringsforslaget på GitHub. Bare en README gir ingen
              ferdig nettapp. Hvis appen ligger der, be agenten undersøke
              Vercel-feilen og foreslå en rettelse — du skal ikke trenge å skrive kode.
            </p>
          </details>
          <details>
            <summary>Kan alle disse tjenestene brukes gratis?</summary>
            <p>
              GitHub har en gratisplan, og Vercel Hobby kan brukes gratis til personlige,
              ikke-kommersielle prosjekter. Nettleserbaserte <strong>skyøkter</strong> i
              Claude Code og Codex har egne krav til abonnement, tilgang og bruk.
              Kontroller vilkårene før du betaler.
            </p>
          </details>
          <details>
            <summary>Er en privat GitHub-mappe det samme som en privat app?</summary>
            <p>
              Nei. Et privat repo skjuler kildefilene for andre, men den publiserte
              nettappen er ikke automatisk privat. Ikke legg passord eller
              personopplysninger i øvingsappen.
            </p>
          </details>
        </div>
      </section>

      <footer className="guide-sources">
        <p className="guide-overline">Grunnlaget for veiledningen</p>
        <h2>Kilder og oppdatering</h2>
        <p>
          Fremgangsmåten er kontrollert mot offisiell dokumentasjon <time dateTime="2026-10-19">19. oktober 2026</time>.
          Knappenavn og plasseringer kan endres når tjenestene oppdateres.
        </p>
        <ul>
          <li><SourceLink href="https://docs.github.com/en/get-started/using-github/hello-world">GitHub: lag repo uten å bruke kode</SourceLink></li>
          <li><SourceLink href="https://docs.github.com/en/apps/using-github-apps/installing-a-github-app-from-a-third-party">GitHub: gi apper tilgang til utvalgte repoer</SourceLink></li>
          <li><SourceLink href="https://code.claude.com/docs/en/web-quickstart">Anthropic: Claude Code i nettleseren</SourceLink></li>
          <li><SourceLink href="https://learn.chatgpt.com/docs/environments/cloud-environments">OpenAI: sett opp Codex Cloud</SourceLink></li>
          <li><SourceLink href="https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan">OpenAI: abonnement og tilgang</SourceLink></li>
          <li><SourceLink href="https://vercel.com/docs/git">Vercel: importer GitHub-repo og publiser</SourceLink></li>
          <li><SourceLink href="https://vercel.com/docs/git/vercel-for-github">Vercel: GitHub-tilkobling</SourceLink></li>
        </ul>
        <Link className="guide-back-home" href="/">← Til Appleksikon</Link>
      </footer>
    </article>
  )
}

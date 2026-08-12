# Appleksikon

Et visuelt og interaktivt leksikon over vanlige UI-begreper, grensesnittmønstre og interaksjoner.

Appen er laget for deg som bygger apper med hjelp av kodeagenter («vibekoding»), men som ikke
nødvendigvis kan navnene på det du ser på skjermen. Du søker med dine egne ord («boks som åpner
seg», «luft mellom kortene»), finner begrepet, prøver en liten demo – og får en ferdig formulering
under «Slik kan du si det» som du kan bruke overfor en kodeagent.

## Funksjoner

- **Søk med aliaser**: hvert begrep har mange hverdagslige søkeord, så «sprettoppvindu» finner
  «Dialogboks (modal)». Søket åpnes også med `Ctrl`/`⌘` + `K` eller `/`.
- **10 temasider** med rundt 100 begreper, alle med kort forklaring, formuleringseksempel,
  relaterte begreper, «ikke bland med» og en fungerende demo.
- **Interaktive demoer**: ekte modaler, toasts, accordions, drag-and-drop, sliders for
  margin/padding/gap, sticky/fixed-scrolling med mer. Demoene er selvstendige og påvirker ikke
  resten av appen.
- **Sammenligningssider** for begreper som ofte blandes: margin/padding/gap,
  tooltip/popover/modal/toast, checkbox/radio/toggle, select/handlingsmeny/autocomplete,
  label/placeholder, sticky/fixed og tabs/accordion.
- **Dyplenker**: hvert begrep har stabil adresse, f.eks. `/tema/felt#checkbox`.
- **Tilgjengelig**: tastaturnavigasjon, synlig fokus, ARIA der det trengs, `prefers-reduced-motion`
  respekteres.

Alt kjører i nettleseren – ingen backend, database, innlogging eller sporing.

## Kom i gang

```bash
npm install
npm run dev        # utviklingsserver
npm run build      # typesjekk + produksjonsbygg til dist/
npm run preview    # forhåndsvis produksjonsbygget
npm test           # kjør testene (Vitest)
npm run lint       # lint (oxlint)
```

## Struktur

```
src/
  data/            # alt innhold (datadrevet)
    categories.ts  # de ti temaene
    terms/         # begrepene, én fil per tema
    comparisons.ts # sammenligningssidene
  demos/           # demo-komponentene + registry som kobler demo-id → komponent
  components/      # gjenbrukbare byggeklosser (søk, begrepskort, demo-ramme …)
  pages/           # forside, temaside, sammenligningsside, 404
  lib/             # liten router, søkelogikk
  styles/          # base, komponenter og demoer
```

### Legge til et nytt begrep

1. Legg til et `Term`-objekt i riktig fil under `src/data/terms/` (navn, aliaser, forklaring,
   «Slik kan du si det», relaterte begreper og demo-id).
2. Lag demo-komponenten i tilsvarende fil under `src/demos/` og registrer den i
   `src/demos/registry.ts`.
3. Kjør `npm test` – datatestene sjekker at alle referanser og demoer henger sammen.

Søk, temakort, temasider og lenker plukker opp det nye begrepet automatisk.

## Stack

React 19 + TypeScript + Vite, uten andre runtime-avhengigheter. Routing er en liten intern
History API-router med støtte for dyplenker og tilbake/frem-navigasjon. Tester med Vitest og
Testing Library.

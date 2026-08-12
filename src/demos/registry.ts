import type { ComponentType } from 'react'
import {
  ContainerDemo,
  KortDemo,
  MiniHeaderDemo,
  MiniMainDemo,
  MiniSeksjonDemo,
  MiniSidebarDemo,
  PanelDemo,
  SideDemo,
  SkillelinjeDemo,
  VerktoylinjeDemo,
  ViewportDemo,
} from './byggeklosser'
import {
  BorderDemo,
  BorderRadiusDemo,
  BreddeDemo,
  FixedDemo,
  GapDemo,
  GridDemo,
  HoydeDemo,
  JusteringDemo,
  MaksBreddeDemo,
  MarginDemo,
  PaddingDemo,
  RadKolonneDemo,
  SentreringDemo,
  SkyggeDemo,
  StickyDemo,
} from './layout'
import { BadgeDemo, ChipDemo, FeltdelerDemo, IkonDemo, TypografiDemo } from './tekst'
import {
  DisabledDemo,
  IkonknappDemo,
  KnappDemo,
  KnappevarianterDemo,
  LasteTilstandDemo,
  LenkeDemo,
  MenyknappDemo,
} from './knapper'
import {
  AutocompleteDemo,
  CheckboxDemo,
  DatofeltDemo,
  FargevelgerDemo,
  FeilmeldingDemo,
  FilopplastingDemo,
  RadiogruppeDemo,
  SelectDemo,
  SliderDemo,
  SokefeltDemo,
  StepperDemo,
  TallfeltDemo,
  TekstfeltDemo,
  TextareaDemo,
  TidsfeltDemo,
  ToggleDemo,
  ValideringDemo,
} from './felt'
import {
  BreadcrumbsDemo,
  HandlingsmenyDemo,
  InnholdsfortegnelseDemo,
  NavigasjonsmenyDemo,
  PaginationDemo,
  TabsDemo,
  TilbakeFremDemo,
  WizardDemo,
} from './menyer'
import {
  BannerDemo,
  BekreftelsesdialogDemo,
  BottomSheetDemo,
  DrawerDemo,
  ModalDemo,
  PopoverDemo,
  PromptDemo,
  ToastDemo,
  TooltipDemo,
} from './dialoger'
import {
  AccordionDemo,
  DetailsDemo,
  SammenleggbarSeksjonDemo,
  VisMerDemo,
} from './viseSkjule'
import {
  EmptyStateDemo,
  FiltreringDemo,
  ListeDemo,
  ProgressDemo,
  SkeletonDemo,
  SorteringDemo,
  SpinnerDemo,
  TabellDemo,
} from './listerData'
import {
  AktivDemo,
  AngreDemo,
  DraOgSlippDemo,
  HorisontalScrollingDemo,
  HoverFokusDemo,
  InlineRedigeringDemo,
  OverflowDemo,
  ReorganisereDemo,
  ResponsivDemo,
  ScrollbarDemo,
  ScrollomradeDemo,
  TastatursnarveiDemo,
  ValgtDemo,
} from './interaksjon'
import {
  SmlLabelPlaceholder,
  SmlMarginPaddingGap,
  SmlNedtrekk,
  SmlOverlays,
  SmlStickyFixed,
  SmlTabsAccordion,
  SmlValg,
} from './sammenligninger'

export interface DemoEntry {
  Component: ComponentType
  /** Rent visuelle eksempler merkes «Eksempel» i stedet for «Prøv selv». */
  isStatic?: boolean
}

export const demoRegistry = {
  // Sider og byggeklosser
  side: { Component: SideDemo, isStatic: true },
  viewport: { Component: ViewportDemo },
  'mini-header': { Component: MiniHeaderDemo, isStatic: true },
  'mini-sidebar': { Component: MiniSidebarDemo },
  'mini-main': { Component: MiniMainDemo, isStatic: true },
  'mini-seksjon': { Component: MiniSeksjonDemo, isStatic: true },
  container: { Component: ContainerDemo },
  kort: { Component: KortDemo, isStatic: true },
  panel: { Component: PanelDemo },
  verktoylinje: { Component: VerktoylinjeDemo },
  skillelinje: { Component: SkillelinjeDemo, isStatic: true },

  // Plassering, størrelse og luft
  'rad-kolonne': { Component: RadKolonneDemo },
  grid: { Component: GridDemo },
  justering: { Component: JusteringDemo },
  sentrering: { Component: SentreringDemo },
  bredde: { Component: BreddeDemo },
  'maks-bredde': { Component: MaksBreddeDemo },
  hoyde: { Component: HoydeDemo },
  margin: { Component: MarginDemo },
  padding: { Component: PaddingDemo },
  gap: { Component: GapDemo },
  border: { Component: BorderDemo },
  'border-radius': { Component: BorderRadiusDemo },
  skygge: { Component: SkyggeDemo },
  sticky: { Component: StickyDemo },
  fixed: { Component: FixedDemo },

  // Tekst og små markører
  typografi: { Component: TypografiDemo, isStatic: true },
  feltdeler: { Component: FeltdelerDemo },
  ikon: { Component: IkonDemo, isStatic: true },
  badge: { Component: BadgeDemo },
  chip: { Component: ChipDemo },

  // Knapper og handlinger
  knapp: { Component: KnappDemo },
  knappevarianter: { Component: KnappevarianterDemo },
  ikonknapp: { Component: IkonknappDemo },
  lenke: { Component: LenkeDemo },
  menyknapp: { Component: MenyknappDemo },
  disabled: { Component: DisabledDemo },
  'laste-tilstand': { Component: LasteTilstandDemo },

  // Felt og skjemaer
  tekstfelt: { Component: TekstfeltDemo },
  textarea: { Component: TextareaDemo },
  tallfelt: { Component: TallfeltDemo },
  sokefelt: { Component: SokefeltDemo },
  datofelt: { Component: DatofeltDemo },
  tidsfelt: { Component: TidsfeltDemo },
  select: { Component: SelectDemo },
  autocomplete: { Component: AutocompleteDemo },
  checkbox: { Component: CheckboxDemo },
  radiogruppe: { Component: RadiogruppeDemo },
  toggle: { Component: ToggleDemo },
  slider: { Component: SliderDemo },
  stepper: { Component: StepperDemo },
  fargevelger: { Component: FargevelgerDemo },
  filopplasting: { Component: FilopplastingDemo },
  validering: { Component: ValideringDemo },
  feilmelding: { Component: FeilmeldingDemo, isStatic: true },

  // Menyer og navigasjon
  navigasjonsmeny: { Component: NavigasjonsmenyDemo },
  handlingsmeny: { Component: HandlingsmenyDemo },
  tabs: { Component: TabsDemo },
  breadcrumbs: { Component: BreadcrumbsDemo },
  pagination: { Component: PaginationDemo },
  innholdsfortegnelse: { Component: InnholdsfortegnelseDemo },
  wizard: { Component: WizardDemo },
  'tilbake-frem': { Component: TilbakeFremDemo },

  // Dialoger, lag og meldinger
  tooltip: { Component: TooltipDemo },
  popover: { Component: PopoverDemo },
  modal: { Component: ModalDemo },
  bekreftelsesdialog: { Component: BekreftelsesdialogDemo },
  prompt: { Component: PromptDemo },
  drawer: { Component: DrawerDemo },
  'bottom-sheet': { Component: BottomSheetDemo },
  toast: { Component: ToastDemo },
  banner: { Component: BannerDemo },

  // Vise, skjule og folde ut
  accordion: { Component: AccordionDemo },
  details: { Component: DetailsDemo },
  'sammenleggbar-seksjon': { Component: SammenleggbarSeksjonDemo },
  'vis-mer': { Component: VisMerDemo },

  // Lister, data og tilstand
  liste: { Component: ListeDemo, isStatic: true },
  tabell: { Component: TabellDemo, isStatic: true },
  filtrering: { Component: FiltreringDemo },
  sortering: { Component: SorteringDemo },
  'empty-state': { Component: EmptyStateDemo },
  spinner: { Component: SpinnerDemo },
  skeleton: { Component: SkeletonDemo },
  progress: { Component: ProgressDemo },

  // Interaksjon og skjermoppførsel
  'hover-fokus': { Component: HoverFokusDemo },
  valgt: { Component: ValgtDemo },
  aktiv: { Component: AktivDemo },
  'dra-og-slipp': { Component: DraOgSlippDemo },
  reorganisere: { Component: ReorganisereDemo },
  'inline-redigering': { Component: InlineRedigeringDemo },
  tastatursnarvei: { Component: TastatursnarveiDemo },
  angre: { Component: AngreDemo },
  scrollbar: { Component: ScrollbarDemo },
  scrollomrade: { Component: ScrollomradeDemo },
  'horisontal-scrolling': { Component: HorisontalScrollingDemo },
  overflow: { Component: OverflowDemo },
  responsiv: { Component: ResponsivDemo },

  // Sammenligninger
  'sml-margin-padding-gap': { Component: SmlMarginPaddingGap },
  'sml-overlays': { Component: SmlOverlays },
  'sml-valg': { Component: SmlValg },
  'sml-nedtrekk': { Component: SmlNedtrekk },
  'sml-label-placeholder': { Component: SmlLabelPlaceholder },
  'sml-sticky-fixed': { Component: SmlStickyFixed },
  'sml-tabs-accordion': { Component: SmlTabsAccordion },
} satisfies Record<string, DemoEntry>

export type DemoId = keyof typeof demoRegistry

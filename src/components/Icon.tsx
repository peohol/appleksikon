import type { ReactNode } from 'react'

const paths: Record<string, ReactNode> = {
  sok: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  kryss: <path d="M6 6l12 12M18 6 6 18" />,
  hake: <path d="m5 13 4 4L19 7" />,
  'chevron-ned': <path d="m6 9 6 6 6-6" />,
  'chevron-opp': <path d="m6 15 6-6 6 6" />,
  'chevron-hoyre': <path d="m9 6 6 6-6 6" />,
  'chevron-venstre': <path d="m15 6-6 6 6 6" />,
  pluss: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  soppel: (
    <>
      <path d="M4 7h16M10 4h4M7 7l1 13h8l1-13" />
      <path d="M10 11v5M14 11v5" />
    </>
  ),
  blyant: <path d="M4 20h4L20 8l-4-4L4 16v4ZM13 7l4 4" />,
  prikker: (
    <>
      <circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  bjelle: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 7H4c0-1 2-2 2-7Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  ),
  stjerne: <path d="m12 4 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 16.3 7.2 18.9l.9-5.4L4.2 9.7l5.4-.8L12 4Z" />,
  grip: (
    <>
      <circle cx="9" cy="6" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="6" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="9" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="9" cy="18" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="18" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  advarsel: (
    <>
      <path d="M12 4 2.5 20h19L12 4Z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  'pil-opp': <path d="M12 19V5m-6 6 6-6 6 6" />,
  'pil-ned': <path d="M12 5v14m6-6-6 6-6-6" />,
  'pil-venstre': <path d="M19 12H5m6 6-6-6 6-6" />,
  'pil-hoyre': <path d="M5 12h14m-6 6 6-6-6-6" />,
  hjem: <path d="m4 11 8-7 8 7v9h-5v-6h-6v6H4v-9Z" />,
  tannhjul: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9l2.1 2.1m10 10 2.1 2.1M19.1 4.9 17 7m-10 10-2.1 2.1" />
    </>
  ),
  meny: <path d="M4 7h16M4 12h16M4 17h16" />,
  kopier: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 5V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1" />
    </>
  ),
  del: (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="17" cy="6" r="2.5" />
      <circle cx="17" cy="18" r="2.5" />
      <path d="m8.3 10.8 6.4-3.6m-6.4 6 6.4 3.6" />
    </>
  ),
  bilde: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m5 18 5-5 3 3 3-3 3 3" />
    </>
  ),
}

export type IconName = keyof typeof paths

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

import type { ReactNode } from 'react';
import { site, type SocialId } from '../config/site';

/** Outline icons in the lucide style (lucide-react ships no brand logos). */
const paths: Record<SocialId, ReactNode> = {
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  telegram: (
    <>
      <path d="m22 3-20 7.5 6.5 2.5L19 6l-8 8.5V21l3.5-4 4.5 3.5z" />
    </>
  ),
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  youtube: (
    <>
      <path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2.3-2.3l.8-1-1-2z" />
    </>
  ),
};

export function SocialIcon({ id, size = 18 }: { id: SocialId; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[id]}
    </svg>
  );
}

/** Row of ALSTAR's social profiles (Instagram, Telegram, Facebook, YouTube, WhatsApp). */
export function SocialLinks({ label, className = '' }: { label: string; className?: string }) {
  return (
    <ul className={`social-links ${className}`.trim()} aria-label={label}>
      {site.socials.map((s) => (
        <li key={s.id}>
          <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
            <SocialIcon id={s.id} />
          </a>
        </li>
      ))}
    </ul>
  );
}

import { siteConfig } from '../config/siteConfig.js';

/**
 * SkillEdge logo — graduation cap + "SkillEdge" wordmark, redrawn as a vector
 * so it stays sharp at every size. `light` is used on dark backgrounds (footer).
 * To use an image file instead, set `logoUrl` in siteConfig.js.
 */
export function CapIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 66 54" aria-hidden="true">
      {/* board */}
      <path d="M2 17 L33 4 L64 17 L33 30 Z" fill="currentColor" />
      {/* cap base */}
      <path d="M15 23.5 V34 C15 38.5 23 42 33 42 S51 38.5 51 34 V23.5 L33 31 Z" fill="currentColor" />
      {/* cord highlight on the board */}
      <path d="M33 17 L10 20" fill="none" stroke="var(--cap-cord, #fff)" strokeWidth="2.4" strokeLinecap="round" />
      {/* hanging cord + tassel */}
      <path d="M10 20 V33" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="10" cy="34" r="3" fill="currentColor" />
      <path d="M8.4 36 L4.5 49 L7.5 49.5 L10 40 L12.5 49.5 L15 48.5 L11.6 36 Z" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ light = false }) {
  if (siteConfig.logoUrl) {
    return (
      <span className={`logo-img-wrap ${light ? 'logo-img-wrap--light' : ''}`}>
        <img src={siteConfig.logoUrl} alt={siteConfig.instituteName} className="logo-img" width="584" height="379" />
      </span>
    );
  }
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <CapIcon className="logo__cap" />
      <span className="logo__word">SkillEdge</span>
      <span className="visually-hidden"> Institute</span>
    </span>
  );
}

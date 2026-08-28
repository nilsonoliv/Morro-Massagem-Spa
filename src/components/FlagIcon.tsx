import React from 'react';
import { Language } from '../i18n/translations';

interface FlagIconProps {
  language: Language;
  className?: string;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ language, className = 'w-5 h-3.5' }) => {
  switch (language) {
    case 'pt':
      // Brazil Flag SVG
      return (
        <svg viewBox="0 0 720 504" className={`${className} rounded-xs shadow-2xs inline-block overflow-hidden`} aria-hidden="true">
          <rect width="720" height="504" fill="#009b3a" />
          <polygon points="360,42 678,252 360,462 42,252" fill="#fedf00" />
          <circle cx="360" cy="252" r="126" fill="#002776" />
          <path d="M 234 252 A 126 126 0 0 0 486 252 A 136 136 0 0 1 234 252" fill="#ffffff" />
        </svg>
      );

    case 'es':
      // Spain Flag SVG
      return (
        <svg viewBox="0 0 750 500" className={`${className} rounded-xs shadow-2xs inline-block overflow-hidden`} aria-hidden="true">
          <rect width="750" height="500" fill="#c60b1e" />
          <rect y="125" width="750" height="250" fill="#ffc400" />
          {/* Subtle Coat of Arms symbol */}
          <circle cx="210" cy="250" r="35" fill="#c60b1e" opacity="0.85" />
          <circle cx="210" cy="250" r="25" fill="#ffc400" />
        </svg>
      );

    case 'en':
      // UK Flag SVG
      return (
        <svg viewBox="0 0 60 30" className={`${className} rounded-xs shadow-2xs inline-block overflow-hidden`} aria-hidden="true">
          <clipPath id="uk-clip">
            <rect width="60" height="30" />
          </clipPath>
          <g clipPath="url(#uk-clip)">
            <rect width="60" height="30" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      );

    case 'it':
      // Italy Flag SVG
      return (
        <svg viewBox="0 0 900 600" className={`${className} rounded-xs shadow-2xs inline-block overflow-hidden`} aria-hidden="true">
          <rect width="300" height="600" fill="#009246" />
          <rect x="300" width="300" height="600" fill="#ffffff" />
          <rect x="600" width="300" height="600" fill="#ce2b37" />
        </svg>
      );

    case 'fr':
      // France Flag SVG
      return (
        <svg viewBox="0 0 900 600" className={`${className} rounded-xs shadow-2xs inline-block overflow-hidden`} aria-hidden="true">
          <rect width="300" height="600" fill="#002395" />
          <rect x="300" width="300" height="600" fill="#ffffff" />
          <rect x="600" width="300" height="600" fill="#ed2939" />
        </svg>
      );

    case 'he':
      // Israel Flag SVG
      return (
        <svg viewBox="0 0 660 480" className={`${className} rounded-xs shadow-2xs inline-block overflow-hidden border border-black/5`} aria-hidden="true">
          <rect width="660" height="480" fill="#ffffff" />
          <rect y="45" width="660" height="55" fill="#0038b8" />
          <rect y="380" width="660" height="55" fill="#0038b8" />
          {/* Star of David */}
          <g transform="translate(330, 240) scale(1.1)" stroke="#0038b8" strokeWidth="11" fill="none">
            <polygon points="0,-60 52,30 -52,30" />
            <polygon points="0,60 52,-30 -52,-30" />
          </g>
        </svg>
      );

    default:
      return <span>🇧🇷</span>;
  }
};

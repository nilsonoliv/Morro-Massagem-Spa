import React from 'react';

interface ShaktiLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showAura?: boolean;
  withText?: boolean;
}

export const ShaktiLogo: React.FC<ShaktiLogoProps> = ({
  size = 'md',
  className = '',
  showAura = false,
  withText = false,
}) => {
  const sizeClasses = {
    xs: 'w-7 h-7',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
  };

  return (
    <div className={`relative inline-flex items-center gap-3 ${className}`}>
      {/* Optional warm coastal sun aura background */}
      {showAura && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#D9A84E]/25 via-[#4CB8C4]/20 to-transparent blur-md -z-10 scale-125" />
      )}

      {/* High-definition scalable vector logo */}
      <img
        src="/logo.svg"
        alt="Shakti Prana Spa Massage - Morro de São Paulo"
        className={`${sizeClasses[size]} object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.06)] shrink-0 transition-transform duration-300 hover:scale-105`}
        referrerPolicy="no-referrer"
      />

      {withText && (
        <div className="text-left">
          <span className="block font-serif text-lg sm:text-xl font-normal text-[#2C3639] tracking-tight leading-tight">
            Shakti Prana
          </span>
          <span className="block text-[9px] uppercase tracking-[2.5px] font-semibold text-[#4A5D4E]">
            Massage & Spa
          </span>
        </div>
      )}
    </div>
  );
};

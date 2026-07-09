import React from 'react';

/**
 * Het FWP-logo-lockup: icoon + woordmerk, netjes samen uitgelijnd
 * (FWP boven, tagline onder — top en bottom gelijk met het icoon).
 * Gebruikt het exacte icoon uit het logo-pakket + Sora-tekst (zoals
 * het originele logo die zelf ook rendert).
 */
const Wordmark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span className={`flex items-center gap-2.5 ${className}`}>
    <img
      src="/logo/fwp-icon.svg"
      alt=""
      aria-hidden="true"
      className="h-9 w-9 shrink-0"
    />
    <span className="flex h-8 flex-col justify-between py-[1px] leading-none">
      <span className="text-[18px] font-bold leading-none tracking-[0.02em] text-ink">
        FWP
      </span>
      <span className="text-[8px] font-semibold uppercase leading-none tracking-[0.16em] text-muted">
        Fieldworks Production
      </span>
    </span>
  </span>
);

export default Wordmark;

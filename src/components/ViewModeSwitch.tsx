import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, FileText } from 'lucide-react';
import { useViewMode, type ViewMode } from './view-mode-provider';

const OPTIONS: { key: ViewMode; label: string; Icon: typeof LayoutGrid }[] = [
  { key: 'full', label: 'Portfolio', Icon: LayoutGrid },
  { key: 'minimal', label: 'Résumé', Icon: FileText },
];

/**
 * The Portfolio ⇄ Résumé segmented control. Presentational and position-agnostic;
 * an orange thumb slides between the two modes (animated via framer-motion).
 * `layoutId` must be unique per mounted instance so multiple copies don't cross-animate.
 */
export default function ViewModeSwitch({
  layoutId = 'view-mode-thumb',
  compact = false,
}: {
  layoutId?: string;
  compact?: boolean;
}) {
  const { viewMode, setViewMode } = useViewMode();

  const btn = compact ? 'gap-1 px-2 py-0.5 text-xs' : 'gap-1.5 px-3 py-1.5 text-sm';
  const icon = compact ? 'h-3 w-3' : 'h-4 w-4';

  return (
    <div
      role="radiogroup"
      aria-label="Choose how to view this page"
      className="flex items-center gap-0.5"
    >
      {OPTIONS.map(({ key, label, Icon }) => {
        const active = viewMode === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${label} view`}
            onClick={() => setViewMode(key)}
            className={`relative flex items-center rounded-full font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange-400/60 ${btn}`}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full bg-orange-500 shadow-[0_2px_10px_rgba(249,115,22,0.45)]"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span
              className={`relative z-10 flex items-center ${compact ? 'gap-1' : 'gap-1.5'} transition-colors ${
                active ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className={icon} />
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

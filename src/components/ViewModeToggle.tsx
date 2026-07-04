import React from 'react';
import ViewModeSwitch from './ViewModeSwitch';

/**
 * Mobile-only floating view switch. On desktop the switch is revealed by hovering
 * the nav (see Menu.tsx); touch devices have no hover, so it lives in a fixed
 * bottom-right pill instead.
 */
export default function ViewModeToggle() {
  return (
    <div className="md:hidden fixed bottom-5 right-5 z-40">
      <div className="rounded-full border border-white/20 bg-glass p-1 shadow-glass backdrop-blur-md">
        <ViewModeSwitch layoutId="view-mode-thumb-mobile" />
      </div>
    </div>
  );
}

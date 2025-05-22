import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HamburgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export function HamburgerMenu({ isOpen, onToggle, className }: HamburgerMenuProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'relative h-12 w-12 rounded-lg p-2 transition-all duration-300',
        'bg-sidebar hover:bg-sidebar-accent',
        'shadow-lg hover:shadow-xl',
        'border border-sidebar-border',
        'flex items-center justify-center',
        className
      )}
      aria-label="Toggle menu"
    >
      <div className="relative h-6 w-6">
        <span
          className={cn(
            'absolute left-0 h-0.5 w-6 transform bg-sidebar-foreground transition-all duration-300',
            isOpen ? 'top-3 rotate-45' : 'top-1',
            'origin-center'
          )}
        />
        <span
          className={cn(
            'absolute left-0 h-0.5 w-6 transform bg-sidebar-foreground transition-all duration-300',
            isOpen ? 'opacity-0 scale-x-0' : 'top-3 scale-x-100 opacity-100',
            'origin-center'
          )}
        />
        <span
          className={cn(
            'absolute left-0 h-0.5 w-6 transform bg-sidebar-foreground transition-all duration-300',
            isOpen ? 'top-3 -rotate-45' : 'top-5',
            'origin-center'
          )}
        />
      </div>
    </button>
  );
} 
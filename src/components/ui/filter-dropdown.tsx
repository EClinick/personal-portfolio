'use client';

import * as React from 'react';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  options: FilterOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export function FilterDropdown({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select...',
  label,
  className,
}: FilterDropdownProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = React.useMemo(() => {
    return options.find((opt) => opt.value === selectedValue) || options[0];
  }, [options, selectedValue]);

  return (
    <div className={cn('flex-1', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-400 mb-2">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            data-state={open ? 'open' : 'closed'}
            className={cn(
              'w-full px-4 py-3 rounded-xl',
              'bg-black/40 backdrop-blur-sm',
              'border border-white/10',
              'hover:border-white/20',
              'focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20',
              'text-white',
              'cursor-pointer',
              'transition-all duration-300',
              'flex items-center justify-between',
              'text-left'
            )}
          >
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50 ml-2" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className={cn(
            'p-0 w-[var(--radix-popover-trigger-width)]',
            'bg-black/95 backdrop-blur-sm',
            'border border-white/10',
            'rounded-xl',
            'shadow-xl'
          )}
          align="start"
          side="bottom"
          sideOffset={8}
        >
          <div className="max-h-[300px] overflow-y-auto">
            {options.length === 0 ? (
              <div className="text-gray-400 px-3 py-2 text-center text-sm">
                No options found
              </div>
            ) : (
              <div className="p-1">
                {options.map((option) => {
                  const isSelected = selectedValue === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        onValueChange(option.value);
                        setOpen(false);
                      }}
                      className={cn(
                        'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm',
                        'hover:bg-white/5 hover:text-white',
                        'focus:outline-none focus:bg-white/5',
                        'transition-colors duration-200',
                        isSelected && 'bg-orange-500/10 text-orange-400'
                      )}
                    >
                      <span className="flex-1 truncate">{option.label}</span>
                      {isSelected && (
                        <CheckIcon className="h-4 w-4 shrink-0 text-orange-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}


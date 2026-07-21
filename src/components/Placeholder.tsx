import React from 'react';
import { cn } from '../lib/utils';

interface PlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  aspectRatio?: string;
}

export function Placeholder({ label, aspectRatio = '1/1', className, ...props }: PlaceholderProps) {
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center bg-[#0a0a0a] border border-[#222] overflow-hidden",
        className
      )}
      style={{ aspectRatio }}
      {...props}
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:12px_12px]" />
      <span className="text-shile-grey text-sm font-medium tracking-wider uppercase z-10 px-4 text-center">
        {label}
      </span>
    </div>
  );
}

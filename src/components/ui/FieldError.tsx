import React from 'react';
import { AlertCircle } from 'lucide-react';

/** Inline, accessible validation message for a form control (renders nothing when there is no error). */
export function FieldError({ id, message }: { id: string; message?: string | null }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-[11px] font-medium text-rose-500">
      <AlertCircle aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0" />
      <span>{message}</span>
    </p>
  );
}

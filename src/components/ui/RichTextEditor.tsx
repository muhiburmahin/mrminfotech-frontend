'use client';

import React from 'react';

interface RichTextEditorProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Write content here...',
}: RichTextEditorProps) {
  return (
    <div className="rounded-xl border border-[#1E3557] bg-[#07162C] overflow-hidden">
      <div className="flex items-center gap-1.5 p-2 border-b border-[#1E3557] bg-[#0B1E3B] text-xs text-slate-300">
        <span className="font-semibold px-2 py-0.5 rounded bg-[#07162C]">B</span>
        <span className="italic px-2 py-0.5 rounded bg-[#07162C]">I</span>
        <span className="underline px-2 py-0.5 rounded bg-[#07162C]">U</span>
      </div>
      <textarea
        rows={6}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none resize-y"
      />
    </div>
  );
}

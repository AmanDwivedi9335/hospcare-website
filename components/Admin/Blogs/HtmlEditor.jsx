"use client";

import { cn } from "@/lib/utils";

export default function HtmlEditor({ value, onChange, className, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        "min-h-40 w-full resize-y rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#097362]",
        className
      )}
    />
  );
}

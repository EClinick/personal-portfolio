"use client";

import { CornerRightUp, Mic } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "@/components/hooks/use-auto-resize-textarea";

interface AIInputProps {
  id?: string
  placeholder?: string
  minHeight?: number
  maxHeight?: number
  onSubmit?: (value: string) => void
  className?: string
  isDarkMode?: boolean
}

export function AIInput({
  id = "ai-input",
  placeholder = "Type your message...",
  minHeight = 52,
  maxHeight = 200,
  onSubmit,
  className,
  isDarkMode = false
}: AIInputProps) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });
  const [inputValue, setInputValue] = useState("");

  const handleReset = () => {
    if (!inputValue.trim()) return;
    onSubmit?.(inputValue);
    setInputValue("");
    adjustHeight(true);
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-xl w-full mx-auto">
        <Textarea
          id={id}
          placeholder={placeholder}
          className={cn(
            "max-w-xl rounded-3xl pl-6 pr-16",
            "border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            "text-wrap overflow-y-auto resize-none",
            "transition-[height] duration-100 ease-out leading-[1.2] py-[16px]",
            `min-h-[${minHeight}px] max-h-[${maxHeight}px]`,
            "[&::-webkit-resizer]:hidden",
            isDarkMode
              ? "bg-white/10 text-white placeholder:text-gray-400 border-gray-700"
              : "bg-black/5 text-black placeholder:text-black/50 border-gray-300"
          )}
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleReset();
            }
          }}
        />

        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-xl py-1 px-1 transition-all duration-200",
            inputValue ? "right-10" : "right-3",
            isDarkMode
              ? "bg-white/10"
              : "bg-black/5"
          )}
        >
          <Mic className={cn(
            "w-4 h-4",
            isDarkMode ? "text-white/70" : "text-black/70"
          )} />
        </div>
        
        <button
          onClick={handleReset}
          type="button"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-3",
            "rounded-xl py-1 px-1 transition-all duration-200",
            inputValue 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-95 pointer-events-none",
            isDarkMode
              ? "bg-white/10 hover:bg-white/20"
              : "bg-black/5 hover:bg-black/10"
          )}
        >
          <CornerRightUp className={cn(
            "w-4 h-4",
            isDarkMode ? "text-white/70" : "text-black/70"
          )} />
        </button>
      </div>
    </div>
  );
}
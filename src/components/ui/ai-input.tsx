"use client";

import { CornerRightUp, Mic, Plus } from "lucide-react";
import { useState, useRef } from "react";
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
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Speech-to-text logic
  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    let SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev: string) => (prev ? prev + ' ' : '') + transcript);
        adjustHeight();
      };
      recognitionRef.current.onerror = (event: any) => {
        setIsListening(false);
      };
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    if (!isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  const handleReset = () => {
    if (!inputValue.trim()) return;
    onSubmit?.(inputValue);
    setInputValue("");
    adjustHeight(true);
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-xl w-full mx-auto flex items-center gap-3">
        {/* Plus button on the left */}
        <button
          type="button"
          className={cn(
            "flex-shrink-0 rounded-full p-2 transition-all duration-200",
            isDarkMode
              ? "text-gray-400 hover:text-white hover:bg-white/10"
              : "text-gray-500 hover:text-black hover:bg-black/10"
          )}
          aria-label="Add attachment"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Input container */}
        <div className="relative flex-1">
          <Textarea
            id={id}
            placeholder={placeholder}
            className={cn(
              "w-full rounded-3xl pl-4 pr-20",
              "border border-gray-700/50 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
              "text-wrap overflow-y-hidden resize-none",
              "transition-[height] duration-100 ease-out leading-[1.2] py-[14px]",
              `min-h-[${minHeight}px] max-h-[${maxHeight}px]`,
              "[&::-webkit-resizer]:hidden",
              isDarkMode
                ? "bg-gray-900/50 text-white placeholder:text-gray-500"
                : "bg-black/5 text-black placeholder:text-black/50"
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

          {/* Mic button */}
          <button
            type="button"
            onClick={handleMicClick}
            aria-label={isListening ? "Stop listening" : "Start listening"}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 rounded-full p-1.5 transition-all duration-200",
              inputValue ? "right-10" : "right-3",
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-white/10"
                : "text-gray-500 hover:text-black hover:bg-black/10"
            )}
          >
            <Mic className={cn(
              "w-4 h-4",
              isListening && "text-orange-500"
            )} />
          </button>
          
          {/* Send button */}
          <button
            onClick={handleReset}
            type="button"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 right-3 rounded-full p-1.5 transition-all duration-200",
              inputValue 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-95 pointer-events-none",
              isDarkMode
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            )}
          >
            <CornerRightUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
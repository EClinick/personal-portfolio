import React from "react";
import { cn } from "@/lib/utils";

type AIMessageShellProps = {
  role: "user" | "assistant";
  className?: string;
  children: React.ReactNode;
};

export function AIMessageShell({ role, className, children }: AIMessageShellProps) {
  return (
    <div
      className={cn(
        "flex w-full",
        role === "user" ? "justify-end" : "justify-start",
        className
      )}
    >
      {children}
    </div>
  );
}

type AIMessageBubbleProps = {
  className?: string;
  children: React.ReactNode;
};

export function AIMessageBubble({ className, children }: AIMessageBubbleProps) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
        "bg-gray-800/80 text-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

type AIMessagePanelProps = {
  className?: string;
  children: React.ReactNode;
};

export function AIMessagePanel({ className, children }: AIMessagePanelProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
}

type AIAgentBadgeProps = {
  label: string;
  className?: string;
};

export function AIAgentBadge({ label, className }: AIAgentBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-gray-700/70",
        "bg-gray-900/70 px-2.5 py-1 text-xs font-medium text-gray-200",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
      {label}
    </span>
  );
}

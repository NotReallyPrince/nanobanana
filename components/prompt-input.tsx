"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
}

export function PromptInput({ value, onChange, onSubmit, isLoading }: PromptInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 300) + "px"
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe your desired changes in detail, e.g., changing the background to a sunset."
        className={cn(
          "w-full px-4 py-3 bg-white border-2 border-black",
          "text-black placeholder:text-gray-500",
          "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#5865F2]",
          "min-h-[120px] max-h-[300px] font-medium",
        )}
      />
      <p className="text-xs text-gray-600 mt-2 font-semibold">Press Enter to generate</p>
    </div>
  )
}

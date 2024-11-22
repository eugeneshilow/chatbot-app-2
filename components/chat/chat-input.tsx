"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal } from "lucide-react"

interface ChatInputProps {
  onSubmit: (content: string) => void
  isLoading?: boolean
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = () => {
    const content = textareaRef.current?.value.trim()
    if (!content) return
    
    onSubmit(content)
    if (textareaRef.current) {
      textareaRef.current.value = ""
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex gap-2 p-4 md:gap-4 md:p-4 max-w-3xl mx-auto w-full">
      <Textarea
        ref={textareaRef}
        placeholder="Message Markirovka AI..."
        className="min-h-[44px] md:min-h-[60px] resize-none rounded-xl md:rounded-2xl border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-800/50 focus-visible:ring-zinc-500"
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        rows={1}
      />
      <Button 
        onClick={handleSubmit}
        disabled={isLoading}
        className="h-[44px] w-[44px] md:h-[60px] md:w-[60px] rounded-xl md:rounded-2xl bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        size="icon"
      >
        <SendHorizontal className="h-4 w-4 md:h-5 md:w-5" />
      </Button>
    </div>
  )
} 
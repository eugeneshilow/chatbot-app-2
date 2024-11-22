"use client"

import { Message } from "@/types"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ChatMessagesProps {
  messages: Message[]
  isLoading?: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-8">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex gap-3 text-sm md:gap-4 md:text-base",
            message.role === "assistant" && "bg-zinc-50 dark:bg-zinc-800/50 -mx-4 p-4 md:-mx-8 md:p-8"
          )}
        >
          <Avatar className="h-7 w-7 md:h-8 md:w-8 rounded-lg">
            <AvatarFallback className={cn(
              "rounded-lg text-white text-xs md:text-sm",
              message.role === "assistant" 
                ? "bg-black dark:bg-white dark:text-black" 
                : "bg-blue-600"
            )}>
              {message.role === "assistant" ? "AI" : "U"}
            </AvatarFallback>
          </Avatar>
          <p className="leading-relaxed pt-1">{message.content}</p>
        </div>
      ))}
      {isLoading && (
        <div className="flex gap-3 md:gap-4 bg-zinc-50 dark:bg-zinc-800/50 -mx-4 p-4 md:-mx-8 md:p-8">
          <Avatar className="h-7 w-7 md:h-8 md:w-8 rounded-lg">
            <AvatarFallback className="rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs md:text-sm">
              AI
            </AvatarFallback>
          </Avatar>
          <p className="animate-pulse pt-1 text-sm md:text-base">Thinking...</p>
        </div>
      )}
    </div>
  )
} 
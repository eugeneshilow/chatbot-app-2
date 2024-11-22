"use client"

import { Chat } from "@/types"
import { Button } from "@/components/ui/button"
import { PlusCircle, MessageSquare } from "lucide-react"

interface ChatListProps {
  chats: Chat[]
  activeChat?: Chat
  onSelect: (chat: Chat) => void
  onNew: () => void
}

export function ChatList({ chats, activeChat, onSelect, onNew }: ChatListProps) {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-4">
      <Button 
        onClick={onNew}
        className="w-full justify-start gap-2 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
        size="lg"
      >
        <PlusCircle className="h-5 w-5" />
        New Chat
      </Button>

      <div className="mt-4 flex flex-col gap-1">
        {chats.map((chat) => (
          <Button
            key={chat.id}
            variant="ghost"
            className={`w-full justify-start gap-2 rounded-lg px-3 py-6 text-base hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
              chat.id === activeChat?.id 
                ? "bg-zinc-100 dark:bg-zinc-800" 
                : ""
            }`}
            onClick={() => onSelect(chat)}
          >
            <MessageSquare className="h-5 w-5" />
            <span className="truncate">{chat.name}</span>
          </Button>
        ))}
      </div>
    </div>
  )
} 
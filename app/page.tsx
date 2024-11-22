"use client"

import { useState } from "react"
import { Chat, Message } from "@/types"
import { ChatList } from "@/components/chat/chat-list"
import { ChatMessages } from "@/components/chat/chat-messages"
import { ChatInput } from "@/components/chat/chat-input"
import { NewChatDialog } from "@/components/chat/new-chat-dialog"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { sendMessage } from "@/services/chat-service"

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<Chat>()
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isNewChatOpen, setIsNewChatOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleNewChat = () => {
    setIsNewChatOpen(true)
  }

  const handleCreateChat = (name: string) => {
    // Create a new chat
    const newChat: Chat = {
      id: Date.now().toString(),
      userId: "user123", // TODO: Get actual user ID
      name,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setChats(prev => [newChat, ...prev])
    setActiveChat(newChat)
    setMessages([])
    setIsNewChatOpen(false)
  }

  const handleSelectChat = (chat: Chat) => {
    setActiveChat(chat)
    // TODO: Load messages for selected chat
  }

  const handleSubmit = async (content: string) => {
    if (!activeChat) return

    setIsLoading(true)
    try {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        chatId: activeChat.id,
        content,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setMessages(prev => [...prev, userMessage])

      // Get AI response
      const response = await sendMessage(content)
      
      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        chatId: activeChat.id,
        content: response,
        role: "assistant",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error in chat:', error)
      // Optionally show error to user
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Sidebar */}
      <div
        className={cn(
          "absolute inset-y-0 left-0 z-20 w-80 transform border-r border-zinc-200 bg-white/50 backdrop-blur-xl transition-transform duration-300 ease-in-out dark:border-zinc-800 dark:bg-zinc-900/50 md:relative",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <ChatList
          chats={chats}
          activeChat={activeChat}
          onSelect={(chat) => {
            handleSelectChat(chat)
            setIsSidebarOpen(false)
          }}
          onNew={handleNewChat}
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col bg-white dark:bg-zinc-900">
        {/* Mobile Header */}
        <div className="border-b border-zinc-200 bg-white/50 p-4 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeChat ? (
            <ChatMessages messages={messages} isLoading={isLoading} />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 md:text-4xl">
                  Welcome to Markirovka AI
                </h1>
                <p className="text-base text-zinc-500 dark:text-zinc-400 md:text-lg">
                  Select an existing chat or create a new one to get started
                </p>
              </div>
            </div>
          )}
        </div>

        {activeChat && (
          <div className="border-t border-zinc-200 bg-white/50 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/50">
            <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="absolute inset-0 z-10 bg-zinc-900/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <NewChatDialog
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        onCreate={handleCreateChat}
        isLoading={isLoading}
      />
    </div>
  )
}

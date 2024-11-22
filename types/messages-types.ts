import { SelectMessage } from "@/db/schema"

export interface CreateMessageRequest {
  chatId: string
  content: string
  role: "user" | "assistant"
}

export interface GetMessagesRequest {
  chatId: string
}

export interface Message {
  id: string
  chatId: string
  content: string
  role: "assistant" | "user"
  createdAt: Date
  updatedAt: Date
} 
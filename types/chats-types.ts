import { SelectChat, SelectMessage } from "@/db/schema"

export interface CreateChatRequest {
  userId: string
  name: string
}

export interface GetChatsRequest {
  userId: string
}

export interface DeleteChatRequest {
  id: string
}

export interface ChatWithMessages extends SelectChat {
  messages: SelectMessage[]
}

export interface Chat {
  id: string
  userId: string
  name: string
  createdAt: Date
  updatedAt: Date
} 
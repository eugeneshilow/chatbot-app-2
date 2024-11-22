"use server"

import { createChat, deleteChat, getChats } from "@/db/queries/chats-queries"
import { SelectChat } from "@/db/schema"
import { CreateChatRequest, DeleteChatRequest, GetChatsRequest } from "@/types"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

export async function createChatAction(
  request: CreateChatRequest
): Promise<ActionState<SelectChat>> {
  try {
    const chat = await createChat(request)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Chat created successfully",
      data: chat
    }
  } catch (error) {
    console.error("Error creating chat:", error)
    return { isSuccess: false, message: "Failed to create chat" }
  }
}

export async function getChatsAction(
  request: GetChatsRequest
): Promise<ActionState<SelectChat[]>> {
  try {
    const chats = await getChats(request.userId)
    return {
      isSuccess: true,
      message: "Chats retrieved successfully",
      data: chats
    }
  } catch (error) {
    console.error("Error getting chats:", error)
    return { isSuccess: false, message: "Failed to get chats" }
  }
}

export async function deleteChatAction(
  request: DeleteChatRequest
): Promise<ActionState<SelectChat>> {
  try {
    const chat = await deleteChat(request.id)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Chat deleted successfully",
      data: chat
    }
  } catch (error) {
    console.error("Error deleting chat:", error)
    return { isSuccess: false, message: "Failed to delete chat" }
  }
} 
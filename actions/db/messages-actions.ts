"use server"

import { createMessage, getMessages } from "@/db/queries/messages-queries"
import { SelectMessage } from "@/db/schema"
import { CreateMessageRequest, GetMessagesRequest } from "@/types"
import { ActionState } from "@/types"
import { revalidatePath } from "next/cache"

export async function createMessageAction(
  request: CreateMessageRequest
): Promise<ActionState<SelectMessage>> {
  try {
    const message = await createMessage(request)
    revalidatePath("/")
    return {
      isSuccess: true,
      message: "Message created successfully",
      data: message
    }
  } catch (error) {
    console.error("Error creating message:", error)
    return { isSuccess: false, message: "Failed to create message" }
  }
}

export async function getMessagesAction(
  request: GetMessagesRequest
): Promise<ActionState<SelectMessage[]>> {
  try {
    const messages = await getMessages(request.chatId)
    return {
      isSuccess: true,
      message: "Messages retrieved successfully",
      data: messages
    }
  } catch (error) {
    console.error("Error getting messages:", error)
    return { isSuccess: false, message: "Failed to get messages" }
  }
} 
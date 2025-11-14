import { ChatBoxMessageType, MessageChatBox } from "@/types/chatbox/chatbox.type";

export function createMessageObj(message: string, type: ChatBoxMessageType): MessageChatBox {
  return {
    id: crypto.randomUUID(),
    type: type,
    text: message
  }
}
export type ChatBoxMessageType = 'question' | 'answer'

export type MessageChatBox = {
  id: string
  text: string
  type: ChatBoxMessageType
};
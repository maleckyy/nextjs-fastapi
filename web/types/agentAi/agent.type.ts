export type AgentAiQuestion = {
  question: string
}

export type AgentAiAnwser = {
  answer: string
}

export type AiMessage = {
  content: string,
  messageType: 0 | 1
}

export type ChatRoomOutput = {
  id: string
  name: string
}

export type AskAiPayload = {
  question: string,
  roomId: string
}
export type AgentAiQuestion = {
  question: string
}

export type AgentAiAnwser = {
  answer: string
}

export type AiMessage = {
  content: string,
  messageType: "answer" | "question"
}

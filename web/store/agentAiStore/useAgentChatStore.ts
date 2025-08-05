import { AiMessage } from '@/types/agentAi/agent.type'
import { create } from 'zustand'


interface ChatStore {
  messages: AiMessage[]
  addMessage: (message: AiMessage) => void
}

export const useAgentChatStore = create<ChatStore>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}))

import { MessageChatBox } from '@/types/chatbox/chatbox.type';
import { create } from 'zustand';
import { createMessageObj } from './utils/createMessageObj';

type ChatBoxStoreType = {
  messages: MessageChatBox[],
  addClientMessage: (question: string) => void,
  addBotMessage: (answer: string) => void,
}

const useChatBoxStore = create<ChatBoxStoreType>((set) => ({
  messages: [
    {
      id: crypto.randomUUID(),
      text: 'Hello there! How can I help you today?',
      type: 'answer',
    },
  ],

  addClientMessage: (question) => {
    const newMessage = createMessageObj(question, "question")
    set((state) => ({
      messages: [...state.messages, newMessage]
    }))
  },

  addBotMessage: (answer: string) => {
    const newMessage = createMessageObj(answer, "answer")
    set((state) => ({
      messages: [...state.messages, newMessage]
    }))
  },
}));

export default useChatBoxStore;

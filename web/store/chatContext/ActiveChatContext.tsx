'use client';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { setStringValueToLocalStorage } from "../localStorage";


type ChatContextType = {
  activeRoomId: string | undefined,
  setRoom: (id: string) => void,
  clientTargetId: string | undefined,
  setClientTargetId: (id: string) => void,
};


const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
}

export function ChatContextProvider({ children }: { children: ReactNode }) {
  const [activeRoomId, setActiveRoomId] = useState<string | undefined>(undefined)
  const [clientTargetId, setClientTargetId] = useState<string | undefined>(undefined)

  function setRoom(id: string) {
    setActiveRoomId(id)
    setStringValueToLocalStorage("last-chat-room", id)
  }

  useEffect(() => {
    const lastRoom = localStorage.getItem("last-chat-room")
    if (lastRoom) {
      setRoom(lastRoom)
    }
    const lastChatClient = localStorage.getItem("last-chat-client")
    if (lastChatClient) setClientTargetId(lastChatClient)
  }, [])

  useEffect(() => {
    if (clientTargetId) {
      setStringValueToLocalStorage("last-chat-client", clientTargetId)
    }
  }, [clientTargetId])

  return (
    <ChatContext.Provider value={{ activeRoomId, setRoom, clientTargetId, setClientTargetId }}>
      {children}
    </ChatContext.Provider>
  );
} 
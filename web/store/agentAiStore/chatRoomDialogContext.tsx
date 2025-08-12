'use client';
import { useGetChatList } from "@/api/agentAi/useGetChatList";
import { api } from "@/api/axios";
import { ApiEndpoints } from "@/api/routes/apiEndpoints";
import ChatRoomDrawer, { ChatRoomDrawerHandle } from "@/components/agentAi/ChatRoomDrawer";
import { ChatRoomOutput } from "@/types/agentAi/agent.type";
import { useMutation } from "@tanstack/react-query";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

type AiChatContextType = {
  activeChat: ChatRoomOutput | undefined,
  setActiveChat: (room: ChatRoomOutput | undefined) => void,
  openDrawer: () => void;
  closeDrawer: () => void,
  createRoom: () => void,
  ChatRoomList: ChatRoomOutput[] | undefined,
  refetchChatRoomList: () => void
};

const ChatBoxDrawerContext = createContext<AiChatContextType | undefined>(undefined);

export function useAiChatDrawerContext() {
  const ctx = useContext(ChatBoxDrawerContext);
  if (!ctx) throw new Error('useDialog must be used within AiChatDrawerProvider');
  return ctx;
}

export function AiChatDrawerProvider({ children }: { children: ReactNode }) {
  const [activeChat, setActiveChatState] = useState<ChatRoomOutput | undefined>(() => {
    const lastRoom = localStorage.getItem("ai-chat")
    if (lastRoom && lastRoom !== "undefined") {
      try {
        return JSON.parse(lastRoom)
      } catch {
        return undefined
      }
    }
    return undefined
  });
  const drawerRef = useRef<ChatRoomDrawerHandle>(null);

  function openDrawer() {
    drawerRef.current?.open();
  }

  function closeDrawer() {
    drawerRef.current?.close()
  }

  async function createNewAiChat(): Promise<ChatRoomOutput> {
    const response = await api.post(ApiEndpoints.AGENT_AI_CREATE_CHAT)
    return response.data
  }

  const { mutate } = useMutation({
    mutationFn: createNewAiChat,
    onSuccess: (data) => {
      setActiveChat(data)
      refetchChatRoomList()
    }
  })

  const setActiveChat = useCallback((room: ChatRoomOutput | undefined) => {
    if (room) {
      if (activeChat && room.id === activeChat.id) return

      setActiveChatState(room)
      localStorage.setItem("ai-chat", JSON.stringify(room))
    } else {
      localStorage.removeItem("ai-chat")
      setActiveChatState(undefined)
    }
  }, [activeChat])

  function createRoom() {
    mutate()
  }

  const { data: ChatRoomList, refetch: refetchChatRoomList, status } = useGetChatList()

  useEffect(() => {
    if (status === "error") {
      setActiveChat(undefined)
    }
    refetchChatRoomList()
  }, [activeChat, refetchChatRoomList, status, setActiveChat]);

  return (
    <ChatBoxDrawerContext.Provider value={{
      activeChat,
      setActiveChat,
      openDrawer,
      closeDrawer,
      createRoom,
      ChatRoomList,
      refetchChatRoomList
    }}>
      {children}
      <ChatRoomDrawer ref={drawerRef} />
    </ChatBoxDrawerContext.Provider>
  );
}
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '../ui/drawer'
import { PanelLeftOpen, SquarePen } from 'lucide-react';
import { useAiChatDrawerContext } from '@/store/agentAiStore/chatRoomDialogContext';
import { Separator } from '../ui/separator';
import { useDeleteChatById } from '@/api/agentAi/useDeleteChatById';
import { createToast } from '@/lib/toastService';
import { QueryClient } from '@tanstack/react-query';
import ChatRoomSingleElement from './ChatRoomSingleElement';

export type ChatRoomDrawerHandle = {
  open: () => void;
  close: () => void;
};

const ChatRoomDrawer = forwardRef<ChatRoomDrawerHandle>(
  (_, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    const { setActiveChat, closeDrawer, createRoom, ChatRoomList, activeChat, refetchChatRoomList } = useAiChatDrawerContext()

    const deleteChatMutation = useDeleteChatById()
    const queryClient = new QueryClient()

    function deleteChat(roomId: string) {
      deleteChatMutation.mutate(roomId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['message-history', roomId] })
          createToast("Chat deleted", "info")
          refetchChatRoomList()
          setActiveChat(undefined)
        }
      })
    }

    return (
      <Drawer direction='right' open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <PanelLeftOpen onClick={closeDrawer} size={18} className='cursor-pointer scale-hover' />
            <DrawerTitle className='sr-only'>Chats</DrawerTitle>
          </DrawerHeader>
          <section className=' px-4 flex flex-col gap-4'>
            <div className=' flex flex-row justify-start items-center gap-2 cursor-pointer' onClick={createRoom}>
              <SquarePen size={18} className='mt-0.5' />
              <span className='medium-text-title font-medium'>New chat</span>
            </div>
            <Separator />
            <DrawerDescription>Your chats with the AI agent</DrawerDescription>
            <div className='flex flex-col gap-1'>
              {ChatRoomList && ChatRoomList.length > 0 &&
                ChatRoomList.map((chat) => {
                  return (
                    <ChatRoomSingleElement key={chat.id} activeChat={activeChat} chat={chat} setActiveChat={setActiveChat} deleteChat={deleteChat} />
                  )
                })
              }
            </div>
          </section>
        </DrawerContent>
      </Drawer>
    );
  }
);

ChatRoomDrawer.displayName = 'Ai agent room drawer';
export default ChatRoomDrawer;
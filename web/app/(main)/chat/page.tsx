import AllUsersSidebar from '@/components/chat/AllUsersSidebar';
import ChatComponent from '@/components/chat/ChatComponent';
import PageTitle from '@/components/page-title';
import SectionTitle from '@/components/shared/texts/SectionTitle';
import { Separator } from '@/components/ui/separator';
import { ChatContextProvider } from '@/store/chatContext/ActiveChatContext';

export default function ChatPage() {
  return (
    <section className='flex flex-col gap-4 h-full'>
      <ChatContextProvider>
        <PageTitle title='Chat' />
        <div className='flex flex-1 flex-col md:flex-row gap-4 w-full h-full items-start'>
          <div className='flex flex-col w-full lg:w-[300px] md:w-[200px] gap-0'>
            <SectionTitle title='Użytkownicy' />
            <AllUsersSidebar />
          </div>
          <Separator orientation='vertical' className='hidden md:block' />
          <Separator className='block md:hidden' />
          <ChatComponent />
        </div>
      </ChatContextProvider>
    </section>
  )
}

import AllUsersSidebar from '@/components/chat/AllUsersSidebar';
import ChatComponent from '@/components/chat/ChatComponent';
import PageTitle from '@/components/page-title';
import PageSection from '@/components/shared/PageSection';
import SectionTitle from '@/components/shared/texts/SectionTitle';
import { Separator } from '@/components/ui/separator';
import { appMetadata } from '@/seoMetadata';
import { ChatContextProvider } from '@/store/chatContext/ActiveChatContext';
import { Metadata } from 'next';

export const metadata: Metadata = appMetadata.chat

export default function ChatPage() {
  return (
    <ChatContextProvider>
      <PageSection>
        <PageTitle title='Chat' data-testid="chat-header" />
        <div className='flex flex-col md:flex-row gap-4 w-full h-full items-start max-h-[calc(100%-40px)]'>
          <div className='flex flex-col w-full lg:w-[300px] md:w-[200px] gap-0'>
            <SectionTitle title='All users' />
            <AllUsersSidebar />
          </div>
          <Separator orientation='vertical' className='hidden md:block' />
          <Separator className='block md:hidden' />
          <ChatComponent />
        </div>
      </PageSection>
    </ChatContextProvider>
  )
}

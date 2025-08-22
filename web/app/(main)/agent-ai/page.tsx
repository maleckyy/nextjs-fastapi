import AgentChat from '@/components/agentAi/AgentChat'
import PageTitle from '@/components/page-title'
import PageSection from '@/components/shared/PageSection'
import { appMetadata } from '@/seoMetadata'
import { AiChatDrawerProvider } from '@/store/agentAiStore/chatRoomDialogContext'
import { Metadata } from 'next'

export const metadata: Metadata = appMetadata.aiAgent
export default function AgentAiPage() {

  return (
    <PageSection>
      <PageTitle title='AI Agent' data-testid="ai-agent-header" />
      <AiChatDrawerProvider>
        <AgentChat />
      </AiChatDrawerProvider>
    </PageSection>
  )
}

import AgentChat from '@/components/agentAi/AgentChat'
import PageTitle from '@/components/page-title'
import PageSection from '@/components/shared/PageSection'
export default function AgentAiPage() {

  return (
    <PageSection>
      <PageTitle title='Twoj agent AI' />
      <AgentChat />
    </PageSection>
  )
}

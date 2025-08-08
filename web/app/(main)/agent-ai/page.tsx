import AgentChat from '@/components/agentAi/AgentChat'
import PageTitle from '@/components/page-title'
import PageSection from '@/components/shared/PageSection'
export default function AgentAiPage() {

  return (
    <PageSection>
      <PageTitle title='AI Agent' data-testid="ai-agent-header" />
      <AgentChat />
    </PageSection>
  )
}

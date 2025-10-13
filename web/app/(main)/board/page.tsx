import BoardContent from '@/components/board/BoardContent'
import BoardHeader from '@/components/board/BoardHeader'
import PageTitle from '@/components/page-title'
import PageContent from '@/components/shared/PageContent'
import PageSection from '@/components/shared/PageSection'
import BoardContextProvider from '@/store/boardContext/boardContext'
import React from 'react'

export default function BoardPage() {
  return (
    <PageSection>
      <PageTitle title='Board' />
      <BoardContextProvider>
        <BoardHeader />
        <PageContent>
          <BoardContent />
        </PageContent>
      </BoardContextProvider>
    </PageSection>
  )
}

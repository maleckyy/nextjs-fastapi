import React from 'react'
import SectionTitle from '../shared/texts/SectionTitle'

import AddUserStackPopover from './edit/AddUserStackPopover'
import ProfileStackBadgeList from './edit/ProfileStackBadgeList'



export default function ProfileStack() {
  return (
    <section className='flex flex-col gap-2'>
      <div className='flex flex-row md:justify-start justify-between items-center gap-2'>
        <SectionTitle title="Stack" />
        <AddUserStackPopover />
      </div>
      <ProfileStackBadgeList />
    </section>
  )
}

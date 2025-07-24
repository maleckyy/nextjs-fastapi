import React from 'react'
import SectionTitle from '../shared/texts/SectionTitle'

import AddUserStackPopover from './edit/AddUserStackPopover'
import ProfileStackBadgeList from './edit/ProfileStackBadgeList'



export default function ProfileStack() {
  return (
    <section className='flex flex-col gap-2'>
      <div className='flex flex-row justify-between'>
        <SectionTitle title="Umiejętności" />
        <AddUserStackPopover />
      </div>
      <ProfileStackBadgeList />
    </section>
  )
}

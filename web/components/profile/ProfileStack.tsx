import React from 'react'
import { Badge } from '../ui/badge'
import SectionTitle from '../shared/texts/SectionTitle'
import { Plus } from 'lucide-react'

export default function ProfileStack() {

  const stack = ["css", "js", "ts"]

  return (
    <section className='flex flex-col gap-2'>
      <div className='flex flex-row justify-between'>
        <SectionTitle title="Umiejętności" />
        <Plus />
      </div>
      <div className="flex gap-2 flex-wrap">
        {
          stack ? (
            stack.map((item) => <Badge key={item} className='font-medium text-sm'>{item}</Badge>)
          ) : (
            <p>Brak</p>
          )
        }
      </div>
    </section>
  )
}

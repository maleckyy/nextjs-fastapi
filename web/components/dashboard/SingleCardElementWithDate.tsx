import React from 'react'
import { Separator } from '../ui/separator';

type Props = {
  title: string,
  description: string | undefined,
  index: number
  date?: Date,
};

export default function SingleCardElementWithDate({ title, description, index, date, }: Props) {
  return (
    <div>
      {index !== 0 && <Separator className='my-2' />}
      <div className='flex flex-row gap-1 justify-between min-w-0'>
        <div className='flex flex-col gap-1'>
          <h4 className='small-text-title'>{title}</h4>
          <h5 className='small-text-description'>{description}</h5>
        </div>
        {date && <span className='small-text-description shrink-0'>{new Date(date).toLocaleDateString()}</span>}
      </div>
    </div>
  )
}

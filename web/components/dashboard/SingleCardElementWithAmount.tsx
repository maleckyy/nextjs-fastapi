import React from 'react'
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

type Props = {
  title: string,
  description: string | undefined,
  index: number
  amount: string,
  expense_type: 0 | 1;
};

export default function SingleCardElementWithAmount({ title, description, index, amount, expense_type }: Props) {
  return (
    <div>
      {index !== 0 && <Separator className='my-2' />}
      <div className='flex flex-row gap-1 justify-between min-w-0'>
        <div className='flex flex-col gap-1'>
          <h4 className='small-text-title'>{title}</h4>
          <h5 className='small-text-description'>{description}</h5>
        </div>
        {amount && <span className='shrink-0'>
          <Badge
            variant="default"
            className={cn(
              'font-bold text-white',
              expense_type !== 0 ? "bg-green-600" : "bg-red-600"
            )}
          >
            {expense_type === 0 && "-"}${amount}
          </Badge>
        </span>}
      </div>
    </div>
  )
}
'use client'
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CirclePlus } from 'lucide-react';
import { useDialog } from '@/store/expenses/DialogContext';

const AddExpenseButton = () => {

  const { openDialog } = useDialog();

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <button aria-label="Add new transaction" onClick={() => openDialog()} >
            <CirclePlus className='mt-1' />
          </button>
        </TooltipTrigger>
        <TooltipContent side='left'>
          Add transaction
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default AddExpenseButton;

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
        <TooltipTrigger>
          <CirclePlus onClick={() => openDialog()} />
        </TooltipTrigger>
        <TooltipContent side='left'>
          Dodaj traksakcję
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default AddExpenseButton;

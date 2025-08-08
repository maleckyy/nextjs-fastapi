'use client'
import React, {
  useImperativeHandle,
  useState,
  forwardRef
} from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Expense } from '@/types/expense/expense.type';
import { DialogTitle } from '@radix-ui/react-dialog';
import ExpenseForm from './ExpenseForm';

export type ExpenceDialogHandle = {
  open: () => void;
  close: () => void;
};

type PropsType = {
  itemData?: Expense
};

const ExpenceDialog = forwardRef<ExpenceDialogHandle, PropsType>(
  ({ itemData }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
          <DialogTitle className="mb-2">{itemData ? ("Edit ") : ("Add new ")}transaction</DialogTitle>
          <ExpenseForm expenseData={itemData} />
        </DialogContent>
      </Dialog>
    );
  }
);

ExpenceDialog.displayName = 'ExpenceDialog';
export default ExpenceDialog;

'use client';
import ExpenceDialog, { ExpenceDialogHandle } from '@/components/expenses/ExpenseDialog';
import { Expense } from '@/types/expense/expense.type';
import { createContext, useContext, useState, ReactNode, useRef } from 'react';

type DialogContextType = {
  openDialog: (item?: Expense) => void;
  closeDialog: () => void,
  triggerExpenseDataRefetch: () => void,
  refreshFlag: boolean
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used within DialogProvider');
  return ctx;
}

export function ExpensesDialogProvider({ children, showDialog = false }: { children: ReactNode, showDialog?: boolean }) {
  const [selectedItem, setSelectedItem] = useState<Expense | undefined>();
  const dialogRef = useRef<ExpenceDialogHandle>(null);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false)
  function triggerExpenseDataRefetch() {
    setRefreshFlag(oldVal => !oldVal)
  }

  function openDialog(item?: Expense) {
    setSelectedItem(undefined)
    if (item) {
      setSelectedItem(item);
    }
    dialogRef.current?.open();
  }

  function closeDialog() {
    dialogRef.current?.close()
  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, refreshFlag, triggerExpenseDataRefetch }}>
      {children}
      {showDialog && <ExpenceDialog ref={dialogRef} itemData={selectedItem} />}
    </DialogContext.Provider>
  );
}

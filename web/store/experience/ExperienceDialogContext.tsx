'use client';
import ExperienceDialog, { ExperienceDialogHandle } from '@/components/experience/ExperienceDialog';
import { ExperienceOut } from '@/types/experience/experience.type';
import { createContext, useContext, useState, ReactNode, useRef } from 'react';

type DialogContextType = {
  openDialog: (item?: ExperienceOut) => void;
  closeDialog: () => void,
  triggerExperienceDataRefetch: () => void,
  refreshFlag: boolean,
  clearDialogData: () => void
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export function useExperienceDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used within DialogProvider');
  return ctx;
}

export function ExperienceDialogProvider({ children }: { children: ReactNode }) {
  const [selectedItem, setSelectedItem] = useState<ExperienceOut | undefined>();
  const dialogRef = useRef<ExperienceDialogHandle>(null);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false)

  function triggerExperienceDataRefetch() {
    setRefreshFlag(oldVal => !oldVal)
  }

  function openDialog(item?: ExperienceOut) {
    clearDialogData()
    if (item) {
      setSelectedItem(item);
    }
    dialogRef.current?.open();
  }

  function closeDialog() {
    dialogRef.current?.close()
  }

  function clearDialogData() {
    setSelectedItem(undefined)

  }

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, refreshFlag, triggerExperienceDataRefetch, clearDialogData }}>
      {children}
      <ExperienceDialog ref={dialogRef} itemData={selectedItem} />
    </DialogContext.Provider>
  );
}

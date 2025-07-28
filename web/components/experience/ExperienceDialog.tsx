'use client'
import React, {
  useImperativeHandle,
  useState,
  forwardRef
} from 'react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { ExperienceOut } from '@/types/experience/experience.type';
import ExperienceForm from './ExperienceForm';

export type ExperienceDialogHandle = {
  open: () => void;
  close: () => void;
};

type PropsType = {
  itemData?: ExperienceOut
};

const ExperienceDialog = forwardRef<ExperienceDialogHandle, PropsType>(
  ({ itemData }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
          <DialogTitle className="mb-2">{itemData ? ("Edytuj ") : ("Dodaj ")}doświadczenie</DialogTitle>
          <ExperienceForm experienceData={itemData} />
        </DialogContent>
      </Dialog>
    );
  }
);

ExperienceDialog.displayName = 'ExpenceDialog';
export default ExperienceDialog;

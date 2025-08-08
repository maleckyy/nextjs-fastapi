import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import AppInputField from "../shared/Inputs/AppInput";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useUpdateMutatnion } from "@/api/todo/useUpdateTodo";
import { Todo, TodoUpdate } from "@/types/todo/todo.type";
import { createToast } from "@/lib/toastService";
import { useIconSize } from "@/hooks/rwd-hooks/useIconSize";

type PropsType = {
  refetch: () => void,
  item: Todo
}

export default function UpdateTodoDialog({ refetch, item }: PropsType) {
  const [open, setOpen] = React.useState(false);
  const iconSize = useIconSize()

  const createTodoSchema = z.object({
    title: z.string({ required_error: "This field is required" }).min(3, "The title is too short."),
    description: z.string().optional(),
  });

  type CreateTodoFormType = z.infer<typeof createTodoSchema>;

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateTodoFormType>({
    resolver: zodResolver(createTodoSchema),
  });


  const updateTodoMutatnion = useUpdateMutatnion()
  function resetFormToDefaults() {
    reset({
      title: item.title,
      description: item.description
    })
  }

  function handleCreateTodo(formData: CreateTodoFormType) {
    const data: TodoUpdate = {
      id: item.id,
      newTodo: {
        title: formData.title,
        description: formData.description ?? '',
        is_done: item.is_done
      }
    }

    updateTodoMutatnion.mutate(data, {
      onSuccess: () => {
        createToast("Task edited", "success")
        setOpen(false)
        refetch()
        resetFormToDefaults()
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={(value: boolean) => {
      setOpen(value)
      resetFormToDefaults()
    }}>
      <DialogTrigger className='scale-hover cursor-pointer' data-testid="edit-todo-dialog-button"><Pen size={iconSize} className='mt-2' /></DialogTrigger>
      <DialogContent data-testid="edit-todo-dialog-content">
        <DialogHeader>
          <DialogTitle className='mb-2'>Create new todo</DialogTitle>
          <DialogDescription aria-describedby={undefined}></DialogDescription>
          <div className="flex flex-col gap-1">
            <AppInputField name="title" control={control} label='Todo name' error={errors.title?.message} defaultInputValue={item.title} />
            <AppInputField name="description" control={control} label='Todo description' error={errors.description?.message} defaultInputValue={item.description} />
            <div className='flex justify-end'>
              <Button className='scale-hover cursor-pointer' onClick={handleSubmit(handleCreateTodo)} disabled={isSubmitting || !isDirty} data-testid="edit-todo-submit-button">Update task</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>)
}
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import AppInputField from "../loginPage/LoginInputs/LoginInput";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useUpdateMutatnion } from "@/api/todo/useUpdateTodo";
import { Todo, TodoUpdate } from "@/types/todo/todo.type";
import { createToast } from "@/lib/toastService";

type PropsType = {
  refetch: () => void,
  item: Todo
}

export default function UpdateTodoDialog({ refetch, item }: PropsType) {
  const [open, setOpen] = React.useState(false);

  const createTodoSchema = z.object({
    title: z.string({ required_error: "Pole jest wymagane" }).min(3, "Tytuł jest zbyt krótki"),
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
        createToast("Zadanie edytowano", "success")
        setOpen(false)
        refetch()
        reset({
          title: item.title,
          description: item.description
        })
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={(value: boolean) => {
      setOpen(value)
      reset({
        title: item.title,
        description: item.description
      })
    }}>
      <DialogTrigger className='scale-hover cursor-pointer'><Pen size={24} className='mt-2' /></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='mb-2'>Utwórz nowe zadanie</DialogTitle>
          <DialogDescription aria-describedby={undefined}></DialogDescription>
          <div className="flex flex-col gap-1">
            <AppInputField name="title" control={control} label='Nazwa zadania' error={errors.title?.message} defaultInputValue={item.title} />
            <AppInputField name="description" control={control} label='Nazwa zadania' error={errors.description?.message} defaultInputValue={item.description} />
            <div className='flex justify-end'>
              <Button className='scale-hover cursor-pointer' onClick={handleSubmit(handleCreateTodo)} disabled={isSubmitting || !isDirty}>Dodaj zadanie</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>)
}
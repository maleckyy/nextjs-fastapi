import { useCreateTodoMutation } from "@/api/todo/useCreateTodoMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import AppInputField from "../shared/Inputs/AppInput";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { createToast } from "@/lib/toastService";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type PropsType = {
  refetch: () => void
}

export default function CreateTodoDialog({ refetch }: PropsType) {
  const [open, setOpen] = React.useState(false);

  const createTodoSchema = z.object({
    title: z.string({ required_error: "This field is required" }).min(3, "The title is too short."),
    description: z.string().optional(),
  });

  type CreateTodoFormType = z.infer<typeof createTodoSchema>;

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateTodoFormType>({
    resolver: zodResolver(createTodoSchema),
  });


  const createTodoMutation = useCreateTodoMutation()

  function handleCreateTodo(formData: CreateTodoFormType) {
    const data = {
      title: formData.title,
      description: formData.description ?? ''
    }
    createTodoMutation.mutate(data, {
      onSuccess: () => {
        createToast("Todo created", "success")
        setOpen(false)
        reset()
        refetch()
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger className='scale-hover cursor-pointer' data-testid="create-todo-button" aria-disabled tabIndex={undefined}>
            <CirclePlus size={24} className='mt-2' aria-label="Create new task" />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Create now task</p>
        </TooltipContent>
      </Tooltip >
      <DialogContent data-testid="create-todo-dialog-content">
        <DialogHeader>
          <DialogTitle className='mb-2'>Create new todo</DialogTitle>
          <DialogDescription aria-describedby={undefined}></DialogDescription>
          <div className="flex flex-col gap-1">
            <AppInputField name="title" control={control} label='Todo name' error={errors.title?.message} />
            <AppInputField name="description" control={control} label='Todo description' error={errors.description?.message} />
            <div className='flex justify-end'>
              <Button className='scale-hover cursor-pointer' onClick={handleSubmit(handleCreateTodo)} disabled={isSubmitting} data-testid="create-todo-submit-button">Add new todo</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>)
}
import { useCreateTodoMutation } from "@/api/todo/useCreateTodoMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import AppInputField from "../loginPage/LoginInputs/LoginInput";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

type PropsType ={
    refetch: () => void
}

export default function CreateTodoDialog({refetch}: PropsType) {
    const [open, setOpen] = React.useState(false);

    const createTodoSchema = z.object({
        title: z.string({required_error: "Pole jest wymagane"}).min(3, "Tytuł jest zbyt krótki"),
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

    function handleCreateTodo(formData: CreateTodoFormType){
        const data = {
            title: formData.title,
            description: formData.description ?? ''
        }
        createTodoMutation.mutate(data, {
            onSuccess: () => {
                reset()
                setOpen(false)
                refetch()
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='scale-hover cursor-pointer'><CirclePlus size={24} className='mt-2'/></DialogTrigger>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle className='mb-2'>Utwórz nowe zadanie</DialogTitle>
                    <DialogDescription aria-describedby={undefined}></DialogDescription>
                    <div className="flex flex-col gap-1">
                        <AppInputField name="title" control={control} label='Nazwa zadania' error={errors.title?.message}/>
                        <AppInputField name="description" control={control} label='Nazwa zadania' error={errors.description?.message}/>
                        <div className='flex justify-end'>
                            <Button className='scale-hover cursor-pointer' onClick={handleSubmit(handleCreateTodo)} disabled={isSubmitting}>Dodaj zadanie</Button>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>)
}
import { ExternalToast, toast } from "sonner";

type ToastType = "success" | "error" | "info"


export function createToast(message: string, type:ToastType, description?:string,) {

    const toastOptions: ExternalToast = {
        position: 'top-center',
        description: description || null,
        duration: 4000,
    }

    switch(type) {
        case "success":
            toast.success(message, {...toastOptions})
            break;

        case "error":
            toast.error(message, {...toastOptions})
            break;

        case "info":
            toast.info(message, {...toastOptions})
            break;

        default:
            toast(message, {...toastOptions})
    }
}
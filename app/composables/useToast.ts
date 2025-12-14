interface Toast {
    id: string;
    message: string;
    type: "success" | "error" | "info" | "warning";
    duration?: number;
}

const toasts = ref<Toast[]>([]);

export const useToast = () => {
    const addToast = (message: string, type: Toast["type"] = "info", duration = 3000) => {
        const id = Math.random().toString(36).substring(2, 15);
        toasts.value.push({ id, message, type, duration });
        return id;
    };

    const removeToast = (id: string) => {
        const index = toasts.value.findIndex((t) => t.id === id);
        if (index > -1) {
            toasts.value.splice(index, 1);
        }
    };

    return {
        toasts: readonly(toasts),
        success: (message: string, duration?: number) => addToast(message, "success", duration),
        error: (message: string, duration?: number) => addToast(message, "error", duration),
        info: (message: string, duration?: number) => addToast(message, "info", duration),
        warning: (message: string, duration?: number) => addToast(message, "warning", duration),
        remove: removeToast,
    };
};

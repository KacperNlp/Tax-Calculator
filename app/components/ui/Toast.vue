<script setup lang="ts">
interface Props {
    id: string;
    message: string;
    type?: "success" | "error" | "info" | "warning";
    duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
    type: "info",
    duration: 3000,
});

const emit = defineEmits<{
    close: [id: string];
}>();

const isVisible = ref(true);

onMounted(() => {
    if (props.duration > 0) {
        setTimeout(() => {
            closeToast();
        }, props.duration);
    }
});

function closeToast() {
    isVisible.value = false;
    setTimeout(() => {
        emit("close", props.id);
    }, 300);
}

const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
};

const iconPaths = {
    success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    error: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    warning:
        "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
};
</script>

<template>
    <Transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
    >
        <div
            v-if="isVisible"
            :class="[
                'flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg min-w-[300px] max-w-md',
                typeStyles[type],
            ]"
            role="alert"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="h-5 w-5 flex-shrink-0"
            >
                <path stroke-linecap="round" stroke-linejoin="round" :d="iconPaths[type]" />
            </svg>
            <p class="flex-1 text-sm font-medium">{{ message }}</p>
            <button
                type="button"
                @click="closeToast"
                class="flex-shrink-0 rounded p-1 hover:bg-black/20 transition-colors cursor-pointer"
                aria-label="Zamknij"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    class="h-4 w-4"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </Transition>
</template>

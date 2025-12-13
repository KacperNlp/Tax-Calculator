<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        open?: boolean;
    }>(),
    {
        open: false,
    }
);

const emit = defineEmits<{
    "update:open": [value: boolean];
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);

const isOpen = ref(props.open);

watch(
    () => props.open,
    (newValue) => {
        isOpen.value = newValue;
        if (newValue) {
            dialogRef.value?.showModal();
        } else {
            dialogRef.value?.close();
        }
    }
);

watch(isOpen, (newValue) => {
    emit("update:open", newValue);
});

function closeModal() {
    isOpen.value = false;
    dialogRef.value?.close();
}

function handleBackdropClick(e: MouseEvent) {
    if (e.target === dialogRef.value) {
        closeModal();
    }
}

onMounted(() => {
    if (props.open) {
        dialogRef.value?.showModal();
    }
});
</script>

<template>
    <dialog
        ref="dialogRef"
        class="fixed h-full w-full bg-gray-900/50 flex items-center justify-center"
        @click="handleBackdropClick"
        @close="isOpen = false"
    >
        <div
            class="relative w-full max-h-[90vh] max-w-[90vw] md:max-w-2xl overflow-y-auto p-6 lg:p-12 bg-white rounded-xl shadow-lg"
        >
            <button
                type="button"
                class="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
                @click="closeModal"
                aria-label="Zamknij"
            >
                Zamknij modal
            </button>
            <slot />
        </div>
    </dialog>
</template>

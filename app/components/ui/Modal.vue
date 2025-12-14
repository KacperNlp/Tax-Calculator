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
        class="modal-dialog"
        @click="handleBackdropClick"
        @close="isOpen = false"
    >
        <div
            class="relative mx-auto my-0 w-full max-w-[90vw] max-h-[90vh] rounded-xl bg-white p-6 shadow-xl md:max-w-2xl lg:p-12"
            @click.stop
        >
            <button
                type="button"
                class="absolute right-[-10px] top-[-10px] z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                @click.stop="closeModal"
                aria-label="Zamknij"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-5 w-5"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <slot />
        </div>
    </dialog>
</template>

<style scoped>
.modal-dialog {
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    z-index: 50;
}

.modal-dialog:not([open]) {
    display: none;
}

.modal-dialog[open] {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-dialog::backdrop {
    background-color: rgba(17, 24, 39, 0.5);
    backdrop-filter: blur(4px);
}
</style>

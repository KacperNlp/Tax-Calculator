<script setup lang="ts">
const { toasts, remove } = useToast();
</script>

<template>
    <div
        class="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
        aria-atomic="true"
    >
        <Toast
            v-for="toast in toasts"
            :key="toast.id"
            :id="toast.id"
            :message="toast.message"
            :type="toast.type"
            :duration="toast.duration"
            @close="remove"
            class="pointer-events-auto"
        />
    </div>
</template>


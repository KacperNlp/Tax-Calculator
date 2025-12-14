<script setup lang="ts">
withDefaults(
    defineProps<{
        type: "error" | "success" | "warning" | "info";
    }>(),
    {
        type: "info",
    }
);
</script>

<template>
    <div
        :class="[
            'border px-4 py-3 rounded relative',
            type === 'error' && 'bg-red-100 border-red-400 text-red-700',
            type === 'success' && 'bg-green-100 border-green-400 text-green-700',
            type === 'warning' && 'bg-yellow-100 border-yellow-400 text-yellow-700',
            type === 'info' && 'bg-blue-100 border-blue-400 text-blue-700',
        ]"
        role="alert"
    >
        <slot />
    </div>
</template>

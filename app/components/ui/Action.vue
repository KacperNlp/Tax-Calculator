<script setup lang="ts">
withDefaults(
    defineProps<{
        variant: "primary" | "danger";
        size: "sm" | "md" | "lg";
    }>(),
    {
        variant: "primary",
        size: "md",
    }
);
</script>

<template>
    <button
        :class="[
            'rounded-md cursor-pointer transition-colors duration-200',
            variant === 'primary' && 'bg-green-600 hover:bg-green-700 text-white',
            variant === 'danger' && 'bg-red-600 hover:bg-red-700 text-white',
            size === 'sm' && 'text-xs px-2 md:px-4 py-1 md:py-2',
            size === 'md' && 'text-sm px-4 md:px-6 py-2 md:py-3',
            size === 'lg' && 'text-base px-4 md:px-6 py-2 md:py-3',
        ]"
    >
        <slot />
    </button>
</template>

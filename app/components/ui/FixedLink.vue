<script setup lang="ts">
const props = defineProps<{
    to: string;
}>();
</script>

<template>
    <NuxtLink
        :to="to"
        class="absolute bottom-4 md:bottom-8 right-4 md:right-8 p-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
    >
        <slot />
    </NuxtLink>
</template>

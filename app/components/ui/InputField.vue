<script setup lang="ts">
withDefaults(
    defineProps<{
        type: string;
        placeholder: string;
        label: string;
        value?: string;
        disabled?: boolean;
    }>(),
    {
        type: "text",
        placeholder: "",
        value: "",
        disabled: false,
    }
);

const fieldId = `input-field-${Math.random().toString(36).substring(2, 15)}`;
</script>

<template>
    <div class="flex flex-col gap-2">
        <label :for="fieldId" class="text-sm text-gray-700">{{ label }}</label>
        <input
            :id="fieldId"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            :disabled="disabled"
            class="w-full rounded-md border border-gray-200 px-3 md:px-4 py-2 md:py-3 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
        />
    </div>
</template>

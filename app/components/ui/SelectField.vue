<script setup lang="ts">
interface Option {
    value: string;
    label: string;
}

withDefaults(
    defineProps<{
        label: string;
        options: Option[];
        modelValue?: string;
    }>(),
    {
        label: "",
        options: () => [],
    }
);

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const fieldId = `select-field-${Math.random().toString(36).substring(2, 15)}`;
</script>

<template>
    <div class="flex flex-col gap-2">
        <label :for="fieldId" class="text-sm text-gray-700">{{ label }}</label>
        <select
            :id="fieldId"
            :value="modelValue"
            @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
            class="w-full rounded-md border border-gray-200 px-3 md:px-4 py-2 md:py-3 text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
            <option v-for="option in options" :value="option.value">{{ option.label }}</option>
        </select>
    </div>
</template>

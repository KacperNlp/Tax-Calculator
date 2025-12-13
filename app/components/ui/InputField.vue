<script setup lang="ts">
withDefaults(
    defineProps<{
        type: string;
        placeholder: string;
        label: string;
        modelValue?: string;
        disabled?: boolean;
        errorText?: string;
    }>(),
    {
        type: "text",
        placeholder: "",
        modelValue: "",
        disabled: false,
    }
);

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
}>();

const fieldId = `input-field-${Math.random().toString(36).substring(2, 15)}`;
const errorId = `input-error-${Math.random().toString(36).substring(2, 15)}`;
</script>

<template>
    <div class="flex flex-col gap-2">
        <label :for="fieldId" class="text-sm text-gray-700">{{ label }}</label>
        <input
            :id="fieldId"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            :disabled="disabled"
            :aria-invalid="errorText ? 'true' : 'false'"
            :aria-describedby="errorText ? errorId : undefined"
            :class="[
                'w-full rounded-md border px-3 md:px-4 py-2 md:py-3 text-sm disabled:opacity-70 disabled:cursor-not-allowed',
                errorText ? 'border-red-500' : 'border-gray-200',
            ]"
        />
        <span
            v-if="errorText"
            :id="errorId"
            role="alert"
            aria-live="polite"
            class="text-red-500 text-xs"
        >
            {{ errorText }}
        </span>
    </div>
</template>

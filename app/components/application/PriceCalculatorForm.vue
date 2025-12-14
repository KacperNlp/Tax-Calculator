<script setup lang="ts">
const { calculate } = useTaxCalculate();

const isModalOpen = ref(false);
const gross = ref(0);
const tax = ref(0);
const isSubmitted = ref(false);

const formData = reactive({
    productName: "",
    netPrice: "",
    currency: "PLN",
    vatRate: "",
});

const errors = reactive({
    productName: "",
    netPrice: "",
    vatRate: "",
});

const vatOptions = [
    { value: "23%", label: "23%" },
    { value: "22%", label: "22%" },
    { value: "8%", label: "8%" },
    { value: "7%", label: "7%" },
    { value: "5%", label: "5%" },
    { value: "3%", label: "3%" },
    { value: "0%", label: "0%" },
    { value: "zw", label: "zw" },
    { value: "np.", label: "np." },
    { value: "o.o.", label: "o.o." },
];

function resetForm() {
    formData.productName = "";
    formData.netPrice = "";
    formData.currency = "PLN";
    formData.vatRate = "";
    errors.productName = "";
    errors.netPrice = "";
    errors.vatRate = "";
    isSubmitted.value = false;
}

function validateField(fieldName: keyof typeof errors, value: string | number) {
    if (!isSubmitted.value) {
        errors[fieldName] = "";
        return;
    }

    switch (fieldName) {
        case "productName":
            errors.productName =
                !value || value.toString().trim() === "" ? "Nazwa produktu jest wymagana" : "";
            break;
        case "netPrice":
            const numValue = Number(value);
            errors.netPrice =
                !value || isNaN(numValue) || numValue <= 0
                    ? "Kwota netto jest wymagana i musi być większa od 0"
                    : "";
            break;
        case "vatRate":
            errors.vatRate =
                !value || value.toString().trim() === "" ? "Stawka VAT jest wymagana" : "";
            break;
    }
}

const productNameError = computed(() =>
    isSubmitted.value && !formData.productName.trim() ? errors.productName : ""
);

const netPriceError = computed(() =>
    isSubmitted.value &&
    (!formData.netPrice || Number(formData.netPrice) <= 0 || isNaN(Number(formData.netPrice)))
        ? errors.netPrice
        : ""
);

const vatRateError = computed(() => (isSubmitted.value && !formData.vatRate ? errors.vatRate : ""));

watch(
    () => formData.productName,
    (newValue) => {
        if (isSubmitted.value) {
            validateField("productName", newValue);
        }
    }
);

watch(
    () => formData.netPrice,
    (newValue) => {
        if (isSubmitted.value) {
            validateField("netPrice", newValue);
        }
    }
);

watch(
    () => formData.vatRate,
    (newValue) => {
        if (isSubmitted.value) {
            validateField("vatRate", newValue);
        }
    }
);

watch(isModalOpen, (newValue) => {
    if (!newValue) {
        resetForm();
    }
});

async function submitForm() {
    try {
        isSubmitted.value = true;

        validateField("productName", formData.productName);
        validateField("netPrice", formData.netPrice);
        validateField("vatRate", formData.vatRate);

        if (errors.productName || errors.netPrice || errors.vatRate) {
            return;
        }

        const netPrice = Number(formData.netPrice);

        const { gross: grossValue, tax: taxValue } = calculate(netPrice, formData.vatRate);
        gross.value = grossValue;
        tax.value = taxValue;

        await $fetch("/api/calculator", {
            method: "POST",
            body: {
                ...formData,
                gross: grossValue,
                tax: taxValue,
            },
        });

        isModalOpen.value = true;
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <form class="flex flex-col gap-8" @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
                v-model="formData.productName"
                label="Nazwa produktu"
                type="text"
                placeholder="Wpisz nazwę produktu"
                :error-text="productNameError"
            />
            <InputField
                v-model="formData.netPrice"
                label="Kwota netto"
                type="number"
                placeholder="Wpisz kwotę netto"
                :error-text="netPriceError"
            />
            <InputField
                v-model="formData.currency"
                label="Waluta"
                type="text"
                placeholder="Wprowadź walutę"
                value="PLN"
                disabled
            />

            <SelectField
                v-model="formData.vatRate"
                label="Stawka VAT"
                :options="vatOptions"
                :error-text="vatRateError"
            />
        </div>

        <div class="flex justify-center">
            <Action variant="primary" size="md">Oblicz</Action>
        </div>
    </form>

    <Modal :open="isModalOpen" @close="isModalOpen = false">
        <p>
            cena produktu <strong>{{ formData.productName }}</strong
            >, wynosi : <strong>{{ gross }} zł brutto</strong>, kwota podatku to
            <strong>{{ tax }} zł</strong>.
        </p>
    </Modal>
</template>

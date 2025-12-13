<script setup lang="ts">
const { calculate } = useTaxCalculate();

const isModalOpen = ref(false);
const formData = reactive({
    productName: "",
    netPrice: "",
    currency: "PLN",
    vatRate: "",
});

const vatOptions = [
    { value: "23%", label: "23%" },
    { value: "22%", label: "22%" },
    { value: "8%", label: "8%" },
    { value: "7%", label: "7%" },
    { value: "5%", label: "5%" },
    { value: "3%", label: "3%" },
    { value: "0", label: "0%" },
    { value: "0", label: "zw" },
    { value: "0", label: "np." },
    { value: "0", label: "o.o." },
];

async function submitForm() {
    try {
        isModalOpen.value = true;
        const netPrice = Number(formData.netPrice);

        const { gross, tax } = calculate(netPrice, formData.vatRate);
        console.log(gross, tax);
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
            />
            <InputField
                v-model="formData.netPrice"
                label="Kwota netto"
                type="number"
                placeholder="Wpisz kwotę netto"
            />
            <InputField
                v-model="formData.currency"
                label="Waluta"
                type="text"
                placeholder="Wprowadź walutę"
                value="PLN"
                disabled
            />

            <SelectField v-model="formData.vatRate" label="Stawka VAT" :options="vatOptions" />
        </div>

        <div class="flex justify-center">
            <Action>Oblicz</Action>
        </div>
    </form>

    <!-- <Modal :open="isModalOpen" @close="isModalOpen = false">
        <p>
            cena produktu [nazwa produktu], wynosi : [wyliczona kwota brutto] zł brutto , kwota
            podatku to [wyliczona kwota podatku] zł.
        </p>
    </Modal> -->
</template>

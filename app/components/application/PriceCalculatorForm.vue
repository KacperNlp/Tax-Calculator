<script setup lang="ts">
const isModalOpen = ref(false);

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
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <form class="flex flex-col gap-8" @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Nazwa produktu" type="text" placeholder="Wpisz nazwę produktu" />
            <InputField label="Kwota netto" type="number" placeholder="Wpisz kwotę netto" />
            <InputField
                label="Waluta"
                type="text"
                placeholder="Wprowadź walutę"
                value="PLN"
                disabled
            />

            <SelectField label="Stawka VAT" :options="vatOptions" />
        </div>

        <div class="flex justify-center">
            <Action>Oblicz</Action>
        </div>
    </form>

    <Modal :open="isModalOpen" @close="isModalOpen = false">
        <p>
            cena produktu [nazwa produktu], wynosi : [wyliczona kwota brutto] zł brutto , kwota
            podatku to [wyliczona kwota podatku] zł.
        </p>
    </Modal>
</template>

<script setup lang="ts">
const { error: errorToast, success: successToast } = useToast();

const calculations = ref<any[]>([]);
const isLoading = ref(true);

async function getCalculations() {
    try {
        const response = await $fetch("/api/calculator");
        calculations.value = response.data || [];
    } catch (error) {
        console.error(error);
        calculations.value = [];
        errorToast("Wystąpił błąd podczas ładowania danych. Spróbuj ponownie.", 3000);
    }
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

async function deleteCalculation(id: number) {
    try {
        const response = await $fetch(`/api/calculator/${id}`, {
            method: "DELETE",
        });

        await getCalculations();

        const message = response.statusMessage || "Dane zostały usunięte.";
        successToast(message, 3000);
    } catch (error: any) {
        console.error(error);
        const message =
            error.data?.statusMessage || "Wystąpił błąd podczas usuwania danych. Spróbuj ponownie.";
        errorToast(message, 3000);
    }
}

onMounted(async () => {
    isLoading.value = true;
    await getCalculations();
    setTimeout(() => {
        isLoading.value = false;
    }, 500);
});
</script>

<template>
    <main class="flex min-h-screen justify-center px-4 py-8">
        <section class="w-full max-w-6xl" aria-describedby="price-calculator-form-headline">
            <h1 class="text-2xl lg:text-3xl mb-8 lg:mb-12" id="price-calculator-form-headline">
                Lista obliczeń
            </h1>

            <div
                v-if="calculations.length > 0 && !isLoading"
                class="overflow-x-auto rounded-lg border border-gray-200 shadow-sm"
            >
                <table class="w-full border-collapse bg-white">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="table-header-cell">Nazwa produktu</th>
                            <th class="table-header-cell">Kwota netto</th>
                            <th class="table-header-cell">Waluta</th>
                            <th class="table-header-cell">Stawka VAT</th>
                            <th class="table-header-cell">Kwota brutto</th>
                            <th class="table-header-cell">Kwota podatku</th>
                            <th class="table-header-cell">IP</th>
                            <th class="table-header-cell">Data utworzenia</th>
                            <th class="table-header-cell"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr
                            v-for="calculation in calculations"
                            :key="calculation.id"
                            class="transition-colors hover:bg-gray-50"
                        >
                            <td class="table-cell">
                                {{ calculation.productName }}
                            </td>
                            <td class="table-cell">
                                {{ calculation.netAmount }}
                            </td>
                            <td class="table-cell">
                                {{ calculation.currency }}
                            </td>
                            <td class="table-cell">
                                {{ calculation.vatRate }}
                            </td>
                            <td class="table-cell">
                                {{ calculation.grossAmount }}
                            </td>
                            <td class="table-cell">
                                {{ calculation.taxAmount }}
                            </td>
                            <td class="table-cell">
                                {{ calculation.ip }}
                            </td>
                            <td class="table-cell">
                                {{ formatDate(calculation.createdAt) }}
                            </td>
                            <td class="table-cell">
                                <div class="flex gap-2">
                                    <Action
                                        variant="danger"
                                        size="sm"
                                        @click="deleteCalculation(calculation.id)"
                                        >Usuń</Action
                                    >
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else-if="isLoading">
                <Loader />
            </div>
            <div v-else>
                <Alert type="info">Brak danych</Alert>
            </div>
        </section>
        <FixedLink to="/">Kalkulator</FixedLink>
    </main>
</template>

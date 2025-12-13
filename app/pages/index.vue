<template>
    <main class="flex min-h-screen items-center justify-center p-4">
        <section class="w-full max-w-2xl" aria-describedby="price-calculator-form-headline">
            <Card>
                <h1
                    class="text-2xl lg:text-3xl text-center mb-8 lg:mb-12"
                    id="price-calculator-form-headline"
                >
                    Kalkulator podatku dochodowego
                </h1>
                <PriceCalculatorForm />
            </Card>
        </section>
    </main>
</template>

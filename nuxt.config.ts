import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ["./app/assets/css/main.css"],
    vite: {
        plugins: [tailwindcss()],
    },

    components: [
        {
            path: "~/components/application",
            prefix: "",
        },
        {
            path: "~/components/ui",
            prefix: "",
        },
    ],
});

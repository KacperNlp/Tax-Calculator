import { db } from "../../db/client";
import { calculations } from "../../db/schema";

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

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const submissionDate = new Date().toISOString();

        const clientIP =
            getHeader(event, "x-forwarded-for")?.split(",")[0] ||
            getHeader(event, "x-real-ip") ||
            event.node.req.socket?.remoteAddress ||
            "unknown";

        const { productName, netPrice, currency, vatRate, gross, tax } = body;

        if (!productName || productName.length < 3) {
            throw createError({
                statusCode: 400,
                statusMessage: "Nazwa produktu jest wymagana i musi mieć co najmniej 3 znaki",
            });
        }

        if (!netPrice || Number(netPrice) <= 0) {
            throw createError({
                statusCode: 400,
                statusMessage: "Cena netto jest wymagana i musi być większa od 0",
            });
        }

        if (!vatRate || !vatOptions.some((option) => option.value === vatRate)) {
            throw createError({
                statusCode: 400,
                statusMessage: "Stawka VAT musi mieć poprawną wartość z zakresu podanej listy",
            });
        }

        const result = await db
            .insert(calculations)
            .values({
                productName: productName,
                netAmount: Number(netPrice),
                currency: currency,
                vatRate: vatRate,
                grossAmount: Number(gross),
                taxAmount: Number(tax),
                ip: clientIP,
                createdAt: submissionDate,
            })
            .returning();

        return {
            status: 200,
            statusMessage: "Dane zostały zapisane pomyślnie.",
            data: result[0],
        };
    } catch (error: any) {
        if (error.statusCode) {
            throw error;
        }

        throw createError({
            statusCode: 500,
            statusMessage: "Wystąpił błąd podczas zapisywania danych",
        });
    }
});

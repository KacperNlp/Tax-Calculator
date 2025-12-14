import { db } from "../../db/client";
import { calculations } from "../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, "id");

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: "ID jest wymagany",
            });
        }

        const idNumber = Number(id);
        if (isNaN(idNumber) || idNumber <= 0) {
            throw createError({
                statusCode: 400,
                statusMessage: "Nieprawidłowy format ID",
            });
        }

        const existing = await db
            .select()
            .from(calculations)
            .where(eq(calculations.id, idNumber))
            .limit(1);

        if (existing.length === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: "Dane nie zostały znalezione",
            });
        }

        await db.delete(calculations).where(eq(calculations.id, idNumber));

        return {
            status: 200,
            statusMessage: "Dane zostały usunięte",
        };
    } catch (error: any) {
        if (error.statusCode) {
            throw error;
        }

        throw createError({
            statusCode: 500,
            statusMessage: "Wystąpił błąd podczas usuwania danych. Spróbuj ponownie.",
            data: error,
        });
    }
});

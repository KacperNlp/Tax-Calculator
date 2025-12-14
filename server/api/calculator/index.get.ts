import { db } from "../../db/client";
import { calculations } from "../../db/schema";
import { desc } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    try {
        const allCalculations = await db.select().from(calculations).orderBy(desc(calculations.id));

        return {
            status: 200,
            data: allCalculations,
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Wystąpił błąd podczas ładowania danych. Spróbuj ponownie.",
            data: error,
        });
    }
});

import { db } from "../../db/client";
import { calculations } from "../../db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    try {
        const id = getRouterParam(event, "id");

        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: "ID is required",
            });
        }

        const idNumber = Number(id);
        if (isNaN(idNumber) || idNumber <= 0) {
            throw createError({
                statusCode: 400,
                statusMessage: "Invalid ID format",
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
                statusMessage: "Calculation not found",
            });
        }

        await db.delete(calculations).where(eq(calculations.id, idNumber));

        return {
            status: 200,
            message: "Calculation deleted successfully",
        };
    } catch (error: any) {
        if (error.statusCode) {
            throw error;
        }

        throw createError({
            statusCode: 500,
            statusMessage: "Failed to delete calculation",
            data: error,
        });
    }
});

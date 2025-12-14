import { db } from "../../db/client";
import { calculations } from "../../db/schema";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const submissionDate = new Date().toISOString();

        const clientIP =
            getHeader(event, "x-forwarded-for")?.split(",")[0] ||
            getHeader(event, "x-real-ip") ||
            event.node.req.socket?.remoteAddress ||
            "unknown";

        const result = await db
            .insert(calculations)
            .values({
                productName: body.productName,
                netAmount: Number(body.netPrice),
                currency: body.currency,
                vatRate: body.vatRate,
                grossAmount: Number(body.gross),
                taxAmount: Number(body.tax),
                ip: clientIP,
                createdAt: submissionDate,
            })
            .returning();

        return {
            status: 200,
            data: result[0],
        };
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to save calculation",
            data: error,
        });
    }
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const submissionDate = new Date().toISOString();

    return {
        status: 200,
    };
});

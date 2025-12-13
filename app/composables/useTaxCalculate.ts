export function useTaxCalculate() {
    const parseVatRate = (rate: string): number => {
        const match = rate.match(/^(\d+)%$/);
        return match ? Number(match[1]) : 0;
    };

    const calculate = (net: number, rate: string) => {
        const vatRate = parseVatRate(rate);
        const tax = +(net * (vatRate / 100)).toFixed(2);
        const gross = +(net + tax).toFixed(2);
        return { gross, tax };
    };

    return { calculate };
}

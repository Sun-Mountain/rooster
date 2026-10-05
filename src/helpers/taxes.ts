// Help function to apply the tax for a given amount and tax rate
function applyTax(amount: number, taxRate: number): number {
    if (taxRate < 0 || taxRate > 1) {
        throw new Error('Tax rate must be between 0 and 1');
    }
    return amount + (amount * taxRate);
}

export { applyTax };
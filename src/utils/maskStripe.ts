export function maskStripeAccountId(id?: string) {
    if (!id) return "Not connected";

    return `••••${id.slice(-4)}`;
}


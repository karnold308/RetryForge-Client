const formatCurrency = (
    value: number | string | null | undefined
): string => {
    const amount = Number(value)

    if (isNaN(amount)) {
        return '0'
    }

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

const formatStripeCurrency = (
    value: number | string | null | undefined
): string => {
    const amount = Number(value)

    if (isNaN(amount)) {
        return '0'
    }

    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount / 100)
}

const formatFullStripeCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value / 100);
};

const formatCompactNumber = (num: number) => {
    let newNum = null;
    if (num < 1000) {
        newNum = Intl.NumberFormat("en", {
            notation: "compact",
            maximumFractionDigits: 0,
        }).format(num);
    } else {
        newNum = Intl.NumberFormat("en", {
            notation: "compact",
            maximumFractionDigits: 1,
        }).format(num);
    }
    return newNum;
}

const formatLargeNumber = (num: number) => {
    let newNum = null;
    if (num < 1000) {
        newNum = Intl.NumberFormat("en", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
    } else {
        newNum = Intl.NumberFormat("en", {
            maximumFractionDigits: 0,
        }).format(num);
    }
    return newNum;
}


export { formatCurrency, formatCompactNumber, formatLargeNumber, formatStripeCurrency, formatFullStripeCurrency }

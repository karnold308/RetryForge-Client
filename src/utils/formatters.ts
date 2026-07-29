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


const formatFailure = (reason: string | null) => {
    if (!reason) return "Unknown error"

    if (reason.includes("declined")) return "Card Declined"
    if (reason.includes("insufficient")) return "Insufficient Funds"
    if (reason.includes("expired")) return "Card Expired"
    if (reason.includes("processing")) return "Processing Error"
    if (reason.includes("honor")) return "Do Not Honor"

    return reason
}

const getTimeAgo = (date: string) => {
    if (null === date) return ''
    
    const diff = Date.now() - new Date(date).getTime()

    const minutes = Math.floor(diff / 60000)
    if (minutes < 60) return `${minutes}m ago`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`

    const days = Math.floor(hours / 24)
    return `${days}d ago`
}


export {
    formatCurrency, formatCompactNumber,
    formatLargeNumber, formatStripeCurrency,
    formatFullStripeCurrency, formatFailure,
    getTimeAgo
}

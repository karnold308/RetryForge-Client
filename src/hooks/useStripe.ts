import { useMe } from "./useMe"
import type { UseStripeResult } from '../models/types'



export function useStripe(): UseStripeResult {
    const { data: me, isLoading } = useMe()

    return {
        stripe: me?.stripe ?? null,
        isLoading
    }
}
import { useQuery } from "@tanstack/react-query"
import useAxiosPrivate from "./useAxiosPrivate"
import type { MeResponse } from '../models/types'
import { fetchMe } from "../api/me"


export const useMe = () => {
    const axiosPrivate = useAxiosPrivate()

    return useQuery<MeResponse>({
        queryKey: ["me"],
        queryFn: () => fetchMe(axiosPrivate),
        staleTime: 1000 * 60 * 5, // 5 min cache
        refetchOnWindowFocus: true,
        retry: 1
    })
}
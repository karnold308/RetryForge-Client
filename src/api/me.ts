import { AxiosInstance } from "axios";

export const fetchMe = async (
    axiosPrivate: AxiosInstance
) => {
    const res = await axiosPrivate.get("/api/me");
    return res.data;
};
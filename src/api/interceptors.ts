import { axiosPrivate } from './axios';

let isRefreshing = false;
let queue: any[] = [];

export const setupInterceptors = (refresh: () => Promise<string>) => {

    axiosPrivate.interceptors.response.use(
        res => res,
        async (err) => {
            const original = err.config;

            if (err.response?.status !== 401 || original._retry) {
                return Promise.reject(err);
            }

            if (isRefreshing) {
                return new Promise(resolve => {
                    queue.push(() => resolve(axiosPrivate.request(original)));
                });
            }

            original._retry = true;
            isRefreshing = true;

            try {
                const newToken = await refresh();

                original.headers['Authorization'] = `Bearer ${newToken}`;
                axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

                return axiosPrivate(original);

            } catch (e) {
                queue = [];
                return Promise.reject(e);
            } finally {
                isRefreshing = false;
            }
        }
    );
};
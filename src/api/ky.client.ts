import ky, {type KyInstance} from 'ky';

export const createApiClient = (): KyInstance => {
    return ky.extend({
        prefixUrl: import.meta.env.VITE_APP_API_URL,
        hooks: {
            beforeRequest: [
                request => {
                    request.headers.set('X-API-KEY', import.meta.env.VITE_APP_API_KEY);
                }
            ]
        },
        timeout: 10000,
        retry: {
            limit: 3,
            methods: ['get'],
            statusCodes: [408, 413, 429, 500, 502, 503, 504], 
        }
    });
};
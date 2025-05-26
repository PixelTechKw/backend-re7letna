import {apiUrl, xApiKey} from '@/constants';
import {RootState} from '@/redux/store';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {REHYDRATE} from 'redux-persist';
import type {Action} from '@reduxjs/toolkit';
function isHydrateAction(action: Action): action is Action<typeof REHYDRATE> & {
    key: string;
    payload: RootState;
    err: unknown;
} {
    return action.type === REHYDRATE;
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}`,
        prepareHeaders: async (
            headers,
            {getState, type, endpoint, extra}: RootState,
        ) => {
            const {
                locale: {lang},
            } = getState() as RootState;
            headers.set(
                'Access-Control-Allow-Headers',
                'X-Requested-With,Accept,Authentication,Content-Type',
            );
            headers.set('Accept-Language', lang);
            headers.set('x-api-key', xApiKey);
            headers.set(
                'Access-Control-Allow-Methods',
                'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            );
            headers.set('Content-Type', 'application/json');
            headers.set('Accept', 'application/json');
            headers.set('Cache-Control', 'no-store');
            return headers;
        },
        // credentials: "include",
        credentials: 'same-origin',
    }),
    refetchOnReconnect: false,
    endpoints: (builder) => ({
        getSettings: builder.query<any, {coupon: string; token: string}>({
            query: ({coupon, token}) => ({
                url: route(`frontend.setting.index`, {coupon}),
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),
    }),
});

export const {useLazyGetSettingsQuery, useGetSettingsQuery} = apiSlice;

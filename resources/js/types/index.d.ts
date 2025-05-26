import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    mobile: string;
    is_admin: boolean;
    token: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string, query: { [key: string]: string; } };
    flash?: { error: string; success: string },
    element?: any,
    currentRouteName: string,
    settings: Setting,
    elements?: any,
    [key: string]: string;
};

export type toastMessage = {
    content: string;
    type: string | 'default' | 'success' | 'error' | 'warning' | 'info';
    title?: string;
    showToast: boolean;
}

export type Setting = {
    id: number;
    name: string;
    image: string;
    description: string;
    aboutus: string;
    services: string;
    address: string;
    country: string;
    [key: string]: any;
}



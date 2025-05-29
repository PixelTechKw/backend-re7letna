import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    mobile: string;
    is_admin: boolean;
    token: string;
    email_verified_at?: string;
    children?: Child[];
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
    genders?: string[],
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

export type Gender = 'male' | 'female';

export type Stage = {
    id: number | string;
    name: string;
    description: string;
    from: string;
    to: string;
};
export type Child = {
    id: number | string;
    name: string;
    dob: Date;
    gender: Gender;
    user_id: number | string;
    stage_id: number | string;
    user?: User;
    stage?: Stage;
    [key: string]: any;
}

export type Questionnaire = {
    id: number | string;
    name: string;
    description: string;
    stage_id: number | string;
    stage?: Stage;
    questions?: Question[];
    [key: string]: any;
}

export type Question = {
    id: number | string;
    name: string;
    description: string;
    order: number;
    answers?: Answer[];
    [key: string]: any;
}

export type Answer = {
    name: string;
    value: string | number;
}

export type Quiz = {
    id: number | string;
    child_id: number | string;
    questionnaire_id: number | string;
    questionnaire?: Questionnaire;
    score: number;
    child?: Child;
    [key: string]: any;
}

export type Category = {
    id: number | string;
    name: string;
    description: string;
    [key: string]: any;
}

export type Video = {
    id: number | string;
    name: string;
    description: string;
    [key: string]: any;
}

export type Tool = {
    id: number | string;
    name: string;
    description: string;
    [key: string]: any;
}

export type Consultant = {
    id: number | string;
    name: string;
    description: string;
    [key: string]: any;
}

export type Comment = {
    id: number | string;
    name: string;
    description: string;
    [key: string]: any;
}

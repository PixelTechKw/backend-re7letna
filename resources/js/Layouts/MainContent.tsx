import MainFooter from "@/Pages/Frontend/Partials/MainFooter";
import MainHead from "@/Pages/Frontend/Partials/MainHead";
import MainMenu from "@/Pages/Frontend/Partials/MainMenu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActivePath } from "@/redux/slices/appSettingSlice";
import {
    showErrorToastMessage,
    showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { AppProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { capitalize, first, isEmpty, isNull, values } from "lodash";
import { ReactNode, useEffect } from "react";

export default function ({
    title,
    children,
}: {
    title?: string;
    children: ReactNode;
}): React.ReactNode {
    const {
        toastMessage: { showToast, content, type },
        settings: { activePath },
    } = useAppSelector((state) => state);
    const {
        props: { flash, errors, pages, settings, currentRouteName },
    }: AppProps = usePage();
    const dispatch = useAppDispatch();

    useEffect(() => {
        // dispatch(setPages(pages));
        // dispatch(setSettings(settings));
        dispatch(setActivePath(currentRouteName));
    }, [currentRouteName]);

    useEffect(() => {
        if (!showToast) {
            if (flash && !isNull(flash.success)) {
                dispatch(showSuccessToastMessage({ content: flash.success }));
            } else if (flash && !isNull(flash.error)) {
                dispatch(showErrorToastMessage({ content: flash.error }));
            } else if (!isEmpty(errors)) {
                dispatch(
                    showErrorToastMessage({
                        content: first(values(errors)),
                    }),
                );
            }
        }
    }, [flash, errors]);

    return (
        <motion.div
            className="pb-8 sm:py-6 md:py-2 min-h-screen"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
        >
            <MainHead title={capitalize(title)} />
            <MainMenu />
            <div className="mx-auto max-w-6xl px-6 lg:px-0 py-10">
                {children}
                <MainFooter />
                <Crisp />
            </div>
        </motion.div>
    );
}

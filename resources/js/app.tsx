import MainLayout from "@/Layouts/MainLayout";
import AppProvider from "@/redux/AppProvider";
import { TooltipProvider } from "@/shadcn/ui/tooltip";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import "../css/app.css";
import "./bootstrap";
const appName = import.meta.env.VITE_APP_NAME || "School.how";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
            return;
        }
        createRoot(el).render(
            <AppProvider>
                <MainLayout>
                    <TooltipProvider>
                        <App {...props} />
                    </TooltipProvider>
                </MainLayout>
            </AppProvider>
        );
    },
    progress: {
        color: "#e9415f",
        showSpinner: true,
    },
});

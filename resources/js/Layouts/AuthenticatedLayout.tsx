import DeleteModal from "@/Components/DeleteModal";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import MainHead from "@/Pages/Frontend/Partials/MainHead";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    showErrorToastMessage,
    showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { Link, usePage } from "@inertiajs/react";
import { first, isEmpty, isNull, values } from "lodash";
import { ChevronDown } from "lucide-react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

export default function ({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode | string }>) {
    const {
        auth: { user },
        flash,
        errors,
        settings,
    } = usePage().props;
    const {
        settings: { deleteModal },
        toastMessage: { showToast, content, type },
    } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    useEffect(() => {
        if (!showToast) {
            if (flash && !isNull(flash.success)) {
                dispatch(showSuccessToastMessage({ content: flash.success }));
            } else if (flash && !isNull(flash.error)) {
                dispatch(showErrorToastMessage({ content: flash.error }));
            } else if (!isEmpty(errors)) {
                dispatch(
                    showErrorToastMessage({
                        content: first(values(errors)) ?? "",
                    }),
                );
            }
        }
    }, [flash, errors]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800 capitalize">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <img
                                        alt={settings.name}
                                        src={settings.thumb}
                                        className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"
                                    />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex capitalize">
                                <NavLink
                                    prefetch
                                    cacheFor={1000}
                                    href={route("backend.home")}
                                    active={
                                        route().current("backend.home") ||
                                        route().current("backend.user.index") ||
                                        route().current(
                                            "backend.user.create",
                                        ) ||
                                        route().current("backend.user.edit") ||
                                        route().current(
                                            "backend.child.index",
                                        ) ||
                                        route().current(
                                            "backend.child.create",
                                        ) ||
                                        route().current("backend.child.edit") ||
                                        route().current("backend.child.show")
                                    }
                                >
                                    Parents
                                </NavLink>
                                <NavLink
                                    prefetch
                                    cacheFor={1000}
                                    href={route("backend.questionnaire.index")}
                                    active={
                                        route().current(
                                            "backend.quesstionnaire.index",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.create",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.edit",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.show",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.index",
                                        )
                                    }
                                >
                                    Questionnaires
                                </NavLink>
                                <NavLink
                                    prefetch
                                    cacheFor={1000}
                                    href={route("backend.questionnaire.index")}
                                    active={
                                        route().current(
                                            "backend.quesstionnaire.index",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.create",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.edit",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.show",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.index",
                                        )
                                    }
                                >
                                    categories
                                </NavLink>
                                <NavLink
                                    prefetch
                                    cacheFor={1000}
                                    href={route("backend.questionnaire.index")}
                                    active={
                                        route().current(
                                            "backend.quesstionnaire.index",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.create",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.edit",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.show",
                                        ) ||
                                        route().current(
                                            "backend.questionnaire.index",
                                        )
                                    }
                                >
                                    Videos
                                </NavLink>

                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md mt-2.5 text-gray-500">
                                            <button
                                                type="button"
                                                className="inline-flex  items-center h-12   text-sm  transition duration-150 ease-in-out focus:outline-none hover:border-b-2 hover:border-gray-400 capitalize"
                                            >
                                                others
                                                <ChevronDown className="size-4 mx-2" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("backend.stage.index")}
                                        >
                                            stages
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("backend.tool.index")}
                                        >
                                            tools
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                "backend.consultant.index",
                                            )}
                                        >
                                            consultants
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route(
                                                "backend.comment.index",
                                            )}
                                        >
                                            comments
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>

                                <NavLink
                                    prefetch
                                    cacheFor={1000}
                                    href={route("backend.setting.index")}
                                    active={route().current(
                                        "backend.setting.index",
                                    )}
                                >
                                    settings
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("frontend.home")}
                                        >
                                            website
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("backend.profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("backend.home")}
                            active={route().current("backend.home")}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route("frontend.home")}>
                                Back to website
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                href={route("backend.setting.index")}
                            >
                                Settings
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                href={route("backend.profile.edit")}
                            >
                                Profile
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>
            <div className=" max-w-7xl mx-auto p-6 mt-4">
                {header && (
                    <header className="bg-white shadow dark:bg-gray-800 hidden">
                        <div className=" px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                        <MainHead title={header} />
                    </header>
                )}

                <main>{children}</main>
            </div>
            {deleteModal?.showDeleteModal && !isNull(deleteModal?.element) && (
                <DeleteModal />
            )}
        </div>
    );
}

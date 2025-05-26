import { loginURL, registerURL } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActivePath } from "@/redux/slices/appSettingSlice";
import { Page, PageProps } from "@/types";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, router, usePage } from "@inertiajs/react";
import { filter, map } from "lodash";
import { ChevronRight, UserCircle, UserIcon } from "lucide-react";

export default function () {
    const dispatch = useAppDispatch();
    const { settings, pages, auth }: PageProps = usePage().props;
    const { settings: appSetting } = useAppSelector((state) => state);

    return (
        <Disclosure
            as="nav"
            className="top-0 border-b border-gray-200  sticky bg-white/60 backdrop-blur-sm  py-2 z-50  rounded-t-2xl"
        >
            <div className="mx-auto max-w-6xl px-2 sm:px-0   ">
                <div className="relative flex h-16 justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-prime-500">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block size-6 group-data-[open]:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden size-6 group-data-[open]:block"
                            />
                        </DisclosureButton>
                    </div>
                    <div className="flex  w-full items-center justify-center lg:justify-start lg:items-stretch ">
                        <Link
                            className="flex justify-center items-center  md:pl-4 xl:pl-0"
                            onClick={() => dispatch(setActivePath("home"))}
                            href={route("frontend.home")}
                        >
                            <img
                                alt={settings.name}
                                src={settings.thumb}
                                className="h-14 w-auto"
                            />
                        </Link>
                        {/* desktop menu */}
                        <div className="hidden lg:ml-12  lg:flex flex-1 lg:space-x-6 xl:space-x-8  w-full justify-start  xl:justify-center items-center ">
                            <div className="flex flex-1 w-full justify-start items-center space-x-8 xl:space-x-8">
                                <Link
                                    onClick={() =>
                                        dispatch(setActivePath("home"))
                                    }
                                    href={route("frontend.home")}
                                    className={`${
                                        appSetting.activePath == "home"
                                            ? `border-b-2 border-second-500`
                                            : `border-none`
                                    } first-letter:uppercase`}
                                >
                                    home
                                </Link>
                                {map(
                                    filter(pages, (e) => e.menu),
                                    (p: Page, i) => (
                                        <Link
                                            onClick={() =>
                                                dispatch(setActivePath(p.slug))
                                            }
                                            key={i}
                                            href={`/${p.slug}`}
                                            className={`${
                                                appSetting.activePath == p.slug
                                                    ? `border-b-2 border-second-500`
                                                    : `border-none`
                                            } first-letter:uppercase`}
                                        >
                                            {p.name}
                                        </Link>
                                    ),
                                )}
                                <Link
                                    onClick={() =>
                                        dispatch(setActivePath("fees"))
                                    }
                                    href={`fees`}
                                    className={`${
                                        appSetting.activePath == "fees"
                                            ? `border-b-2 border-second-500`
                                            : `border-none`
                                    } first-letter:uppercase`}
                                >
                                    fees
                                </Link>
                                <Link
                                    onClick={() =>
                                        dispatch(setActivePath("contact"))
                                    }
                                    href={route("frontend.contactus")}
                                    className={`${
                                        appSetting.activePath == "contact"
                                            ? `border-b-2 border-second-500`
                                            : `border-none`
                                    } first-letter:uppercase`}
                                >
                                    contact
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="hidden absolute inset-y-0 right-0 lg:flex items-center pr-2 space-x-2">
                        <a
                            href={loginURL}
                            className="btn-white border border-gray-200"
                        >
                            Log in
                        </a>
                        <a className="btn-default" href={registerURL}>
                            Sign up
                        </a>

                        {/* Profile dropdown */}
                        {auth?.user && auth.user.is_admin ? (
                            <Menu as="div" className=" relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-prime-500 focus:ring-offset-2">
                                        <button className="border w-12 h-12 flex justify-center items-center p-2 rounded-full">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            <UserIcon />
                                        </button>
                                    </MenuButton>
                                </div>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <MenuItem>
                                        <Link
                                            href={route("backend.home")}
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Dashboard
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            href={route(
                                                "backend.setting.index",
                                            )}
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Settings
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                                        >
                                            Log Out
                                        </Link>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        ) : (
                            <Link href={route("login")} className="hidden">
                                <UserCircle className="w-8 h-8 text-gray-600" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {/* mobile menu */}
            <DisclosurePanel className="flex lg:hidden">
                <div className="space-y-1 pb-4 pt-2 first-letter:uppercase -500 w-full">
                    <DisclosureButton
                        as="button"
                        onClick={() => {
                            dispatch(setActivePath("home"));
                            router.visit(route("frontend.home"));
                        }}
                        className={`${
                            appSetting.activePath == "home"
                                ? `border-l-4 border-prime-500`
                                : `border-none`
                        } block  py-2 pl-3 pr-4 text-base font-medium text-prime-800 hover:text-prime-500 first-letter:uppercase`}
                    >
                        home
                    </DisclosureButton>
                    {map(
                        filter(pages, (e: Page) => e.menu),
                        (p: Page, i: number) => (
                            <DisclosureButton
                                as="button"
                                key={i}
                                onClick={() => {
                                    dispatch(setActivePath(p.slug));
                                    router.visit(p.slug);
                                }}
                                className={`${
                                    appSetting.activePath == p.slug
                                        ? `border-l-4 border-prime-500`
                                        : `border-none`
                                } block  py-2 pl-3 pr-4 text-base font-medium text-prime-800 hover:text-prime-500 first-letter:uppercase`}
                            >
                                {p.name}
                            </DisclosureButton>
                        ),
                    )}
                    <DisclosureButton
                        as="button"
                        onClick={() => {
                            dispatch(setActivePath("fees"));
                            router.visit(
                                route("frontend.{slug}.index", {
                                    slug: "fees",
                                }),
                            );
                        }}
                        className={`${
                            appSetting.activePath == "fees"
                                ? `border-l-4 border-prime-500`
                                : `border-none`
                        } block  py-2 pl-3 pr-4 text-base font-medium text-prime-800 hover:text-prime-500 first-letter:uppercase`}
                    >
                        fees
                    </DisclosureButton>
                    <DisclosureButton
                        as="button"
                        onClick={() => {
                            dispatch(setActivePath("contact"));
                            router.visit(route("frontend.contactus"));
                        }}
                        className={`${
                            appSetting.activePath == "contact"
                                ? `border-l-4 border-prime-500`
                                : `border-none`
                        } block  py-2 pl-3 pr-4 text-base font-medium text-prime-800 hover:text-prime-500 first-letter:uppercase`}
                    >
                        contact
                    </DisclosureButton>
                    <DisclosureButton
                        as="a"
                        href={loginURL}
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-prime-400  "
                    >
                        Login
                    </DisclosureButton>
                    <DisclosureButton
                        as="a"
                        href={registerURL}
                        className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-prime-300  "
                    >
                        Sign up
                    </DisclosureButton>
                    {auth?.user && auth.user.is_admin ? (
                        <DisclosureButton
                            as="a"
                            href={route("backend.dashboard")}
                            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-prime-400  "
                        >
                            Dashboard
                        </DisclosureButton>
                    ) : (
                        <DisclosureButton
                            as="a"
                            href={route("login")}
                            className="hidden flex flex-row justify-between items-center  w-full border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-prime-400  "
                        >
                            <span>CP Login</span>
                            <ChevronRight className="text-gray-600 w-6 h-6" />
                        </DisclosureButton>
                    )}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}

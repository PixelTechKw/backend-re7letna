import { PageProps } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { getImage } from "@/constants";
import { useAppDispatch } from "@/redux/hooks";
import { setActivePath } from "@/redux/slices/appSettingSlice";

export default function Welcome({
    auth,
    laravelVersion,
    isDev,
}: PageProps<{ laravelVersion: string; isDev: boolean }>) {
    const dispatch = useAppDispatch();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        dispatch(setActivePath("root"));
    }, []);
    return (
        <>
            <Head title="re7letna" />
            <div className=" text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute hidden -left-20 top-0 max-w-[877px]"
                    src="https://laravel.com/assets/img/welcome/background.svg"
                />
                <header className=" absolute inset-x-0 top-0 z-50">
                    <nav
                        aria-label="Global"
                        className="flex items-center justify-between p-6 lg:px-8"
                    >
                        <div className="flex lg:flex-1">
                            <Link
                                onClick={() => dispatch(setActivePath("home"))}
                                href={route("frontend.home")}
                                className="-m-1.5 p-1.5"
                            >
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt=""
                                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon
                                    aria-hidden="true"
                                    className="size-6"
                                />
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            {/* {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm/6 font-semibold text-gray-900"
                                >
                                    {item.name}
                                </a>
                            ))} */}
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <Link
                                href={route("login")}
                                className="text-sm/6 font-semibold text-gray-900"
                            >
                                Log in <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </nav>
                    <Dialog
                        open={mobileMenuOpen}
                        onClose={setMobileMenuOpen}
                        className="lg:hidden"
                    >
                        <div className="hidden fixed inset-0 z-50" />
                        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">
                                        Your Company
                                    </span>
                                    <img
                                        alt=""
                                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                                        className="h-8 w-auto"
                                    />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon
                                        aria-hidden="true"
                                        className="size-6"
                                    />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {/* {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </a>
                                        ))} */}
                                    </div>
                                    <div className="py-6">
                                        <Link
                                            href={route("login")}
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            Log in
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </Dialog>
                </header>

                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#f4fc5a] to-[#f6e526] opacity-80 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        />
                    </div>

                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="w-full flex justify-center items-center my-6">
                            <Link
                                onClick={() => dispatch(setActivePath("home"))}
                                href={route("frontend.home")}
                            >
                                <img
                                    id="background"
                                    className="w-40 h-auto"
                                    src={getImage("logo.png")}
                                />
                            </Link>
                        </div>

                        <div className="text-center">
                            <h1 className="text-balance text-5xl font-semibold tracking-tight text-prime-600 sm:text-7xl capitalize">
                                re7letna
                            </h1>
                            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8"></p>
                            <div className="hidden mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-prime-default px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-prime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Get started
                                </a>
                                <a
                                    href="#"
                                    className="text-sm/6 font-semibold text-gray-900"
                                >
                                    Learn more <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div
                                className={`relative rounded-full px-3 py-1 text-sm/6 ${
                                    isDev ? `text-gray-600` : `text-second-600`
                                } ring-1 ring-gray-900/10 hover:ring-gray-900/20`}
                            >
                                Helping Disabled.
                            </div>
                        </div>
                    </div>
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    >
                        <div
                            style={{
                                clipPath:
                                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            }}
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#f1fc57] to-[#b7ff00] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

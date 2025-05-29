import {getImage} from '@/constants';
import {useAppDispatch} from '@/redux/hooks';
import {setActivePath} from '@/redux/slices/appSettingSlice';
import {Link, usePage} from '@inertiajs/react';
import {filter, map} from 'lodash';
import SocialIcons from './SocialIcons';

export default function () {
    const {settings} = usePage().props;
    const dispatch = useAppDispatch();

    return (
        <footer className="">
            <div className="flex  flex-col justify-center items-center space-y-8 mx-auto max-w-6xl bg-prime-600 rounded-2xl overflow-hidden px-6 py-10 sm:py-14 lg:px-8">
                <div>
                    <img
                        src={settings.thumb}
                        className="w-32 h-auto object-contain rounded-md"
                    />
                </div>
                <div className="mt-16 flex justify-center gap-x-10">
                    <SocialIcons />
                </div>
                <nav
                    aria-label="Footer"
                    className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6 w-full xl:w-1/2 capitalize "
                >
                    <div className="grid grid-cols-3 xl:gap-4">
                        <div className=" ">
                            <h3 className="text-sm/6 font-semibold text-white">
                                Services
                            </h3>
                            <ul role="list" className="mt-6 space-y-4">
                                <li>
                                    <Link
                                        onClick={() =>
                                            dispatch(setActivePath('home'))
                                        }
                                        href={'home'}
                                        className={`${
                                            settings.activePath == 'home'
                                                ? `border-b border-white`
                                                : `border-none`
                                        }  text-white hover:text-white`}
                                    >
                                        home
                                    </Link>
                                </li>
                                {/* {map(
                                    filter(pages, (e: Page) => e.footer),
                                    (p: Page, i: number) => (
                                        <li key={i}>
                                            <Link
                                                onClick={() =>
                                                    dispatch(
                                                        setActivePath(p.slug)
                                                    )
                                                }
                                                href={p.slug}
                                                className={`${
                                                    settings.activePath ==
                                                    p.slug
                                                        ? `border-b border-white`
                                                        : `border-none`
                                                }  text-white hover:text-white`}
                                            >
                                                {p.name}
                                            </Link>
                                        </li>
                                    )
                                )} */}
                            </ul>
                        </div>
                        <div className=" ">
                            <div className=" ">
                                <h3 className="text-sm/6 font-semibold text-white">
                                    Resources
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link
                                            onClick={() =>
                                                dispatch(setActivePath('fees'))
                                            }
                                            href={`fees`}
                                            className={`${
                                                settings.activePath == 'fees'
                                                    ? `border-b border-white`
                                                    : `border-none`
                                            }  text-white hover:text-white`}
                                        >
                                            Fees
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={() =>
                                                dispatch(
                                                    setActivePath('contact'),
                                                )
                                            }
                                            href={route('frontend.contactus')}
                                            className={`${
                                                settings.activePath == 'contact'
                                                    ? `border-b border-white`
                                                    : `border-none`
                                            }  text-white hover:text-white`}
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={() =>
                                                dispatch(setActivePath('faqs'))
                                            }
                                            href={`faqs`}
                                            className={`${
                                                settings.activePath == 'faqs'
                                                    ? `border-b border-white`
                                                    : `border-none`
                                            }  text-white hover:text-white`}
                                        >
                                            FAQs
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={() =>
                                                dispatch(setActivePath('terms'))
                                            }
                                            href={`terms`}
                                            className={`${
                                                settings.activePath == 'terms'
                                                    ? `border-b border-white`
                                                    : `border-none`
                                            }  text-white hover:text-white`}
                                        >
                                            terms
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            onClick={() =>
                                                dispatch(
                                                    setActivePath('aboutus'),
                                                )
                                            }
                                            href={`aboutus`}
                                            className={`${
                                                settings.activePath == 'aboutus'
                                                    ? `border-b border-white`
                                                    : `border-none`
                                            }  text-white hover:text-white`}
                                        >
                                            about us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className=" ">
                            <div className=" ">
                                <h3 className="text-sm/6 font-semibold text-white">
                                    contact us
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <a
                                            href={settings.map_url}
                                            className="text-white"
                                        >
                                            {settings.address}
                                        </a>
                                    </li>
                                    <li className="flex flex-row justify-start items-center gap-x-3">
                                        {/* <InboxIcon className="text-white w-5 h-5" /> */}
                                        <a
                                            href={`mailto: ${settings.email}`}
                                            className="text-white !lowercase"
                                        >
                                            {settings.email}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="flex flex-col w-full justify-center items-center gap-y-6">
                    <div className="w-full border-b border-gray-100 border-opacity-20 pb-4">
                        {/* <p className=" text-center text-sm/6 text-white ">
                            &copy; 2025 {settings.name}, Inc. All rights
                            reserved. (v.1)
                        </p> */}
                    </div>
                    <div className="">
                        <img
                            src={getImage(`camb.png`)}
                            className="w-80 h-20 object-contain"
                        />
                    </div>
                    <div>
                        <p className="text-center text-xs text-white "></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

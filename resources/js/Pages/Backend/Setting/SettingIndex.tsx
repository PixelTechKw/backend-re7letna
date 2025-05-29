import {getFile} from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {PageProps} from '@/types';
import {PaperClipIcon} from '@heroicons/react/20/solid';
import {Link} from '@inertiajs/react';
import DOMPurify from 'isomorphic-dompurify';
import { capitalize } from 'lodash';
import {Download} from 'lucide-react';

export default function ({element}: PageProps) {
    return (
        <AuthenticatedLayout header={capitalize("settings")}>
            <div className="w-full flex flex-1 flex-col bg-white  rounded-xl min-h-screen gap-y-4 p-6">
                <div className="flex justify-between items-center">
                    <div className="header-one capitalize">
                        Website Information & Settings
                    </div>
                    <Link
                        href={route("backend.setting.edit", { id: element.id })}
                        className="btn-default capitalize"
                    >
                        edit settings
                    </Link>
                </div>
                <div className="mt-6">
                    <dl className="grid grid-cols-1 sm:grid-cols-3 capitalize">
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                name (for seo)
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {element.name}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                caption (seo)
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {element.caption}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {element.email}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                logo
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                <img
                                    src={element.thumb}
                                    className="w-10 h-10 object-contain"
                                />
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                description (seo use)
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {element.description}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                whatsapp
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {element.whatsapp}
                            </dd>
                        </div>
                        {element.youtube && (
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    youtube
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                    {element.youtube}
                                </dd>
                            </div>
                        )}
                        {element.facebook && (
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    facebook
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                    {element.facebook}
                                </dd>
                            </div>
                        )}
                        {element.twitter && (
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    twitter
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                    {element.twitter}
                                </dd>
                            </div>
                        )}
                        {element.instgram && (
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    instgram
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                    {element.instgram}
                                </dd>
                            </div>
                        )}
                        {element.linked && (
                            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                                <dt className="text-sm/6 font-medium text-gray-900">
                                    linked
                                </dt>
                                <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                    {element.linked}
                                </dd>
                            </div>
                        )}
                        <div className="col-span-full border-t border-gray-100 px-4 py-6  sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                About
                            </dt>
                            <dd
                                className="mt-1 text-sm/6 text-gray-700 sm:mt-2 truncate"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(element.aboutus),
                                }}
                            ></dd>
                        </div>
                        <div className="col-span-full border-t border-gray-100 px-4 py-6  sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Policy
                            </dt>
                            <dd
                                className="mt-1 text-sm/6 text-gray-700 sm:mt-2 truncate"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(element.policy),
                                }}
                            ></dd>
                        </div>
                        <div className="col-span-full border-t border-gray-100 px-4 py-6  sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Terms & Conditions
                            </dt>
                            <dd
                                className="mt-1 text-sm/6 text-gray-700 sm:mt-2 truncate"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(
                                        element.terms_and_conditions,
                                    ),
                                }}
                            ></dd>
                        </div>
                    </dl>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

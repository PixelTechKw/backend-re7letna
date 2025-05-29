import {useAppSelector} from '@/redux/hooks';
import {PageProps} from '@/types';
import {usePage} from '@inertiajs/react';
import {InstagramLogoIcon, TwitterLogoIcon} from '@radix-ui/react-icons';
import {
    FaFacebook,
    FaLinkedin,
    FaTelegram,
    FaTiktok,
    FaYoutube,
} from 'react-icons/fa';

export default function () {
    const {settings}: any = usePage().props;
    return (
        <div>
            <div className="flex flex-wrap justify-center gap-6">
                {settings.facebook && (
                    <a
                        target="blank"
                        href={settings.facebook}
                        className={`text-white hover:text-gray-500`}
                    >
                        <span className="sr-only">facebook</span>
                        <FaFacebook className="w-6 h-auto" />
                    </a>
                )}
                {settings.twitter && (
                    <a
                        target="blank"
                        href={settings.twitter}
                        className={`text-white hover:text-gray-500`}
                    >
                        <span className="sr-only">twitter</span>
                        <TwitterLogoIcon className="w-6 h-auto" />
                    </a>
                )}
                {settings.tiktok && (
                    <a
                        target="blank"
                        href={settings.tiktok}
                        className={`text-white hover:text-gray-500`}
                    >
                        <span className="sr-only">tiktok</span>
                        <FaTiktok className="w-6 h-auto" />
                    </a>
                )}
                {settings.telegram && (
                    <a
                        target="blank"
                        href={settings.telegram}
                        className={`text-white hover:text-gray-500`}
                    >
                        <span className="sr-only">telegram</span>
                        <FaTelegram className="w-6 h-auto" />
                    </a>
                )}
                {settings.youtube && (
                    <a
                        target="blank"
                        href={settings.youtube}
                        className={`text-white hover:text-gray-500`}
                    >
                        <span className="sr-only">linked</span>
                        <FaYoutube className="w-6 h-auto" />
                    </a>
                )}
                {settings.instagram && (
                    <a
                        target="blank"
                        href={settings.instagram}
                        className={`text-white hover:text-gray-500`}
                    >
                        <span className="sr-only">linked</span>
                        <InstagramLogoIcon className="w-6 h-auto" />
                    </a>
                )}
                {settings.linked && (
                    <a
                        target="blank"
                        href={settings.linked}
                        className={`text-white hover:text-gray-500`}
                    >
                        <span className="sr-only">linked</span>
                        <FaLinkedin className="w-6 h-auto" />
                    </a>
                )}
            </div>
        </div>
    );
}

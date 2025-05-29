import {baseUrl} from '@/constants';
import {PageProps} from '@/types';
import {Head, usePage} from '@inertiajs/react';
import {ReactNode} from 'react';

export default function ({
    title,
    description,
}: {
    title?: string | any;
    description?: string;
}): ReactNode {
    const {settings}: any = usePage().props;

    return (
        <Head>
            <title>{title ? title : settings.name}</title>
            <meta
                name="description"
                content={description ? description : settings.description}
            />
            <meta property="og:type" content={title ? title : settings.name} />
            <meta
                property="description"
                content={title ? title : settings.name}
            />
            <meta property="og:locale" content="en" />
            <meta
                property="og:site_name"
                content={title ? title : settings.name}
            />
            <meta property="og:url" content={baseUrl} />
            <meta property="og:title" content={title ? title : settings.name} />
            <meta
                property="og:description"
                content={description ? description : settings.description}
            />
            <meta property="og:image" content={settings.thumb} />
            <link
                rel="apple-touch-icon"
                sizes="57x57"
                href="/icons/icon-48x48.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="60x60"
                href="/icons/icon-48x48.png"
            />
            <link
                rel="apple-touch-icon"
                sizes="72x72"
                href="/icons/icon-96x96.png"
            />

            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/icons/icon-180x180.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="192x192"
                href="/icons/icon-180x180.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="256x256"
                href="/icons/icon-256x256.png"
            />

            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#3b2f86" />
            <meta
                name="msapplication-TileImage"
                content="/ms-icon-144x144.png"
            />
            <meta name="theme-color" content="#3b2f86"></meta>
            <link
                rel="icon"
                href={settings.thumb}
                type="image/png"
                sizes="any"
            />
            <link
                rel="apple-touch-icon"
                href={settings.thumb}
                type="image/png"
                sizes="any"
            />
            <meta
                property="og:image:alt"
                content={title ? title : settings.name}
            />
            <meta property="og:mobile" content={settings.mobile} />
            <meta property="og:whatsapp" content={settings.whatsapp} />
            <meta property="instagram:url" content={baseUrl} />
            <meta
                property="instagram:title"
                content={title ? title : settings.name}
            />
            <meta
                property="instagram:description"
                content={title ? title : settings.name}
            />
            <meta property="instagram:image" content={settings.thumb} />
            <meta property="twitter:url" content={baseUrl} />
            <meta
                property="twitter:title"
                content={title ? title : settings.name}
            />
            <meta
                property="twitter:description"
                content={title ? title : settings.name}
            />
            <meta property="twitter:image" content={settings.thumb} />
            <meta property="facebook:url" content={baseUrl} />
            <meta
                property="facebook:title"
                content={title ? title : settings.name}
            />
            <meta
                property="facebook:description"
                content={title ? title : settings.name}
            />
            <meta property="facebook:image" content={settings.thumb} />
            <meta property="og:type" content={title ? title : settings.name} />
            <meta
                property="description"
                content={description ? description : settings.description}
            />
            <meta property="og:locale" content={'en'} />
            <meta
                property="og:site_name"
                content={title ? title : settings.name}
            />
            <meta property="og:url" content={baseUrl} />
            <meta property="og:title" content={title ? title : settings.name} />
            <meta
                property="og:description"
                content={title ? title : settings.name}
            />
            <meta property="og:image" content={settings.thumb} />
            <meta
                property="og:image:alt"
                content={title ? title : settings.name}
            />
            <meta property="og:mobile" content={settings.mobile} />
            <meta property="og:whatsapp" content={settings.whatapp} />
            <meta
                property="instagram:url"
                content={title ? title : settings.name}
            />
            <meta
                property="instagram:title"
                content={title ? title : settings.name}
            />
            <meta
                property="instagram:description"
                content={title ? title : settings.name}
            />
            <meta property="instagram:image" content={settings.thumb} />
            <meta property="twitter:url" content={baseUrl} />
            <meta
                property="twitter:title"
                content={title ? title : settings.name}
            />
            <meta
                property="twitter:description"
                content={title ? title : settings.name}
            />
            <meta property="twitter:image" content={settings.thumb} />
            <meta property="facebook:url" content={baseUrl} />
            <meta
                property="facebook:title"
                content={title ? title : settings.name}
            />
            <meta
                property="facebook:description"
                content={title ? title : settings.name}
            />
            {/* <meta
                http-equiv="Content-Security-Policy"
                content="upgrade-insecure-requests"
            ></meta> */}
        </Head>
    );
}

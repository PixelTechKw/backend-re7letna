import { Link } from "@inertiajs/react";
import { has, isEmpty, isNull, map } from "lodash";

type Props = {
    links: any;
};

export default function ({ links }: Props): React.ReactNode {
    function getClassName(active: boolean) {
        if (active) {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-prime-200 focus:border-primary focus:text-primary bg-prime-600 text-white hover:text-gray-900 capitalize";
        } else {
            return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-prime-light hover:text-gray-900 focus:border-primary focus:text-primary capitalize";
        }
    }

    return (
        <>
            {!isEmpty(links) && (
                <div className="bg-white my-6 rounded-xl drop-shadow-md">
                    <div className="flex flex-wrap  justify-center items-center gap-x-2 px-2 py-4 ">
                        {links &&
                            map(links, (link: any, i) =>
                                has(link, "url") && isNull(link.url) ? (
                                    <div
                                        key={i}
                                        className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded capitalize"
                                    >
                                        {link.label == "Next &raquo;"
                                            ? "next"
                                            : link.label == "&laquo; Previous"
                                            ? "previous"
                                            : link.label}
                                    </div>
                                ) : (
                                    <Link
                                        preserveScroll
                                        key={i}
                                        className={getClassName(link.active)}
                                        href={link.url}
                                    >
                                        {link.label == "Next &raquo;"
                                            ? "next"
                                            : link.label == "&laquo; Previous"
                                            ? "previous"
                                            : link.label}
                                    </Link>
                                )
                            )}
                    </div>
                </div>
            )}
        </>
    );
}

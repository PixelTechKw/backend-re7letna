import {Section} from '@/types';
import DOMPurify from 'isomorphic-dompurify';

export default function ({section}: {section: Section}) {
    return (
        <div className=" px-6 pt-16 xl:px-0 grid grid-cols-1">
            <div className="order-1 xl:order-1 mx-auto  text-center">
                <div
                    className="my-4  leading-loose first-letter:uppercase max-sm:text-left max-sm:text-balance max-sm:break-normal"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(section.content),
                    }}
                ></div>
            </div>
            <div className="order-2 xl:order-3 mx-auto mt-4 sm:mt-4 lg:mt-4 lg:max-w-none">
                <img
                    alt={section.title}
                    src={section.thumb}
                    className="w-full h-[500px] object-contain rounded-xl"
                />
            </div>
            {section.display_btn ? (
                <div className="order-3 xl:order-2 mx-auto mt-6 flex justify-center">
                    <a
                        href={section.btn_url}
                        className="btn-default px-14 first-letter:uppercase"
                    >
                        {section.btn_label}
                    </a>
                </div>
            ) : null}
        </div>
    );
}

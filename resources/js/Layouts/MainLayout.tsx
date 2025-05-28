import "moment/dist/locale/ar";
import React from "react";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
    children: React.ReactNode;
};
export default function ({ children }: Props): React.ReactNode {
    return (
        <div
            className={`w-full  min-h-screen mx-auto  bg-gray-50 font-expo-medium`}
            // className={`w-full  min-h-screen mx-auto  bg-gray-50 suissie-medium`}
        >
            {children}
            <ToastContainer
                position={"top-right"}
                toastClassName={` opacity-90`}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Slide}
                limit={1}
            />
        </div>
    );
}

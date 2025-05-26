import Modal from "@/Components/Modal";
import { getIcon } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleshowDeleteModal } from "@/redux/slices/appSettingSlice";
import { Button } from "@/shadcn/ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { router, usePage } from "@inertiajs/react";
import { isNull } from "lodash";

export default function () {
    const {
        settings: {
            deleteModal: { showDeleteModal, element },
        },
    } = useAppSelector((state) => state);
    const {
        auth: {
            user: { token },
        },
    } = usePage().props;
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        router.delete(
            route(`backend.${element.name}.destroy`, {
                id: element?.id,
            }),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                preserveScroll: true,
                onFinish: () => closeModal(),
            }
        );
    };

    const closeModal = () => dispatch(toggleshowDeleteModal(null));

    return (
        <Modal
            show={showDeleteModal}
            onClose={() => closeModal()}
            maxWidth="lg"
        >
            <div className="flex flex-col w-full justify-start items-center gap-y-4 py-8">
                <div className="flex flex-row justify-center items-center">
                    <XMarkIcon
                        onClick={() => closeModal()}
                        className="absolute left-6  top-10 mx-3 w-6 h-6 text-gray-600"
                    />
                </div>
                <div className="flex flex-col justify-center items-center gap-y-6">
                    <img
                        src={getIcon("delete-illustration.svg")}
                        className="w-60 h-60 object-cover"
                    />
                    {!isNull(element) && (
                        <div className="header-one capitalize">
                            confirm delete this element ?
                        </div>
                    )}
                </div>
                <div className="flex flex-row justify-center items-center gap-x-6 mt-4">
                    <Button
                        variant={"outline"}
                        className="rounded-full border-red-600 capitalize py-4 px-6 hover:bg-red-100"
                        onClick={() => handleDelete()}
                    >
                        delete
                    </Button>
                    <Button
                        onClick={() => closeModal()}
                        variant={"outline"}
                        className="rounded-full border-green-600 capitalize py-4 px-6 hover:bg-green-100"
                    >
                        cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

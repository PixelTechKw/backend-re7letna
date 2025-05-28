import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { TextEditor } from "@/Components/TextEditor";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { PageProps } from "@/types";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { get } from "lodash";
import { ArrowLeft, UploadIcon } from "lucide-react";
import { ChangeEvent, FormEventHandler } from "react";

interface FormProps {
    name: string;
    role?: string;
    image: string;
    [key: string]: any;
}

export default function ({
    element,
    currentRouteName,
}: PageProps): React.ReactNode {
    const {
        ziggy: { query },
    }: any = usePage().props;
    const { data, setData, post, processing, errors, transform, reset }: any =
        useForm<FormProps>({
            name: element.name,
            role: element.role,
            image: element.image,
        });

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ): void => {
        setData((values: any) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(
            route(`backend.member.update`, element.id),
            {
                _method: "put",
                ...data,
            },
            {
                forceFormData: true,
                preserveScroll: true,
            }
        );
    };

    return (
        <AuthenticatedLayout>
            <form onSubmit={submit} className={`flex flex-1 flex-col gap-y-2 `}>
                <section className="flex flex-col w-full bg-white p-4 gap-y-4 rounded-xl my-1">
                    <div className="flex flex-row gap-x-4 justify-start items-center capitalize">
                        <Link
                            href={route("backend.member.index")}
                            className="p-4 bg-gray-100 border border-gray-200 rounded-2xl"
                        >
                            <ArrowLeft />
                        </Link>
                        <div className="header-one my-4">edit member</div>
                    </div>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value={"name"}
                                    className="required capitalize"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    required
                                    aria-required
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    defaultValue={data.name}
                                    className="block w-full px-4 py-2 mt-2 "
                                />
                                <InputError
                                    message={get(errors, "name")}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* main_details */}
                <section className="flex flex-col w-full bg-white p-4 py-8 rounded-xl my-1">
                    <div className="header-one my-4">main details</div>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                        {/* image */}
                        <div className="col-span-full mb-2">
                            <label className="required">Image</label>
                            <div className="flex w-full flex-col justify-center items-center border border-gray-200 rounded-2xl bg-transparent">
                                <Label
                                    htmlFor="file"
                                    className="w-full flex flex-row flex-1 px-3 justify-between items-center relative top-4 z-0"
                                >
                                    <div className="normal-text text-prime-700">
                                        {data.image
                                            ? data.image.name
                                            : "upload your image"}
                                    </div>
                                    <UploadIcon className="size-8 text-gray-400" />
                                </Label>
                                <Input
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        e.target.files
                                            ? setData(
                                                  "image",
                                                  e.target.files[0]
                                              )
                                            : null;
                                    }}
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept="image/jpg, image/jpeg , image/png"
                                    className="border-none shadow-none bg-transparent focus:border-none focus:ring-0 !text-white placeholder:text-white opacity-0"
                                />
                            </div>
                            <InputError
                                message={get(errors, "image")}
                                className="mt-2"
                            />
                            <img
                                src={element.thumb}
                                className="object-contain  h-28 w-auto"
                            />
                        </div>
                        {/* role */}
                        <div className="col-span-full">
                            <InputLabel
                                htmlFor="role"
                                value="role"
                                className="capitalize pb-4 required"
                            />
                            <TextEditor
                                name="role"
                                setData={setData}
                                data={data}
                                defaultValue={data.role}
                            />
                            <InputError
                                message={get(errors, "role")}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-end items-end w-full gap-x-4 my-6">
                        <Link
                            href={route(`backend.member.index`)}
                            className="text-center  rounded-3xl p-3 px-6 w-24 border border-prime-700 text-prime-700 hover:border-red-700 hover:text-red-700 capitalize"
                            disabled={processing}
                        >
                            cancel
                        </Link>
                        <button
                            className="text-center  rounded-3xl p-3 px-6 w-24 bg-prime-700 text-white hover:bg-prime-900 capitalize"
                            disabled={processing}
                        >
                            save
                        </button>
                    </div>
                </section>
                {/* more_details */}
            </form>
        </AuthenticatedLayout>
    );
}

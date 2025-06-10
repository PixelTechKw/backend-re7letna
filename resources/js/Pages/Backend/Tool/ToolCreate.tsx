import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { getIcon } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Link, useForm, usePage } from "@inertiajs/react";
import { capitalize, get } from "lodash";
import { ArrowLeft } from "lucide-react";
import { ChangeEvent, FormEventHandler } from "react";
import { ReactSVG } from "react-svg";

interface FormProps {
    name: string;
    description: string;
    image: string;
    order: string | number;
    active: boolean;
    [key: string]: any;
}

export default function (): React.ReactNode {
    const {
        ziggy: { query },
    }: any = usePage().props;
    const { data, setData, post, processing, errors, transform, reset }: any =
        useForm<FormProps>({
            name: "",
            description: "",
            image: "",
            active: true,
            order: 1,
        });

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>,
    ): void => {
        setData((values: any) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(
            route(`backend.tool.store`),
            { data },
            {
                forceFormData: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <AuthenticatedLayout header={capitalize("create tool")}>
            <form onSubmit={submit} className={`flex flex-1 flex-col gap-y-2 `}>
                <section className="flex flex-col w-full bg-white p-4 gap-y-4 rounded-xl my-1">
                    <div className="flex flex-row gap-x-4 justify-start items-center capitalize">
                        <Link
                            href={route("backend.tool.index")}
                            className="p-4 bg-gray-100 border border-gray-200 rounded-2xl"
                        >
                            <ArrowLeft />
                        </Link>
                        <div className="header-one my-4">create tool</div>
                    </div>
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {/* name */}
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

                        {/* image */}
                        <div className="col-span-full mb-2 flex flex-row justify-between items-center">
                            <div className="w-1/4">
                                <InputLabel htmlFor="image" value={"image"} />
                            </div>
                            <div className="flex w-3/4 h-28 flex-col justify-center items-center border border-gray-300 rounded-2xl bg-transparent">
                                <Label
                                    htmlFor="image"
                                    className="w-full flex flex-1 flex-col justify-center items-center relative top-4 z-0 gap-y-4"
                                >
                                    <ReactSVG
                                        src={getIcon("download.svg")}
                                        className="h-8 w-8 p-2 text-gray-500 border border-gray-200 rounded-xl"
                                    />
                                    <div className="text-lg text-prime-600">
                                        click here to upload your image
                                    </div>
                                </Label>
                                <Input
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        e.target.files
                                            ? setData(
                                                  "image",
                                                  e.target.files[0],
                                              )
                                            : null;
                                    }}
                                    type="file"
                                    name="image"
                                    id="image"
                                    required
                                    accept="image/jpg, image/jpeg , image/png"
                                    className="h-20 border-none shadow-none bg-transparent focus:border-none focus:ring-0 !text-white placeholder:text-white opacity-0"
                                />
                            </div>
                            <InputError
                                message={get(errors, "image")}
                                className="mt-2"
                            />
                        </div>
                        <div className="col-span-1 capitalize">
                            <InputLabel
                                htmlFor="active"
                                aria-required
                                value="status"
                            />
                            <div className="flex w-60 flex-row gap-4 py-4">
                                <input
                                    id="active"
                                    name="active"
                                    type="radio"
                                    value={1}
                                    onChange={handleChange}
                                    defaultChecked={data.active}
                                    className=" text-prime-700 bg-white border border-prime-300 rounded-full "
                                />
                                <span>active</span>
                                <input
                                    id="active"
                                    name="active"
                                    type="radio"
                                    value={0}
                                    onChange={handleChange}
                                    defaultChecked={!data.active}
                                    className=" text-prime-700 bg-white border border-prime-300 rounded-full "
                                />
                                <span>inactive</span>
                            </div>
                            <InputError
                                message={get(errors, "active")}
                                className="mt-2"
                            />
                        </div>
                        {/* description */}
                        <div className="col-span-full">
                            <InputLabel
                                htmlFor="description"
                                value="description"
                                className="capitalize pb-4 "
                            />
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                maxLength={1000}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                defaultValue={data.description}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 rounded-xl border border-gray-200 focus:border-none focus:ring focus:ring-prime-700"
                            />
                            <InputError
                                message={get(errors, "description")}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-end items-end w-full gap-x-4 my-6">
                        <Link
                            href={route(`backend.tool.index`)}
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
            </form>
        </AuthenticatedLayout>
    );
}

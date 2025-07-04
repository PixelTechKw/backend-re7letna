import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { TextEditor } from "@/Components/TextEditor";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Child, Gender, PageProps } from "@/types";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { capitalize, get, map } from "lodash";
import { ArrowLeft, UploadIcon } from "lucide-react";
import moment from "moment";
import { ChangeEvent, FormEventHandler } from "react";
import Select from "react-select";

interface FormProps {
    name: string;
    disability: string;
    notes: string;
    gender: Gender;
    dob: string;
    user_id: string;

    [key: string]: any;
}

export default function ({ element, genders }: PageProps): React.ReactNode {
    const {
        ziggy: { query },
    } = usePage().props;
    const { data, setData, post, processing, errors, transform, reset }: any =
        useForm<FormProps>({
            name: element.name,
            disability: element.disability,
            notes: element.notes,
            gender: element.gender,
            dob: moment(element.dob, "YYYY-MM-DD")
                .locale("en")
                .format("YYYY-MM-DD"),
            user_id: element.user_id,
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
        router.post(
            route(`backend.child.update`, element.id),
            {
                _method: "put",
                ...data,
            },
            {
                forceFormData: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <AuthenticatedLayout header={capitalize("edit child")}>
            <form onSubmit={submit} className={`flex flex-1 flex-col gap-y-2 `}>
                <section className="flex flex-col w-full bg-white p-4 gap-y-4 rounded-xl my-1">
                    <div className="flex flex-row gap-x-4 justify-start items-center capitalize">
                        <Link
                            href={route("backend.child.index", {
                                user_id: element.user_id,
                            })}
                            className="p-4 bg-gray-100 border border-gray-200 rounded-2xl"
                        >
                            <ArrowLeft />
                        </Link>
                        <div className="header-one my-4">edit child</div>
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
                        {/* dob */}
                        <div className="col-span-1">
                            <InputLabel
                                htmlFor="dob"
                                value="Date of Birth"
                                className="pb-2 capitalize required"
                            />
                            <TextInput
                                id="dob"
                                name="dob"
                                type="date"
                                required
                                aria-required
                                onChange={(e) => handleChange(e)}
                                value={data.dob}
                                className="block w-full px-4 py-2 mt-2 rounded-tr-xl"
                            />
                            <InputError
                                message={get(errors, "dob")}
                                className="mt-2"
                            />
                        </div>
                        {/* gender */}
                        <div className="col-span-1">
                            <InputLabel
                                htmlFor="gender"
                                value="gender"
                                className="capitalize required"
                            />
                            <Select
                                name="gender"
                                isMulti={false}
                                options={map(genders, (c: any, i: number) => {
                                    return {
                                        label: c,
                                        value: c,
                                    };
                                })}
                                onChange={(e: any) => {
                                    setData("gender", e.value);
                                }}
                                defaultValue={{
                                    label: data.gender,
                                    value: data.gender,
                                }}
                                className="basic-multi-select pt-2 capitalize"
                                classNamePrefix="select select-box capitalize"
                                placeholder="gender"
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        borderColor: state.isFocused
                                            ? "#75641F"
                                            : "lightgrey",
                                        borderRadius: 10,
                                        padding: 8,
                                    }),
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: "#C5A835",
                                        primary: "#C5A835",
                                        dangerLight: "#C5A835",
                                    },
                                })}
                            />
                            <InputError
                                message={get(errors, "gender")}
                                className="mt-2"
                            />
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="disability"
                                    value={"disability"}
                                    className="capitalize"
                                />
                                <TextInput
                                    id="disability"
                                    name="disability"
                                    onChange={(e) =>
                                        setData("disability", e.target.value)
                                    }
                                    defaultValue={data.disability}
                                    className="block w-full px-4 py-2 mt-2 "
                                />
                                <InputError
                                    message={get(errors, "disability")}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="notes"
                                    value={"notes"}
                                    className="capitalize"
                                />
                                <TextInput
                                    id="notes"
                                    name="notes"
                                    onChange={(e) =>
                                        setData("notes", e.target.value)
                                    }
                                    defaultValue={data.notes}
                                    className="block w-full px-4 py-2 mt-2 "
                                />
                                <InputError
                                    message={get(errors, "notes")}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end items-end w-full gap-x-4 my-6">
                        <Link
                            href={route(`backend.child.index`)}
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

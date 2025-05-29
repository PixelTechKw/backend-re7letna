import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { capitalize, get, map } from "lodash";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import { FormEventHandler } from "react";
import Select from "react-select";

interface FormProps {
    name: string;
    email: string;
    mobile: string;
    gender: "male" | "female";
    active: boolean;
    dob: string;
    [key: string]: any;
}

export default function ({
    element,

    genders,
}: PageProps): React.ReactNode {
    const {
        auth,
        ziggy: { query },
    }: any = usePage().props;
    const { data, setData, post, processing, errors, transform, reset }: any =
        useForm<FormProps>({
            name: element.name,
            email: element.email,
            mobile: element.mobile,
            gender: element.gender,
            active: element.active,
            dob: moment(element.dob, "DD/MM/YYYY")
                .locale("en")
                .format("YYYY-MM-DD"),
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
            route(`backend.user.update`, element.id),
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
        <AuthenticatedLayout header={capitalize("edit parent")}>
            <form onSubmit={submit} className={`flex flex-1 flex-col gap-y-2 `}>
                <section className="flex flex-col w-full bg-white p-4 gap-y-4 rounded-xl my-1">
                    <div className="flex flex-row gap-x-4 justify-start items-center capitalize">
                        <Link
                            href={route("backend.user.index")}
                            className="p-4 bg-gray-100 border border-gray-200 rounded-2xl"
                        >
                            <ArrowLeft />
                        </Link>
                        <div className="header-one my-4">edit parent</div>
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

                        {/* email */}
                        <div className="col-span-1">
                            <InputLabel
                                htmlFor="email"
                                value="email"
                                aria-required
                                className="required capitalize"
                            />
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                onChange={(e) => handleChange(e)}
                                value={data.email}
                                required
                                className="block w-full px-4 py-2 mt-2 lowercase"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        {/* mobile */}
                        <div className="col-span-1">
                            <InputLabel
                                htmlFor="mobile"
                                value="mobile"
                                aria-required
                                className=" capitalize"
                            />
                            <TextInput
                                id="mobile"
                                name="mobile"
                                onChange={(e) => handleChange(e)}
                                value={data.mobile}
                                className="block w-full px-4 py-2 mt-2 "
                            />
                            <InputError
                                message={errors.mobile}
                                className="mt-2"
                            />
                        </div>

                        {/* dob */}
                        <div className="col-span-1">
                            <InputLabel
                                htmlFor="dob"
                                value="Date of Birth"
                                className="pb-2"
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
                            {/* <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "h-12 w-full justify-between text-left font-normal",
                                            !data.dob && "text-muted-foreground"
                                        )}
                                    >
                                        {data.dob ? (
                                            moment(data.dob)
                                                .locale("en")
                                                .format("YYYY/MM/DD")
                                        ) : (
                                            <span>dob"</span>
                                        )}
                                        <CalendarIcon className="mx-3 h-4 w-4 text-gray-400" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={data.dob}
                                        onSelect={(e) =>
                                            setData(
                                                "dob",
                                                moment(e).locale("en").toDate()
                                            )
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover> */}
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
                                options={map(genders, (c: any, i) => {
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
                                            ? "#1422B5"
                                            : "lightgrey",
                                        borderRadius: 20,
                                        padding: 8,
                                    }),
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary25: "#5CBDAD",
                                        primary: "#5CBDAD",
                                        dangerLight: "#5CBDAD",
                                    },
                                })}
                            />
                            <InputError
                                message={get(errors, "gender")}
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
                    </div>
                    <div className="flex flex-row justify-end items-end w-full gap-x-4 my-6">
                        <Link
                            href={route(`backend.user.index`)}
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

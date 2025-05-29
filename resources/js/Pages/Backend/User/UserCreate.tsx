import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { generateRandomString } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import copy from "copy-to-clipboard";
import { get, map } from "lodash";
import { ArrowLeft, CopyCheckIcon } from "lucide-react";
import moment from "moment";
import { FormEventHandler, useEffect } from "react";
import Select from "react-select";

interface FormProps {
    name: string;

    email: string;
    mobile: string;
    password: string;
    password_confirmation: string;
    gender: "male" | "female";
    active: boolean;
    dob: string;
    [key: string]: any;
}

export default function ({ roles, genders }: PageProps): React.ReactNode {
    const {
        auth,
        ziggy: { query },
    }: any = usePage().props;
    const { toast } = useToast();
    const { data, setData, post, processing, errors, transform, reset }: any =
        useForm<FormProps>({
            name: "",
            email: "",
            mobile: "",
            password: "",
            password_confirmation: "",
            gender: "male",
            active: true,
            dob: moment().locale("en").add(-10, "years").format("YYYY-MM-DD"),
        });

    useEffect(() => {
        const pass = generateRandomString();
        setData("password", pass);
        setData("password_confirmation", pass);
    }, []);

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
            route(`backend.user.store`),
            { data },
            {
                forceFormData: true,
                preserveScroll: true,
            },
        );
    };

    const handleCopy = () => {
        copy(data.password);
        toast({
            variant: "default",
            description: "Password copied to clipboard.",
        });
    };

    return (
        <AuthenticatedLayout>
            <form onSubmit={submit} className={`flex flex-1 flex-col gap-y-2 `}>
                <section className="flex flex-col w-full bg-white p-4 gap-y-4 rounded-xl my-1">
                    <div className="flex flex-row gap-x-4 justify-start items-center capitalize">
                        <Link
                            href={route("backend.user.index")}
                            className="p-4 bg-gray-100 border border-gray-200 rounded-2xl"
                        >
                            <ArrowLeft />
                        </Link>
                        <div className="header-one my-4">create parent</div>
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

                        {/* password */}
                        <div className="col-span-1">
                            <InputLabel
                                htmlFor="password"
                                value="password"
                                aria-required
                                className="required capitalize"
                            />
                            <TextInput
                                id="password"
                                name="password"
                                type="password"
                                disabled
                                onChange={(e) => handleChange(e)}
                                value={data.password}
                                className="block w-full px-4 py-2 mt-2  disabled:bg-gray-100"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                                aria-required
                            />
                            <div className="text-gray-400 flex flex-row justify-between items-center gap-x-3 py-3">
                                <span className="first-letter:capitalize ">
                                    generated Password : {data.password}
                                </span>

                                <button
                                    onClick={() => handleCopy()}
                                    type="button"
                                >
                                    <CopyCheckIcon className="size-4" />
                                </button>
                            </div>
                        </div>
                        {/* password_confirmation */}
                        <div className="col-span-1 hidden">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="password_confirmation"
                                aria-required
                                className="required capitalize"
                            />
                            <TextInput
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                disabled
                                onChange={(e) => handleChange(e)}
                                value={data.password_confirmation}
                                className="block w-full px-4 py-2 mt-2 "
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
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
                                className="capitalize"
                            />
                            <TextInput
                                id="mobile"
                                name="mobile"
                                aria-required
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
                                            <span>dob</span>
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
                                    label: "male",
                                    value: "male",
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

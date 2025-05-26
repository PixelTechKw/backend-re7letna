import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/shadcn/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import { Checkbox } from "@/shadcn/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Link, useForm, usePage } from "@inertiajs/react";
import { get, map } from "lodash";
import moment from "moment";
import { FormEventHandler } from "react";
import Select from "react-select";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
    submitRoute,
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
    submitRoute: string;
}) {
    const {
        auth: { user },
        genders,
    }: any = usePage().props;
    const { toast } = useToast();
    const {
        data,
        setData,
        patch,
        errors,
        processing,
        recentlySuccessful,
    }: any = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        mobile: user.mobile,
        gender: user.gender,
        dob: moment(user.dob, "DD/MM/YYYY").locale("en").format("YYYY-MM-DD"),
        receive_campains: user.receive_campains,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (user.active) {
            patch(submitRoute);
        } else {
            toast({
                variant: "destructive",
                description: "you are not active user. please contact admin.",
            });
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel
                        htmlFor="first_name"
                        value="First Name"
                        className="required"
                    />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        required
                        isFocused
                        autoComplete="first_name"
                    />

                    <InputError className="mt-2" message={errors.first_name} />
                </div>
                <div>
                    <InputLabel
                        htmlFor="last_name"
                        value="last Name"
                        className="required capitalize"
                    />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        required
                        isFocused
                        autoComplete="last_name"
                    />

                    <InputError className="mt-2" message={errors.last_name} />
                </div>

                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                        className="required"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                {/* mobile */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="mobile"
                        value="mobile"
                        className=" capitalize"
                    />

                    <TextInput
                        id="mobile"
                        name="mobile"
                        value={data.mobile}
                        className="mt-1 block w-full "
                        autoComplete="mobile"
                        isFocused={true}
                        onChange={(e) => setData("mobile", e.target.value)}
                    />

                    <InputError message={errors.mobile} className="mt-2" />
                </div>

                {/* gender */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="gender"
                        value="gender"
                        className="required capitalize"
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

                {/* dob */}
                <div className="mt-4">
                    <InputLabel
                        htmlFor="dob"
                        value="Date of Birth"
                        className="required capitalize pb-3"
                    />
                    <TextInput
                        id="dob"
                        name="dob"
                        type="date"
                        required
                        aria-required
                        onChange={(e) => setData("dob", e.target.value)}
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
                                    <span>Date of Birth</span>
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
                    <InputError message={get(errors, "dob")} className="mt-2" />
                </div>

                <div className="items-top flex space-x-2 my-8">
                    <Checkbox
                        defaultChecked={data.receive_campains}
                        onCheckedChange={(e: any) =>
                            setData("receive_campains", e)
                        }
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Receive newsletter campains
                        </label>
                        <p className="text-sm text-muted-foreground">
                            Get all the latest courses'news and updates.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing || !user.active}>
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

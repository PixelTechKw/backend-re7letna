import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { TextEditor } from "@/Components/TextEditor";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { getIcon, getImage } from "@/constants";
import { useAppDispatch } from "@/redux/hooks";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { PageProps } from "@/types/index.d";
import { Link, router, useForm } from "@inertiajs/react";
import { capitalize, get } from "lodash";
import { ArrowLeft } from "lucide-react";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { ReactSVG } from "react-svg";
import "suneditor/dist/css/suneditor.min.css";

export default function ({ element }: PageProps) {
    const [currentImages, setCurrentImages] = useState([]);
    const dispatch = useAppDispatch();
    const { data, setData, post, put, processing, errors, transform, reset } =
        useForm({
            name: element.name,
            caption: element.caption,
            address: element.address,
            description: element.description,
            mobile: element.mobile,
            registratioin_no: element.registratioin_no,
            phone: element.phone,
            website: element.website,
            android: element.android,
            apple: element.apple,
            youtube: element.youtube,
            instagram: element.instagram,
            facebook: element.facebook,
            twitter: element.twitter,
            whatsapp: element.whatsapp,
            snapchat: element.snapchat,
            linked: element.linked,
            tiktok: element.tiktok,
            telegram: element.telegram,
            longitude: element.longitude,
            latitude: element.latitude,
            map_url: element.map_url,
            keywords: element.keywords,
            image: element.image,

            country: element.country,
            email: element.email,

            aboutus: element.aboutus,
            policy: element.policy,
            terms_and_conditions: element.terms_and_conditions,
        });

    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>,
    ): void => {
        setData((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(
            route(`backend.setting.update`, element.id),
            {
                _method: "put",
                ...data,
                image: data.image,
            },
            {
                forceFormData: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <AuthenticatedLayout header={capitalize("edit settings")}>
            <form
                onSubmit={submit}
                className={`flex flex-1 flex-col gap-y-2 capitalize`}
            >
                <section className="flex flex-col w-full bg-white p-4 gap-y-4 rounded-xl my-1">
                    <div className="flex flex-row gap-x-4 justify-start items-center capitalize">
                        <Link
                            href={route("backend.setting.index")}
                            className="p-4 bg-gray-100 border border-gray-200 rounded-2xl"
                        >
                            <ArrowLeft />
                        </Link>
                        <div className="header-one my-4">edit settings</div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {/*  name  */}
                        <div className="col-span-1">
                            <InputLabel
                                htmlFor="name"
                                value={"name (seo)"}
                                aria-required
                            />
                            <TextInput
                                defaultValue={element.name}
                                id="name"
                                name="name"
                                required
                                aria-required
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <InputError
                                message={get(errors, "name")}
                                className="mt-2"
                            />
                        </div>
                        {/*  caption  */}
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="caption"
                                    value={"caption"}
                                />
                                <TextInput
                                    defaultValue={element.caption}
                                    id="caption"
                                    name="caption"
                                    onChange={(e) =>
                                        setData("caption", e.target.value)
                                    }
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={get(errors, "caption")}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        {/* email */}
                        <div className="col-span-1">
                            <InputLabel
                                htmlFor="email"
                                value={"email"}
                                aria-required
                            />
                            <TextInput
                                id="email"
                                name="email"
                                type="email"
                                required
                                aria-required
                                onChange={(e) => handleChange(e)}
                                defaultValue={element.email}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <InputError
                                message={get(errors, "email")}
                                className="mt-2"
                            />
                        </div>
                        {/* whatsapp */}
                        <div className="col-span-1">
                            <InputLabel
                                htmlFor="whatsapp"
                                value={"whatsapp"}
                                aria-required
                            />
                            <TextInput
                                id="whatsapp"
                                name="whatsapp"
                                type="number"
                                aria-required
                                onChange={(e) => handleChange(e)}
                                required
                                defaultValue={element.whatsapp}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <InputError
                                message={get(errors, "whatsapp")}
                                className="mt-2"
                            />
                        </div>
                        {/* mobile */}
                        <div className="col-span-1">
                            <InputLabel
                                htmlFor="mobile"
                                value={"mobile"}
                                aria-required
                            />
                            <TextInput
                                id="mobile"
                                name="mobile"
                                required
                                onChange={(e) => handleChange(e)}
                                defaultValue={element.mobile}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <InputError
                                message={get(errors, "mobile")}
                                className="mt-2"
                            />
                        </div>
                        <div className="col-span-3">
                            <InputLabel
                                htmlFor="description"
                                value={"description (seo)"}
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
                        {/*  keywords  */}
                        <div className="col-span-1">
                            <div>
                                <InputLabel
                                    htmlFor="keywords"
                                    value={"keywords (seo)"}
                                />
                                <TextInput
                                    defaultValue={element.keywords}
                                    id="keywords"
                                    name="keywords"
                                    onChange={(e) =>
                                        setData("keywords", e.target.value)
                                    }
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={get(errors, "keywords")}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        {/* image */}
                        <div className="col-span-full mb-2 flex flex-row justify-between items-center">
                            <div className="w-1/4">
                                <InputLabel htmlFor="logo" value={"logo"} />
                                <img
                                    src={element.thumb}
                                    className="object-contain  h-28 w-auto"
                                />
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
                                    accept="image/jpg, image/jpeg , image/png"
                                    className="h-20 border-none shadow-none bg-transparent focus:border-none focus:ring-0 !text-white placeholder:text-white opacity-0"
                                />
                            </div>
                            <InputError
                                message={get(errors, "image")}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button className="btn-default" disabled={processing}>
                            save
                        </button>
                    </div>
                </section>
                {/* socials */}
                <section className="flex flex-col w-full bg-white p-4 gap-y-4 rounded-xl my-1">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                        contact us details
                    </h2>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {/* address */}
                        <div className="col-span-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="address"
                                    value={"address"}
                                    aria-required
                                />
                                <TextInput
                                    defaultValue={element.address}
                                    id="address"
                                    name="address"
                                    required
                                    aria-required
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={get(errors, "address")}
                                    className="mt-2"
                                />
                            </div>

                            {/* website */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="website"
                                    value={"website"}
                                />
                                <TextInput
                                    id="website"
                                    name="website"
                                    type="url"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.website}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.website}
                                    className="mt-2"
                                />
                            </div>
                            {/* facebook  */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="facebook"
                                    value={"facebook"}
                                />
                                <TextInput
                                    id="facebook"
                                    name="facebook"
                                    type="url"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.facebook}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.facebook}
                                    className="mt-2"
                                />
                            </div>
                            {/* instagram */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="instagram"
                                    value={"instagram"}
                                />
                                <TextInput
                                    id="instagram"
                                    name="instagram"
                                    type="url"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.instagram}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.instagram}
                                    className="mt-2"
                                />
                            </div>
                            {/* twitter */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="twitter"
                                    value={"twitter"}
                                />
                                <TextInput
                                    id="twitter"
                                    name="twitter"
                                    type="url"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.twitter}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.twitter}
                                    className="mt-2"
                                />
                            </div>
                            {/* apple */}
                            <div className="col-span-1">
                                <InputLabel htmlFor="apple" value={"apple"} />
                                <TextInput
                                    id="apple"
                                    name="apple"
                                    type="url"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.apple}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.apple}
                                    className="mt-2"
                                />
                            </div>
                            {/* linked */}
                            <div className="col-span-1">
                                <InputLabel htmlFor="linked" value={"linked"} />
                                <TextInput
                                    id="linked"
                                    name="linked"
                                    type="url"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.linked}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.linked}
                                    className="mt-2"
                                />
                            </div>
                            {/* snapchat */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="snapchat"
                                    value={"snapchat"}
                                />
                                <TextInput
                                    id="snapchat"
                                    name="snapchat"
                                    type="url"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.snapchat}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.snapchat}
                                    className="mt-2"
                                />
                            </div>
                            {/* youtube */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="youtube"
                                    value={"youtube"}
                                />
                                <TextInput
                                    id="youtube"
                                    name="youtube"
                                    type="url"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.youtube}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.youtube}
                                    className="mt-2"
                                />
                            </div>
                            {/* tiktok */}
                            <div className="col-span-1">
                                <InputLabel htmlFor="tiktok" value={"tiktok"} />
                                <TextInput
                                    id="tiktok"
                                    name="tiktok"
                                    type="url"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.tiktok}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.tiktok}
                                    className="mt-2"
                                />
                            </div>
                            {/* telegram */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="telegram"
                                    value={"telegram"}
                                />
                                <TextInput
                                    id="telegram"
                                    name="telegram"
                                    type="url"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.telegram}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.telegram}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="col-span-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {/* country */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="country"
                                    value={"country"}
                                    aria-required
                                />
                                <TextInput
                                    defaultValue={element.country}
                                    id="country"
                                    name="country"
                                    required
                                    aria-required
                                    onChange={(e) =>
                                        setData("country", e.target.value)
                                    }
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={get(errors, "country")}
                                    className="mt-2"
                                />
                            </div>

                            {/* longitude */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="longitude"
                                    value={"longitude"}
                                />
                                <TextInput
                                    id="longitude"
                                    name="longitude"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.longitude}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.longitude}
                                    className="mt-2"
                                />
                            </div>
                            {/* latitude */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="latitude"
                                    value={"latitude"}
                                />
                                <TextInput
                                    id="latitude"
                                    name="latitude"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.latitude}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.latitude}
                                    className="mt-2"
                                />
                            </div>
                            {/* map_url */}
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="map_url"
                                    value={"map_url"}
                                />
                                <TextInput
                                    id="map_url"
                                    name="map_url"
                                    onChange={(e) => handleChange(e)}
                                    defaultValue={element.map_url}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                />
                                <InputError
                                    message={errors.map_url}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="btn-default" disabled={processing}>
                            save
                        </button>
                    </div>
                </section>

                <section className="flex flex-col w-full bg-white p-4 gap-y-4 rounded-xl my-1">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                        more details
                    </h2>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {/* aboutus */}
                        <div className="col-span-full">
                            <InputLabel
                                htmlFor="aboutus"
                                value="aboutus"
                                className="capitalize pb-4 required"
                            />
                            <TextEditor
                                name="aboutus"
                                setData={setData}
                                data={data}
                                defaultValue={data.aboutus}
                            />
                            <InputError
                                message={get(errors, "aboutus")}
                                className="mt-2"
                            />
                        </div>
                        {/* policy */}
                        <div className="col-span-full">
                            <InputLabel
                                htmlFor="policy"
                                value="policy"
                                className="capitalize pb-4 required"
                            />
                            <TextEditor
                                name="policy"
                                setData={setData}
                                data={data}
                                defaultValue={data.policy}
                            />
                            <InputError
                                message={get(errors, "policy")}
                                className="mt-2"
                            />
                        </div>
                        {/* terms_and_conditions */}
                        <div className="col-span-full">
                            <InputLabel
                                htmlFor="terms_and_conditions"
                                value="terms_and_conditions"
                                className="capitalize pb-4 required"
                            />
                            <TextEditor
                                name="terms_and_conditions"
                                setData={setData}
                                data={data}
                                defaultValue={data.terms_and_conditions}
                            />
                            <InputError
                                message={get(errors, "terms_and_conditions")}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button className="btn-default" disabled={processing}>
                            save
                        </button>
                    </div>
                </section>
            </form>
        </AuthenticatedLayout>
    );
}

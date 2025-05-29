import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Badge } from "@/shadcn/ui/badge";
import { PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { map } from "lodash";
import { ArrowLeft, PrinterIcon } from "lucide-react";
import moment from "moment";

export default function ({ element }: PageProps) {
    return (
        <AuthenticatedLayout>
            <div className="w-full flex flex-1 flex-col bg-white  rounded-xl min-h-screen gap-y-4 p-6">
                <div className="flex flex-row gap-x-4 justify-between items-center capitalize">
                    <div className="flex flex-row gap-4">
                        <Link
                            className="p-4 bg-gray-100 border border-gray-200 rounded-2xl"
                            href={route("backend.quiz.index", {
                                user_id: element.child.user_id,
                                child_id: element.child.id,
                            })}
                        >
                            <ArrowLeft />
                        </Link>
                        <div className="header-one my-4 truncate w-4/5">
                            Questionnaire : {element.questionnaire.name}
                        </div>
                    </div>
                    <button
                        onClick={() => window.print()}
                        className="print:hidden hidden sm:flex flex-row  justify-evenly items-center gap-x-2 border border-prime-700 text-prime-700 hover:text-white hover:bg-prime-700 rounded-3xl  py-2  w-28 capitalize "
                    >
                        <div>
                            <PrinterIcon className="size-6 " />
                        </div>
                        <div>print</div>
                    </button>
                </div>

                <div className="mt-6">
                    <dl className="grid grid-cols- sm:grid-cols-3 capitalize">
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Child Name
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {`${element.child.name}`}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Parent Name
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {`${element.child.parent.name}`}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                gender
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {`${element.child.gender}`}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                DOB
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {`${element.child.dob}`}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Age
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {`${element.child.age}`} years
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Categories
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2 flex flex-row flex-wrap gap-2">
                                {map(element.child.categories, (c, i) => (
                                    <Badge key={i}>{c.name}</Badge>
                                ))}
                            </dd>
                        </div>
                        <div className="col-span-full border-t border-b border-gray-400 ">
                            <h1 className="py-4 ">Quiz Answers</h1>

                            {map(element.answers, (a, i) => (
                                <div key={i} className="col-span-full py-4">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        {a.question.name}
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                        {`(${a.name}) - ${a.value}`}
                                    </dd>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-b border-prime-400 px-4 py-6  col-span-full">
                            <dt className="text-xl font-bold text-gray-900">
                                Quiz Score{" "}
                                {`(${element.answers.length} questions)`}
                            </dt>
                            <dd className="mt-1 text-xl font-bold text-gray-900 sm:mt-2">
                                <span>{element.score} / </span>
                                <span className="text-red-600">{`${element.answers.length * 100}`}</span>
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                created at
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {`${moment(element.created_at)
                                    .locale("en")
                                    .format("ll")}`}
                            </dd>
                        </div>

                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                Questionnaire Name
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {`${element.questionnaire.name}`}
                            </dd>
                        </div>
                        <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">
                                No of questions
                            </dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-2">
                                {element.answers.length}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

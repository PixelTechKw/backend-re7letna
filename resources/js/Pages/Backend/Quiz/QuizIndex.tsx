import { MainDataTable } from "@/Components/MainDataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useAppDispatch } from "@/redux/hooks";
import { toggleshowDeleteModal } from "@/redux/slices/appSettingSlice";
import { Alert, AlertDescription, AlertTitle } from "@/shadcn/ui/alert";
import { Button } from "@/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Child, PageProps, Quiz, User } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowLeft,
    ArrowUpDown,
    LucideListCheck,
    MoreHorizontalIcon,
    RecycleIcon,
} from "lucide-react";
import moment from "moment";
import { useMemo } from "react";

export default function ({
    element,
    elements,
}: PageProps<{ element: Child; elements: Quiz[] }>): React.ReactNode {
    const {
        ziggy: { location, query },
    } = usePage().props;
    const dispatch = useAppDispatch();

    const columns: ColumnDef<Quiz>[] = useMemo(
        () => [
            {
                accessorKey: "id",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            className="capitalize !p-0"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc",
                                )
                            }
                        >
                            uid
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-row justify-start items-center">
                            <div className="truncate text-xxs px-2">
                                {row.original.id}
                            </div>
                            <div></div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "name",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            className="capitalize !p-0"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc",
                                )
                            }
                        >
                            Questionnaire
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-col justify-start items-start  sm-text gap-y-2 capitalize max-w-40 truncate">
                            <div>{row.original.questionnaire.name}</div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "score",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            className="capitalize !p-0"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc",
                                )
                            }
                        >
                            score
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-col justify-start items-start  sm-text gap-y-2 capitalize max-w-40 truncate">
                            {row.original.score}
                        </div>
                    );
                },
            },
            {
                accessorKey: "created_at",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            className="capitalize !p-0"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc",
                                )
                            }
                        >
                            age
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-col justify-start items-start  sm-text gap-y-2 capitalize max-w-60 truncate">
                            {moment(row.original.created_at)
                                .locale("en")
                                .format("dddd LL")}
                        </div>
                    );
                },
            },

            {
                accessorKey: "actions",
                header: () => <div className="capitalize !p-0">actions</div>,
                enableColumnFilter: false,
                enableGlobalFilter: false,
                enableSorting: false,
                cell: ({ row }) => {
                    const element: any = row.original;
                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <MoreHorizontalIcon className="w-4 h-4 text-gray-600" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-40 xl:w-60"
                                align="start"
                                side={"left"}
                            >
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link
                                            as="button"
                                            type={"button"}
                                            href={`${route(`backend.quiz.show`, row.original.id)}?user_id=${query.user_id}`}
                                            className="flex flex-row flex-1 justify-start items-center gap-x-3 capitalize truncate text-prim-800"
                                        >
                                            <LucideListCheck className="nav-icon" />
                                            <div>view quiz</div>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <button
                                            className="flex flex-row flex-1 justify-start items-center gap-x-3 capitalize truncate text-prim-800"
                                            onClick={() =>
                                                dispatch(
                                                    toggleshowDeleteModal({
                                                        name: "quiz",
                                                        id: row.original.id,
                                                    }),
                                                )
                                            }
                                        >
                                            <RecycleIcon className="nav-icon text-red-700" />
                                            <div className="text-red-600">
                                                delete
                                            </div>
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ],
        [],
    );

    return (
        <AuthenticatedLayout>
            <div className="w-full flex flex-1 flex-col bg-white  rounded-xl min-h-screen gap-y-4 p-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-row justify-center items-center gap-x-4">
                        <Link
                            href={route("backend.child.index", {
                                user_id: query.user_id,
                                child_id: query.child_id,
                            })}
                            className="p-4 h-14 flex justify-center items-center bg-gray-100 border border-gray-200 rounded-2xl"
                        >
                            <ArrowLeft />
                        </Link>
                        <div>
                            <div className="header-one capitalize">
                                {`list of quizzes`}
                            </div>
                        </div>
                    </div>
                    <Link
                        href={route("backend.quiz.create", {
                            child_id: element.id,
                        })}
                        className="btn-default capitalize hidden"
                    >
                        create quiz
                    </Link>
                </div>
                <Alert className="bg-gray-50 border border-gray-600">
                    <InfoCircledIcon className="size-6 text-gray-400 " />
                    <AlertTitle className="ml-6 text-sm md:text-lg">
                        Quizzes Information
                    </AlertTitle>
                    <AlertDescription>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 ml-6 capitalize">
                            <div className="col-span-2 flex flex-row gap-4">
                                <div>Child Name:</div>
                                <div>{element.name}</div>
                            </div>
                            <div className="col-span-2 flex flex-row gap-4">
                                <div>Parent Name:</div>
                                <div>{element.parent.name}</div>
                            </div>
                            <div className="col-span-2 flex flex-row gap-4">
                                <div>Child Age:</div>
                                <div>{element.age} years</div>
                            </div>
                            <div className="col-span-2 flex flex-row gap-4">
                                <div>Child DOB:</div>
                                <div>{element.dob} </div>
                            </div>
                            <div className="col-span-2 flex flex-row gap-4">
                                <div>Child type:</div>
                                <div>{element.gender} </div>
                            </div>
                            <div className="col-span-2 flex flex-row gap-4">
                                <div>Stage :</div>
                                <div>{element.name}</div>
                            </div>
                            <div className="col-span-2 flex flex-row gap-4">
                                <div>No of Quizzes :</div>
                                <div>{elements.length} Quizzes</div>
                            </div>
                            <div></div>
                            <div></div>
                        </div>
                    </AlertDescription>
                </Alert>
                <MainDataTable
                    columns={columns}
                    data={elements}
                    resetPath={location}
                    searchable
                />
            </div>
        </AuthenticatedLayout>
    );
}

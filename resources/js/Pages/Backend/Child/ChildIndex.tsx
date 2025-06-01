import ElementDropDownMenu from "@/Components/ElementDropDownMenu";
import { MainDataTable } from "@/Components/MainDataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useAppDispatch } from "@/redux/hooks";
import { toggleshowDeleteModal } from "@/redux/slices/appSettingSlice";
import { Button } from "@/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { Child, PageProps, User } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { capitalize } from "lodash";
import {
    ArrowDown,
    ArrowLeft,
    ArrowUp,
    ArrowUpDown,
    LucideListCheck,
    MoreHorizontalIcon,
    PencilIcon,
    RecycleIcon,
} from "lucide-react";
import { useMemo } from "react";

export default function ({
    element,
    elements,
}: PageProps<{ element: User; elements: Child[] }>): React.ReactNode {
    const {
        ziggy: { location, query },
    } = usePage().props;
    const dispatch = useAppDispatch();

    const columns: ColumnDef<Child>[] = useMemo(
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
                            name
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-col justify-start items-start  sm-text gap-y-2 capitalize max-w-40 truncate">
                            <div>{row.original.name}</div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "gender",
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
                            gender
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return <div>{row.original.gender}</div>;
                },
            },
            {
                accessorKey: "age",
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
                        <div className="flex flex-col justify-start items-start  sm-text gap-y-2 capitalize max-w-40 truncate">
                            {row.original.age} years
                        </div>
                    );
                },
            },
            {
                accessorKey: "stage",
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
                            stage
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return <div>{row.original.stage.name}</div>;
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
                                            href={`${route(`backend.child.edit`, row.original.id)}?user_id=${query.user_id}`}
                                            className="flex flex-row flex-1 justify-start items-center gap-x-3 capitalize truncate text-prim-800"
                                        >
                                            <PencilIcon className="nav-icon" />
                                            <div>edit element</div>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />

                                    <DropdownMenuItem>
                                        <Link
                                            as="button"
                                            type={"button"}
                                            href={`${route(`backend.quiz.index`, { user_id: query.user_id, child_id: row.original.id })}`}
                                            className="flex flex-row flex-1 justify-start items-center gap-x-3 capitalize truncate text-prim-800"
                                        >
                                            <LucideListCheck className="nav-icon" />
                                            <div>list of quizzes</div>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <button
                                            className="flex flex-row flex-1 justify-start items-center gap-x-3 capitalize truncate text-prim-800"
                                            onClick={() =>
                                                dispatch(
                                                    toggleshowDeleteModal({
                                                        name: "child",
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
        <AuthenticatedLayout header={capitalize("list of children")}>
            <div className="w-full flex flex-1 flex-col bg-white  rounded-xl min-h-screen gap-y-4 p-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-row gap-4">
                        <Link
                            href={route("backend.user.index")}
                            className="p-4 bg-gray-100 border border-gray-200 rounded-2xl"
                        >
                            <ArrowLeft />
                        </Link>
                        <div className="header-one capitalize">
                            {`Parent : ${element.name} - list of children`}
                        </div>
                    </div>
                    <Link
                        href={route("backend.child.create", {
                            user_id: query.user_id,
                        })}
                        className="btn-default capitalize"
                    >
                        create child
                    </Link>
                </div>
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

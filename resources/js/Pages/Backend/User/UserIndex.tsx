import { MainDataTable } from "@/Components/MainDataTable";
import UserDropDownMenu from "@/Components/User/UserDropDownMenu";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useAppDispatch } from "@/redux/hooks";
import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu";
import { PageProps, User, Child } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { capitalize, map, take } from "lodash";
import { ArrowUpDown, MoreHorizontalIcon } from "lucide-react";
import { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import ElementDropDownMenu from "@/Components/ElementDropDownMenu";
import MainHead from "@/Pages/Frontend/Partials/MainHead";
export default function ({
    elements,
}: PageProps<{ elements: any }>): React.ReactNode {
    const {
        ziggy: { location, query },
    } = usePage().props;
    const dispatch = useAppDispatch();

    const columns: ColumnDef<User>[] = useMemo(
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
                accessorKey: "email",
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
                            email
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-col justify-start items-start  sm-text gap-y-2  max-w-40 truncate">
                            <div>{row.original.email}</div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "mobile",
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
                            mobile
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-col justify-start items-start  sm-text gap-y-2 capitalize max-w-40 truncate">
                            <div>{row.original.mobile}</div>
                        </div>
                    );
                },
            },

            {
                accessorKey: "children",
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
                            children
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <ul className="flex flex-col gap-2">
                            {map(
                                take(row.original.children, 5),
                                (c: Child, i: any) => (
                                    <li
                                        key={i}
                                        className="truncate w-20 p-1  text-gray-600 hover:text-white hover:bg-gray-600"
                                    >
                                        {c.name}
                                    </li>
                                ),
                            )}
                        </ul>
                    );
                },
            },
            {
                accessorKey: "active",
                header: ({ column }) => {
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
                            <Tooltip>
                                <TooltipTrigger className="capitalize">
                                    active
                                </TooltipTrigger>
                                <TooltipContent
                                    side="bottom"
                                    align="center"
                                    className="w-[300px] p-4" // Fixed width + padding
                                    sideOffset={5}
                                >
                                    <p className="text-balance whitespace-pre-line leading-relaxed">
                                        If not active users can not subscribe to
                                        any courses or modify their data.
                                    </p>
                                </TooltipContent>
                            </Tooltip>

                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div
                            className={`w-3 h-3 rounded-full text-center border text-[6px] lg:text-xxs ${
                                row.original.active
                                    ? `bg-green-600 border-green-200`
                                    : `bg-red-600 border-red-100`
                            }`}
                        ></div>
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
                            <UserDropDownMenu
                                id={element.id}
                                active={element.active}
                                key={element.id}
                            />
                        </DropdownMenu>
                    );
                },
            },
        ],
        [],
    );

    return (
        <AuthenticatedLayout header={capitalize("list of parents")}>
            <div className="w-full flex flex-1 flex-col bg-white  rounded-xl min-h-screen gap-y-4 p-6">
                <div className="flex justify-between items-center">
                    <div className="header-one capitalize">list of Parents</div>
                    <Link
                        href={route("backend.user.create")}
                        className="btn-default capitalize"
                    >
                        new parent
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

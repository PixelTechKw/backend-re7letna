import ElementDropDownMenu from "@/Components/ElementDropDownMenu";
import { MainDataTable } from "@/Components/MainDataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/shadcn/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { Child, PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    MoreHorizontalIcon,
} from "lucide-react";
import { useMemo } from "react";

export default function ({
    elements,
}: PageProps<{ elements: any }>): React.ReactNode {
    const {
        ziggy: { location },
    }: any = usePage().props;
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
                                    column.getIsSorted() === "asc"
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
                                    column.getIsSorted() === "asc"
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
                accessorKey: "image",
                header: ({ column }: any) => {
                    return (
                        <Button
                            variant="ghost"
                            className="capitalize !p-0"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            image
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-col justify-start items-start  sm-text gap-y-2 capitalize max-w-40 truncate">
                            <img
                                src={row.original.thumb}
                                className="w-14 h-14 object-cover rounded-xl"
                            />
                        </div>
                    );
                },
            },
            {
                accessorKey: "order",
                header: ({ column }) => {
                    return (
                        <Button
                            variant="ghost"
                            className="capitalize !p-0"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            <Tooltip>
                                <TooltipTrigger className="capitalize">
                                    order
                                </TooltipTrigger>
                                <TooltipContent
                                    side="bottom"
                                    align="center"
                                    className="w-[300px] p-4" // Fixed width + padding
                                    sideOffset={5}
                                >
                                    <p className="text-balance whitespace-pre-line leading-relaxed">
                                        Member will appear on the frontend in
                                        ascending numerical order (with 1
                                        representing the first/starting
                                        position).
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-row justify-center items-center truncate sm-text gap-3">
                            {row.original.order > 1 ? (
                                <Link
                                    className="p-3"
                                    href={route("backend.toggle.order", {
                                        model: "member",
                                        type: "up",
                                        id: row.original.id,
                                    })}
                                >
                                    <ArrowUp className="w-5 h-5 text-gray-400 " />
                                </Link>
                            ) : (
                                <div className="w-12"></div>
                            )}
                            <div className="w-12 h-12 border border-gray-300 rounded-xl flex justify-center items-center">
                                {row.original.order}
                            </div>
                            {row.original.order >= 1 ? (
                                <Link
                                    className="p-3"
                                    href={route("backend.toggle.order", {
                                        model: "member",
                                        type: "down",
                                        id: row.original.id,
                                    })}
                                >
                                    <ArrowDown className="w-5 h-5 text-gray-400 " />
                                </Link>
                            ) : (
                                <div className="w-12"></div>
                            )}
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
                            <ElementDropDownMenu
                                type="member"
                                id={element.id}
                                active={true}
                                key={element.id}
                            />
                        </DropdownMenu>
                    );
                },
            },
        ],
        []
    );

    return (
        <AuthenticatedLayout>
            <div className="w-full flex flex-1 flex-col bg-white  rounded-xl min-h-screen gap-y-4 p-6">
                <div className="flex justify-between items-center">
                    <div className="header-one capitalize">list of members</div>
                    <Link
                        href={route("backend.member.create")}
                        className="btn-default capitalize"
                    >
                        create member
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

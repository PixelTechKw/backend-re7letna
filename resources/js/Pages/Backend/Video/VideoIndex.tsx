import ElementDropDownMenu from "@/Components/ElementDropDownMenu";
import { MainDataTable } from "@/Components/MainDataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useAppDispatch } from "@/redux/hooks";
import { Badge } from "@/shadcn/ui/badge";
import { Button } from "@/shadcn/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { Video, Child, PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { capitalize, map, take } from "lodash";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    MoreHorizontalIcon,
} from "lucide-react";
import { useMemo } from "react";
export default function ({
    elements,
}: PageProps<{ elements: Video[] }>): React.ReactNode {
    const {
        ziggy: { location, query },
    } = usePage().props;
    const dispatch = useAppDispatch();

    const columns: ColumnDef<Video>[] = useMemo(
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
                            <a href={row.original.url} target="_blank">
                                {row.original.name}
                            </a>
                        </div>
                    );
                },
            },
            {
                accessorKey: "description",
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
                            description
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-col justify-start items-start  sm-text gap-y-2  max-w-40 truncate">
                            {row.original.description}
                        </div>
                    );
                },
            },
            {
                accessorKey: "level",
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
                            level
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-col justify-start items-start  sm-text gap-y-2 capitalize max-w-40 truncate">
                            <Badge>{row.original.level}</Badge>
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
                                    column.getIsSorted() === "asc",
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
                                        video will appear on the app in
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
                                        model: "video",
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
                                        model: "video",
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
                                        If not active videos can not subscribe
                                        to any courses or modify their data.
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
                            <ElementDropDownMenu
                                type={"video"}
                                id={element.id}
                                active={element.active}
                                key={element.id}
                                showActive={true}
                            />
                        </DropdownMenu>
                    );
                },
            },
        ],
        [],
    );

    return (
        <AuthenticatedLayout header={capitalize("list of videos")}>
            <div className="w-full flex flex-1 flex-col bg-white  rounded-xl min-h-screen gap-y-4 p-6">
                <div className="flex justify-between items-center">
                    <div className="header-one capitalize">list of videos</div>
                    <Link
                        href={route("backend.video.create")}
                        className="btn-default capitalize"
                    >
                        new Video
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

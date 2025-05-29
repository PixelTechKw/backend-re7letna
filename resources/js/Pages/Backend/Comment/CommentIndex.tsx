import ElementDropDownMenu from "@/Components/ElementDropDownMenu";
import { MainDataTable } from "@/Components/MainDataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/shadcn/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/shadcn/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { Comment, Child, PageProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { capitalize, map, take } from "lodash";
import { ArrowUpDown, MoreHorizontalIcon } from "lucide-react";
import { useMemo } from "react";
export default function ({
    elements,
}: PageProps<{ elements: any }>): React.ReactNode {
    const {
        ziggy: { location, query },
    } = usePage().props;
    const dispatch = useAppDispatch();

    const columns: ColumnDef<Comment>[] = useMemo(
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
                accessorKey: "content",
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
                            content
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <div className="flex flex-col justify-start items-start  sm-text gap-y-2 capitalize max-w-40 truncate">
                            <div>{row.original.content}</div>
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
                                type={"comment"}
                                id={element.id}
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
        <AuthenticatedLayout header={capitalize("list of comments")}>
            <div className="w-full flex flex-1 flex-col bg-white  rounded-xl min-h-screen gap-y-4 p-6">
                <div className="flex justify-between items-center">
                    <div className="header-one capitalize">
                        list of comments
                    </div>
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

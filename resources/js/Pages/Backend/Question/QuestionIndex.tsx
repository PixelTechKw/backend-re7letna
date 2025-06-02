import ElementDropDownMenu from "@/Components/ElementDropDownMenu";
import { MainDataTable } from "@/Components/MainDataTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useAppDispatch } from "@/redux/hooks";
import { Button } from "@/shadcn/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Question, PageProps, Questionnaire, Answer } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { capitalize, map, take } from "lodash";
import { useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
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
import { toggleshowDeleteModal } from "@/redux/slices/appSettingSlice";
export default function ({ elements, element }: PageProps): React.ReactNode {
    console.log("elements", elements);
    const {
        ziggy: { location, query },
    } = usePage().props;
    const dispatch = useAppDispatch();

    const columns: ColumnDef<Question>[] = useMemo(
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
                                        Questionnaire will appear on the app in
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
                                        model: "question",
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
                                        model: "question",
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
                accessorKey: "answers",
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
                            answers
                            <ArrowUpDown className="mx-2 h-4 w-4" />
                        </Button>
                    );
                },
                cell: ({ row }: any) => {
                    return (
                        <ul className="flex flex-col gap-2 ">
                            {map(
                                row.original.answers,
                                (a: Answer, i: number) => (
                                    <li key={i} className="leading-6">
                                        <div className="flex items-center gap-2 border-b border-prime-400">
                                            <span>{a.name}</span>
                                            <span>({a.value})</span>
                                        </div>
                                    </li>
                                ),
                            )}
                        </ul>
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
                                            href={`${route(`backend.question.edit`, row.original.id)}`}
                                            className="flex flex-row flex-1 justify-start items-center gap-x-3 capitalize truncate text-prim-800"
                                        >
                                            <PencilIcon className="nav-icon" />
                                            <div>edit element</div>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <button
                                            className="flex flex-row flex-1 justify-start items-center gap-x-3 capitalize truncate text-prim-800"
                                            onClick={() =>
                                                dispatch(
                                                    toggleshowDeleteModal({
                                                        name: "question",
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
        <AuthenticatedLayout header={capitalize("list of Questionnaires")}>
            <div className="w-full flex flex-1 flex-col bg-white  rounded-xl min-h-screen gap-y-4 p-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-row gap-4">
                        <Link
                            href={route("backend.questionnaire.index", {
                                questionnaire_id: element.id,
                            })}
                            className="p-4 bg-gray-100 border border-gray-200 rounded-2xl"
                        >
                            <ArrowLeft />
                        </Link>
                        <div className="header-one capitalize">
                            {`Questionnaire : ${element.name} - list of questions`}
                        </div>
                    </div>
                    <Link
                        href={route("backend.question.create", {
                            questionnaire_id: element.id,
                        })}
                        className="btn-default capitalize"
                    >
                        create question
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

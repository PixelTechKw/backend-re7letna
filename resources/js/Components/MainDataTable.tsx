import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { getImage, isLocal, toEn } from "@/constants";
import { Button } from "@/shadcn/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shadcn/ui/table";
import {
    ArrowPathIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { capitalize, toNumber } from "lodash";
import { useState } from "react";
import TextInput from "./TextInput";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    resetPath?: string;
    invisible?: { [key: string]: boolean };
    searchable?: boolean;
}

export function MainDataTable<TData, TValue>({
    columns,
    data,
    resetPath,
    invisible = { desription: false },
    searchable = false,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>(invisible);
    const [gFilter, setGlobalFilter] = useState<string>("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 12,
    });

    const table = useReactTable({
        data,
        columns,
        initialState: {
            columnVisibility,
        },
        enableHiding: true,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            globalFilter: gFilter,
            pagination,
            columnVisibility,
        },
        debugTable: isLocal,
        debugHeaders: isLocal,
        debugColumns: isLocal,
        enableColumnResizing: true,
    });

    return (
        <div className="flex flex-col gap-y-6 w-full">
            {searchable && (
                <div className="flex w-full justify-end items-center gap-x-3 ">
                    <div className="relative mt-2 rounded-md w-[300px]">
                        <div className="pointer-events-none absolute inset-y-0 left-0  flex items-center pl-3 ">
                            <MagnifyingGlassIcon
                                className="w-4 h-4 text-gray-400"
                                aria-hidden="true"
                            />
                        </div>
                        <TextInput
                            placeholder={`${capitalize("search")}..`}
                            value={gFilter}
                            onChange={(e) =>
                                setGlobalFilter(toEn(e.target.value))
                            }
                            className="block w-full h-12 ps-10 bg-gray-50 sm:text-sm sm:leading-6 rounded-3xl"
                        />
                    </div>

                    {resetPath ? (
                        <Link
                            preserveScroll
                            className="w-12 h-12 flex justify-center items-center bg-gray-50 border hover:bg-red-300 text-gray-400 hover:text-white border-gray-200 hover:border-red-50 rounded-xl mt-2"
                            href={resetPath}
                        >
                            <ArrowPathIcon className="w-6 h-6 " />
                        </Link>
                    ) : null}
                </div>
            )}
            <div className="!rounded-xl border border-gray-200 !min-h-[500px]">
                <Table className={"!rounded-t-xl"}>
                    <TableHeader
                        className={
                            "!rounded-t-xl !bg-gray-100 border-b border-b-gray-300 py-4"
                        }
                    >
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={`h-14 rtl:text-right ltr:text-left first:!rounded-tl-xl last:!rounded-tr-xl`}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    className="ps-4 h-14"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className=" ">
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-full w-200 mx-auto self-center "
                                >
                                    <img
                                        src={getImage("no_results.png")}
                                        className="h-auto w-200 object-cover mx-auto"
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* pagination */}
            <div className="flex justify-end items-center  gap-x-4">
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <div className="flex flex-row justify-center items-center gap-x-2 capitalize">
                        <ChevronLeftIcon className="h-4 w-4 rtl:rotate-180" />
                    </div>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <div className="flex flex-row justify-center items-center gap-x-2 capitalize">
                        <div>
                            <ArrowLeftIcon className="w-3 h-3 rtl:rotate-180" />
                        </div>
                        <div>previous</div>
                    </div>
                </Button>
                <Button variant="outline" size="sm" className="rounded-lg">
                    {`${
                        toNumber(table.options?.state?.pagination?.pageIndex) +
                        1
                    } / ${table.getPageCount()}`}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="rounded-lg"
                >
                    <div className="flex flex-row justify-center items-center gap-x-2 capitalize">
                        <div>next</div>
                        <div>
                            <ArrowLeftIcon className="w-3 h-3 rotate-180" />
                        </div>
                    </div>
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <div className="flex flex-row justify-center items-center gap-x-2 capitalize">
                        <ChevronRightIcon className="h-4 w-4 rtl:rotate-180" />
                    </div>
                </Button>
            </div>
        </div>
    );
}

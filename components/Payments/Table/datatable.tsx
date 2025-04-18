"use client";
import React, { useEffect } from "react";
import { TbMinusVertical } from "react-icons/tb";
import { useState } from "react";
import AddStaff from "./AddProduct/addstaff";
import { toast } from "sonner";
import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/TableUI/table";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FormattedMessage } from "react-intl";
import Filter from "@/components/Common/Filters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import BasicPopover from "@/components/Common/Popover";
import AddFile from "./AddProduct/addNoti2";
// import { ProductOperation } from "@/do_an-library/main";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  reload: any;
}
const validValue = ["AGENCY_MANAGER", "AGENCY_HUMAN_RESOURCE_MANAGER", "ADMIN", "HUMAN_RESOURCE_MANAGER"]
// const student = new StudentOperation()

export function DataTable<TData, TValue>({
  columns,
  data,
  reload
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [click, setClick] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = React.useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const openModal2 = () => {
    setModalIsOpen2(true);
  };
  const closeModal2 = () => {
    setModalIsOpen2(false);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
      <Button key={i} onClick={() => table.setPageIndex(i)}>
        {i + 1}
      </Button>
    );
  }
  const handleDeleteRowsSelected = async () => {
    table.getFilteredSelectedRowModel().rows.forEach(async (row) => {
    toast.success("Xóa thanh toán thành công")
    });
  }
  const [findby, setFindby] = useState<"student_id" | "full_name">("full_name")
  const handleFindBy = (findB: "student_id" | "full_name") => {
    setFindby(findB);
  }
  return (
    <div>
      <div className="flex items-center py-4">
        <div className="w-full flex flex-col sm:flex-row">
          <div className="flex flex-col gap-5 w-full">
            <div className="relative w-full sm:w-1/2 lg:w-1/2 flex gap-2">
              <Dropdown className="z-30">
                <DropdownTrigger>
                  <Button
                    className="text-xs md:text-base border border-gray-600 rounded-l ml-2 w-24 text-center hover:bg-gray-300 dark:hover:bg-gray-500"
                    aria-label="Show items per page"
                  >
                    {(findby === "student_id") ? "ID" : ((findby === "full_name") ? "Họ và tên" : "")}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  className="bg-blue m-0 p-0 border border-gray-300 rounded w-24 bg-[#282A35] "
                  aria-labelledby="dropdownMenuButton"
                >
                  {["full_name"].map((pageSize, index) => (
                    <DropdownItem
                      key={pageSize}
                      textValue={`Show ${pageSize} items per page`}
                      className="bg-[#282A35] -top-3 border border-[#282A35] rounded dark:hover:bg-gray-500 hover:bg-gray-500"
                    >
                      <Button
                        variant="bordered"
                        aria-label={`Show ${pageSize}`}
                        className="content-center text-white w-full m-0 p-0"
                      >
                        {(pageSize === "student_id") ? "ID" : ((pageSize === "full_name") ? "Họ và tên" : "")}
                      </Button>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <input
                
                type="text"
                value={
                  (table.getColumn("studentFullName")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("studentFullName")?.setFilterValue(event.target.value)
                }
                className={`peer h-full self-center w-full border border-gray-600 rounded focus:outline-none dark:focus:border-gray-100 focus:border-blue-500 truncate bg-transparent
                    text-left placeholder-transparent pl-3 pr-3 text-sm text`}
                placeholder="Tìm kiếm tên"
              />
              <Dropdown className="z-30">
                <DropdownTrigger>
                  <Button
                    className="text-xs md:text-base border border-gray-600 rounded ml-2 w-24 text-center hover:bg-gray-300 dark:hover:bg-gray-500"
                    aria-label="Show items per page"
                  >
                    Show {table.getState().pagination.pageSize}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  className="bg-blue m-0 p-0 border border-gray-300 rounded w-23 bg-[#282A35]"
                  aria-labelledby="dropdownMenuButton"
                >
                  {[10, 20, 30, 40, 50].map((pageSize, index) => (
                    <DropdownItem
                      key={pageSize}
                      textValue={`Show ${pageSize} items per page`}
                      className="bg-[#282A35] -top-3 border border-[#282A35] rounded dark:hover:bg-gray-500"
                    >
                      <Button
                        onClick={() => table.setPageSize(pageSize)}
                        variant="bordered"
                        aria-label={`Show ${pageSize}`}
                        className="content-center text-white w-full m-0 p-0"
                      >
                        Show {pageSize}
                      </Button>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

          </div>
          {/* <div className="flex-grow h-10 flex mt-4 sm:mt-0 justify-center sm:justify-end">
            <BasicPopover icon={<FilterAltIcon />}>
              <div
                onClick={() => {
                  if (!click)
                    reload("active")
                  else
                    reload()
                  setClick(!click)
                }}
                className={`m-10 p-1 text-white rounded-lg
                  ${click ? "bg-green-500" : "bg-gray-700"} 
                  active:bg-gray-500 cursor-pointer`}
              >
                Success
              </div>
            </BasicPopover>
            {modalIsOpen && <AddStaff onClose={closeModal} reload={reload} />}
            {modalIsOpen2 && (<AddFile onClose={closeModal2} reloadData={reload} />)}
          </div> */}

          <div className="flex-grow h-10 mx-2 flex justify-center sm:justify-end">
            <Button
              className={`text-xs md:text-sm justify-self-start rounded-lg border
            border-gray-600 px-4 py-2 bg-transparent hover:bg-gray-300
            focus:outline-none font-normal text-black dark:text-white dark:hover:bg-gray-500
            ${table.getFilteredSelectedRowModel().rows.length > 0
                  ? "border-red-500"
                  : "border-gray-600"
                }`}
              onClick={handleDeleteRowsSelected}
            >
              Xóa {" "}
              {table.getFilteredSelectedRowModel().rows.length}/
              {table.getFilteredRowModel().rows.length}
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded-md h-112 overflow-y-scroll border-0">
        <Table className="border-0">
          <TableHeader className="border-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-0">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
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
                  className={`border-gray-700 ${row.getIsSelected() ? "bg-gray-300 dark:bg-gray-700" : ""
                    }`}
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
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="relative flex items-center justify-center space-x-2 py-2">
        <Button
          variant="light"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md border border-black dark:border-white text-black
          md:text-base focus:outline-none font-normal
          dark:text-white rounded-md text-sm text-center me-2 hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          <span>
            Trước
          </span>
        </Button>
        <span className="flex items-center gap-1">
          <div className="text-xs md:text-base">
            Trang
          </div>
          <strong className="text-xs md:text-base whitespace-nowrap">
            {table.getState().pagination.pageIndex + 1}{" "}
            trong tổng số {table.getPageCount()}
          </strong>
        </span>
        <TbMinusVertical className="text-xl text-gray-700" />
        <span className="flex items-center gap-1 text-xs md:text-base whitespace-nowrap">
          Đến trang

          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border border-gray-500 px-1 py-0.5 rounded w-8 sm:w-16 bg-transparent"
          />
        </span>
        <Button
          variant="light"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md border border-black dark:border-white md:text-base focus:outline-none font-normal
          dark:text-white rounded-md text-sm text-center me-2 hover:cursor-pointer
          hover:bg-gray-300 dark:hover:bg-gray-500
          "
        >
          <span>
            Sau
          </span>
        </Button>
      </div>
    </div>
  );
}

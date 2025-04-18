"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import DetailStaff from "./detailProduct";
import { Checkbox } from "@/components/TableUI/checkbox";

export type PageAlloc = {
  id: number;
  semester: number,
  year: number,
  numberOfPages: number,
  date: number[],
  status: string,
  spso: {
      id: number,
      name: string,
      username: string,
      role: {
          id: number,
          name: string
      },
      email: string,
      phoneNumber: string,
      joinDate: number[],
  }
};

type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
};

export async function columns(
  reloadData: () => void
): Promise<MyColumnDef<PageAlloc>[]> {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
          accessorFn: (row) => (`HK${~~(row?.year%100/10)}${row?.year%10}${row?.semester}`),
          id: "semester",
          header: ({ column }) => (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Học kì
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          ),
        },
    {
      accessorKey: "numberOfPages",
      header: ({ column }) => (
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Số lượng giấy cấp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          Ngày cấp
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const transactionDateArray = row.original.date;
        if (Array.isArray(transactionDateArray)) {
          const [year, month, day] = transactionDateArray;
          const formattedDate = new Date(year, month - 1, day).toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          return <span>{formattedDate as String}</span>;
        }
        return <span>Invalid Date</span>;
      }
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Trạng thái
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        let statusClass = '';
        let backgroundClass = '';
  
        if (status === "pending") {
          statusClass = "text-white"; // Màu chữ xám
          backgroundClass = "bg-yellow-500"; // Nền xám nhạt
        } else if (status === "allocated") {
          statusClass = "text-white"; // Màu chữ xanh
          backgroundClass = "bg-green-500"; // Nền xanh nhạt
        } else {
          statusClass = "text-red-800"; // Màu chữ đỏ
          backgroundClass = "bg-red-200"; // Nền đỏ nhạt
        }
    
        return (
          <span className={`${statusClass} ${backgroundClass} px-2 py-1 rounded-md`}>
            {status}
          </span>
        );
      }
    },     
    {
      accessorKey: "Chi tiết/Sửa đổi",
      header: () => "Detail",
      cell: function Cell({ row }) {
        const [modalIsOpen, setModalIsOpen] = useState(false);

        const openModal = () => {
          setModalIsOpen(true);
        };

        const closeModal = () => {
          setModalIsOpen(false);
        };

        return (
          <div className="relative grid place-items-center  mr-2">
              <Button
                onClick={openModal}
                className="bg-transparent hover:bg-white font-bold hover:text-black h-10 w-10 border border-gray-600 hover:border-transparent rounded-full"
              >
                +
              </Button>
              {modalIsOpen && (
                <DetailStaff onClose={closeModal} dataInitial={row.original} reload={reloadData} />
              )}
            </div>
        );
      },
    },
  ];
}

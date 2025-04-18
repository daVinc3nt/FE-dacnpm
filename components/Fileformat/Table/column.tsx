"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import DetailStaff from "./detailProduct";
import { Checkbox } from "@/components/TableUI/checkbox";

export type FormatFile = {
  format_id: number;
  name: string;
};

type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
};

export async function columns(
  reloadData: () => void
): Promise<MyColumnDef<FormatFile>[]> {
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
      accessorKey: "format_id",
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
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên Định Dạng
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "Chi tiết/Sửa đổi",
      header: () => "Chi tiết",
      cell: function Cell({ row }) {
        const [modalIsOpen, setModalIsOpen] = useState(false);

        const openModal = () => {
          setModalIsOpen(true);
        };

        const closeModal = () => {
          setModalIsOpen(false);
        };

        return (
          <div className="relative grid place-items-center mr-2">
            <Button
              onClick={openModal}
              className="bg-transparent hover:bg-white font-bold hover:text-black h-10 w-10 border border-gray-600 hover:border-transparent rounded-full"
            >
              +
            </Button>
            {modalIsOpen && (
              <DetailStaff
                onClose={closeModal}
                dataInitial={row.original}
                reload={reloadData}
              />
            )}
          </div>
        );
      },
    },
  ];
}

"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import DetailStaff from "./detailProduct";
import { Checkbox } from "@/components/TableUI/checkbox";

export type Payment = {
  id: number;
  name: number;
  brand: string;
  type: string;
  lastMaintenanceDate: number[];
  supportContact: string;
  description: string;
  a4RemainingPages: number;
  a3RemainingPages: number;
  status: string;
  location: {
    id: number;
    name: string;
    campus: string;
    floor: number;
    roomNumber: number;
  };
  spso: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    enabled: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    birthdate: number[];
    joinDate: number[];
    role: {
      id: number;
      name: string;
    };
  };
};

type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
};

export async function columns(
  reloadData: () => void
): Promise<MyColumnDef<Payment>[]> {
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
      accessorKey: "name",
      header: ({ column }) => (
        <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên máy in
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorFn: (row) => (`Phòng ${row?.location?.roomNumber}, Tầng ${row?.location?.floor},Tòa ${row?.location?.name}, ${row?.location?.campus}`),
      id: "location",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Địa điểm
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
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
  
        if (status === "occupied ") {
          statusClass = "text-red-800"; // Màu chữ đỏ
          backgroundClass = "bg-red-200"; // Nền đỏ nhạt
        } else if (status === "active") {
          statusClass = "text-white"; // Màu chữ xanh
          backgroundClass = "bg-green-500"; // Nền xanh nhạt
        } else {
          statusClass = "text-gray-800"; // Màu chữ xám
          backgroundClass = "bg-gray-200"; // Nền xám nhạt
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

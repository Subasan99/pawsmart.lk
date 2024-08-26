"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import ActionMenu from "@/components/AdminPanelComponents/ActionMenu";
import moment from "moment";

export type Columns = {
  id: string;
  bookingDate: string;
  time: string;
  doctorResponse?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    dateOfBirth: string;
    gender: string;
  };
  medicineResponse?: {
    id: string;
    name: string;
  };
  description: string;
  status: string;
  bookingType: string;
  userResponse: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    dateOfBirth: string;
    gender: string;
  };
};

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: "userResponse",
    header: () => (
      <div className="font-bold text-center">Client Information</div>
    ),
    cell: ({ row }) => (
      <div className="justify-center py-0">
        <div className="flex items-center gap-3 justify-start">
          <div className="flex flex-col">
            <div className="font-semibold text-sm">
              {row.original.userResponse?.firstName}{" "}
              {row.original.userResponse.lastName}
            </div>
            <div className="font-semibold text-[12px]">
              {row?.original?.userResponse.lastName}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "bookingType",
    header: () => <div className="font-bold text-center">Type</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.bookingType}</div>
    ),
  },
  {
    accessorKey: "bookingDate",
    header: () => <div className="font-bold text-center">Date</div>,
    cell: ({ row }) => (
      <div className="text-center">{moment(row.original.bookingDate).format("MMM Do YY")}</div>
    ),
  },
  {
    accessorKey: "time",
    header: () => <div className="font-bold text-center">Time</div>,
    cell: ({ row }) => (
      <div className="text-center">{moment(row.original.time).format("LTS")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-center flex justify-center">
        <ActionMenu pathName={`/doctors/${row.original.id}`} />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];

"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DefaultImage from "../../../../public/default_user.png";
import ActionMenu from "@/components/AdminPanelComponents/ActionMenu";
import { archiveMedicine } from "./action";

export type Columns = {
  id: string;
  name: string;
  description: string;
  image: string;
  preSignedUrl: string | undefined;
  duration: number;
  createdDate: string;
  active: boolean;
  updatedDate: string;
  medicineDayTimeSlotResponses: {
    day: string;
    medicineTimeSlotResponses: { startTime: string; endTime: string }[];
    appointmentTimes: string[];
  }[];
};

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: "fullName",
    header: () => <div className="font-bold text-center">Full Name</div>,
    cell: ({ row }) => (
      <div className="justify-center py-0">
        <div className="flex items-center gap-3 justify-start">
          <div className="w-10 h-10 object-contain">
            {row?.original?.preSignedUrl ? (
              <Image
                alt="medicine image"
                src={row?.original?.preSignedUrl}
                className="w-10 h-10 object-cover rounded-full border-2"
                height={200}
                width={200}
              />
            ) : (
              <Image
                alt="default image"
                src={DefaultImage}
                className="w-10 h-10 object-cover rounded-full border-2"
              />
            )}
          </div>
          <div className="flex flex-col">
            <div className="font-semibold text-sm">{row.original.name}</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "CreatedAt",
    header: () => <div className="font-bold text-center">Created At</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.createdDate}</div>
    ),
  },
  {
    accessorKey: "UpdatedAt",
    header: () => <div className="font-bold text-center">Updated At</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.updatedDate}</div>
    ),
  },
  {
    accessorKey: "Active",
    header: () => <div className="font-bold text-center">Active</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <span
          className={`px-2 py-1 rounded-full text-white ${
            row.original.active ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {row.original.active ? "Active" : "Inactive"}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-center flex justify-center">
        <ActionMenu
          delete={() => archiveMedicine(row.original.id)}
          pathName={`/admin/medicines/${row.original.id}`}
          view={true}
          edit={true}
          data={row.original}
          component={"medicine"}
        />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];

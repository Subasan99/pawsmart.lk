"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DefaultImage from "../../../../public/default_user.png";
import ActionMenu from "@/components/AdminPanelComponents/ActionMenu";

export type Columns = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  image: string;
  preSignedUrl: string | undefined;
  doctorResponses: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    dateOfBirth: string;
    gender: string;
    specializationId: string;
    specializationName: string;
    description: string;
    departmentId: string;
    departmentName: string;
    image: string;
    preSignedUrl: string | undefined;
    duration: number;
    dayTimeSlotResponses: {
      day: string;
      timeSlots: { startTime: string; endTime: string }[];
      appointmentTimes: string[];
    }[];
  }[];
};

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: "PetName",
    header: () => <div className="font-bold text-center">Pet Name</div>,
    cell: ({ row }) => (
      <div className="justify-center py-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 object-contain">
            {row?.original?.preSignedUrl ? (
              <Image
                alt="pet image"
                src={row?.original?.preSignedUrl}
                className="w-10 h-10 object-cover rounded-full border-2"
                height={10}
                width={10}
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
    accessorKey: "Description",
    header: () => <div className="font-bold text-center">Description</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.description}</div>
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
        <ActionMenu />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];

"use client";
import ActionMenu from "@/components/AdminPanelComponents/ActionMenu";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DefaultImage from "../../../../public/default_user.png";

export type Columns = {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  specializationId: string;
  specializationName: string;
  description: string;
  image: string;
  preSignedUrl: string | undefined;
  duration: number;
  dayTimeSlotResponses: {
    day: string;
    timeSlots: { startTime: string; endTime: string }[];
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
                alt="doctor image"
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
            <div className="font-semibold text-sm">
              {row.original.name}
            </div>
            <div className="font-semibold text-[12px]">
              {row?.original?.email}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "phoneNo",
    header: () => <div className="font-bold text-center">Phone Number</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.phoneNo}</div>
    ),
  },
  {
    accessorKey: "specializationName",
    header: () => <div className="font-bold text-center">Specialization</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.specializationName}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-center flex justify-center">
        <ActionMenu 
        pathName={`/admin/doctors/${row.original.id}`}
        view={true} />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];

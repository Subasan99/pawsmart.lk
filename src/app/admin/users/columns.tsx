"use client";
import ActionMenu from "@/components/AdminPanelComponents/ActionMenu";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DefaultImage from "../../../../public/default_user.png";
import { archiveUserById } from "./action";

export type Columns = {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
  active: boolean;
  role: string;
  image: string;
  email: string;
  phoneNo: string;
  preSignedUrl: string | undefined;
  createdDate: string;
  updatedDate: string;
};

export const columns: ColumnDef<Columns>[] = [
  {
    accessorKey: "UserName",
    header: () => <div className="font-bold text-center">User Name</div>,
    cell: ({ row }) => (
      <div className="justify-center py-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 object-contain">
            {row?.original?.preSignedUrl ? (
              <Image
                alt="user image"
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
            <div className="font-semibold text-sm">{row.original.firstName +" "+ row.original.lastName}</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "Email",
    header: () => <div className="font-bold text-center">Email</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "PhoneNumber",
    header: () => <div className="font-bold text-center">Phone Number</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.phoneNo}</div>
    ),
  },
  {
    accessorKey: "Role",
    header: () => <div className="font-bold text-center">Role</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.role}</div>
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
          delete={() => archiveUserById(row.original.id)}
          pathName={`/admin/users/${row.original.id}`}
          view={true}
        />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];

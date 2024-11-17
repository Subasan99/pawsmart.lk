"use client";
import ActionMenu from "@/components/AdminPanelComponents/ActionMenu";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import DefaultImage from "../../../../public/default_user.png";
import { archivePetById } from "./action";

export type Columns = {
  id: string;
  name: string;
  description: string;
  active: boolean;
  image: string;
  preSignedUrl: string | undefined;
  createdDate: string;
  updatedDate: string;
};

export const petsColumns: ColumnDef<Columns>[] = [
  {
    accessorKey: "PetName",
    header: () => (
      <div className="flex items-center space-x-3">
        <Image
          alt="default image"
          src={DefaultImage}
          className="w-10 h-10 object-cover rounded-full border-2"
        />
        <div className="font-bold text-start">Pet Name</div>
      </div>
    ),
    cell: ({ row }) => (
      <div className="justify-center py-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 object-contain">
            {row?.original?.preSignedUrl ? (
              <Image
                alt="pet image"
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
    accessorKey: "description",
    header: () => <div className="font-bold text-start">Description</div>,
    cell: ({ row }) => (
      <div className="text-start">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "CreatedAt",
    header: () => <div className="font-bold text-start">Created At</div>,
    cell: ({ row }) => (
      <div className="text-start">{row.original.createdDate}</div>
    ),
  },
  {
    accessorKey: "UpdatedAt",
    header: () => <div className="font-bold text-start">Updated At</div>,
    cell: ({ row }) => (
      <div className="text-start">{row.original.updatedDate}</div>
    ),
  },
  {
    accessorKey: "Active",
    header: () => <div className="font-bold text-start">Active</div>,
    cell: ({ row }) => (
      <div className="text-start">
        <span
          className={`px-2 py-1 rounded-full text-white ${
            row.original.active ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {row.original.active ? "Active" : "Archive"}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="text-start flex justify-center">
        <ActionMenu
          delete={() => archivePetById(row.original.id)}
          pathName={`/admin/pets/${row.original.id}`}
          view={false}
          edit={true}
          data={row.original}
          component={"pet"}
        />
      </div>
    ),
    header: () => <div className="text-center font-bold">Actions</div>,
  },
];

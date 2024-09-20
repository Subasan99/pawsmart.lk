"use client";

import { getDepartmentData } from "@/app/(signedin)/home/action";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDepartmentStore } from "@/store/departmentStore";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EllipsisIcon from "../svg/ellipsis-icon";
import { Button } from "../ui/button";
import DepartmentEditForm from "./DepartmentComponents/DepartmentEditForm";
import MedicineEditForm from "./MedicineComponents/MedicineEditForm";
import PetEditForm from "./PetComponents/PetEditForm";
import SpecializationEditForm from "./SpecializationComponents/SpecializationEditForm";

interface Props {
  pathName: string;
  delete?: () => Promise<any>;
  view?: boolean;
  edit?: boolean;
  data?: any;
  component?: "pet" | "department" | "medicine" | "specialization"|"";
}

const ActionMenu = (props: Props) => {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [department, setAllDepartment] = useDepartmentStore((state: any) => [
    state.department,
    state.setAllDepartment,
  ]);

  async function fetchData() {
    const departments = await getDepartmentData();
    setAllDepartment(departments);
  }
  const handleDelete = async () => {
    if (props.delete) {
      const response = await props.delete();
      if (response.success) {
        setDeleteOpen(false);
        console.log("Deleted");
        // Additional logic like redirecting can be added here
      }
    }
  };

  const renderEditForm = () => {
    switch (props.component) {
      case "pet":
        return (
          <PetEditForm
            pet={props.data}
            setOpen={setEditOpen}
            id={props.data?.id}
          />
        );
      case "department":
        return (
          <DepartmentEditForm
            department={props.data}
            setOpen={setEditOpen}
            id={props.data?.id}
          />
        );
      case "medicine":
        return (
          <MedicineEditForm
            medicine={props.data}
            setOpen={setEditOpen}
            id={props.data?.id}
          />
        );
      case "specialization":
        return (
          <SpecializationEditForm
            department={department}
            specialization={props.data}
            setOpen={setEditOpen}
            id={props.data?.id}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
            <EllipsisIcon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {props.view && (
            <DropdownMenuItem
              onClick={() => router.push(props.pathName)}
              className="font-semibold flex gap-2"
            >
              <EyeIcon />
              View
            </DropdownMenuItem>
          )}
          {props.edit && (
            <DropdownMenuItem
              onClick={() => setEditOpen(true)}
              className="font-semibold flex gap-2"
            >
              <EditIcon />
              Edit
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="font-semibold flex gap-2"
          >
            <TrashIcon />
            Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              Do you really want to archive this item?
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex justify-end">
            <div className="flex gap-2">
              <Button
                className="px-3 py-1"
                onClick={() => setDeleteOpen(false)}
              >
                No
              </Button>
              <Button className="px-3 py-1 bg-red-500" onClick={handleDelete}>
                Yes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {props.component === "pet" && "Edit Pet Information"}
              {props.component === "department" &&
                "Edit Department Information"}
              {props.component === "medicine" && "Edit Medicine Information"}
              {props.component === "specialization" &&
                "Edit specialization Information"}
            </DialogTitle>
          </DialogHeader>
          <div className="w-full flex">{renderEditForm()}</div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionMenu;

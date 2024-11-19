"use client";

import { getDepartmentData, getDoctorData } from "@/app/home/action";
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
import { useEffect, useState } from "react";
import EllipsisIcon from "../svg/ellipsis-icon";
import { Button } from "../ui/button";
import DepartmentEditForm from "./DepartmentComponents/DepartmentEditForm";
import MedicineEditForm from "./MedicineComponents/MedicineEditForm";
import PetEditForm from "./PetComponents/PetEditForm";
import SpecializationEditForm from "./SpecializationComponents/SpecializationEditForm";
import { getAllPets, getAllSpecializations } from "@/api/route";
import HospitalEditForm from "./HospitalComponents/HospitalEditForm";

interface Props {
  pathName: string;
  navigateTo?:string;
  delete?: () => Promise<any>;
  view?: boolean;
  edit?: boolean;
  data?: any;
  component?: "pet" | "department" | "medicine" | "specialization" | "";
}

const ActionMenu = (props: Props) => {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [department, setAllDepartment] = useDepartmentStore((state: any) => [
    state.department,
    state.setAllDepartment,
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    if (props.delete) {
      setIsLoading(true); // Set loading to true when deletion starts
      const response = await props.delete();
      console.log("objectresponse", response);

      if (response.success) {
        setDeleteOpen(false);
        console.log("Deleted");
      }
      
      setIsLoading(false); 
    }
  };
  const handleEditClick = () => {
    if (props.navigateTo) {

      router.push(props.navigateTo);
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
        // case "hospital":
        //   return (
        //    <HospitalEditForm cities={[]} medicines={[]}/>
        //   );
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
 onClick={() => {
   if (props.navigateTo) {
     handleEditClick();
   } else {

     setEditOpen(true);
   }
 }}
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
              <Button
                className="px-3 py-1 bg-blue-600"
                onClick={handleDelete}
                disabled={isLoading} // Disable delete button while isLoading
              >
                {isLoading ? "Deleting..." : "Yes"}
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

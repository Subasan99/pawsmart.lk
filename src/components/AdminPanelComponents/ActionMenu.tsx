"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EllipsisIcon from "../svg/ellipsis-icon";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
import PetEditForm from "./PetComponents/PetEditForm";

interface Props {
  pathName: string;
  delete?: any;
  view?: any;
  edit?: any;
  data?: any;
  component?: any;
}

const ActionMenu = (props: Props) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
            <EllipsisIcon />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {props?.view && (
            <DropdownMenuItem
              onClick={() => {
                router.push(props.pathName);
              }}
              className="font-semibold flex gap-2"
            >
              <EyeIcon />
              View
            </DropdownMenuItem>
          )}
          {props?.edit && (
            <DropdownMenuItem
              onClick={() => setEditOpen(true)}
              className="font-semibold flex gap-2"
            >
              <EditIcon />
              Edit
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="font-semibold flex gap-2"
          >
            <div className="flex gap-2">
              <TrashIcon />
              Archive
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              Do you really want to archive this department?
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex justify-end">
            <div className="flex gap-2">
              <Button className="px-3 py-1" onClick={() => setOpen(true)}>
                No
              </Button>
              <Button
                className="px-3 py-1 bg-red-500"
                onClick={async () => {
                  if (props.delete) {
                    await props.delete().then((response: any) => {
                      if (response.success) {
                        setOpen(false);
                      }
                    });
                    console.log("Deleted");
                    // You can add additional logic here, like closing the dialog
                  }
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit information</DialogTitle>
          </DialogHeader>
          <div className="w-full flex">
            {props.component === "pet" ? (
              <PetEditForm
                pet={props.data}
                setOpen={setEditOpen}
                id={props.data?.id}
              />
            ) : (
              <></>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionMenu;

"use router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

interface Props {
  pathName: string;
  delete?: any;
}

const ActionMenu = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div>
          <EllipsisIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => router.push(props.pathName)}
          className="font-semibold flex gap-2"
        >
          <EyeIcon />
          View
        </DropdownMenuItem>
        <DropdownMenuItem className="font-semibold flex gap-2">
          <EditIcon />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={props.delete ? props.delete:console.log("tryxugvbuhbuhbu")}
          className="font-semibold flex gap-2"
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex gap-2">
              <TrashIcon />
              Archive
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  Do you really want to archive this department?
                </DialogDescription>
              </DialogHeader>
              <div className="w-full flex justify-end">
                <div className="flex gap-2">
                  <Button onClick={() => setOpen(false)} className="px-3 py-1">
                    No
                  </Button>
                  <Button
                    className="px-3 py-1 bg-red-500"
                    onClick={() => {
                      props.delete().then((response: any) => {
                        console.log(response)
                        if (response?.data?.success) {
                          setOpen(false);
                        } else {
                        }
                      });
                      // setOpen(false);
                    }}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;

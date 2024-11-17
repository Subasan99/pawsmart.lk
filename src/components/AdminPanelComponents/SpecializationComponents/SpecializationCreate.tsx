"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import SpecializationCreateForm from "./SpecializationCreateForm";
import { PlusIcon } from "lucide-react";

type Props = {
  department: any;
};

const SpecializationCreate = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
      <div className="self-end flex items-center">
    <Button className="bg-blue-600 text-white p-2 rounded-xl">
    <PlusIcon className="mr-2 h-4 w-4" /> {/* The PlusIcon */}
      
       Create</Button>
  </div>
      </DialogTrigger>
      <DialogContent className="h-auto overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Specialization</DialogTitle>
        </DialogHeader>
        <SpecializationCreateForm
          department={props.department}
          setOpen={setOpen}
          reloadTable={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SpecializationCreate;

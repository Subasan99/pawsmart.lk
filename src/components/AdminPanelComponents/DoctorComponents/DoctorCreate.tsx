"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DoctorCreateForm from "./DoctorCreateForm";
import { useEffect, useState } from "react";
import { useSpecializationStore } from "@/store/specializationStore";
import { getAllSpecializations } from "@/api/route";
import DoctorDayTimeAllocation from "./DoctorDayTimeAllocation";

type Props = {
  specialization: any;
};

const DoctorCreate = (props: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="bg-red-500">Create</Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] overflow-y-auto">
        {/* <DialogHeader>
          <DialogTitle>Day Time Allocations</DialogTitle>
        </DialogHeader>
        <DoctorDayTimeAllocation /> */}
        <DialogHeader>
          <DialogTitle>Create Doctor</DialogTitle>
        </DialogHeader>
        <DoctorCreateForm
          specialization={props.specialization}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DoctorCreate;

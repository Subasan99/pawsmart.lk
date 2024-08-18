"use client";

import { Appointment } from "@/lib/typings";
import { DataTable } from "../data-table";
import { columns } from "../../../app/(admin)/appointments-admin/columns";

interface Props {
  appointments: Appointment[];
}

const DoctorAppointments = (props: Props) => {
  console.log(props);
  return (
    <div className="p-3 flex flex-col">
      {<DataTable columns={columns} data={props?.appointments} pageSize={5}/>}
    </div>
  );
};

export default DoctorAppointments;

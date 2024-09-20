"use client";

import { Appointment } from "@/lib/typings";
import { DataTable } from "../data-table";
import { doctorColumns } from "../../../app/admin/appointments/columns";

interface Props {
  appointments: any[];
}

const DoctorAppointments = (props: Props) => {
  console.log(props);
  return (
    <div className="p-3 flex flex-col">
      {<DataTable columns={doctorColumns} data={props?.appointments} pageSize={5} />}
    </div>
  );
};

export default DoctorAppointments;

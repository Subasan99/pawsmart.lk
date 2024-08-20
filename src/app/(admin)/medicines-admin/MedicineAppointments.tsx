"use client";

import { Appointment } from "@/lib/typings";
import { columns } from "../appointments-admin/columns";
import { DataTable } from "@/components/AdminPanelComponents/data-table";

interface Props {
  appointments: Appointment[];
}

const MedicineAppointments = (props: Props) => {
  console.log(props);
  return (
    <div className="p-3 flex flex-col">
      {<DataTable columns={columns} data={props?.appointments} pageSize={5}/>}
    </div>
  );
};

export default MedicineAppointments;

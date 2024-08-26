"use client";

import { Appointment } from "@/lib/typings";
import { medicinesColumns } from "../../../app/admin/appointments/columns";
import { DataTable } from "@/components/AdminPanelComponents/data-table";

interface Props {
  appointments: Appointment[];
}

const MedicineAppointments = (props: Props) => {
  console.log(props);
  return (
    <div className="p-3 flex flex-col">
      {<DataTable columns={medicinesColumns} data={props?.appointments} pageSize={5} />}
    </div>
  );
};

export default MedicineAppointments;

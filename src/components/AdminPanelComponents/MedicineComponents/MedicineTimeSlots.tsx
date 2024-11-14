import { Separator } from "@/components/ui/separator";
import { dayTimeSlotResponses } from "@/lib/typings";
import { formatTime24to12 } from "@/lib/utils";
import MedicineDayTimeSlotModal from "./MedicineDayTimeSlotModal";

interface Props {
  medicineDayTimeSlotReponse: dayTimeSlotResponses[];
  duration: number;
  medicineId: string;
  setModal: any;
  modal: boolean;
  medicineAllocateTimeSlot?: any;
}

const MedicineTimeSlots = (props: Props) => {

  return (
    <div className="w-full flex flex-col px-5 gap-3 relative">
      <div className="absolute right-5 top-0">
        <MedicineDayTimeSlotModal
          id={props?.medicineId}
          medicineDayTimeSlotReponse={props?.medicineDayTimeSlotReponse}
          setModalOpen={props?.setModal}
          modalOpen={props?.modal}
          medicineAllocateTimeSlot={props?.medicineAllocateTimeSlot}
        />
      </div>

      <div className="flex flex-col gap-2 mb-4 text-left mt-5">
        <h1 className="text-xs font-semibold text-gray-800">Duration :    {props?.duration ? `${props?.duration} minutes` : "Not Available"}</h1>
        <div className="text-xs font-semibold text-gray-600">
        
        </div>
      </div>
      <div className="flex flex-col w-full gap-2">
        <h1 className="text-xs font-semibold text-gray-800">Timeslots</h1>
        <div className="overflow-x-auto w-full">
  {props?.medicineDayTimeSlotReponse ? (
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 w-1/2 text-center">Day</th>
          <th className="py-3 px-6 w-1/2 text-center">Timeslot</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm font-medium">
        {props?.medicineDayTimeSlotReponse.map((dayTimeSlot: dayTimeSlotResponses) => (
          <tr key={dayTimeSlot.day} className="border-b border-gray-200">
            <td className="py-3 px-6 w-1/2 text-center  whitespace-nowrap text-xs font-semibold text-gray-600">
              {dayTimeSlot.day}
            </td>
            <td className="py-3 px-6 w-1/2">
              {dayTimeSlot?.medicineTimeSlots ? (
                <div className="flex flex-col gap-1">
                  {dayTimeSlot.medicineTimeSlots.map((timeslot: any, index: any) => (
                    <div
                      key={index}
                      className="p-2 text-xs font-semibold text-center rounded-md  mb-1"
                    >
                      {formatTime24to12(timeslot.startTime)} - {formatTime24to12(timeslot.endTime)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center">No timeslots available!</div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="text-xs font-semibold text-center justify-center items-center align-middle text-red-600">
      No Time Slots Available
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default MedicineTimeSlots;


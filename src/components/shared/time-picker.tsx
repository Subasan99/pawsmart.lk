"use client";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";

type TimePickerProps = {
  value: string;
  onChange: (time: string) => void;
  values: any;
  startTime?: boolean;
};

const TimePicker = ({
  value,
  onChange,
  values,
  startTime,
}: TimePickerProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const times = [
    { label: "09:00 AM", value: "09:00:00" },
    { label: "10:00 AM", value: "10:00:00" },
    { label: "11:00 AM", value: "11:00:00" },
    { label: "12:00 PM", value: "12:00:00" },
    { label: "01:00 PM", value: "13:00:00" },
    { label: "02:00 PM", value: "14:00:00" },
    { label: "03:00 PM", value: "15:00:00" },
    { label: "04:00 PM", value: "16:00:00" },
    { label: "05:00 PM", value: "17:00:00" },
    { label: "06:00 PM", value: "18:00:00" },
    { label: "07:00 PM", value: "19:00:00" },
    { label: "08:00 PM", value: "20:00:00" },
    { label: "09:00 PM", value: "21:00:00" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{value || "Select Time"}</Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-[200px] w-fit overflow-y-auto">
        {/* {!startTime && values?.startTime? (
          <>
            {times
            //   .filter((time: any) => {
            //     console.log(time);
            //     const hour = parseInt(time.value.split(":")[0]);
            //     return hour >= parseInt(values?.startTime.split(":")[0]);
            //   })
              .map((time: any) => (
                <div
                  key={time.value}
                  onClick={() => {
                    onChange(time.value);
                    setOpen(false);
                  }}
                  className={`cursor-pointer p-2 hover:bg-gray-200 ${
                    time === value ? "bg-black text-white" : ""
                  }`}
                >
                  {time.label}
                </div>
              ))}
          </>
        ) : startTime ? (
          <>
            {times
            //   .filter((time: any) => {
            //     const hour = parseInt(time.value.split(":")[0]);
            //     return hour <= parseInt(values?.endTime.split(":")[0]);
            //   })
              .map((time: any) => (
                <div
                  key={time.value}
                  onClick={() => {
                    onChange(time.value);
                    setOpen(false);
                  }}
                  className={`cursor-pointer p-2 hover:bg-gray-200 ${
                    time === value ? "bg-black text-white" : ""
                  }`}
                >
                  {time.label}
                </div>
              ))}
          </>
        ) : ( */}
          <>
            {times.map((time: any) => (
              <div
                key={time.value}
                onClick={() => {
                  onChange(time.value);
                  setOpen(false);
                }}
                className={`cursor-pointer p-2 hover:bg-gray-200 ${
                  time === value ? "bg-black text-white" : ""
                }`}
              >
                {time.label}
              </div>
            ))}
          </>
        {/* // )} */}
      </PopoverContent>
    </Popover>
  );
};

export default TimePicker;

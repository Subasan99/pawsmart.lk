// components/Dropdown.tsx
import React, { useEffect, useState } from "react";
import { DateValue  } from "@nextui-org/react";
import { Calendar } from "./ui/calendar";
import {DatePicker} from "@nextui-org/react";
// import { css } from '@nextui-org/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import moment from "moment";
import {
  appointmentbooking,
  getDoctorData,
  getSpecializationData,
} from "@/app/(signedin)/home/action";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDoctorStore } from "@/store/doctorStore";

interface AppointmentProps {
  message: string;
  startDate: string;
  serialNumber: string;
  options: { label: string; value: string }[];
  doctors: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  handleDateChange: (value: string) => void;
  handleSerialNumberChange: (value: string) => void;
  handleDoctorChange: (value: string) => void;
  handleMessageChange: (value: string) => void;
  handleCalendarChange: (value: string) => void;
}

const Appointment: React.FC<AppointmentProps> = ({
  message,
  startDate,
  serialNumber,
  options,
  doctors,
  selectedValue,
  onChange,
  handleSerialNumberChange,
  handleDoctorChange,
  handleMessageChange,
  handleCalendarChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [specializationId, setSpecializationId] = useState("");

  const SearchParams = useSearchParams();

  const doctorss: any = SearchParams.get("imageQuery");
  console.log(doctorss, "hdshfsdjfhsd");

  const queryData = JSON.parse(doctorss);

  // docName = queryData.imageName || "";
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const datesearch = searchParams.get("date");
  const dateOnly = moment(datesearch).format("YYYY-MM-DD");
  const specializationName = searchParams.get("specializationName");
  const doctorName = searchParams.get("doctorName");

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [doctor, setAllDoctors] = useState([]); // Initialize an empty array
  const [specialization, setSpecialization] = useState([]); // Initialize an empty array
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);

  const timeparams = searchParams.get("time");
  const timeonly = moment(timeparams, "HH:mm:ss").format("hh:mm A");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  const handleDateClick = () => {
    setShowCalendar(!showCalendar);
  };
  console.log(timeparams, "dsnskdjnfsjkd");

  useEffect(() => {
    fetchData();
  }, []);
  const onDateChange = (date: Date) => {
    // setSelectedDate(date);
    console.log(date, "THANUJAN");
    setShowCalendar(!showCalendar);
    // handleDateChange(date);
  };

  const fetchData = async () => {
    try {
      const specializationData = await getSpecializationData();
      const doctorData = await getDoctorData();

      setAllDoctors(doctorData);
      setSpecialization(specializationData);

      console.log(doctorData, "dsfsdfsdfsdf");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const doctores = Array.isArray(doctor)
    ? doctor.map((doctor: any) => ({
        id: doctor.id,
        name: doctor.firstName,
        specializationId: doctor.specializationId,
      }))
    : [];

  const filteredDoctors = Array.isArray(doctor)
    ? doctor
        .filter((doc: any) => doc.specializationId === specializationId) // Filter doctors by selected specialization ID
        .map((doctor: any) => ({
          id: doctor.id,
          name: doctor.firstName,
        }))
    : [];

  console.log("Filtered Doctors:", filteredDoctors);

  const specializationData = Array.isArray(specialization)
    ? specialization.map((specialization: any) => ({
        id: specialization.id,
        name: specialization.specializationName,
      }))
    : [];

  const handleSelect = (id: any, specialization: any) => {
    setSpecializationId(id);
    setSelectedSpecialization(specialization);
    setSelectedDoctor(null); // Reset selected doctor when specialization changes

    console.log("Selected specialization ID:", id);
    // You can perform additional actions here, like making an API call or updating another part of your UI.
  };

  const handleDoctorSelect = (id: string, name: string) => {
    setSelectedDoctor(name);
    handleDoctorChange(id); // Update the selected doctor ID in parent component or state
  };


  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);

    setSuccessMessage("");
    setErrorMessage("");
    try {
      const response = await appointmentbooking(
        2,
        dateOnly,
        timeonly,
        message,
        "DOCTOR",
        4
      );
      await setSuccessMessage("Booking successful!");
      await router.push("/Appointments");

      console.log("Booking successful:", response);
      // Clear form or perform other actions after successful booking
    } catch (error) {
      setErrorMessage("Booking failed. Please try again.");
      console.error("Booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div className="max-w-md  mx-auto   p-10 border rounded shadow-md my-8 bg-white">
        <h2 className="text-xl flex w-full mb-2">Appointment Booking</h2>
        <hr className="mb-4 " />
        {/* <form onSubmit={handleSubmit}> */}
        <div className="mb-4 relative">
          <div className="flex items-center self-center content-center border border-gray-400 rounded px-3 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {selectedSpecialization
                  ? selectedSpecialization
                  : "Select Specialization"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuLabel>Wellness</DropdownMenuLabel> */}
                <DropdownMenuSeparator />
                {specializationData.map((specialization) => (
                  <DropdownMenuItem
                    key={specialization.id}
                    onSelect={() =>
                      handleSelect(specialization.id, specialization.name)
                    }
                  >
                    {specialization.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 mb-4 relative">
            <div className="flex items-center self-center content-center border border-gray-400 rounded px-3 py-2">
              {/* <input
            type="date"
            className="block w-full text-gray-700 bg-transparent focus:outline-none"
            placeholder="mm/dd/yyyy"
            onChange={(e: any) => handleCalendarChange(e.target.value)}
          /> */}
              {/* <DropdownMenu>
                <DropdownMenuTrigger>Select Doctor</DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  {doctores.map((doctor) => (
                    <DropdownMenuItem key={doctor.id}>
                      {doctor.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu> */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {selectedDoctor ? selectedDoctor : "Select Doctor"}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  {filteredDoctors.map((doctor) => (
                    <DropdownMenuItem
                      key={doctor.id}
                      onSelect={() =>
                        handleDoctorSelect(doctor.id, doctor.name)
                      }
                    >
                      {doctor.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* {isCalendarOpen && (
          <div className="absolute mt-2 bg-white border border-gray-300 shadow-lg z-10">
            <Calendar
              aria-label="Date (controlled)"
              onChange={(e: any) => handleSerialNumberChange(e.target.value)}
            />
          </div>
        )} */}
        </div>

        {/* <div className="mb-4  text-gray-700">
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => handleSerialNumberChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Serial Number"
        />
      </div> */}
        <div className="mb-4  text-gray-700">
          {/* <select
          value={selectedDoctor}
          onChange={(e) => handleDoctorChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select> */}
          <div className=" w-full flex-wrap md:flex-nowrap gap-4 flex items-center self-center content-center border border-gray-400 rounded px-3 py-2">
            {/* <input
            type="date"
            className="block w-full text-gray-700 bg-transparent focus:outline-none"
            placeholder="mm/dd/yyyy"
            onChange={(e: any) => handleCalendarChange(e.target.value)}
          /> */}
             <DatePicker 
          className="max-w-[284px]"
          // isRequired
          //   css={calendarBackgroundStyle}

        />
          </div>
        </div>
        <div className="mb-4">
          {/* <select
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          {doctors.map((doctor) => (
            <option key={doctor.value} value={doctor.value}>
              {doctor.label}
            </option>
          ))}
        </select> */}
          <div className="flex items-center border border-gray-400 rounded px-3 py-2">
            {/* <input
            type="date"
            className="block w-full text-gray-700 bg-transparent focus:outline-none"
            placeholder="mm/dd/yyyy"
            onChange={(e: any) => handleCalendarChange(e.target.value)}
          /> */}
            <DropdownMenu>
              <DropdownMenuTrigger>Avalible times</DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* <DropdownMenuLabel>Doctors</DropdownMenuLabel> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem>9.30pm</DropdownMenuItem>
                <DropdownMenuItem>10.3pm</DropdownMenuItem>
                <DropdownMenuItem>11.30pm</DropdownMenuItem>
                <DropdownMenuItem>12.30pm</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="mb-4">
          <textarea
            value={message}
            onChange={(e) => handleMessageChange(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Create Message"
          />
        </div>
        <div>{/* Your form elements */}</div>
        <div className="mb-4">
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-blue-700"
          >
            {isLoading ? "Booking..." : "Book Appointment"}
          </button>
          {successMessage && (
            <div className="success w-full flex text-lg mt-4">
              {successMessage}
            </div>
          )}
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
        {/* </form> */}
      </div>
      <div className="text-xs mt-5 mb-2  align-center justify-center ">
        No money charged in this step
      </div>
    </div>
  );
};

export default Appointment;

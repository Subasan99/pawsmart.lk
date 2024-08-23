// components/Dropdown.tsx
import React, { useEffect, useState } from "react";
import { DateValue } from "@nextui-org/react";
import { Calendar } from "./ui/calendar";
import { DatePicker } from "@nextui-org/react";
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
  getDoctorData,
  getSpecializationData,
} from "@/app/(signedin)/home/action";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, formatTime24to12 } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDoctorStore } from "@/store/doctorStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import TimePicker from "./shared/time-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Doctor } from "@/lib/typings";
import { Textarea } from "./ui/textarea";
import { getLoginUserDetails } from "@/api/route";
import { useAuthStore } from "@/store/authStore";
import { createAppointment } from "@/app/(signedin)/(menubar)/appointmentdoctor/action";

interface AppointmentProps {
  userId: string | undefined;
  message: string;
  startDate: string;
  serialNumber: string;
  options: { label: string; value: string }[];
  doctors: { label: string; value: string }[];
  selectedValue: string;
  selectedDoctor: any;
  onChange: (value: string) => void;
  handleDateChange: (value: string) => void;
  handleSerialNumberChange: (value: string) => void;
  handleDoctorChange: (value: string) => void;
  handleMessageChange: (value: string) => void;
  handleCalendarChange: (value: string) => void;
  login?: any;
}

const formSchema = z.object({
  id: z.string({ required_error: "Please select an option!" }),
  bookingDate: z.date({
    required_error: "Please select a date for the appointment!",
  }),
  time: z.string({
    required_error: "Please select a time for the appointment!",
  }),
  description: z.string({
    required_error: "Please Enter your reason for the appointment!",
  }),
  bookingType: z.string({
    required_error: "Appointment Type is not selected!",
  }),
  userId: z.number(),
  petName: z.string({ required_error: "Please Enter your pet's name!" }),
  petAge: z.number({ required_error: "Please select your pet's Age!" }),
  petType: z.string({ required_error: "Please select the pet type!" }),
});

const Appointment: React.FC<AppointmentProps> = () => {
  const [login] = useAuthStore((state) => [state.login]);
  // const [login, setLogin] = useState<any | undefined>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      bookingDate: undefined,
      time: undefined,
      description: undefined,
      bookingType: "DOCTOR",
      userId: login?.userId,
      petName: undefined,
      petAge: 1,
      petType: undefined,
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const SearchParams = useSearchParams();

  const doctorss: any = SearchParams.get("imageQuery");

  // docName = queryData.imageName || "";
  const searchParams = useSearchParams();

  const datesearch = searchParams.get("date");

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [doctor, setAllDoctors] = useState<Doctor[]>([]); // Initialize an empty array
  const [specialization, setSpecialization] = useState([]); // Initialize an empty array

  const [selecteddDoctor, setSelecteddDoctor] = useState<string | null>(null);

  // async function getLoginDetailss() {
  //   const details = await getLoginUserDetails();
  //   setLogin(details);
  // }

  useEffect(() => {
    fetchData();
  }, []);

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      bookingDate: moment(values.bookingDate).format("YYYY-MM-DD"),
    });
    createAppointment({
      ...values,
      bookingDate: moment(values.bookingDate).format("YYYY-MM-DD"),
      userId: values.userId.toString(),
    }).then((res: any) => console.log(res));
  }

  console.log(form.getValues());

  return (
    <div className="w-full">
      <div className="md:max-w-md gap-3 w-full flex flex-col items-center px-2 py-10 border rounded shadow-md my-8 bg-white">
        <h2 className="text-xl flex w-full justify-center text-center mb-2">
          Appointment Booking
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 flex flex-col px-2 w-full"
          >
            <div className="flex flex-col w-full md:w-fit md:flex-row gap-2">
              <FormField
                control={form.control}
                name="petName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-md">
                      Your Pet&apos;s Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Pet's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="petAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-md">
                      Your Pet&apos;s age
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Select.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-full md:w-fit md:flex-row gap-2">
              <FormField
                control={form.control}
                name="petType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-md">
                      Your Pet&apos;s type
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your Pet's type.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-full md:w-full md:flex-row gap-2 ">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full">
                    <FormLabel className="text-xs md:text-md">
                      Select a doctor
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelecteddDoctor(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a doctor">
                              {field.value
                                ? doctor.find(
                                    (doc: Doctor) => doc.id === field.value
                                  )?.firstName
                                : "Select a doctor"}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {doctor.length > 0 ? (
                            <>
                              {doctor.map((doctor: Doctor) => {
                                return (
                                  <SelectItem
                                    onSelect={(value: any) =>
                                      console.log(value)
                                    }
                                    key={doctor.id}
                                    value={doctor.id}
                                  >
                                    {doctor.firstName}
                                  </SelectItem>
                                );
                              })}
                            </>
                          ) : (
                            <>No options</>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-full md:w-full md:flex-row gap-2 ">
              <FormField
                control={form.control}
                name="bookingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1 grow">
                    <FormLabel className="text-xs md:text-md">
                      Appointment Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger
                        disabled={selecteddDoctor ? false : true}
                        asChild
                      >
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="">Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        {doctor
                          .find(
                            (doctor: Doctor) => doctor.id === selecteddDoctor
                          )
                          ?.dayTimeSlotResponses.some(
                            (day: any) =>
                              day.day ===
                              moment(date).format("dddd").toUpperCase()
                          )}
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) => field.onChange(date)}
                          disabled={(date) => {
                            const doctorAvailability = doctor.find(
                              (doc: Doctor) =>
                                doc.id == selecteddDoctor?.toString()
                            )?.dayTimeSlotResponses;

                            if (!doctorAvailability) return true; // If no availability, disable all dates

                            const isDateAvailable = doctorAvailability.some(
                              (day: any) => {
                                return (
                                  day.day ===
                                  moment(date).format("dddd").toUpperCase()
                                );
                              }
                            );

                            return (
                              date < new Date() ||
                              date < new Date("1900-01-01") ||
                              !isDateAvailable
                            );
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1 grow">
                    <FormLabel className="text-xs md:text-md">
                      Select a time
                    </FormLabel>
                    <FormControl>
                      <TimePicker
                        disabled={form.getValues("bookingDate") ? false : true}
                        values={form.getValues()}
                        appointmentTimes={
                          doctor
                            .find(
                              (doc: Doctor) =>
                                doc.id == selecteddDoctor?.toString()
                            )
                            ?.dayTimeSlotResponses?.find(
                              (day: any) =>
                                day.day ===
                                moment(form.getValues("bookingDate"))
                                  .format("dddd")
                                  .toUpperCase()
                            )?.appointmentTimes
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col w-full md:flex-row gap-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormLabel className="text-xs md:text-md">
                      Your Reason for the appointment
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your reason here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {login ? (
              <Button className="px-3 md:w-fit self-center" type="submit">
                Submit
              </Button>
            ) : (
              <a
                href={"/signin"}
                className="px-3 cursor-pointer py-3 md:w-fit self-center bg-primary text-white rounded-lg"
              >
                Login to continue
              </a>
            )}
          </form>
        </Form>
        {/* <form onSubmit={handleSubmit}> */}
        {/* <div className="mb-4 relative w-full">
          <div className="flex items-center self-center content-center border border-gray-400 rounded px-3 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {selectedSpecialization
                  ? selectedSpecialization
                  : "Select Specialization"}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
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

          
        </div>
        <div className="mb-4  text-gray-700">
          <div className=" w-full flex-wrap md:flex-nowrap gap-4 flex items-center self-center content-center border border-gray-400 rounded px-3 py-2">
            <DatePicker
              className="max-w-[284px]"
              // isRequired
              //   css={calendarBackgroundStyle}
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center border border-gray-400 rounded px-3 py-2">
            <DropdownMenu>
              <DropdownMenuTrigger>Avalible times</DropdownMenuTrigger>
              <DropdownMenuContent>
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
        </div> */}
      </div>
      <div className="text-xs mt-5 mb-2  align-center justify-center ">
        No money charged in this step
      </div>
    </div>
  );
};

export default Appointment;

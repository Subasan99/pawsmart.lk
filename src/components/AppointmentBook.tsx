// components/Dropdown.tsx
import { createAppointment } from "@/app/(signedin)/(menubar)/appointmentdoctor/action";
import { getDoctorData } from "@/app/home/action";
import { getMedicineData } from "@/app/admin/medicines/action";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Doctor, Medicine } from "@/lib/typings";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import TimePicker from "./shared/time-picker";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { useDoctorStore } from "@/store/doctorStore";
import Loader from "./Loader";

interface AppointmentProps {
  userId: string | undefined;
  message: string;
  startDate: string;
  serialNumber: string;
  options: { label: string; value: string }[];
  doctors: { label: string; value: string }[];
  medicines: { label: string; value: string }[];
  selectedValue: string;
  selectedDoctor: any;
  onChange: (value: string) => void;
  handleDateChange: (value: string) => void;
  handleSerialNumberChange: (value: string) => void;
  handleDoctorChange: (value: string) => void;
  handleMedicineChange: (value: string) => void;
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
  const searchParams = useSearchParams();
  // const [login, setLogin] = useState<any | undefined>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: searchParams.get("doctorId")
        ? searchParams.get("doctorId")!
        : searchParams.get("medicineId")
        ? searchParams.get("medicineId")!
        : undefined,
      bookingDate: undefined,
      time: undefined,
      description: undefined,
      bookingType: searchParams.get("doctorId") ? "DOCTOR" : "MEDICINE",
      userId: login?.userId,
      petName: undefined,
      petAge: 1,
      petType: undefined,
    },
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // docName = queryData.imageName || "";

  // const datesearch = searchParams.get("date");

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const [doctors, setAllDoctors, setSelectedDoctor, setLoading] =
    useDoctorStore((state: any) => [
      state.doctors,
      state.setAllDoctors,
      state.setSelectedDoctor,
      state.setLoading,
    ]);

  // const [doctor, setAllDoctors] = useState<Doctor[]>([]); // Initialize an empty array
  const [medicine, setAllMedicines] = useState<Medicine[]>([]); // Initialize an empty array

  const [selecteddDoctor, setSelecteddDoctor] = useState<string | null>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);

  // async function getLoginDetailss() {
  //   const details = await getLoginUserDetails();
  //   setLogin(details);
  // }

  console.log(doctors);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [doctorData, medicineData] = await Promise.all([
        getDoctorData(),
        getMedicineData(),
      ]);
      console.log(doctorData, medicineData);

      if (searchParams.get("doctorId")) {
        setSelecteddDoctor(searchParams.get("doctorId")!);
      } else if (searchParams.get("medicineId")) {
        setSelectedMedicine(searchParams.get("medicineId")!);
      }

      setAllDoctors(doctorData);
      setAllMedicines(medicineData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      ...values,
      bookingDate: moment(values.bookingDate).format("YYYY-MM-DD"),
    });
    createAppointment({
      ...values,
      bookingDate: moment(values.bookingDate).format("YYYY-MM-DD"),
      userId: values.userId.toString(),
    }).then((res: any) => {
      if (res.success) {
        toast.success(res.message);
        router.push("/home");
      } else if (res.success === false) {
        toast.error(res.message);
      } else {
        toast.error("Oops! Something went wrong. Please try again!");
      }
    });
  }

  console.log(form.getValues());

  // if (!doctor.length) {
  //   return <div>Loading ... !</div>;
  // }

  if (medicine.length === 0 && searchParams.get("medicineId")) {
    return (
      <div className="w-full">
        <div className="md:max-w-md gap-3 w-md flex flex-col items-center px-2 py-10 border rounded shadow-md my-8 bg-white">
          <Loader className="h-10 w-10" />
        </div>
      </div>
    );
  }

  if (medicine.length === 0 && searchParams.get("doctorId")) {
    return (
      <div className="w-full">
        <div className="md:max-w-md gap-3 w-md flex flex-col items-center px-2 py-10 border rounded shadow-md my-8 bg-white">
          <Loader className="h-10 w-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="md:max-w-md gap-3 flex flex-col items-center px-2 py-10 border rounded shadow-md my-8 bg-white">
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

            <div className="flex flex-col w-full md:w-full md:flex-row gap-2">
              {searchParams.get("doctorId") && (
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2 w-full">
                      <FormLabel className="text-xs md:text-md">
                        Select a Doctor
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            console.log(value);
                            field.onChange(value);
                            // setSelecteddDoctor(value);
                            setLoading(true);
                            setSelectedDoctor(
                              doctors.find(
                                (doc: any) => doc.id === parseInt(value)
                              )
                            );
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            {/* <SelectValue> */}
                            {field.value
                              ? doctors.find(
                                  (doc: any) => doc.id === parseInt(field.value)
                                )?.name
                              : "Select an option"}
                            {/* </SelectValue> */}
                          </SelectTrigger>
                          <SelectContent>
                            {doctors.length ? (
                              doctors.map((doc: any) => (
                                <SelectItem key={doc.id} value={doc.id}>
                                  {doc.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem disabled value={""}>
                                No options
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {searchParams.get("medicineId") && (
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2 w-full">
                      <FormLabel className="text-xs md:text-md">
                        Select Medicine
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedMedicine(value);
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a medicine">
                              {field.value
                                ? medicine.find((med) => med.id === field.value)
                                    ?.name
                                : "Select an option"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {medicine.length ? (
                              medicine.map((med) => (
                                <SelectItem key={med.id} value={med.id}>
                                  {med.name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem disabled value={""}>
                                No options
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="flex flex-col w-full md:w-full md:flex-row gap-2 ">
              {searchParams.get("doctorId") && (
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
                          {doctors
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
                              const doctorAvailability = doctors.find(
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
              )}
              {searchParams.get("medicineId") && (
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
                          disabled={selectedMedicine ? false : true}
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
                          {medicine
                            .find(
                              (medicine: Medicine) =>
                                medicine.id === selectedMedicine
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
                              const medicineAvailability = medicine.find(
                                (doc: Medicine) =>
                                  doc.id == selectedMedicine?.toString()
                              )?.dayTimeSlotResponses;

                              if (!medicineAvailability) return true; // If no availability, disable all dates

                              const isDateAvailable = medicineAvailability.some(
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
              )}
              {searchParams.get("doctorId") ? (
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
                          disabled={
                            form.getValues("bookingDate") ? false : true
                          }
                          values={form.getValues()}
                          appointmentTimes={
                            doctors
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
              ) : (
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
                          disabled={
                            form.getValues("bookingDate") ? false : true
                          }
                          values={form.getValues()}
                          appointmentTimes={
                            medicine
                              .find(
                                (doc: Medicine) =>
                                  doc.id == selectedMedicine?.toString()
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
              )}
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
                href={"/auth?mode=signin"}
                className="px-3 cursor-pointer py-3 md:w-fit self-center bg-primary text-white rounded-lg"
              >
                Login to continue
              </a>
            )}
          </form>
        </Form>
        <div className="text-xs mt-5 mb-2  align-center justify-center ">
          No money charged in this step
        </div>
      </div>
    </div>
  );
};

export default Appointment;

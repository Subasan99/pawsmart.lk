"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/ui/date-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import GenderPicker from "@/components/shared/gender-picker";
import { useEffect, useState } from "react";
import { useSpecializationStore } from "@/store/specializationStore";
import { getAllSpecializations } from "@/api/route";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { MultiSelect } from "@/components/shared/multi-select";
import { createDoctor } from "@/app/(admin)/doctors-admin/action";
import { Doctor } from "@/lib/typings";

const formSchema = z.object({
  firstName: z.string({ required_error: "First name is required!" }),
  lastName: z.string({ required_error: "Last name is required!" }),
  email: z.string().email("Please enter a valid email!"),
  // regex added for sri lankan number, change the regex for required country
  phoneNo: z
    .string({ required_error: "Phone number is required!" })
    .regex(
      /^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$/,
      "Please enter a valid phone number"
    ),
  dateOfBirth: z.date({ required_error: "Please Select the date of birth!" }),
  gender: z.string({ required_error: "Gender is required!" }),
  specializationId: z.string({
    required_error: "Please select a specilization!",
  }),
  description: z.string({ required_error: "Description is required!" }),
  duration: z.number({ required_error: "Duration is required!" }),
  petIds: z.array(z.string()),
  // dayAllocationRequestList: z.array(
  //   z.object({
  //     day: z.string({ required_error: "Day is required!" }),
  //     timeSlots: z.array(
  //       z.object({
  //         startTime: z.string({ required_error: "Start time is required!" }),
  //         endTime: z.string({ required_error: "End time is required!" }),
  //       })
  //     ),
  //   })
  // ),
});

type Props = {
  specialization: any;
  setOpen: any;
  doctor?: Doctor;
};

const DoctorCreateForm = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      phoneNo: undefined,
      dateOfBirth: undefined,
      gender: undefined,
      specializationId: undefined,
      description: undefined,
      duration: 15,
      petIds: [],
      // dayAllocationRequestList: undefined,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    createDoctor(values);
  }

  console.log(form.getValues());

  //   if (loading && specialization.length == 0) {
  //     return <>Loading</>;
  //   }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
        <div className="w-full flex gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="w-4/5" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    onInput={(e) => {
                      if (e.target instanceof HTMLInputElement) {
                        e.target.value = e.target.value.replace(/[^0-9+]/g, "");
                      }
                    }}
                    className="w-4/5"
                    placeholder="Phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger className="w-full" asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
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
            name="gender"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="specializationId"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Specialization</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.specialization.length > 0 ? (
                      props.specialization.map((specialization: any) => {
                        return (
                          <SelectItem
                            key={specialization.id}
                            value={specialization.id}
                          >
                            {specialization.specializationName}
                          </SelectItem>
                        );
                      })
                    ) : (
                      <div className="px-3 font-semibold text-gray-400 text-center">
                        No options
                      </div>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="petIds"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Pets</FormLabel>
                <MultiSelect
                  options={[1, 2, 3, 4]}
                  onChange={field.onChange}
                  selectedValues={field.value}
                  placeholder={"Choose"}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Doctor description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <div className="w-full flex items-center space-x-2">
                    <span className="font-semibold text-gray-600 text-sm">
                      15mts
                    </span>
                    <Slider
                      max={60}
                      step={15}
                      min={15}
                      onChange={(e: any) => {
                        field.onChange(parseInt(e.target.value));
                      }}
                    />
                    <span className="font-semibold text-gray-600 text-sm">
                      60mts
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default DoctorCreateForm;

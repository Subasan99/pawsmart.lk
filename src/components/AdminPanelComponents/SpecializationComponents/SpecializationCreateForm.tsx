"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { useState } from "react";
import { createSpecialization } from "@/app/(admin)/specializations-admin/action";

const formSchema = z.object({
  specializationName: z.string().nonempty("Specialization name is required!"),
  departmentId: z.string().nonempty("Department is required!"),
  description: z.string().optional(),
});

type Department = {
  id: string;
  departmentName: string;
};

type Props = {
  setOpen: (open: boolean) => void;
  reloadTable: () => void;
  department?: Department[]; // Make this optional
};

const SpecializationCreateForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specializationName: "",
      departmentId: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await createSpecialization(values);
      props.setOpen(false); // Close the form
      props.reloadTable(); // Reload the table
    } catch (error) {
      console.error("Failed to create specialization:", error);
      // Optionally set an error state here
    } finally {
      setLoading(false);
    }
  }

  // Provide a default empty array if props.department is undefined
  const departments = props.department || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
        <div className="w-full gap-2">
          <FormField
            control={form.control}
            name="specializationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specialization name</FormLabel>
                <FormControl>
                  <Input placeholder="Specialization name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  value={field.value} // Manage the value directly
                  onValueChange={(value) => field.onChange(value)}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.length > 0 ? (
                      departments.map((department) => (
                        <SelectItem
                          key={department.id}
                          value={department.id}
                        >
                          {department.departmentName}
                        </SelectItem>
                      ))
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
        </div>
        <Button
          className="bg-red-500"
          type="submit"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default SpecializationCreateForm;

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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createPet } from "@/app/admin/pets/action";

const formSchema = z.object({
  name: z.string({ required_error: "Pet name is required!" }),
  description: z.string(),
});

type Props = {
  setOpen: (open: boolean) => void;
  reloadTable: () => void; // Assuming you pass a function to reload the table
};

const PetCreateForm = ({ setOpen, reloadTable }: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      description: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await createPet(values);
      setOpen(false); // Close the form
      reloadTable(); // Reload the table
    } catch (error) {
      console.error("Failed to create pet:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
        <div className="w-full gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pet name</FormLabel>
                <FormControl>
                  <Input placeholder="Pet name" {...field} />
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
        </div>
        <Button className="bg-red-500" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PetCreateForm;

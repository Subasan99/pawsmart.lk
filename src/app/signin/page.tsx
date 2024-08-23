"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginUser } from "./action";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string({ required_error: "Please enter your email!" })
    .email("Please enter a valid email!"),
  password: z.string({ required_error: "Please enter your password!" }),
});

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setLoading(true);
    const response = await loginUser({
      email: values.email,
      password: values.password,
    });
    console.log(response);
    if (response.success) {
      toast.success(response.message, {
        onDismiss: () => router.push("/home"),
        onAutoClose: () => router.push("/home"),
      });
      setLoading(false);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  }
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    // name: '',
    email: "",
    password: "",
    // confirmPassword: '',
  });

  const backgroundImageStyle = {
    backgroundImage: "url(/SignUp.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInfo((currInfo) => ({
      ...currInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (userInfo.password !== userInfo.confirmPassword) {
    //   alert('Passwords do not match!');
    //   return;
    // }

    try {
      const response = await loginUser({
        email: userInfo.email,
        password: userInfo.password,
      });

      console.log("User Info Submitted:", response);

      if (response.success) {
        toast.success(response.message, {
          onDismiss: () => router.push("/home"),
        });
      } else {
        toast.error(response.message);
      }
      // Redirect to dashboard after successful registration
      // router.push('/dashboard');
    } catch (error) {
      toast.error("Oops! Something went wrong. Try again.");
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <main className="h-screen">
      <header className="w-full h-full">
        <section className="w-full h-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
            <div
              className="col-span-1 lg:col-span-2 bg-blue-500 flex items-center justify-center p-10"
              style={backgroundImageStyle}
            ></div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="bg-white flex flex-col pl-20 pr-20 gap-2">
                  <Image
                    src="/stubby.png"
                    alt="Company Logo"
                    width={217}
                    height={72}
                    className="mt-20 mb-5"
                  />

                  {/* <div className="border border-gray-300 rounded inline-block pl-3 pt-2 mb-5">
                  <label className="block text-black text-xs/[17px]">
                    USER NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="User Name"
                    className="text-xs w-full border-none outline-none"
                    onChange={handleChange}
                    value={userInfo.name}
                  />
                </div> */}

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Email Adress.." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <div className="border border-gray-300 rounded inline-block pl-3 pt-2 mb-5">
                  <label className="block text-black text-xs/[17px]">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="text-xs w-full border-none outline-none"
                    onChange={handleChange}
                    value={userInfo.confirmPassword}
                  />
                </div> */}

                  <div>
                    <button
                      disabled={loading}
                      type="submit"
                      className="py-2 px-8 bg-purple-600 text-white border-none rounded text-xm cursor-pointer hover:scale-100"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </header>
    </main>
  );
};

export default SignUp;

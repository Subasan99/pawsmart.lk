"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { changePassword } from "./action";
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
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { signOut } from "@/api/route";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  oldPassword: z.string({ required_error: "Please enter your password!" }),
  newPassword: z.string({ required_error: "Please enter your password!" }),


});

const ChangePassword = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: undefined,
      newPassword: undefined,

    },
  });



  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await changePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
    console.log(response);
    if (response.success) {
   
      toast.success(response?.message);
      await signOut();
      await router.push('/signin');
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
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
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
                  
                  
                  <FormField
                  control={form.control}
                name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                       <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showOldPassword ? "text" : "password"}
                            placeholder="password.."
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={toggleOldPasswordVisibility}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                          >
                            {showOldPassword ?    <Eye className="ml-auto h-6 w-6 opacity-50" /> :   <EyeOff className="ml-auto h-6 w-6 opacity-50" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


{/* 
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input placeholder="Old Password.." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
{/* 
<FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input placeholder="New Password.." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 */}


 <FormField
        control={form.control}
      name="newPassword"
        render={({ field }) => (
          <FormItem>
           <FormLabel>New Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="password.."
                  {...field}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
                >
                  {showPassword ?    <Eye className="ml-auto h-6 w-6 opacity-50" /> :   <EyeOff className="ml-auto h-6 w-6 opacity-50" />}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

                  <div>
                    <button
                      disabled={loading}
                      type="submit"
                      className="py-2 px-8 bg-purple-600 text-white border-none rounded text-xm cursor-pointer hover:scale-100"
                    >
                    Change Password
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

export default ChangePassword;

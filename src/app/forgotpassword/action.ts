"use server";
import { axiosInstance } from "@/utils/client";
import { cookies } from "next/headers";

export const forgotPassword = async (email: string) => {
  
  try {

    const response = await axiosInstance.post(`/user/forgotPassword/${email}`, {
   
    });
   
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

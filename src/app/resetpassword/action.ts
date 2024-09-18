"use server";
import { axiosInstance } from "@/utils/client";
import { cookies } from "next/headers";

export const resetPassword =  async (userData: {
  otp: string;
  password: string;
}) => {
  try {

    const response = await axiosInstance.put(`/user/resetPassword`, {
      otp: userData.otp,
      password: userData.password,
    });
   
    console.log("response.datathusi",response);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

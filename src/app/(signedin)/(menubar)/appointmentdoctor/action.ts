"use server";

import { AppointmentCreate } from "@/lib/typings";
import { axiosInstance } from "@/utils/client";

export async function createAppointment(values: AppointmentCreate) {
  try {
    const response = await axiosInstance.post(`/booking`, values);
    console.log("appointment create: ", response);
    return response.data;
  } catch (error) {
    console.log("Error creating appointment :", error);
  }
}

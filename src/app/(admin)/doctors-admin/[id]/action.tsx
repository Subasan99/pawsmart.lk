"use server";

import { axiosInstance } from "@/utils/client";

//Fetch doctor by ID
export async function getDoctorById(id: string) {
  try {
    const response = await axiosInstance.get(`/doctor/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Doctor by Id: ", error);
  }
}

export async function getAppointmentsByDoctorId(
  doctorId: string,
  pageCount?: number,
  pageSize?: number
) {
  try {
    const response = await axiosInstance.get(`/booking/filter`, {
      params: {
        doctorId: doctorId,
        pageCount: pageCount,
        pageSize: pageSize,
      },
    });
  } catch (error) {
    console.log("Error fetching Appointments by Doctor Id: ", error);
  }
}

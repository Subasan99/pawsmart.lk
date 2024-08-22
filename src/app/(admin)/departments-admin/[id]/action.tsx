"use server";

import { axiosInstance } from "@/utils/client";

//Fetch department by ID
export async function getDepartmentById(id: string) {
  try {
    const response = await axiosInstance.get(`/department/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Department by Id: ", error);
  }
}


"use server";

import { axiosInstance } from "@/utils/client";

export async function getAllSpecializations() {
  try {
    const response = await axiosInstance.get("/specialization");
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("Error fetching specializations:", error);
  }
}

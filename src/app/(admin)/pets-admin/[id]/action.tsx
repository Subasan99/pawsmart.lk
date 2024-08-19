"use server";

import { axiosInstance } from "@/utils/client";

//Fetch pet by ID
export async function getPetById(id: string) {
  try {
    const response = await axiosInstance.get(`/pet/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Pet by Id: ", error);
  }
}


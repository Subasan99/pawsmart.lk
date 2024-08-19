"use server";

import { Pet } from "@/lib/typings";
import { axiosInstance } from "@/utils/client";

export async function getPetData(
  pageCount?: number,
  pageSize?: number,
  doctorId?: number,
  name?: string
) {
  console.log("dfsdfdf", pageCount, pageSize);
  try {
    const response = await axiosInstance.get(`/pet/filter`, {
      params: {
        pageCount: pageCount,
        pageSize: pageSize,
        name: name ? name : undefined,
      },
    });
    console.log("dffdfscs", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching pet data:", error);
  }
}


export async function createPet(pet: Pet) {
  try {
    const response = await axiosInstance.post("/pet", pet);
    console.log('pet create',response);
  } catch (error) {
    console.log("Error creating pet:", error);
  }
}
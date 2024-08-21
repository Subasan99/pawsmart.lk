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
    console.log("pet create", response);
  } catch (error) {
    console.log("Error creating pet:", error);
  }
}

export async function getPetById(id: string) {
  try {
    const response = await axiosInstance.get(`/pet/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Pet by Id: ", error);
  }
}

export async function editPetById(
  id: string,
  values: { name: string; description: string }
) {
  try {
    const response = await axiosInstance.put(`/pet/${id}/update`, values);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Pet by Id: ", error);
  }
}

export async function archivePetById(id: string) {
  try {
    const response = await axiosInstance.put(`/pet/active?id=${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error archiving pets", error);
  }
}

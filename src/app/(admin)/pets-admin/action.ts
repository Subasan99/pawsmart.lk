"use server";

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
        doctorId: doctorId ? doctorId : undefined,
      },
    });
    console.log("dffdfscs", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching pet data:", error);
  }
}

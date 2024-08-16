"use server";

import { axiosInstance } from "@/utils/client";

export async function getDoctorData(
  pageCount?: number,
  pageSize?: number,
  specializationId?: number,
  departmentId?: number,
  name?: string
) {
  console.log("dfsdfdf", pageCount, pageSize);
  try {
    const response = await axiosInstance.get(`/doctor/filter`, {
      params: {
        pageCount: pageCount,
        pageSize: pageSize,
        specializationId: specializationId ? specializationId : undefined,
        departmentId: departmentId ? departmentId : undefined,
        name: name ? name : undefined,
      },
    });
    console.log("dffdfscs", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching doctor data:", error);
  }
}

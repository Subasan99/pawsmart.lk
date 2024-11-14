"use server";

import { DoctorCreate } from "@/lib/typings";
import { axiosInstance } from "@/utils/client";

export async function getDoctorData(
  pageCount?: number,
  pageSize?: number,
  specializationId?: string,
  departmentId?: string,
  petId?: string,
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

export async function createDoctor(doctor: DoctorCreate) {
  try {
    const response = await axiosInstance.post("/doctor", doctor);
    console.log("doctor create", response);
  } catch (error) {
    console.log("Error creating doctor:", error);
  }
}

export async function allocateTimeSlot(
  id: string,
  dayAllocationRequestList: any
) {
  try {
    const response = await axiosInstance.put(`/doctor/${id}/dayAllocation`);
    console.log("time slot allocate", response);
  } catch (error) {
    console.log("Error allocating time slot:", error);
  }
}


export async function archiveDoctorById(id: string) {
  try {
    const response = await axiosInstance.put(`/doctor/active?id=${id}`);
    console.log("thusidika.....", response);
    return response?.data;
  } catch (error) {
    console.log("Error archiving users", error);
  }
}

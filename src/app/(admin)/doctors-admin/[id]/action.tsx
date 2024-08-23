"use server";

import { DayTimeSlotResponses } from "@/lib/typings";
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

export async function createTimeSlot(
  doctorId: string,
  dayAllocationRequestList: any
) {
  try {
    const response = await axiosInstance.post(
      `/doctor/${doctorId}/dayAllocation`,
      { doctorId: doctorId, dayAllocationRequestList: dayAllocationRequestList }
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("Error creating Day allocation for doctor: ", error);
  }
}

export async function deleteTimeSlot(doctorId: string) {
  try {
    const response = await axiosInstance.delete(
      `/doctor/${doctorId}/delete/dayAllocation`
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.log("Error creating Day allocation for doctor: ", error);
  }
}

export async function updateTimeSlot(
  doctorId: string,
  dayAllocationRequestList: DayTimeSlotResponses
) {
  console.log("dayAllocationRequestList", dayAllocationRequestList, doctorId);
  try {
    const response = await axiosInstance.put(
      `/doctor/${doctorId}/dayAllocation`,
      {
        doctorId: doctorId,
        dayAllocationRequestList: dayAllocationRequestList,
      }
    );
    console.log("day allocation response", response);
    return response.data;
  } catch (error) {
    console.log("Error updating time slot: ", error);
  }
}

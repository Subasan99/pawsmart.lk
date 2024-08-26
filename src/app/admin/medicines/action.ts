"use server";

import { DayTimeSlotResponses, MedicineCreate, MedicineDayTimeSlotResponses } from "@/lib/typings";
import { axiosInstance } from "@/utils/client";

export async function getMedicineData(
  pageCount?: number,
  pageSize?: number,
  name?: string
) {
  console.log("dfsdfdf", pageCount, pageSize);
  try {
    const response = await axiosInstance.get(`/medicine/filter`, {
      params: {
        pageCount: pageCount,
        pageSize: pageSize,
        name: name ? name : undefined,
      },
    });
    console.log("dffdfscs", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching medicine data:", error);
  }
}

export async function createMedicine(medicine: MedicineCreate) {
  try {
    const response = await axiosInstance.post("/medicine", medicine);
    console.log("medicine create", response);
  } catch (error) {
    console.log("Error creating medicine:", error);
  }
}

export async function getMedicineById(id: string) {
  try {
    const response = await axiosInstance.get(`/medicine/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Medicine by Id: ", error);
  }
}

export async function getAppointmentsByMedicineId(
  medicineId: string,
  pageCount?: number,
  pageSize?: number
) {
  try {
    const response = await axiosInstance.get(`/booking/filter`, {
      params: {
        medicineId: medicineId,
        pageCount: pageCount,
        pageSize: pageSize,
      },
    });
  } catch (error) {
    console.log("Error fetching Appointments by Medicine Id: ", error);
  }
}

export async function archiveMedicine(id: string) {
  try {
    const response = await axiosInstance.put(`/medicine/active?id=${id}`);
    console.log("medicine create", response);
    return response.data
  } catch (error) {
    console.log("Error medicine department:", error);
  }
}

export async function editMedicineById(
  id: string,
  values: { name: string; description: string }
) {
  try {
    const response = await axiosInstance.put(`/medicine/${id}/update`, values);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching Medicine by Id: ", error);
  }
}

export async function updateMedicineTimeSlot(
  medicineId: string,
  medicineDayAllocationList: MedicineDayTimeSlotResponses
) {
  console.log("medicineDayAllocationList", medicineDayAllocationList, medicineId);
  try {
    const response = await axiosInstance.put(
      `/medicine/${medicineId}/dayAllocation`,
      {
        medicineId: medicineId,
        medicineDayAllocationList: medicineDayAllocationList,
      }
    );
    console.log("day allocation response", response);
    return response.data;
  } catch (error) {
    console.log("Error updating time slot: ", error);
  }
}

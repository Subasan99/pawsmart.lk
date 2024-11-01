"use server";

import { axiosInstance } from "@/utils/client";

export async function getUserData(
  pageCount?: number,
  pageSize?: number,
  name?: string,
  role?: string
) {
  console.log("dfsdfdf", pageCount, pageSize);
  try {
    const response = await axiosInstance.get(`/user/filter`, {
      params: {
        pageCount: pageCount,
        pageSize: pageSize,
        name: name ? name : undefined,
        role: role ? role : undefined,
      },
    });
    console.log("dffdfscs", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
}

export async function getUserById(id: string) {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error fetching User by Id: ", error);
  }
}

export async function archiveUserById(id: string) {
  try {
    const response = await axiosInstance.put(`/user/active?id=${id}`);
    console.log("response", response);
    return response?.data;
  } catch (error) {
    console.log("Error archiving users", error);
  }
}

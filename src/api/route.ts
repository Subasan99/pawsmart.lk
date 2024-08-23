"use server";

import { axiosInstance } from "@/utils/client";
import { cookies } from "next/headers";

const cookieStore = cookies();

export async function getAllSpecializations() {
  try {
    const response = await axiosInstance.get("/specialization");
    return response.data;
  } catch (error) {
    console.log("Error fetching specialization:", error);
  }
}

export async function getLoginUserDetails() {
  const userDetails = await cookieStore.get("token");
  console.log(JSON.parse(userDetails?.value!));
  return JSON.parse(userDetails?.value!);
}

export async function signOut() {
  await cookieStore.delete("token");
}

"use server";

import { DayTimeSlotResponses } from "@/lib/typings";
import { axiosInstance, imageaxiosInstance,  } from "@/utils/client";
import axios from "axios";

//Fetch doctor by ID
// export async function getDoctorById(id: string) {
//   try {
//     const response = await axiosInstance.get(`/doctor/${id}`);
//     console.log("response", response);
//     return response?.data;
//   } catch (error) {
//     console.log("Error fetching Doctor by Id: ", error);
//   }
// }


export async function getHospitalById(id: string) {
  try {
    const response = await axiosInstance.get(`/hospital/${id}`);
    return response?.data;
  } catch (error) {
    console.log('Error fetching Doctor by Id: ', error);
  }
}






// export async function updateHospitalImage(id: any, image: any) {
export async function updateHospitalImage(id: any ,image:any) {

  console.log("🚀 ~ updateHospitalImage ~ image:", image)
  // debugger
  
  try {
    const formData = new FormData();
    formData.append('image', image);  

    console.log("Uploading image for hospital:", formData); 
    // debugger

    const response = await imageaxiosInstance.put(`hospital/{id}/image?id=${id}`, formData);
console.log("imageaxiosInstanceresponse",response.data)
    return response.data; 
  } catch (error: any) {
    console.error("Error updating hospital image:", error?.response?.data || error.message);
    throw error;
  }
}

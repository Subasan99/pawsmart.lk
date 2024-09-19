"use server";
import { axiosInstance } from "@/utils/client";
import { cookies } from "next/headers";

export const changePassword = async (userData: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    console.log('userDatauserData',userData)
const cookieStore = cookies();
    const userDetails = await cookieStore.get("token");
    const getuserDetails= JSON.parse(userDetails?.value!);
    console.log("getuserDetailgetuserDetailsgetuserDetailss",getuserDetails)
    const response = await axiosInstance.put(
      `user/changePassword`,
      {
        oldPassword: userData?.oldPassword,
        newPassword: userData?.newPassword
      },
      {
        headers: {
          // 'BearerToken': `${(getuserDetails?.token)}`
          'Authorization': 'Bearer ' + getuserDetails?.token 
        }
      }
      
    );

    console.log("response.datachangepasword",response);
    return response.data;
  } catch (error) {
    console.error("Change password error:", error);
    throw error;
  }
};

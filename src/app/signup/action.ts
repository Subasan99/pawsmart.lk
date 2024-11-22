'use server';
import { axiosInstance } from '@/utils/client';

export const registerUser = async (userData: {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  role: string;
}) => {
  try {
    const response = await axiosInstance.post(`/user`, {
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNo: userData.phoneNo,
      dateOfBirth: userData.dateOfBirth,
      gender: userData.gender,
      role: userData.role,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

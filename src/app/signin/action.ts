'use server';
import { axiosInstance } from '@/utils/client';

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post('/admin/auth', {
      email: userData.email,
      password: userData.password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
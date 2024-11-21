'use server';

import { axiosInstance, imageaxiosInstance } from '@/utils/client';

export async function getUserData(
  pageCount?: number,
  pageSize?: number,
  name?: string,
  role?: string
) {
  console.log('dfsdfdf', pageCount, pageSize);
  try {
    const response = await axiosInstance.get(`/user/filter`, {
      params: {
        pageCount: pageCount,
        pageSize: pageSize,
        name: name ? name : undefined,
        role: role ? role : undefined,
      },
    });
    console.log('dffdfscs', response);
    return response?.data;
  } catch (error) {
    console.log('Error fetching user data:', error);
  }
}

export async function getUserById(id: string) {
  try {
    const response = await axiosInstance.get(`/user/${id}`);
    console.log('response', response);
    return response?.data;
  } catch (error) {
    console.log('Error fetching User by Id: ', error);
  }
}

export async function archiveUserById(id: string) {
  try {
    const response = await axiosInstance.put(`/user/active?id=${id}`);
    console.log('response', response);
    return response?.data;
  } catch (error) {
    console.log('Error archiving users', error);
  }
}
export async function updateUserImage(id: any, image: any) {
  console.log('🚀 ~ updateHospitalImage ~ image:', image);
  // debugger

  try {
    const formData = new FormData();
    formData.append('image', image);

    console.log('Uploading image for hospital:', id);
    // debugger

    const response = await imageaxiosInstance.put(
      `user/{id}/image?id=${id}`,
      formData
    );
    console.log('object', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error updating hospital image:',
      error?.response?.data || error.message
    );
    throw error;
  }
}

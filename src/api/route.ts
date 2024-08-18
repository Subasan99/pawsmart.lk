'use server'

import { axiosInstance } from "@/utils/client"

export async function getAllSpecializations() {
    try {
        const response = await axiosInstance.get('/specializations');
        return response.data;
    } catch (error) {
        console.log('Error fetching specializations:', error)
    }
}
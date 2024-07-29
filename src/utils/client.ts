"use server";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchData = async (url: string, options: any) => {
  try {
    const response = await axiosInstance(url, options);
    return response?.data;
  } catch (error) {
    console.log(error);
    throw new Error('Could not fetch data');
  }
};

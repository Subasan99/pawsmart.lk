'use server';
import { axiosInstance } from '@/utils/client';


export const getDoctorData = async () => {
  try {
    const response = await axiosInstance.get(`/doctors`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getDeparmentData = async () => {
  try {
    const response = await axiosInstance.get(`/departments`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};


  export const getPetData = async () => {
    try {
      const response = await axiosInstance.get(`/pets`);
      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  };
  export const getMedicinesData = async () => {
    try {
      const response = await axiosInstance.get(`/medicines`);
    
      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  };

  export const getDeparmentFilterData = async (params: {
    pageCount: number;
    pageSize: number;
  }) => {
    try {
      const response = await axiosInstance.get(`/department/filter`, {
        params: {
          pageSize: params.pageSize,
          pageCount: params.pageCount,
        },
  
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  };

  export const getDoctorFilterData = async (params: {
    pageCount: number;
    pageSize: number;
  }) => {
    try {
      const response = await axiosInstance.get(`/doctor/filter`, {
        params: {
          pageSize: params.pageSize,
          pageCount: params.pageCount,
        },
  
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  };

  export const getPetFilterData = async (params: {
    pageCount: number;
    pageSize: number;
  }) => {
    try {
      const response = await axiosInstance.get(`/pet/filter`, {
        params: {
          pageSize: params.pageSize,
          pageCount: params.pageCount,
        },
  
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  };

  export const getMedicineFilterData = async (params: {
    pageCount: number;
    pageSize: number;
  }) => {
    try {
      const response = await axiosInstance.get(`/medicine/filter`, {
        params: {
          pageSize: params.pageSize,
          pageCount: params.pageCount,
        },
  
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('error', error);
    }
  };
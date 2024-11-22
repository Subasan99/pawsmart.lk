'use server';
import { axiosInstance } from '@/utils/client';

export const getDoctorData = async () => {
  try {
    const response = await axiosInstance.get(`/doctors`);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};
export const getSpecializationData = async () => {
  try {
    const response = await axiosInstance.get(`/specialization`);
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};
export const getDoctorByIdData = async (doctorid: any) => {
  try {
    const response = await axiosInstance.get(`/doctor/${doctorid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    return null;
  }
};
export const getDepartmentData = async () => {
  try {
    const response = await axiosInstance.get(`/departments`);
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
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getDoctorFilterData = async (params: {
  pageCount: number;
  pageSize: number;
  departmentId?: number;
  specializationId?: number;
  petId?: number;
}) => {
  try {
    const response = await axiosInstance.get(`/doctor/filter`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
        departmentId: params.departmentId,
        specializationId: params.specializationId,
        petId: params.petId,
      },
    });
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
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getMedicineFilterData = async (params: {
  pageCount: number;
  pageSize: number;
  name?:string;
  date?:string;
}) => {
  try {
    const response = await axiosInstance.get(`/medicine/filter`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
        name: params.name,
        date: params.date,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getBookingFilterData = async (params: {
  doctorId: any;
  pageCount: number;
  pageSize: number;
}) => {
  try {
    const response = await axiosInstance.get(`/booking/filter`, {
      params: {
        doctorId: params.doctorId,
        pageSize: params.pageSize,
        pageCount: params.pageCount,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const appointmentbooking = async (
  id: any,
  bookingDate: any,
  time: any,
  description: any,
  bookingType: any,
  userId: any
) => {
  try {
    const data = {
      id,
      bookingDate,
      time,
      description,
      bookingType,
      userId,
    };

    const response = await axiosInstance.post('/booking', data);
    return response.data;
  } catch (error) {
    console.error('error');
  }
};

export const get = async (params: { pageCount: number; pageSize: number }) => {
  try {
    const response = await axiosInstance.get(`/medicine/filter`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getAppointmentBooking = async () => {
  try {
    const response = await axiosInstance.get(
      `/booking/filter?userId=1&pageSize=10&pageCount=1`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error; // Ensures the calling function can handle the error if needed
  }
};

export const getHospitalFilterData = async (params: {
  pageCount: number;
  pageSize: number;
  searchTerm?: string;
  cityId?: string;
  hospitalId?: string;
  specializationId?: string;
}) => {
  try {
    const response = await axiosInstance.get(`hospital/filter?`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
        searchTerm: params?.searchTerm,
        cityId: params?.cityId,
        hospitalId:params?.hospitalId,
        specializationId: params?.specializationId,
      },
    });

    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getCities = async () => {
  try {
    const response = await axiosInstance.get(`/cities`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getByIdHospital = async (id: any) => {
  try {
    const response = await axiosInstance.get(`/hospital/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    return null;
  }
};
export const getHospitals = async () => {
  try {
    const response = await axiosInstance.get(`/hospitals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor data:', error);
    return null;
  }
};
export const getAppointmentBookingFilterData = async (params: {
  pageCount: number;
  pageSize: number;
  userId?: string;
}) => {
  try {
    const response = await axiosInstance.get(`booking/filter?`, {
      params: {
        pageSize: params.pageSize,
        pageCount: params.pageCount,
        userId: params?.userId,
      },
    });

    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

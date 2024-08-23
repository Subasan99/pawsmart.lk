export type Appointment = {
  id: string;
  bookingDate: string;
  time: string;
  doctorResponse?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    dateOfBirth: string;
    gender: string;
  };
  medicineResponse?: {
    id: string;
    name: string;
  };
  description: string;
  status: string;
  bookingType: string;
  userResponse: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    dateOfBirth: string;
    gender: string;
  };
};

export type Doctor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: string;
  gender: string;
  specializationId: string;
  specializationName: string;
  description: string;
  departmentId: string;
  departmentName: string;
  image: string;
  preSignedUrl: string;
  duration: number;
  dayTimeSlotResponses: {
    day: string;
    timeSlots: { startTime: string; endTime: string }[];
    appointmentTimes: string[];
  }[];
};

export type DoctorCreate = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  dateOfBirth: Date;
  gender: string;
  specializationId: string;
  description: string;
  duration: number;
  petIds: string[];
};

export type DayTimeSlotResponses = {
  day: string;
  timeSlots: { startTime: string; endTime: string }[] | [];
  appointmentTimes: string[];
};

export type PetResponse = {
  id: string;
  name: string;
  description: string;
  image: string;
  preSignedUrl: string;
  createdDate: string;
  updatedDate: string;
  active: boolean;
};
export type Department = {
  name: string;
  description: string;
};

export type Pet = {
  name: string;
  description: string;
};

export type Medicine = {
  id: string;
  name: string;
  description: string;
  image: string;
  preSignedUrl: string;
  duration: number;
  medicineDayTimeSlotResponses: {
    day: string;
    medicineTimeSlotResponses: { startTime: string; endTime: string }[];
    appointmentTimes: string[];
  }[];
};

export type MedicineCreate = {
  name: string;
  description: string;
  duration: number;
};

export type Specialization = {
  specializationName: string;
  description?: string;
  departmentId: string;
};

export type AppointmentCreate = {
  id: string;
  bookingDate: string;
  bookingType: string;
  userId: string;
  time: string;
  petName: string;
  petType: string;
  description: string;
  petAge: number;
};

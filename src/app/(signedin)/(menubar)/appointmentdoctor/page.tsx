"use client";
import Image from "next/image";
import React, { useState } from "react";
import RootLayout from "../layout";
import Dropdown from "@/components/DropDown";
import AppointmentBook from "@/components/AppointmentBook";
import ReviewSection from "@/components/Review";
import InfoSection from "@/components/DepInfo";
import petImage from "../../../../components/png/dogBooking.png";

const AppointmentDoctor = () => {
  const handleClick = (imageName: string) => {
    console.log(`Image clicked: ${imageName}`);
  };

  const doctorOptions = [
    { label: "Select doctor", value: "" },
    { label: "Doctor 1", value: "doctor1" },
    { label: "Doctor 2", value: "doctor2" },
    { label: "Doctor 3", value: "doctor3" },
  ];

  const doctor = [
    { label: "Select doctor", value: "" },
    { label: "Doctor 1x", value: "doctor1f" },
    { label: "Doctor 2c", value: "doctor2c" },
    { label: "Doctor 3x", value: "doctor3c" },
  ];

  const [appointmentInfo, setAppointmentInfo] = useState({
    message: "",
    startDate: "",
    serialNumber: "",
    selectedDoctor: "",
    selectedValue: "",
  });

  const handleChange = (field: any, value: any) => {
    setAppointmentInfo((prevState) => ({ ...prevState, [field]: value }));
  };

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  const [rating, setRating] = useState("");
  const [Reviewmessage, setReviewmessage] = useState("");

  const handleDoctorChange = (value: string) => {
    setRating(value);
  };

  const handleMessageReview = (value: string) => {
    setReviewmessage(value);
  };

  const [votedrating, setVotedRating] = useState(0);
  const handleRatingChange = (value: string) => setRating(value);
  const handleReviewChange = (value: string) => setReviewmessage(value);

  return (
    <RootLayout pageName="Appoinment Booking">
      <div className="flex  flex-row  w-full   items-start flex-1 justify-center content-center">
        {/* Your content here */}
        <div className="flex p-10">
          <Image src={petImage} alt="Company Logo" width={730} height={480} />
        </div>

        <div className="flex">
          <AppointmentBook
            message={appointmentInfo.message}
            startDate={appointmentInfo.startDate}
            serialNumber={appointmentInfo.serialNumber}
            selectedDoctor={appointmentInfo.selectedDoctor}
            handleDateChange={(newDate) => handleChange("startDate", newDate)}
            handleSerialNumberChange={(newSerialNumber) =>
              handleChange("serialNumber", newSerialNumber)
            }
            handleDoctorChange={(value) =>
              handleChange("selectedDoctor", value)
            }
            handleMessageChange={(newMessage) =>
              handleChange("message", newMessage)
            }
            options={doctorOptions}
            selectedValue={appointmentInfo.selectedValue}
            onChange={(value) => handleChange("selectedValue", value)}
            doctors={doctor}
            handleCalendarChange={function (value: string): void {}}
          />
        </div>
      </div>
    </RootLayout>
  );
};

export default AppointmentDoctor;

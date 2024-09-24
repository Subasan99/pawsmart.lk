"use client";

import Header from "@/components/HomeComponent/Header";
import CircledArrowIcon from "@/components/svg/circled-arrow-icon";
import { useEffect, useState } from "react";
import { getAppointmentBooking } from "../../../home/action";

const Appointments = (premiumBookings: any, normalBookings: any) => {
  const [activeTab, setActiveTab] = useState("all");
  const [DoctorName, setdoctorName] = useState<any[]>([]); // For storing the API response
  const [BookingDate, setbookingdate] = useState<any[]>([]); // For storing the API response
  const [BookingTime, setbookingTime] = useState<any[]>([]); // For storing the API response

  const [Status, setstatus] = useState<any[]>([]); // For storing the API response
  const [Description, setdescription] = useState<any[]>([]); // For storing the API response

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getAppointmentBooking();
        const DoctorName = response?.records?.[0]?.doctorResponse?.name;
        setdoctorName(DoctorName);
        const bookingDate = response?.records?.[0]?.bookingDate;
        setbookingdate(bookingDate);
        const bookingTime = response?.records?.[0]?.time;
        setbookingTime(bookingTime);
        const Status = response?.records?.[0]?.status;
        setstatus(Status);
        const description = response?.records?.[0]?.description;
        setdescription(description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "premium":
        return (
          <div className="flex flex-row gap-3  items-center justify-start w-full flex-1 p-8">
            <div className="bg-blue-500 p-4 rounded-lg w-40 h-fit self-center items-center text-center">
              <div className="text-sm text-white">Doctor Name</div>
              <div className="text-sm font-medium">{DoctorName}</div>
            </div>

            <CircledArrowIcon />
            <div className="bg-blue-500 p-4 rounded-lg w-40 h-fit self-center items-center text-center">
              <div className="text-sm text-white">Time</div>
              <div className="text-sm font-medium">{BookingTime}</div>
            </div>
            <CircledArrowIcon />

            <div className="bg-blue-500 p-4 rounded-lg w-40 h-fit self-center items-center text-center">
              <div className="text-sm text-white">bookingDate</div>
              <div className="text-sm font-medium">{BookingDate}</div>
            </div>
            <CircledArrowIcon />
            <div className="bg-blue-500 p-4 rounded-lg w-40 h-fit self-center items-center text-center">
              <div className="text-sm text-white">Status</div>
              <div className="text-sm font-medium">{Status}</div>
            </div>
            <CircledArrowIcon />

            <div className="bg-blue-500 p-4 rounded-lg w-40 h-fit self-center items-center text-center">
              <div className="text-sm text-white">description</div>
              <div className="text-sm font-medium">{Description}</div>
            </div>
            <CircledArrowIcon />

            <div>
              <button className="p-6 bg-[white] w-36 rounded-xl text-sm font-medium border-2 ">
                Cancel
              </button>
            </div>
          </div>
        );
      case "normal":
        return <div>Normal Bookings: {normalBookings.length}</div>;
      case "all":
        return (
          <div>
            All Bookings: {premiumBookings.length + normalBookings.length}
          </div>
        );
      default:
        return null;
    }
  };
  return (
    // <RootLayout pageName="Appointments">
    <div className="container mx-auto mt-16 bg-[#F7F8F9] rounded-xl">
      <div className="sticky z-30 top-0 md:static h-fit">
        <Header />
      </div>
      <div className="flex border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === "premium" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => handleTabClick("premium")}
        >
          Doctor
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "normal" ? "border-b-2 border-blue-500" : ""
          }`}
          onClick={() => handleTabClick("normal")}
        >
          Medicine
        </button>
      </div>
      <div className="mt-4">{renderTabContent()}</div>
    </div>
    // </RootLayout>
  );
};

export default Appointments;

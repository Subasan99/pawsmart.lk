"use client";
import { useState,useEffect } from "react";
import { doctorColumns, medicinesColumns } from "./columns";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import { getBookingData } from "./action";
import { useBookingStore } from "@/store/bookingStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Index() {
  const [bookings, setAllBookings] = useBookingStore((state: any) => [
    state.bookings,
    state.setAllBookings,
  ]);

  const [currentTab, setCurrentTab] = useState("doctors");

  async function fetchData() {
    const data = await getBookingData(1, 10);
    console.log(data);
    setAllBookings(data?.records);
  }
  useEffect(() => {
    console.log(bookings);
    fetchData();
  }, []);

  const filteredBookings = bookings.filter((booking: any) =>
    currentTab === "doctors"
      ? booking.bookingType === "DOCTOR"
      : booking.bookingType === "MEDICINE"
  );
  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <Tabs
        defaultValue="doctors"
        className="w-full py-2"
        onValueChange={(value) => setCurrentTab(value)}
      >
        <TabsList>
          <TabsTrigger value="doctors">Doctor Appointments</TabsTrigger>
          <TabsTrigger value="medicines">Medicine Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="doctors">
          <DataTable columns={doctorColumns} data={filteredBookings} />
        </TabsContent>
        <TabsContent value="medicines">
          <DataTable columns={medicinesColumns} data={filteredBookings} />
        </TabsContent>
      </Tabs>
      {/* <Filteration getApi={fetchData} /> */}
    </div>
  );
}
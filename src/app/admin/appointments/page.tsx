"use client";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookingStore } from "@/store/bookingStore";
import { useEffect, useState } from "react";
import { getBookingData } from "./action";
import { doctorColumns, medicinesColumns } from "./columns";
import { Calendar, FilterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Index() {
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [setAllFilterBookings, filterbookings] = useBookingStore(
    (state: any) => [state.setAllFilterBookings, state.filterbookings]
  );

  const [currentTab, setCurrentTab] = useState("doctors");
  const [selectedSelectedStatus, setSelectedStatus] = useState<any | undefined>(
    null
  );
  const [doctorBookingRecords, setDoctorBookingRecords] = useState<any>(undefined);
  const [filterParams, setFilterParams] = useState({
    pageSize: 10,
    pageCount: 1,
  });
  async function fetchData() {
    const data = await getBookingData(
      filterParams.pageCount,
      filterParams.pageSize,
      undefined,
      undefined,
      undefined,
      selectedSelectedStatus,
      undefined
    );
    console.log(data, "thusris");
    setAllFilterBookings(data?.records);
    setDoctorBookingRecords(data);
  }
  useEffect(() => {
    // console.log(filterbookings);
    fetchData();
  }, [selectedSelectedStatus, filterParams]);

  const filteredBookings = filterbookings.filter((booking: any) =>
    currentTab === "doctors"
      ? booking.bookingType === "DOCTOR"
      : booking.bookingType === "MEDICINE"
  );

  const filteredBookingsStatus = [
    { id: 1, label: "Cancel", value: "CANCELED" },
    { id: 2, label: "Confiemed", value: "CONFIRMED" },
    { id: 3, label: "Completed", value: "COMPLETED" },
  ];

  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <div className="flex items-center">
        <Calendar className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
        <div className="flex items-center justify-between p-3">
          <div className="font-bold text-2xl">Appointments</div>
        </div>
      </div>
      <div
        className="flex items-center justify-end p-3 cursor-pointer"
        onClick={() => setIsFiltersOpen((prev: boolean) => !prev)}
      >
        <FilterIcon className="h-6 w-6 text-[#8D9FBD] " />
        <div className="font-semibold text-[#8D9FBD] ml-2">Filters</div>
      </div>

      <div>
        {isFiltersOpen && (
          <div className="flex gap-4 items-center">
            {/* Specialization Dropdown */}
            <div className="flex-1">
              <Select onValueChange={(value) => setSelectedStatus(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Appintment Status" />
                </SelectTrigger>
                <SelectContent>
                  {filteredBookingsStatus.length > 0 ? (
                    filteredBookingsStatus.map((item: any) => (
                      <SelectItem key={item.id} value={String(item.value)}>
                        {item.label}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-3 font-semibold text-gray-400 text-center">
                      No options
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
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
          <DataTable
            columns={doctorColumns}
            data={filteredBookings}
            records={doctorBookingRecords}
            pageSize={doctorBookingRecords?.pageSize}
            handleFilter={(pageNumber, pageSize) => {
              setFilterParams((prevParams) => ({
                ...prevParams,
                pageCount: pageNumber,
                pageSize: pageSize,
              }));
            }}
          />
        </TabsContent>
        <TabsContent value="medicines">
          <DataTable
            columns={medicinesColumns}
            data={filteredBookings}
            // records={hospitalRecords}
            // pageSize={hospitalRecords?.pageSize}
            // handleFilter={(pageNumber, pageSize) => {
            //   setFilterParams((prevParams) => ({
            //     ...prevParams,
            //     pageCount: pageNumber,
            //     pageSize: pageSize,
            //   }));
            // }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

"use client";
import DepartmentCreate from "@/components/AdminPanelComponents/DepartmentComponents/DepartmentCreate";
import { useDepartmentStore } from "@/store/departmentStore";
import { useEffect, useState } from "react";
import { DataTable } from "../../../components/AdminPanelComponents/data-table";
import { getAllDepartmentData, getDepartmentData } from "./action";
import { columns } from "./columns";
import { Building, FilterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function DemoPage() {
  const [
    departments,
    setAllDepartments,
    filterdepartments,
    setAllfilterDepartments,
  ] = useDepartmentStore((state: any) => [
    state.departments,
    state.setAllDepartments,
    state.filterdepartments,
    state.setAllfilterDepartments,
  ]);
  const [isFiltersOpen, setIsFiltersOpen] = useState<boolean>(false);
  const [selectedSelectedDepartment, setSelectedDepartment] = useState<
    any | undefined
  >(null);
  const [departmentRecords, setDepartmentRecords] = useState<any>(undefined);
  const [filterParams, setFilterParams] = useState({
    pageSize: 10,
    pageCount: 1,
  });

  async function fetchData() {
    const data = await getDepartmentData(
      filterParams.pageCount,
      filterParams.pageSize,
      selectedSelectedDepartment
    );
    const AllDeparment = await getAllDepartmentData();

    setAllfilterDepartments(data?.records);
    setAllDepartments(AllDeparment);
    setDepartmentRecords(data);
  }

  useEffect(() => {
    // console.log(departments);
    // if(!isFiltersOpen){
    //   selectedSelectedDepartment(undefined);
    // }
    fetchData();
  }, [selectedSelectedDepartment, filterParams]);
  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <div className="flex items-center">
        <Building className="mr-2 text-black font-bold  group-hover:text-black transition-colors duration-200" />
        <div className="font-bold text-2xl">Departments</div>
      </div>

      <div
        className="flex items-center justify-end p-3 cursor-pointer"
        onClick={() => setIsFiltersOpen((prev: boolean) => !prev)}
      >
        <FilterIcon className="h-6 w-6 text-[#8D9FBD] " />
        <div className="font-semibold text-[#8D9FBD] ml-2">Filters</div>
      </div>

      {isFiltersOpen && (
        <div className="flex gap-4 items-center">
          {/* Specialization Dropdown */}
          <div className="flex-1">
            <Select onValueChange={(value) => setSelectedDepartment(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.length > 0 ? (
                  departments.map((item: any) => (
                    <SelectItem key={item.id} value={String(item.name)}>
                      {item.name}
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
          {/* <div className="flex-1">
            <Popover
              open={isCalendarOpen}
              onOpenChange={setCalendarOpen} // Toggle the popover open/close state
            >
              <PopoverTrigger className="w-full" asChild>
                <Button
                  variant={'outline'}
                  className="w-full pl-3 text-left font-normal"
                >
                  {selectedDate ? (
                    format(selectedDate, 'PPP') 
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div> */}
        </div>
      )}
      <div className="self-end">
        <DepartmentCreate />
      </div>
      <DataTable
        columns={columns}
        data={filterdepartments}
        records={departmentRecords}
        pageSize={departmentRecords?.pageSize}
        handleFilter={(pageNumber, pageSize) => {
          setFilterParams((prevParams) => ({
            ...prevParams,
            pageCount: pageNumber,
            pageSize: pageSize,
          }));
        }}
      />
    </div>
  );
}

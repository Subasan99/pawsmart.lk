"use client";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import { useUserStore } from "@/store/userStore";
import { useEffect, useCallback } from "react";
import { getUserData } from "./action";
import { columns } from "./columns";

export default function Index() {
  const [users, setAllUsers] = useUserStore((state: any) => [
    state.users,
    state.setAllUsers,
  ]);

  // Memoize fetchData to prevent unnecessary re-creation
  const fetchData = useCallback(async () => {
    const data = await getUserData(3, 10);
    console.log(data);
    setAllUsers(data?.records);
  }, [setAllUsers]);

  useEffect(() => {
    console.log(users);
    fetchData(); // Call the memoized fetchData
  }, [fetchData, users]); // Include fetchData and users in the dependency array

  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
      <div className="self-end">
        {/* <Filteration getApi={fetchData} /> */}
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}

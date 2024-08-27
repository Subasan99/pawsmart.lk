"use client";
import { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/AdminPanelComponents/data-table";
import { getUserData } from "./action";
import { useUserStore } from "@/store/userStore";

export default function Index() {
  const [users, setAllUsers] = useUserStore((state: any) => [
    state.users,
    state.setAllUsers,
  ]);
  async function fetchData() {
    const data = await getUserData(3, 10);
    console.log(data);
    setAllUsers(data?.records);
  }
  useEffect(() => {
    console.log(users);
    fetchData();
  }, []);
  return (
    <div className="container flex flex-col gap-4 mx-auto py-5 relative">
    <div className="self-end">
    </div>      {/* <Filteration getApi={fetchData} /> */}
      <DataTable columns={columns} data={users} />
    </div>
  );
}

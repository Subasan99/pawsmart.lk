"use client";

import EditIcon from "@/components/svg/edit_icon";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { useEffect, useCallback } from "react";
import DefaultImage from "../../../../../public/default_user.png";
import { getUserById } from "../action";

const Index = ({ params }: { params: { id: string } }) => {
  const [
    selectedUser,
    setSelectedUser,
    loading,
  ] = useUserStore((state: any) => [
    state.selectedUser,
    state.setSelectedUser,
    state.loading,
  ]);

  // Memoize handleSelectUser to prevent unnecessary re-creation
  const handleSelectUser = useCallback(async () => {
    const data = await getUserById(params.id);
    setSelectedUser(data);
  }, [params.id, setSelectedUser]);

  useEffect(() => {
    handleSelectUser();
  }, [handleSelectUser]);

  // Early return for loading state
  if (loading) {
    return <div>Loading...!</div>; // Fixed the return statement here
  }

  return (
    <div className="flex flex-col px-3 bg-white py-5 h-full w-full rounded-lg">
      <div className="flex relative">
        <EditIcon className="absolute top-0 right-0 cursor-pointer" />
        <div className="relative">
          <EditIcon className="absolute top-5 right-5 z-10 cursor-pointer" />
          {selectedUser?.preSignedUrl ? (
            <Image
              src={selectedUser.preSignedUrl}
              alt="User Image"
              width={200}
              height={200}
              className="rounded-full border-4 object-cover h-[200px] w-[200px]"
            />
          ) : (
            <Image
              src={DefaultImage}
              className="rounded-full border-4"
              alt="default_img"
              height={200}
              width={200}
            />
          )}
        </div>
        <div className="grow flex flex-col gap-2 px-3 py-2">
          <div className="font-bold text-2xl flex gap-2 items-center">
            {selectedUser?.name}{" "}
          </div>
          <div className="font-semibold text-xl">
            &quot;{selectedUser?.description}&quot;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

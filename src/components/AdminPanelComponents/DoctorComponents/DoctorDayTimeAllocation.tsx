"use client";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const DoctorDayTimeAllocation = () => {
  return (
    <div className="bg-red-100 grow flex flex-col gap-5">
      <div className="flex w-full gap-x-3 items-center bg-blue-300">
        <Switch
          color="green"
          className={cn(
            "bg-gray-500 peer-checked:bg-blue-500", // Background color when checked and unchecked
            "peer-focus:ring-2 peer-focus:ring-blue-500" // Focus ring color
          )}
        >
          <span
            className={cn(
              "block w-4 h-4 transform bg-black rounded-full transition-transform",
              "peer-checked:translate-x-5", // Thumb position when checked
              "peer-checked:bg-blue-500" // Thumb color when checked
            )}
          />
        </Switch>
      </div>

      <Switch
        color="green"
        className={cn(
          "bg-gray-500 peer-checked:bg-blue-500", // Background color when checked and unchecked
          "peer-focus:ring-2 peer-focus:ring-blue-500" // Focus ring color
        )}
      >
        <span
          className={cn(
            "block w-4 h-4 transform bg-white rounded-full transition-transform",
            "peer-checked:translate-x-5", // Thumb position when checked
            "peer-checked:bg-blue-500" // Thumb color when checked
          )}
        />
      </Switch>
      <Switch
        color="green"
        className={cn(
          "bg-gray-500 peer-checked:bg-blue-500", // Background color when checked and unchecked
          "peer-focus:ring-2 peer-focus:ring-blue-500" // Focus ring color
        )}
      >
        <span
          className={cn(
            "block w-4 h-4 transform bg-white rounded-full transition-transform",
            "peer-checked:translate-x-5", // Thumb position when checked
            "peer-checked:bg-blue-500" // Thumb color when checked
          )}
        />
      </Switch>
      <Switch
        color="green"
        className={cn(
          "bg-gray-500 peer-checked:bg-blue-500", // Background color when checked and unchecked
          "peer-focus:ring-2 peer-focus:ring-blue-500" // Focus ring color
        )}
      >
        <span
          className={cn(
            "block w-4 h-4 transform bg-white rounded-full transition-transform",
            "peer-checked:translate-x-5", // Thumb position when checked
            "peer-checked:bg-blue-500" // Thumb color when checked
          )}
        />
      </Switch>
    </div>
  );
};

export default DoctorDayTimeAllocation;

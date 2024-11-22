'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getAppointmentBookingFilterData } from '../../../home/action';
import { useAuthStore } from '@/store/authStore';
import { useDoctorStore } from '@/store/doctorStore';
import AppointmentCard from '@/components/AppointmentCard';
import { cancelBooking } from '@/app/admin/appointments/action';

const Appointments = () => {
  const [login] = useAuthStore((state) => [state.login]);
  const [doctorAppointments, setDoctorAppointments] = useDoctorStore((state) => [
    state.doctorAppointments,
    state.setDoctorAppointments,
  ]);

  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState<string>("");
  const [isAlreadyCanceled, setIsAlreadyCanceled] = useState(false);

  useEffect(() => {
    getAppointmentDetails();
  }, []);

  const getAppointmentDetails = async () => {
    try {
      const filterAppointmentList = await getAppointmentBookingFilterData({
        pageSize: 10,
        pageCount: 1,
        userId: login?.userId,
      });
      setDoctorAppointments(filterAppointmentList?.records || []);
    } catch (error) {
      console.error("Error fetching appointment data:", error);
    }
  };

  const handleCancelClick = (appointmentId: string) => {
    const appointment = doctorAppointments.find((appt) => appt.id === appointmentId);

    if (appointment?.status === "CANCELLED") {
      // If already canceled, show appropriate message and disable further actions
      setDialogMessage("This appointment is already cancelled.");
      setIsAlreadyCanceled(true);
    } else {
      // Proceed with cancel confirmation dialog
      setSelectedAppointmentId(appointmentId);
      setDialogMessage("Are you sure you want to cancel this appointment? This action cannot be undone.");
      setIsAlreadyCanceled(false);
    }

    setIsCancelDialogOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedAppointmentId) return;

    setIsLoading(true);
    try {
      await cancelBooking(selectedAppointmentId);
      const updatedAppointments = doctorAppointments.map((appointment) =>
        appointment.id === selectedAppointmentId
          ? { ...appointment, status: "CANCELLED" }
          : appointment
      );

      setDoctorAppointments(updatedAppointments);
      setIsCancelDialogOpen(false);
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    } finally {
      setIsLoading(false);
      setSelectedAppointmentId(null);
    }
  };

  return (
    <div className="container mx-auto mt-16 bg-[#F7F8F9] rounded-xl">
      <div className="flex border-b">
        <div className="px-4 py-2 border-b-2 border-blue-500">Appointment Details</div>
      </div>

      <div className="mt-4">
        <AppointmentCard
          AppointmentList={doctorAppointments}
          handleCancelClick={handleCancelClick}
        />
      </div>

      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {isAlreadyCanceled ? (
              // For already canceled appointments
              <Button onClick={() => setIsCancelDialogOpen(false)}>Close</Button>
            ) : (
              // For active cancel actions
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsCancelDialogOpen(false)}
                  disabled={isLoading}
                >
                  Keep Appointment
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleConfirmCancel}
                  disabled={isLoading}
                >
                  {isLoading ? "Cancelling..." : "Yes, Cancel Appointment"}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;

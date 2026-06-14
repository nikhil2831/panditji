export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Booking = {
  id: string;
  name: string;
  phone: string;
  serviceId: string;
  preferredDate: string;
  address: string;
  status: BookingStatus;
  createdAt: string;
};

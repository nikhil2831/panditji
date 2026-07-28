import { z } from "zod";

export const bookingRequestSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  serviceId: z.string().min(1, "Pooja service is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  address: z.string().min(8, "Address is required")
});

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;

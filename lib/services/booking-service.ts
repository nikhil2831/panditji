import pool from "@/lib/db";
import type { Booking } from "@/types/booking";
import type { BookingRequestInput } from "@/lib/validators/booking";
import { sendBookingNotificationEmail } from "@/lib/services/email-service";

export async function createBooking(input: BookingRequestInput): Promise<Booking> {
  const id = crypto.randomUUID();
  const status = "pending";
  const createdAt = new Date().toISOString();

  await pool.query(
    "INSERT INTO bookings (id, name, phone, service_id, preferred_date, address, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, input.name, input.phone, input.serviceId, input.preferredDate, input.address, status]
  );

  // Fetch service name from DB for the email notification
  let serviceName = input.serviceId;
  try {
    const [services] = await pool.query("SELECT name FROM pooja_services WHERE id = ?", [input.serviceId]);
    if (Array.isArray(services) && services.length > 0) {
      serviceName = (services[0] as any).name;
    }
  } catch (err) {
    console.error("Failed to fetch service name for email:", err);
  }

  // Send email notification asynchronously (non-blocking)
  sendBookingNotificationEmail({
    bookingId: id,
    name: input.name,
    phone: input.phone,
    serviceName,
    preferredDate: input.preferredDate,
    address: input.address,
    createdAt,
  }).catch((err) => {
    console.error("Failed to send booking notification email:", err);
  });

  return {
    id,
    ...input,
    status,
    createdAt
  };
}

export async function listBookings(): Promise<Booking[]> {
  const [rows] = await pool.query("SELECT * FROM bookings ORDER BY created_at DESC");
  
  return (rows as any[]).map((row) => ({
    id: row.id,
    name: row.name,
    phone: row.phone,
    serviceId: row.service_id,
    preferredDate: row.preferred_date,
    address: row.address,
    status: row.status,
    createdAt: row.created_at
  }));
}

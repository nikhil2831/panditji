import pool from "@/lib/db";
import type { Booking } from "@/types/booking";
import type { BookingRequestInput } from "@/lib/validators/booking";

export async function createBooking(input: BookingRequestInput): Promise<Booking> {
  const id = crypto.randomUUID();
  const status = "pending";
  const createdAt = new Date().toISOString();

  await pool.query(
    "INSERT INTO bookings (id, name, phone, service_id, preferred_date, address, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [id, input.name, input.phone, input.serviceId, input.preferredDate, input.address, status]
  );

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

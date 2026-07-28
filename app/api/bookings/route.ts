import { NextResponse } from "next/server";
import { createBooking, listBookings } from "@/lib/services/booking-service";
import { bookingRequestSchema } from "@/lib/validators/booking";

export async function GET() {
  const bookings = await listBookings();

  return NextResponse.json({
    data: bookings
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = bookingRequestSchema.safeParse(body);

  if (!parsed.success) {
    console.error("Booking validation failed:", parsed.error.flatten());
    return NextResponse.json(
      {
        error: "Invalid booking details",
        details: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const booking = await createBooking(parsed.data);

  return NextResponse.json(
    {
      data: booking
    },
    { status: 201 }
  );
}

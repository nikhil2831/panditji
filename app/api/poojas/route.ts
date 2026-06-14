import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM pooja_services");
    
    const poojaServices = (rows as any[]).map((row) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      durationMinutes: row.duration_minutes,
      startingPrice: row.starting_price,
      samagriIncluded: Boolean(row.samagri_included)
    }));

    return NextResponse.json({
      data: poojaServices
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}

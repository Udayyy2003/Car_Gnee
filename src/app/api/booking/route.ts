import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { 
      name, 
      phone, 
      email, 
      carType, 
      plan, 
      address, 
      preferredTime, 
      startDate, 
      message 
    } = body;

    if (!name || !phone || !carType || !plan || !address || !preferredTime || !startDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = {
      id: crypto.randomUUID(),
      name,
      phone,
      email: email || "",
      carType,
      plan,
      address,
      preferredTime,
      startDate,
      message: message || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: booking, message: "Booking submitted successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process booking" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: "Booking API endpoint. Use POST to submit a booking.",
      requiredFields: ["name", "phone", "carType", "plan", "address", "preferredTime", "startDate"],
      optionalFields: ["email", "message"]
    },
    { status: 200 }
  );
}

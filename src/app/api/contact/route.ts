import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, phone, email, carType, plan, message } = body;

    if (!name || !phone || !carType || !plan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const contact = {
      id: crypto.randomUUID(),
      name,
      phone,
      email: email || "",
      carType,
      plan,
      message: message || "",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      { success: true, data: contact, message: "Contact saved successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: "Contact API endpoint. Use POST to submit a contact inquiry.",
      requiredFields: ["name", "phone", "carType", "plan"],
      optionalFields: ["email", "message"]
    },
    { status: 200 }
  );
}

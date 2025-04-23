import { NextRequest, NextResponse } from "next/server";
import { ContactForm } from "@/app/types";

export async function POST(request: NextRequest) {
  try {
    const contactData: ContactForm = await request.json();

    // Validate required fields
    if (!contactData.name || !contactData.email || !contactData.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // In a real app, we would send this data to an email service or save to a database
    console.log("Received contact form submission:", contactData);

    // Simulate successful submission
    return NextResponse.json(
      { message: "Message received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to process contact form" },
      { status: 500 }
    );
  }
}

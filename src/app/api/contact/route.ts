import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // Spam honeypot trap
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    // Input validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return NextResponse.json(
        { error: "Please provide a subject line (at least 3 characters)." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a detailed message (at least 10 characters)." },
        { status: 400 }
      );
    }

    // Server-side logging for development/demonstration
    console.log("=== NEW CONTACT FORM SUBMISSION ===");
    console.log(`From: ${name.trim()} <${email.trim()}>`);
    console.log(`Subject: ${subject.trim()}`);
    console.log(`Message: ${message.trim()}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log("===================================");

    // If RESEND_API_KEY is configured in production, it can trigger email delivery here.
    // Otherwise it successfully accepts and logs the submission.

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your message has been received.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while sending your message. Please try again." },
      { status: 500 }
    );
  }
}


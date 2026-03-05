import { NextResponse } from "next/server";
import { sendLeadEmail } from "@/lib/email";

// Simple in-memory rate limiting (Note: This will reset on serverless cold starts)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    
    // Simple Rate Limiting
    const lastRequestTime = rateLimitMap.get(ip) || 0;
    if (now - lastRequestTime < RATE_LIMIT_WINDOW / MAX_REQUESTS) {
       return NextResponse.json({ success: false, message: "Too many requests. Please try again later." }, { status: 429 });
    }
    rateLimitMap.set(ip, now);

    const body = await request.json();
    const { name, phone, email, timestamp, answers, source, honeypot } = body;

    // Honeypot check
    if (honeypot) {
      console.warn("Spam detected via honeypot from IP:", ip);
      return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 }); // Silent fail
    }

    // Basic Validation
    if (!name || !phone) {
      return NextResponse.json({ success: false, message: "Name and phone are required" }, { status: 400 });
    }

    console.log(`Received Lead from ${source}:`, body);

    // Send Email Notification via Resend (using our lib)
    const emailResult = await sendLeadEmail({
      name,
      phone,
      email,
      timestamp,
      answers: answers || {
        'State': body.state,
        'Accident Type': body.accident_type,
        'Description': body.description
      },
      source: source || 'form',
      metadata: {
        ip,
        userAgent: request.headers.get("user-agent") || "unknown"
      }
    });

    if (!emailResult.success) {
      console.error("Failed to send lead email:", emailResult.error);
      // We still return success to the user as the lead was captured in logs
    }

    return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
  } catch (error) {
    console.error("Lead Capture Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

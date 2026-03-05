import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, state, accident_type, description, timestamp } = body;

    console.log("Received Lead:", body);

    // 1. Send Email Notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Rig Accident Leads <onboarding@resend.dev>', // Update this after verifying your domain in Resend
          to: ['delivered@resend.dev'], // Update to your actual notification email
          subject: `New Lead: ${name} - ${accident_type}`,
          html: `
            <h1>New Lead Captured</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>State:</strong> ${state}</p>
            <p><strong>Accident Type:</strong> ${accident_type}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Timestamp:</strong> ${timestamp}</p>
            <p><strong>Source:</strong> rigaccident.com</p>
          `
        });
      } catch (emailError) {
        console.error("Resend Email Error:", emailError);
      }
    }

    // 2. Webhook / CRM Integration (Optional)
    // await fetch('YOUR_WEBHOOK_URL', { ... });

    return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
  } catch (error) {
    console.error("Lead Capture Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

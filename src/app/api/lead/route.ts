import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Lead Data Format
    // { 
    //   name, 
    //   phone, 
    //   email, 
    //   state, 
    //   accident_type, 
    //   description, 
    //   timestamp, 
    //   source: "rigaccident.com" 
    // }

    console.log("Received Lead:", body);

    // 1. Send to Webhook (Placeholder)
    // await fetch('YOUR_WEBHOOK_URL', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body)
    // });

    // 2. Send to CRM (Placeholder)
    // await fetch('YOUR_CRM_WEBHOOK_URL', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(body)
    // });

    return NextResponse.json({ success: true, message: "Lead captured successfully" }, { status: 200 });
  } catch (error) {
    console.error("Lead Capture Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

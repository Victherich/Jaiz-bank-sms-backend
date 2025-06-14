// File: src/app/api/sms_twilio/route.ts

import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

// Handle preflight request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

// Handle actual SMS sending
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      bank,
      amount,
      account_number,
      phone_number,
      created_at
    } = body;

    if (!bank || !amount || !account_number || !phone_number || !created_at) {
      return new NextResponse(
        JSON.stringify({ success: false, error: 'Missing required fields.' }),
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    const message = `${bank}: ₦${amount} has been credited to your A/c Last 4 digits ${account_number.slice(-4)} on ${new Date(created_at).toLocaleString()}.`;

    await client.messages.create({
      body: message,
      to: phone_number,
      from: process.env.TWILIO_PHONE_NUMBER!,
    });

    return new NextResponse(
      JSON.stringify({ success: true, message: 'SMS sent successfully.' }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('[Twilio SMS Error]', error);
    return new NextResponse(
      JSON.stringify({ success: false, error: 'Internal server error while sending SMS.' }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ Open CORS policy (Allow all origins)
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

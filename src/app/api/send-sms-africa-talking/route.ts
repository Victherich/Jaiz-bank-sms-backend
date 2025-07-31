// // app/api/send-sms-africa-talking/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import AfricasTalking from 'africastalking';

// // Load environment variables (Next.js automatically loads .env.local)
// const AT_USERNAME = process.env.AFRICAS_TALKING_USERNAME;
// const AT_API_KEY = process.env.AFRICAS_TALKING_API_KEY;
// const AT_SENDER_ID = process.env.AFRICAS_TALKING_SENDER_ID; // Your registered sender ID

// // Initialize Africa's Talking SDK
// // Add a check to ensure credentials are defined before initializing
// let africastalking: ReturnType<typeof AfricasTalking>;
// let sms: ReturnType<typeof AfricasTalking['SMS']>;

// if (AT_API_KEY && AT_USERNAME) {
//     africastalking = AfricasTalking({
//         apiKey: AT_API_KEY,
//         username: AT_USERNAME,
//     });
//     sms = africastalking.SMS;
// } else {
//     console.error("Africa's Talking API credentials are not set.");
//     // You might want to handle this more gracefully, e.g., by throwing an error
//     // or returning an early response in the POST handler if sms is undefined.
// }


// // CORS Headers for your frontend
// const corsHeaders = {
//     'Access-Control-Allow-Origin': 'http://localhost:3002', // IMPORTANT: Replace with your React frontend's actual domain(s) in production
//     'Access-Control-Allow-Methods': 'POST, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Access-Control-Max-Age': '86400', // Cache preflight response for 24 hours
// };

// // Handle OPTIONS request for CORS preflight
// export async function OPTIONS() {
//     // Correct way to return a 204 No Content response in Next.js App Router
//     return new NextResponse(null, {
//         status: 204,
//         headers: corsHeaders,
//     });
// }

// // Handle actual SMS sending
// export async function POST(req: NextRequest) {
//     // Apply CORS headers for the actual response
//     const responseHeaders = new Headers(corsHeaders);

//     try {
//         if (!sms) {
//             return NextResponse.json(
//                 { success: false, error: "Africa's Talking API is not initialized. Check server configuration." },
//                 { status: 500, headers: responseHeaders }
//             );
//         }

//         const body = await req.json();
//         const { bank, amount, account_number, phone_number, created_at } = body;

//         // Basic validation
//         if (!bank || !amount || !account_number || !phone_number || !created_at) {
//             return NextResponse.json(
//                 { success: false, error: 'Missing required transaction fields.' },
//                 { status: 400, headers: responseHeaders }
//             );
//         }
//         if (!AT_USERNAME || !AT_API_KEY) {
//             // This check is technically redundant if `sms` is already checked, but good for clarity
//             return NextResponse.json(
//                 { success: false, error: 'Africa\'s Talking API credentials not configured.' },
//                 { status: 500, headers: responseHeaders }
//             );
//         }

//         // Format phone number to E.164 (e.g., +234...)
//         const formattedPhoneNumber = phone_number.startsWith('+') ? phone_number : `+${phone_number}`;

//         // Construct the message
//         const messageContent = `${bank}: NGN${amount} has been credited to your A/c ${account_number.slice(-4)} on ${new Date(created_at).toLocaleString()}. Thank you for banking with us.`;

//         const smsOptions = {
//             to: formattedPhoneNumber, // Africa's Talking SDK uses 'to'
//             message: messageContent,
//             from: AT_SENDER_ID, // Use senderId if provided, otherwise Africa's Talking uses a default
//             enqueue: true, // Queue messages asynchronously for better performance
//         };

//         console.log('Attempting to send SMS via Africa\'s Talking with options:', smsOptions);

//         const atResponse = await sms.send(smsOptions);

//         console.log('Africa\'s Talking API Response:', JSON.stringify(atResponse, null, 2));

//         // Check Africa's Talking response for success
//         if (atResponse && atResponse.SMSMessageData && atResponse.SMSMessageData.Recipients) {
//             const firstRecipient = atResponse.SMSMessageData.Recipients[0];
//             if (firstRecipient && firstRecipient.status === 'Success') {
//                 return NextResponse.json(
//                     { success: true, message: 'SMS sent successfully!', atResponse: atResponse },
//                     { status: 200, headers: responseHeaders }
//                 );
//             } else {
//                 console.error('Africa\'s Talking SMS failed for recipient:', firstRecipient);
//                 return NextResponse.json(
//                     {
//                         success: false,
//                         error: firstRecipient ? firstRecipient.status : 'Unknown Africa\'s Talking error',
//                         details: atResponse,
//                     },
//                     { status: 500, headers: responseHeaders }
//                 );
//             }
//         } else {
//             console.error('Unexpected Africa\'s Talking API response structure:', atResponse);
//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: 'Unexpected response from Africa\'s Talking API.',
//                     details: atResponse,
//                 },
//                 { status: 500, headers: responseHeaders }
//             );
//         }
//     } catch (error: any) {
//         console.error('[Africa\'s Talking SMS Error]', error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: 'Internal server error while sending SMS.',
//                 details: error.message || 'Check server logs.',
//             },
//             { status: 500, headers: responseHeaders } // Use responseHeaders here
//         );
//     }
// }












// 2nd code

// // app/api/send-sms-africa-talking/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import AfricasTalking from 'africastalking';

// // Load environment variables (Next.js automatically loads .env.local)
// const AT_USERNAME = process.env.AFRICAS_TALKING_USERNAME;
// const AT_API_KEY = process.env.AFRICAS_TALKING_API_KEY;
// const AT_SENDER_ID = process.env.AFRICAS_TALKING_SENDER_ID; // Your registered sender ID

// // Initialize Africa's Talking SDK
// let africastalking: ReturnType<typeof AfricasTalking>;
// let sms: ReturnType<typeof AfricasTalking['SMS']>;

// if (AT_API_KEY && AT_USERNAME) {
//     africastalking = AfricasTalking({
//         apiKey: AT_API_KEY,
//         username: AT_USERNAME,
//     });
//     sms = africastalking.SMS;
// } else {
//     console.error("Africa's Talking API credentials are not set.");
//     // In a production app, you might want to throw an error here to prevent the app from starting
//     // or log this more prominently and alert ops.
// }

// // CORS Headers for your frontend
// // IMPORTANT: Using '*' is generally NOT recommended for production APIs that handle sensitive data or use credentials.
// // For production, replace '*' with your actual React frontend domain(s), e.g., 'https://your-react-app.com'.
// const corsHeaders = {
//     'Access-Control-Allow-Origin': '*', // Allows requests from any origin. BE CAREFUL IN PRODUCTION!
//     'Access-Control-Allow-Methods': 'POST, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Access-Control-Max-Age': '86400', // Cache preflight response for 24 hours
//     // If you ever need to send credentials (cookies, auth headers) with Access-Control-Allow-Origin: '*',
//     // you CANNOT also set 'Access-Control-Allow-Credentials': 'true'. You MUST specify a concrete origin.
// };

// // Handle OPTIONS request for CORS preflight
// export async function OPTIONS() {
//     return new NextResponse(null, {
//         status: 204, // 204 No Content for successful preflight
//         headers: corsHeaders,
//     });
// }

// // Handle actual SMS sending
// export async function POST(req: NextRequest) {
//     // Apply CORS headers for the actual response
//     const responseHeaders = new Headers(corsHeaders);

//     try {
//         if (!sms) {
//             return NextResponse.json(
//                 { success: false, error: "Africa's Talking API is not initialized. Check server configuration and environment variables." },
//                 { status: 500, headers: responseHeaders }
//             );
//         }

//         const body = await req.json();
//         const { bank, amount, account_number, phone_number, created_at } = body;

//         // Basic validation
//         if (!bank || !amount || !account_number || !phone_number || !created_at) {
//             return NextResponse.json(
//                 { success: false, error: 'Missing required transaction fields.' },
//                 { status: 400, headers: responseHeaders }
//             );
//         }

//         // Environment variable check for credentials
//         if (!AT_USERNAME || !AT_API_KEY) {
//             return NextResponse.json(
//                 { success: false, error: 'Africa\'s Talking API credentials not configured in environment variables.' },
//                 { status: 500, headers: responseHeaders }
//             );
//         }

//         // Format phone number to E.164 (e.g., +234...)
//         const formattedPhoneNumber = phone_number.startsWith('+') ? phone_number : `+${phone_number}`;

//         // Construct the message
//         const messageContent = `Dear Customer, your ${bank} account ending xxxx${account_number.slice(-4)} has been credited with NGN${amount} ${new Date(created_at).toLocaleString()}. Thank you.`;

//         const smsOptions = {
//             to: formattedPhoneNumber, // Africa's Talking SDK uses 'to'
//             message: messageContent,
//             from: AT_SENDER_ID, // Use senderId if provided, otherwise Africa's Talking uses a default
//             enqueue: true, // Queue messages asynchronously for better performance
//         };

//         console.log('Attempting to send SMS via Africa\'s Talking with options:', smsOptions);

//         const atResponse = await sms.send(smsOptions);

//         console.log('Africa\'s Talking API Response:', JSON.stringify(atResponse, null, 2));

//         // Check Africa's Talking response for success
//         if (atResponse && atResponse.SMSMessageData && atResponse.SMSMessageData.Recipients) {
//             const firstRecipient = atResponse.SMSMessageData.Recipients[0];
//             if (firstRecipient && firstRecipient.status === 'Success') {
//                 return NextResponse.json(
//                     { success: true, message: 'SMS sent successfully!', atResponse: atResponse },
//                     { status: 200, headers: responseHeaders }
//                 );
//             } else {
//                 console.error('Africa\'s Talking SMS failed for recipient:', firstRecipient);
//                 return NextResponse.json(
//                     {
//                         success: false,
//                         error: firstRecipient ? firstRecipient.status : 'Unknown Africa\'s Talking error',
//                         details: atResponse,
//                     },
//                     { status: 500, headers: responseHeaders }
//                 );
//             }
//         } else {
//             console.error('Unexpected Africa\'s Talking API response structure:', atResponse);
//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: 'Unexpected response from Africa\'s Talking API.',
//                     details: atResponse,
//                 },
//                 { status: 500, headers: responseHeaders }
//             );
//         }
//     } catch (error: any) {
//         console.error('[Africa\'s Talking SMS Error]', error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: 'Internal server error while sending SMS.',
//                 details: error.message || 'Check server logs.',
//             },
//             { status: 500, headers: responseHeaders }
//         );
//     }
// }







// // 3rd code

// import { NextRequest, NextResponse } from 'next/server';
// import AfricasTalking from 'africastalking';

// // Load environment variables
// const AT_USERNAME = process.env.AFRICAS_TALKING_USERNAME;
// const AT_API_KEY = process.env.AFRICAS_TALKING_API_KEY;
// const AT_SENDER_ID = process.env.AFRICAS_TALKING_SENDER_ID;

// let africastalking: ReturnType<typeof AfricasTalking>;
// let sms: ReturnType<typeof AfricasTalking['SMS']>;

// if (AT_API_KEY && AT_USERNAME) {
//     africastalking = AfricasTalking({
//         apiKey: AT_API_KEY,
//         username: AT_USERNAME,
//     });
//     sms = africastalking.SMS;
// } else {
//     console.error("Africa's Talking API credentials are not set.");
// }

// const corsHeaders = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'POST, OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type',
//     'Access-Control-Max-Age': '86400',
// };

// export async function OPTIONS() {
//     return new NextResponse(null, {
//         status: 204,
//         headers: corsHeaders,
//     });
// }

// export async function POST(req: NextRequest) {
//     const responseHeaders = new Headers(corsHeaders);

//     try {
//         if (!sms) {
//             return NextResponse.json(
//                 { success: false, error: "Africa's Talking API is not initialized." },
//                 { status: 500, headers: responseHeaders }
//             );
//         }

//         const body = await req.json();
//         const { bank, amount, account_number, phone_number, created_at } = body;

//         if (!bank || !amount || !account_number || !phone_number || !created_at) {
//             return NextResponse.json(
//                 { success: false, error: 'Missing required transaction fields.' },
//                 { status: 400, headers: responseHeaders }
//             );
//         }

//         const formattedPhoneNumber = phone_number.startsWith('+')
//             ? phone_number
//             : `+${phone_number}`;

//         // ✅ Construct clean plain-text message (avoid ₦, emojis, and special characters)
//         const timeStamp = new Date(created_at).toLocaleString('en-NG', {
//             hour12: false,
//         });


//         const cleanMessage = `Dear Customer, your ${bank} account ending xxxx${account_number.slice(-4)} has been credited with NGN${amount} on ${timeStamp}. Thank you.`;

// //  const cleanMessage = `Dear Customer, Thank you.`;
// // const cleanMessage = "Dear customer,  your delivery has been dispatched and our representative shall get in touch with you. Thanks";


//         const smsOptions = {
//             to: formattedPhoneNumber,
//             message: cleanMessage,
//             from: AT_SENDER_ID || undefined,
//             enqueue: true,
//         };

//         console.log('Attempting to send SMS:', smsOptions);

//         const atResponse = await sms.send(smsOptions);

//         console.log('Africa\'s Talking Response:', JSON.stringify(atResponse, null, 2));

//         if (atResponse?.SMSMessageData?.Recipients?.[0]?.status === 'Success') {
//             return NextResponse.json(
//                 { success: true, message: 'SMS sent successfully.', atResponse },
//                 { status: 200, headers: responseHeaders }
//             );
//         } else {
//             const firstRecipient = atResponse?.SMSMessageData?.Recipients?.[0];
//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: firstRecipient?.status || 'Africa\'s Talking did not return success.',
//                     details: atResponse,
//                 },
//                 { status: 500, headers: responseHeaders }
//             );
//         }
//     } catch (error: any) {
//         console.error('[Africa\'s Talking SMS Error]', error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: 'Internal server error while sending SMS.',
//                 details: error.message || 'Check server logs.',
//             },
//             { status: 500, headers: responseHeaders }
//         );
//     }
// }






// 4th code
import { NextRequest, NextResponse } from 'next/server';
import AfricasTalking from 'africastalking';

// Load environment variables
const AT_USERNAME = process.env.AFRICAS_TALKING_USERNAME;
const AT_API_KEY = process.env.AFRICAS_TALKING_API_KEY;
const AT_SENDER_ID = process.env.AFRICAS_TALKING_SENDER_ID;

let africastalking: ReturnType<typeof AfricasTalking>;
let sms: ReturnType<typeof AfricasTalking>['SMS'];

if (AT_API_KEY && AT_USERNAME) {
  africastalking = AfricasTalking({
    apiKey: AT_API_KEY,
    username: AT_USERNAME,
  });
  sms = africastalking.SMS;
} else {
  console.error("Africa's Talking API credentials are not set.");
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  const responseHeaders = new Headers(corsHeaders);

  try {
    if (!sms) {
      return NextResponse.json(
        { success: false, error: "Africa's Talking API is not initialized." },
        { status: 500, headers: responseHeaders }
      );
    }

    const body = await req.json();
    const { bank, amount, account_number, phone_number, created_at } = body;

    if (!bank || !amount || !account_number || !phone_number || !created_at) {
      return NextResponse.json(
        { success: false, error: 'Missing required transaction fields.' },
        { status: 400, headers: responseHeaders }
      );
    }

    const formattedPhoneNumber = phone_number.startsWith('+')
      ? phone_number
      : `+${phone_number}`;

    const timeStamp = new Date(created_at).toLocaleString('en-NG', {
      hour12: false,
    });

    const cleanMessage = `Dear Customer, your ${bank} account ending xxxx${account_number.slice(
      -4
    )} has been credited with NGN${amount} on ${timeStamp}. Thank you.`;

    const smsOptions = {
      to: formattedPhoneNumber,
      message: cleanMessage,
      from: AT_SENDER_ID || undefined,
      enqueue: true,
    };

    console.log('Attempting to send SMS:', smsOptions);

    const atResponse = await sms.send(smsOptions);

    console.log("Africa's Talking Response:", JSON.stringify(atResponse, null, 2));

    const recipient = atResponse?.SMSMessageData?.Recipients?.[0];
    const wasSuccessful = recipient?.status === 'Success';

    return NextResponse.json(
      wasSuccessful
        ? { success: true, message: 'SMS sent successfully.', atResponse }
        : {
            success: false,
            error: recipient?.status || 'SMS failed to send.',
            details: atResponse,
          },
      {
        status: wasSuccessful ? 200 : 500,
        headers: responseHeaders,
      }
    );
  } catch (error: unknown) {
    console.error('[Africa\'s Talking SMS Error]', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while sending SMS.',
        details: errorMessage,
      },
      { status: 500, headers: responseHeaders }
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";

export async function POST(request: Request) {
  console.log("==========================================");
  console.log("🚀 PAYSTACK INITIALIZE ENDPOINT CALLED");
  console.log("===========================================");
  console.log("Timestamp:", new Date().toISOString());
  console.log("Request method:", request.method);
  console.log("Request URL:", request.url);
  
  try {
    const body = await request.json();
    const { email, amount, donorName, currency = "KES" } = body;
    console.log("📦 Request body:", { email, amount, donorName, currency });

    // Validate required fields
    if (!email || !amount) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields: email and amount are required" },
        { status: 400 }
      );
    }

    // Get Paystack secret key from environment
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!secretKey) {
      console.error("PAYSTACK_SECRET_KEY is not configured");
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 500 }
      );
    }

    // Convert amount to kobo (Paystack expects amount in smallest currency unit)
    // For USD, we'll use cents (multiply by 100)
    const amountInCents = Math.round(parseFloat(amount) * 100);

    if (isNaN(amountInCents) || amountInCents <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Generate unique reference
    const reference = `DON-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Initialize transaction with Paystack
    // Try with user's selected currency first, fallback to USD if not supported
    let paystackCurrency = currency;
    let response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountInCents,
        reference,
        currency: paystackCurrency,
        metadata: {
          donorName: donorName || "Anonymous",
          donationType: "one-time",
          originalCurrency: currency,
          custom_fields: [
            {
              display_name: "Donor Name",
              variable_name: "donor_name",
              value: donorName || "Anonymous",
            },
          ],
        },
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/donations?status=success`,
        // Webhook will handle the actual status update
      }),
    });

    let data = await response.json();
    console.log("📊 Paystack API response status:", response.status);
    console.log("📊 Paystack API response data:", JSON.stringify(data, null, 2));

    // If currency not supported, retry with USD
    if (!response.ok || !data.status) {
      const errorMessage = data.message || "";
      if (errorMessage.toLowerCase().includes("currency") || errorMessage.toLowerCase().includes("not supported")) {
        console.log(`Currency ${paystackCurrency} not supported, falling back to USD`);
        paystackCurrency = "USD";
        
        response = await fetch("https://api.paystack.co/transaction/initialize", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${secretKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            amount: amountInCents,
            reference,
            currency: paystackCurrency,
            metadata: {
              donorName: donorName || "Anonymous",
              donationType: "one-time",
              originalCurrency: currency,
              custom_fields: [
                {
                  display_name: "Donor Name",
                  variable_name: "donor_name",
                  value: donorName || "Anonymous",
                },
              ],
            },
            callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/donations?status=success`,
          }),
        });

        data = await response.json();
      }
      
      if (!response.ok || !data.status) {
        console.error("Paystack initialization error:", data);
        return NextResponse.json(
          { error: data.message || "Failed to initialize payment" },
          { status: 400 }
        );
      }
    }

    console.log("✅ Paystack API call successful, proceeding to save to Firestore");
    // Save transaction to Firestore AFTER successful Paystack API call
    console.log("🔥 Starting Firestore save process...");
    try {
      console.log("Attempting to save transaction to Firestore...");
      console.log("Firebase db object:", db);
      
      const transactionRef = doc(collection(db, "donations"));
      console.log("Document reference created:", transactionRef);
      
      const docData = {
        reference: data.data.reference || reference,
        amount: parseFloat(amount),
        currency: paystackCurrency,
        originalCurrency: currency,
        status: "pending",
        statusMessage: "Payment initiated, awaiting completion",
        donorName: donorName || "Anonymous",
        donorEmail: email,
        paymentMethod: "paystack",
        paymentType: "one-time",
        authorizationUrl: data.data.authorization_url,
        accessCode: data.data.access_code,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      console.log("Document data to save:", JSON.stringify(docData, null, 2));
      
      await setDoc(transactionRef, docData);
      
      console.log(`✅ SUCCESS: Transaction saved to Firestore: ${data.data.reference || reference}`);
      console.log(`Document ID: ${transactionRef.id}`);
    } catch (firebaseError: any) {
      console.error("❌ FAILED: Error saving transaction to Firestore:", firebaseError);
      console.error("Error type:", firebaseError.constructor.name);
      console.error("Error code:", firebaseError.code);
      console.error("Error message:", firebaseError.message);
      console.error("Error details:", JSON.stringify(firebaseError, null, 2));
      // Don't fail the request if Firestore save fails
    }

    // Return the authorization URL and reference
    return NextResponse.json({
      success: true,
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference || reference,
      accessCode: data.data.access_code,
    });
  } catch (error) {
    console.error("Error initializing Paystack transaction:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment. Please try again." },
      { status: 500 }
    );
  }
}
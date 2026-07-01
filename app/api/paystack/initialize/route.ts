import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, amount, donorName, currency = "KES" } = body;

    // Validate required fields
    if (!email || !amount) {
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

    // Create transaction record in Firestore
    try {
      const transactionRef = doc(collection(db, "donations"));
      await setDoc(transactionRef, {
        reference: reference,
        amount: parseFloat(amount),
        currency: currency,
        status: "pending",
        statusMessage: "Payment initiated, awaiting completion",
        donorName: donorName || "Anonymous",
        donorEmail: email,
        paymentMethod: "paystack",
        paymentType: "one-time",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      console.log(`Transaction record created for ${reference}`);
    } catch (firebaseError) {
      console.error("Error creating transaction record:", firebaseError);
      // Don't fail the request if Firestore save fails
    }

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
      }),
    });

    let data = await response.json();

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

    // Return the authorization URL and reference
    return NextResponse.json({
      success: true,
      authorizationUrl: data.data.authorization_url,
      reference: data.data.reference,
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
import { NextResponse } from "next/server";
import { db } from "../../../../lib/firebase";
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;

    if (!reference) {
      return NextResponse.json(
        { error: "Transaction reference is required" },
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

    // Verify transaction with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      console.error("Paystack verification error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to verify payment" },
        { status: 400 }
      );
    }

    const transaction = data.data;

    // Save/update donation record in Firestore
    try {
      // Check if transaction already exists
      const donationsRef = collection(db, "donations");
      const q = query(donationsRef, where("reference", "==", transaction.reference));
      const querySnapshot = await getDocs(q);
      
      // Determine status message based on Paystack response
      let statusMessage = "";
      if (transaction.status === "success") {
        statusMessage = "Payment completed successfully";
      } else if (transaction.status === "failed") {
        statusMessage = transaction.gateway_response || "Payment failed";
      } else if (transaction.status === "pending") {
        statusMessage = "Payment is being processed";
      } else if (transaction.status === "cancelled" || transaction.status === "reversed") {
        statusMessage = "Payment was cancelled or reversed";
      } else {
        statusMessage = transaction.gateway_response || `Payment ${transaction.status}`;
      }

      console.log(`Saving transaction ${transaction.reference} with status: ${transaction.status}`);
      console.log("Status message:", statusMessage);
      console.log("Full Paystack response:", JSON.stringify(transaction, null, 2));

      if (!querySnapshot.empty) {
        // Update existing transaction
        const docRef = querySnapshot.docs[0].ref;
        await setDoc(docRef, {
          status: transaction.status,
          statusMessage: statusMessage,
          amount: transaction.amount / 100,
          currency: transaction.currency,
          donorName: transaction.metadata?.donorName || "Anonymous",
          donorEmail: transaction.customer?.email,
          paymentMethod: "paystack",
          paymentType: transaction.metadata?.donationType || "one-time",
          paidAt: transaction.paid_at ? new Date(transaction.paid_at) : serverTimestamp(),
          updatedAt: serverTimestamp(),
          gatewayResponse: transaction.gateway_response,
          channel: transaction.channel,
          ipAddress: transaction.ip_address,
          // Save additional Paystack data
          authorization: transaction.authorization,
          customer: transaction.customer,
          metadata: transaction.metadata,
          card: transaction.card,
        }, { merge: true });
        
        console.log(`Transaction ${transaction.reference} updated successfully`);
        console.log("Document ID:", docRef.id);
      } else {
        // Create new transaction record
        const donationRef = doc(collection(db, "donations"));
        await setDoc(donationRef, {
          reference: transaction.reference,
          amount: transaction.amount / 100, // Convert from cents to dollars
          currency: transaction.currency,
          status: transaction.status,
          statusMessage: statusMessage,
          donorName: transaction.metadata?.donorName || "Anonymous",
          donorEmail: transaction.customer?.email,
          paymentMethod: "paystack",
          paymentType: transaction.metadata?.donationType || "one-time",
          paidAt: transaction.paid_at ? new Date(transaction.paid_at) : serverTimestamp(),
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          gatewayResponse: transaction.gateway_response,
          channel: transaction.channel,
          ipAddress: transaction.ip_address,
          // Save additional Paystack data
          authorization: transaction.authorization,
          customer: transaction.customer,
          metadata: transaction.metadata,
          card: transaction.card,
        });
        
        console.log(`Transaction ${transaction.reference} created successfully`);
        console.log("Document ID:", donationRef.id);
      }

      // Create notification for admin if payment was successful
      if (transaction.status === "success") {
        const notificationRef = doc(collection(db, "notifications"));
        await setDoc(notificationRef, {
          type: "new_donation",
          title: "New Donation Received",
          message: `${transaction.metadata?.donorName || "Anonymous"} donated ${transaction.currency} ${(transaction.amount / 100).toFixed(2)}`,
          read: false,
          link: "/admin/donations",
          createdAt: serverTimestamp(),
        });
      }
    } catch (firebaseError) {
      console.error("Error saving donation to Firestore:", firebaseError);
      // Don't fail the request if Firestore save fails
    }

    // Return transaction status
    return NextResponse.json({
      success: true,
      status: transaction.status,
      reference: transaction.reference,
      amount: transaction.amount / 100,
      currency: transaction.currency,
      paidAt: transaction.paid_at,
      customer: transaction.customer,
    });
  } catch (error) {
    console.error("Error verifying Paystack transaction:", error);
    return NextResponse.json(
      { error: "Failed to verify payment. Please try again." },
      { status: 500 }
    );
  }
}
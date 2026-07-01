import { NextResponse } from "next/server";
import { db } from "../../../../lib/firebase";
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ reference: string }> }
) {
  console.log("🔍 PAYSTACK VERIFY ENDPOINT CALLED");
  try {
    const { reference } = await params;
    console.log("📋 Verifying reference:", reference);

    if (!reference) {
      return NextResponse.json(
        { error: "Transaction reference is required" },
        { status: 400 }
      );
    }

    // Get Paystack secret key from environment
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      console.error("❌ PAYSTACK_SECRET_KEY is not configured");
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 500 }
      );
    }

    // Verify transaction with Paystack
    console.log("📡 Calling Paystack verify API...");
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
    console.log("📊 Paystack verify response status:", response.status);
    console.log("📊 Transaction status from Paystack:", data.data?.status);

    if (!response.ok || !data.status) {
      console.error("❌ Paystack verification error:", data);
      return NextResponse.json(
        { error: data.message || "Failed to verify payment" },
        { status: 400 }
      );
    }

    const transaction = data.data;
    console.log("✅ Paystack verification successful, transaction status:", transaction.status);
    console.log("💳 Transaction details:", JSON.stringify(transaction, null, 2));
    // Save/update donation record in Firestore
    console.log("💾 Saving transaction to Firestore...");
    try {
      // Check if transaction already exists
      const donationsRef = collection(db, "donations");
      const q = query(donationsRef, where("reference", "==", transaction.reference));
      const querySnapshot = await getDocs(q);
      
      // Determine status message based on Paystack response
      let statusMessage = "";
      console.log("I am here");
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
      console.log("ℹ️ Status message determined:", statusMessage);
      if (!querySnapshot.empty) {
        // Update existing transaction
        const docRef = querySnapshot.docs[0].ref;
        console.log("📝 Updating existing transaction:", docRef.id);
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
        console.log("✅ Transaction updated successfully");
      } else {
        // Create new transaction record
        const donationRef = doc(collection(db, "donations"));
        console.log("📝 Creating new transaction:", donationRef.id);
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
        console.log("✅ Transaction created successfully");
      }

      // Send email notification for successful payments
      if (transaction.status === "success") {
        console.log("📧 Payment successful, sending email notification...");
        try {
          const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-email`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              subject: "New Donation Received - Freedom Baptist Mission",
              template: "donation-confirmation",
              data: {
                donorName: transaction.metadata?.donorName || "Anonymous",
                amount: (transaction.amount / 100).toFixed(2),
                reference: transaction.reference,
                currency: transaction.currency,
              },
            }),
          });

          if (emailResponse.ok) {
            const emailResult = await emailResponse.json();
            console.log("✅ Email sent successfully:", emailResult.sentCount, "recipients");
          } else {
            const errorData = await emailResponse.json();
            console.error("❌ Failed to send email:", errorData);
          }
        } catch (emailError) {
          console.error("❌ Error sending email:", emailError);
        }

        // Create notification for admin
        console.log("🔔 Creating admin notification...");
        const notificationRef = doc(collection(db, "notifications"));
        await setDoc(notificationRef, {
          type: "new_donation",
          title: "New Donation Received",
          message: `${transaction.metadata?.donorName || "Anonymous"} donated ${transaction.currency} ${(transaction.amount / 100).toFixed(2)}`,
          read: false,
          link: "/admin/donations",
          createdAt: serverTimestamp(),
        });
        console.log("✅ Admin notification created");
      }
    } catch (firebaseError) {
      console.error("❌ Error saving donation to Firestore:", firebaseError);
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
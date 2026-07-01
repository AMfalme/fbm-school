import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from "firebase/firestore";
import crypto from "crypto";

// Production webhook endpoint
// Configure this URL in your Paystack dashboard: https://dashboard.paystack.com/#/settings/developer
// Webhook URL: https://your-domain.com/api/paystack/webhook
export async function POST(request: Request) {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const webhookSecret = process.env.PAYSTACK_WEBHOOK_SECRET;
    
    if (!secretKey) {
      console.error("PAYSTACK_SECRET_KEY is not configured");
      return NextResponse.json(
        { error: "Payment service is not configured" },
        { status: 500 }
      );
    }

    // Get the raw body for signature verification
    const body = await request.text();
    
    // Verify webhook signature if secret is configured
    if (webhookSecret) {
      const paystackSignature = request.headers.get("x-paystack-signature");
      
      if (!paystackSignature) {
        console.error("Missing webhook signature");
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 401 }
        );
      }

      // Verify the signature
      const hash = crypto
        .createHmac("sha512", webhookSecret)
        .update(body)
        .digest("hex");

      if (hash !== paystackSignature) {
        console.error("Invalid webhook signature");
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 401 }
        );
      }
    }
    
    const event = JSON.parse(body);
    
    // Handle different event types
    if (event.event === "charge.success") {
      const transaction = event.data;
      
      // Update transaction status to success
      await updateTransactionStatus(
        transaction.reference,
        "success",
        "Payment completed successfully",
        transaction
      );
      
      // Send confirmation email to donor
      await sendDonationConfirmationEmail(transaction);
      
    } else if (event.event === "charge.failed") {
      const transaction = event.data;
      
      // Update transaction status to failed
      await updateTransactionStatus(
        transaction.reference,
        "failed",
        transaction.gateway_response || "Payment failed",
        transaction
      );
      
    } else if (event.event === "charge.pending" || event.event === "transfer.pending") {
      const transaction = event.data;
      
      // Update transaction status to pending
      await updateTransactionStatus(
        transaction.reference,
        "pending",
        "Payment is being processed",
        transaction
      );
      
    } else if (event.event === "charge.cancelled" || event.event === "charge.reversed") {
      const transaction = event.data;
      
      // Update transaction status to cancelled
      await updateTransactionStatus(
        transaction.reference,
        "cancelled",
        "Payment was cancelled or reversed",
        transaction
      );
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true }, { status: 200 });
    
  } catch (error) {
    console.error("Error processing Paystack webhook:", error);
    // Still return 200 to prevent Paystack from retrying
    return NextResponse.json(
      { received: true, error: "Processed with errors" },
      { status: 200 }
    );
  }
}

async function updateTransactionStatus(
  reference: string,
  status: string,
  statusMessage: string,
  transactionData: any
) {
  try {
    // Find the transaction by reference
    const donationsRef = collection(db, "donations");
    const q = query(donationsRef, where("reference", "==", reference));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      
      // Update the transaction
      await setDoc(docRef, {
        status: status,
        statusMessage: statusMessage,
        updatedAt: serverTimestamp(),
        paidAt: transactionData.paid_at ? new Date(transactionData.paid_at) : serverTimestamp(),
        gatewayResponse: transactionData.gateway_response,
        channel: transactionData.channel,
        ipAddress: transactionData.ip_address,
      }, { merge: true });
      
      console.log(`Transaction ${reference} updated to status: ${status}`);
    } else {
      // If transaction not found, create it (for webhook-only scenarios)
      const newDonationRef = doc(collection(db, "donations"));
      await setDoc(newDonationRef, {
        reference: transactionData.reference,
        amount: transactionData.amount / 100,
        currency: transactionData.currency,
        status: status,
        statusMessage: statusMessage,
        donorName: transactionData.metadata?.donorName || "Anonymous",
        donorEmail: transactionData.customer?.email,
        paymentMethod: "paystack",
        paymentType: transactionData.metadata?.donationType || "one-time",
        paidAt: transactionData.paid_at ? new Date(transactionData.paid_at) : serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        gatewayResponse: transactionData.gateway_response,
        channel: transactionData.channel,
        ipAddress: transactionData.ip_address,
      });
      
      console.log(`New transaction ${reference} created with status: ${status}`);
    }
  } catch (error) {
    console.error("Error updating transaction status:", error);
  }
}

async function sendDonationConfirmationEmail(transaction: any) {
  try {
    // This function can be implemented to send email notifications
    // You can use nodemailer or any email service
    // For now, we'll just log it
    console.log(`Sending confirmation email to ${transaction.customer?.email} for donation ${transaction.reference}`);
    
    // Example implementation (you'll need to set up email service):
    // await fetch("/api/send-email", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     to: transaction.customer.email,
    //     subject: "Thank you for your donation!",
    //     template: "donation-confirmation",
    //     data: {
    //       donorName: transaction.metadata?.donorName,
    //       amount: transaction.amount / 100,
    //       reference: transaction.reference,
    //     },
    //   }),
    // });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}
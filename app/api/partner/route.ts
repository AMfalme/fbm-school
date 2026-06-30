import { NextResponse } from "next/server";
import { db } from "../../lib/firebase";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, organization, partnershipType, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, email, phone, and message are required" },
        { status: 400 }
      );
    }

    // Create partner document
    const partnerRef = doc(db, "partner", Date.now().toString());
    await setDoc(partnerRef, {
      fullName,
      email,
      phone,
      organization: organization || "",
      partnershipType: partnershipType || "MISSIONARY",
      message,
      status: "new",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Create notification for admin
    const notificationRef = doc(collection(db, "notifications"));
    await setDoc(notificationRef, {
      type: "new_message",
      title: "New Partner Inquiry",
      message: `${fullName} from ${organization || "Independent"} submitted a partnership inquiry`,
      read: false,
      link: "/admin/partners",
      createdAt: serverTimestamp(),
    });

    // Try to send email notification (non-blocking)
    try {
      // TODO: Implement email sending with Nodemailer or similar service
      // This is a placeholder for future email integration
      console.log(`[Email Service] New partner submission from ${fullName} (${email})`);
      console.log(`[Email Service] Organization: ${organization || "Independent"}`);
      console.log(`[Email Service] Partnership Type: ${partnershipType}`);
      console.log(`[Email Service] Message: ${message}`);
      // When email service is implemented, wrap the actual send logic here
      // Example: await sendEmail({ to: "admin@example.com", subject: "New Partner Inquiry", text: message });
    } catch (emailError) {
      // Log email error but don't fail the request since data is saved
      console.error("[Email Service] Failed to send email notification:", emailError);
      console.error("[Email Service] Partner data was saved successfully to Firestore");
    }

    return NextResponse.json(
      { success: true, message: "Partner inquiry submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting partner form:", error);
    return NextResponse.json(
      { error: "Failed to submit partner inquiry" },
      { status: 500 }
    );
  }
}
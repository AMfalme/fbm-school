import { NextResponse } from "next/server";
import { db } from "../../lib/firebase";
import { doc, setDoc, serverTimestamp, collection } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, email, and message are required" },
        { status: 400 }
      );
    }

    // Create contact document
    const contactRef = doc(db, "contact", Date.now().toString());
    await setDoc(contactRef, {
      fullName,
      email,
      phone: phone || "",
      subject: subject || "No subject",
      message,
      status: "new",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Create notification for admin
    const notificationRef = doc(collection(db, "notifications"));
    await setDoc(notificationRef, {
      type: "new_message",
      title: "New Contact Message",
      message: `${fullName} sent a new contact message: "${subject}"`,
      read: false,
      link: "/admin/contacts",
      createdAt: serverTimestamp(),
    });

    // Try to send email notification (non-blocking)
    try {
      // TODO: Implement email sending with Nodemailer or similar service
      // This is a placeholder for future email integration
      console.log(`[Email Service] New contact submission from ${fullName} (${email})`);
      console.log(`[Email Service] Subject: ${subject}`);
      console.log(`[Email Service] Message: ${message}`);
      // When email service is implemented, wrap the actual send logic here
      // Example: await sendEmail({ to: "admin@example.com", subject, text: message });
    } catch (emailError) {
      // Log email error but don't fail the request since data is saved
      console.error("[Email Service] Failed to send email notification:", emailError);
      console.error("[Email Service] Contact data was saved successfully to Firestore");
    }

    return NextResponse.json(
      { success: true, message: "Contact form submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
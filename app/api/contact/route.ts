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
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `New Contact Message: ${subject || "No subject"}`,
          template: "contact-notification",
          data: {
            message: `You have received a new contact message from ${fullName}.\n\nEmail: ${email}\nPhone: ${phone || "Not provided"}\nSubject: ${subject || "No subject"}\n\nMessage:\n${message}`,
          },
        }),
      });
    } catch (emailError) {
      // Log email error but don't fail the request since data is saved
      console.error("Failed to send email notification:", emailError);
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
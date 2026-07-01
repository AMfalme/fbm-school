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
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: `New Partner Inquiry: ${partnershipType || "MISSIONARY"}`,
          template: "partner-notification",
          data: {
            message: `You have received a new partner inquiry from ${fullName}.\n\nEmail: ${email}\nPhone: ${phone}\nOrganization: ${organization || "Independent"}\nPartnership Type: ${partnershipType}\n\nMessage:\n${message}`,
          },
        }),
      });
    } catch (emailError) {
      // Log email error but don't fail the request since data is saved
      console.error("Failed to send email notification:", emailError);
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
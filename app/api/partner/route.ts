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

    // TODO: Send email notification to configured recipients
    // This will be implemented with Nodemailer or similar service
    console.log(`New partner submission from ${fullName} (${email})`);

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
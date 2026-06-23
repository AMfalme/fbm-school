import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (getApps().length === 0) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (initError: any) {
    console.error('Firebase Admin Initialization Error:', initError);
  }
}

export async function POST(request: Request) {
  try {
    const { uid } = await request.json();
    
    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    // Correct way to invoke Auth instance using sub-module imports
    await getAuth().setCustomUserClaims(uid, { admin: true });
    return NextResponse.json({ message: `Successfully made user ${uid} an admin.` });
  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
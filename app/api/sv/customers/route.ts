// app/api/sv/customer/route.ts

import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase"; 
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { verifyRole } from "@/app/lib/auth-middleware";

export async function POST(request: Request) {
  try {
    const auth = await verifyRole(['site-visitor', 'Super-admin']);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();

    const customerData = {
      profileReference: body.profileReference || `${body.owner?.ownerName} - ${body.clientBank?.bankName}`,
      owner: { ...body.owner },
      clientBank: { ...body.clientBank },
      createdBy: auth.userId, 
      createdAt: new Date(),
      updatedAt: new Date(),
      dynamicFields: body.dynamicFields || {} 
    };

    const docRef = await addDoc(collection(db, "customers"), customerData);
    
    return NextResponse.json({ id: docRef.id, ...customerData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create customer profile" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const auth = await verifyRole(['site-visitor', 'drafter', 'valuator', 'Super-admin']);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const customersRef = collection(db, "customers");
    const q = query(customersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const customers = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customer profiles" }, { status: 500 });
  }
}
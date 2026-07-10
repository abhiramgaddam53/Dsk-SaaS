// app/api/sv/valuation-record/[id]/route.ts

import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase"; 
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { verifyRole } from "@/app/lib/auth-middleware";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await verifyRole(['site-visitor', 'drafter', 'valuator', 'Super-admin']);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const { id } = await params;
    const resolvedParams = await params; // ✅ Unwrap the promise first
    const recordRef = doc(db, "records", resolvedParams.id); 
    const recordDoc = await getDoc(recordRef);

    if (!recordDoc.exists()) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json({ id: recordDoc.id, ...recordDoc.data() }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch record details" }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const auth = await verifyRole(['site-visitor', 'drafter', 'valuator' , 'Super-admin']);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();
    const resolvedParams = await params; // ✅ Unwrap the promise first
    const recordRef = doc(db, "records", resolvedParams.id);  
    
    const currentDoc = await getDoc(recordRef);
    if (!currentDoc.exists()) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const currentData = currentDoc.data();
    
    const updateData = {
      ...body,
      clientBank: { ...currentData.clientBank, ...(body.clientBank || {}) },
      owner: { ...currentData.owner, ...(body.owner || {}) },
      locality: { ...currentData.locality, ...(body.locality || {}) },
      property: { ...currentData.property, ...(body.property || {}) },
      boundaries: { ...currentData.boundaries, ...(body.boundaries || {}) },
      market: { ...currentData.market, ...(body.market || {}) },
      dynamicFields: { ...currentData.dynamicFields, ...(body.dynamicFields || {}) },
      updatedAt: new Date(),
    };

    await updateDoc(recordRef, updateData);
    
    return NextResponse.json({ success: true, id: params.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}
 
// app/api/valuator/record-action/[id]/route.ts

import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase"; 
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { verifyRole } from "@/app/lib/auth-middleware";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const auth = await verifyRole(['valuator', 'Super-admin']);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    const body = await request.json();
    const { decision, notes, notifyTeam, draftData } = body;

    const recordRef = doc(db, "records", id);
    const recordDoc = await getDoc(recordRef);

    if (!recordDoc.exists()) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    let newStatus = '';
    if (decision === 'accept') {
      newStatus = 'approved';
    } else if (decision === 'hold') {
      newStatus = 'revision_requested'; 
    } else {
      return NextResponse.json({ error: "Invalid decision" }, { status: 400 });
    }

    const updateData: any = {
      status: newStatus,
      updatedAt: new Date(),
    };

    // If the valuator made minor edits, save them back to draftData
    if (draftData) {
      updateData.draftData = draftData;
    }

    if (notes && notes.trim() !== "") {
      updateData.internalNotes = arrayUnion({
        text: notes,
        authorId: auth.userId,
        authorRole: auth.userRole,
        timestamp: new Date(),
        decision: decision
      });
    }

    await updateDoc(recordRef, updateData);
    
    return NextResponse.json({ success: true, status: newStatus }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update record decision" }, { status: 500 });
  }
}
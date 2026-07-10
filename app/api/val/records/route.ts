// app/api/valuator/records/route.ts

import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase"; 
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { verifyRole } from "@/app/lib/auth-middleware";

export async function GET(request: Request) {
  try {
    const auth = await verifyRole(['valuator', 'Super-admin']);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const recordsRef = collection(db, "records");
    // Fetch records sent for approval, and previously approved ones
    const q = query(
      recordsRef, 
      where("status", "in", ["pending_approval","revision_requested", "approved"]), 
      orderBy("updatedAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    
    const records = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        customerName: data.owner?.ownerName || "Unknown",
        bankName: data.clientBank?.bankName || "Unknown",
        reportType: data.templateType || "Unknown",
        lastUpdated: data.updatedAt,
        status: data.status,
      };
    });

    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch valuator records" }, { status: 500 });
  }
}
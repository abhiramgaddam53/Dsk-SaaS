 
// app/api/d/records/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase"; 
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { verifyRole } from "@/app/lib/auth-middleware";

export async function GET(request: Request) {
  try {
    const auth = await verifyRole(['drafter', 'Super-admin']);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let recordsRef = collection(db, "records");
    let q;

    if (status) {
      q = query(recordsRef, where("status", "==", status), orderBy("updatedAt", "desc"));
    } else {
      q = query(recordsRef,orderBy("updatedAt", "desc"));
    }

    const querySnapshot = await getDocs(q);
    
    const records = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        customerName: data.owner?.ownerName || "Unknown",
        reportType: data.clientBank?.propertyType || "Unknown",
        lastUpdated: data.updatedAt,
        status: data.status,
        ...data 
      };
    });

    return NextResponse.json(records, { status: 200 });
  } catch (error: any) {
    console.error("Firebase Database Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch records. Check server console for missing Firebase index links." }, 
      { status: 500 }
    );
  }
}
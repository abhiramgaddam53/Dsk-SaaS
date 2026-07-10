// app/api/sv/valuation-record/route.ts

import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase/firebase"; 
import { collection, addDoc, getDocs, query, where, orderBy , QueryConstraint} from "firebase/firestore";
import { verifyRole } from "@/app/lib/auth-middleware";

export async function POST(request: Request) {
  try {
    const auth = await verifyRole(['site-visitor', 'Super-admin']);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();
    
    const recordData = {
      customerId: body.customer, 
      status: 'pending_drafter',
      assignedDrafterId: null,
      templateId: null,
       
      clientBank: { ...body.clientBank },
      owner: { ...body.owner },
      locality: { ...body.locality },
      property: { ...body.property },
      boundaries: { ...body.boundaries },
      floors: Array.isArray(body.floors) ? [...body.floors] : [],
      market: { ...body.market },
      negativePoints: Array.isArray(body.negativePoints) ? [...body.negativePoints] : [],
      
      uploads: {
        photos: body.uploads?.photos || [],
        documents: body.uploads?.documents || [],
      },
      
      dynamicFields: body.dynamicFields || {},

      createdBy: auth.userId, 
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, "records"), recordData);
    
    return NextResponse.json({ id: docRef.id, ...recordData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create valuation record" }, { status: 500 });
  }
}
 
export async function GET(request: Request) {
  console.log("HIT user-specific valuation api");
  try {
    // 1. Authenticate and get the user's ID and Role
    const auth = await verifyRole(['site-visitor', 'drafter', 'valuator', 'Super-admin']);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    
    let recordsRef = collection(db, "records");
    
    // 2. Build an array of Firestore query constraints
    let constraints: QueryConstraint[] = [];

    // 3. Filter by User ID depending on their role
    // IMPORTANT: Change "drafterId" or "createdBy" to match the exact field name in your Firestore documents!
    if (auth.userRole === 'drafter') {
      constraints.push(where("drafterId", "==", auth.userId)); 
    } else if (auth.userRole === 'site-visitor') {
      constraints.push(where("createdBy", "==", auth.userId));
    }
    // Note: Super-admin or Valuator might need to see all records, so we don't restrict them here.

    // 4. Filter by status if provided in the URL (e.g., ?status=drafting)
    if (status) {
      constraints.push(where("status", "==", status));
    }

    // 5. Always order by newest first
    constraints.push(orderBy("createdAt", "desc"));

    // 6. Execute the query with the spread constraints
    const q = query(recordsRef, ...constraints);
    const querySnapshot = await getDocs(q);
    
    const records = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log(`END user-specific api: Found ${records.length} records for ${auth.userId}`);
    return NextResponse.json(records, { status: 200 });
    
  } catch (error) {
    console.error("END user-specific api error:", error);
    return NextResponse.json({ error: "Failed to fetch records" }, { status: 500 });
  }
}
// // app/lib/auth-middleware.ts

// import { cookies } from "next/headers";
// import { UserRole } from "./types/roles"; 

// export async function verifyAuth() {
//   const cookieStore = await cookies();
//   const sessionToken = cookieStore.get("session")?.value;
//   const userRole = cookieStore.get("userRole")?.value as UserRole | undefined;
//   const userId  = cookieStore.get("userId")?.value;
//   if (!sessionToken) {
//     return { error: "Unauthorized: No session found", status: 401 };
//   }

//   return { userId,sessionToken, userRole, status: 200 };
// }

// export async function verifyRole(allowedRoles: UserRole[]) {
//   const auth = await verifyAuth();

//   if (auth.error) {
//     return auth;
//   }

//   if (!auth.userRole || !allowedRoles.includes(auth.userRole)) {
//     return { error: "Forbidden: Insufficient permissions", status: 403 };
//   }

//   return auth;
// }

// app/lib/auth-middleware.ts
import { cookies } from "next/headers";
import { UserRole } from "./types/roles"; 
import { adminAuth, adminDb } from "@/app/lib/firebase/firebase-admin";

export async function verifyAuth() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;
  const uRole = cookieStore.get("userRole")?.value;

  if (!sessionToken) {
    return { error: "Unauthorized: No session found", status: 401, code: "NO_SESSION" };
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(sessionToken);
    const userId = decodedToken.uid;

    const userDoc = await adminDb.collection("users").doc(userId).get();
    
    if (!userDoc.exists) {
      return { error: "Unauthorized: User database record not found", status: 401, code: "USER_NOT_FOUND" };
    }

    const userRole = userDoc.data()?.role as UserRole;
    
    if (userRole !== uRole) {
      return { error: "Unauthorized: Role mismatch", status: 403, code: "ROLE_MISMATCH" };
    }
    
    return { userId, sessionToken, userRole, status: 200 };
  } catch (error: any) {
    if (error.code === 'auth/id-token-expired') {
      return { error: "Session expired", status: 401, code: "TOKEN_EXPIRED" };
    }
    return { error: "Unauthorized: Invalid session", status: 401, code: "INVALID_TOKEN" };
  }
}

export async function verifyRole(allowedRoles: UserRole[]) {
  const auth = await verifyAuth();

  if (auth.error) {
    return auth;
  }

  if (!auth.userRole || !allowedRoles.includes(auth.userRole)) {
    return { error: "Forbidden: Insufficient permissions", status: 403, code: "INSUFFICIENT_PERMISSIONS" };
  }

  return auth;
}
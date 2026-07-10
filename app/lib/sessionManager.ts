// app/lib/sessionManager.ts
import { auth } from "./firebase/firebase";

// Prevents multiple simultaneous refresh calls if several requests
// hit a 401 at the same time — they all await the same refresh.
let refreshPromise: Promise<boolean> | null = null;

// Firebase's client SDK restores the signed-in user ASYNCHRONOUSLY after
// a page load / full navigation. Right after a redirect, auth.currentUser
// can briefly be null even though the user IS actually signed in. Without
// this wait, refreshSession() gives up immediately and triggers a
// login redirect -> middleware bounce -> reload -> same race -> loop.
async function waitForAuthReady(): Promise<void> {
  // authStateReady() resolves once Firebase finishes its initial check.
  if (typeof (auth as any).authStateReady === 'function') {
    await (auth as any).authStateReady();
    return;
  }
  // Fallback for older SDK versions without authStateReady()
  if (auth.currentUser) return;
  await new Promise<void>((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      unsubscribe();
      resolve();
    });
  });
}

async function clearSessionCookies(): Promise<void> {
  try {
    await fetch('/api/auth/session', { method: 'DELETE' });
  } catch {
    // best effort — if this fails we still redirect below
  }
}

async function refreshSession(): Promise<boolean> {
  await waitForAuthReady();

  if (!auth.currentUser) return false;

  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const newToken = await auth.currentUser!.getIdToken(true); // force refresh

        // Deliberately NOT sending `role` here — it lives in an httpOnly
        // cookie the client can't read, and route.ts now leaves the
        // existing userRole cookie untouched when role is omitted.
        const res = await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: newToken, uid: auth.currentUser!.uid }),
        });

        return res.ok;
      } catch {
        return false;
      } finally {
        // clear so the next 401 can trigger a fresh refresh cycle
        setTimeout(() => { refreshPromise = null; }, 0);
      }
    })();
  }

  return refreshPromise;
}

/**
 * Drop-in replacement for fetch() for any authenticated API call.
 * - Sends credentials automatically.
 * - On a 401 with code TOKEN_EXPIRED: refreshes the Firebase token,
 *   re-issues the session cookie, then retries the ORIGINAL request once.
 * - On any other 401 (bad session, role mismatch, refresh failure):
 *   redirects to /login.
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const res = await fetch(url, { credentials: 'include', ...options });

  if (res.status !== 401) return res;

  const errorData = await res.clone().json().catch(() => ({}));

  if (errorData.code !== 'TOKEN_EXPIRED') {
    // NO_SESSION, ROLE_MISMATCH, INVALID_TOKEN, etc — refreshing won't help.
    // Clear cookies FIRST: if the stale session cookie is still there,
    // middleware.ts will see it, treat /login as already-authenticated,
    // and redirect straight back to the dashboard — an infinite loop.
    await clearSessionCookies();
    window.location.href = '/login?expired=true';
    return res;
  }

  const refreshed = await refreshSession();

  if (!refreshed) {
    await clearSessionCookies();
    window.location.href = '/login?expired=true';
    return res;
  }

  // Retry the original request exactly once with the freshly-set cookie
  return fetch(url, { credentials: 'include', ...options });
}
const STATE_DOC_PATH = ["portalState", "live"];

let stateRef = null;
let firestoreApi = null;

export async function initFirebaseState() {
  try {
    const response = await fetch("/__/firebase/init.json", { cache: "no-store" });
    if (!response.ok) return false;
    const config = await response.json();
    const [{ initializeApp }, firestore] = await Promise.all([
      import("https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js"),
    ]);
    const app = initializeApp(config);
    const db = firestore.getFirestore(app);
    stateRef = firestore.doc(db, ...STATE_DOC_PATH);
    firestoreApi = firestore;
    return true;
  } catch (error) {
    console.warn("Firebase state sync unavailable. Using local browser state.", error);
    return false;
  }
}

export async function readSharedState() {
  if (!stateRef || !firestoreApi) return null;
  const snapshot = await firestoreApi.getDoc(stateRef);
  return snapshot.exists() ? snapshot.data() : null;
}

export function subscribeSharedState(onChange, onError) {
  if (!stateRef || !firestoreApi) return () => {};
  return firestoreApi.onSnapshot(
    stateRef,
    (snapshot) => {
      if (snapshot.exists()) onChange(snapshot.data());
    },
    (error) => {
      console.warn("Firebase state listener failed.", error);
      onError?.(error);
    }
  );
}

export async function writeSharedState(data) {
  if (!stateRef || !firestoreApi) return;
  await firestoreApi.setDoc(
    stateRef,
    {
      ...JSON.parse(JSON.stringify(data)),
      updatedAt: firestoreApi.serverTimestamp(),
    },
    { merge: true }
  );
}

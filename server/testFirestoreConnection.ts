import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let serviceAccount: any;
try {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT environment variable is not set."
    );
  }
  serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8")
  );
} catch (err: any) {
  console.error("Error parsing FIREBASE_SERVICE_ACCOUNT:", err.message);
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function testFirestore() {
  try {
    const docRef = db.collection("test").doc("testDoc");
    await docRef.set({ hello: "world", timestamp: Date.now() });
    const doc = await docRef.get();
    console.log("Firestore test document:", doc.data());
  } catch (err) {
    console.error("Firestore test failed:", err);
  }
}

testFirestore();

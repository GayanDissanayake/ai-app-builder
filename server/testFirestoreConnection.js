const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function run() {
  try {
    // Write a test document
    await db
      .collection("test")
      .doc("connection-check")
      .set({ connected: true, timestamp: Date.now() });
    // Read the test document
    const doc = await db.collection("test").doc("connection-check").get();
    if (doc.exists) {
      console.log(
        "Pinged your Firestore deployment. You successfully connected to Firestore!"
      );
      console.log("Document data:", doc.data());
    } else {
      console.log("Test document not found.");
    }
  } catch (err) {
    console.error("Firestore connection error:", err);
  }
}
run();

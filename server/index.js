const express = require("express");
const app = express();
const cors = require("cors");

// Firebase setup
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

let serviceAccount;
try {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT environment variable is not set."
    );
  }
  // Decode base64 string to JSON
  serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8")
  );
} catch (err) {
  console.error("Error parsing FIREBASE_SERVICE_ACCOUNT:", err.message);
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

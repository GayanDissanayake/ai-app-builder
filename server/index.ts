import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();
const app = express();

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

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5050;

app.post("/api/extract-requirements", (req, res) => {
  const { requirements } = req.body;
  // Mock AI extraction: just echo back with a prefix
  const extracted = `Extracted: ${requirements}`;
  res.json({ extracted });
});

app.get("/", (_req, res) => res.send("API Running"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

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

// You need to download your service account key from Firebase Console and save as serviceAccountKey.json
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
initializeApp({
  credential: cert(serviceAccount),
});

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

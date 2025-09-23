import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import axios from "axios";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5050;

// MongoDB setup
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "ai_app_builder";
let db: any;
MongoClient.connect(mongoUri)
  .then((client) => {
    db = client.db(dbName);
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// AI extraction using OpenAI (or similar)
app.post("/api/extract-requirements", async (req, res) => {
  const { requirements } = req.body;
  try {
    const groqApiKey = process.env.GROQ_API_KEY;
    const prompt = `Extract requirements from this app description. Format:\nApp Name: ...\nEntities: ...\nRoles: ...\nFeatures: ...\nDescription: ${requirements}`;
    let extracted = "";
    let aiError = null;
    if (groqApiKey) {
      try {
        const aiRes = await axios.post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            // model: "llama-3.1-8b-instant",
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant that extracts app requirements.",
              },
              { role: "user", content: prompt },
            ],
            max_tokens: 200,
          },
          {
            headers: {
              Authorization: `Bearer ${groqApiKey}`,
              "Content-Type": "application/json",
            },
          }
        );
        extracted = aiRes.data.choices[0].message.content;
      } catch (err: any) {
        aiError = err;
        // Fallback mock extraction if Groq fails
        extracted = `App Name: Course Manager\nEntities: Student, Course, Grade\nRoles: Teacher, Student, Admin\nFeatures: Add course, Enrol students, View reports`;
        console.error(
          "Groq extraction error, using mock:",
          err?.response?.status,
          err?.response?.data?.error?.message || err?.message
        );
      }
    } else {
      // Fallback mock extraction
      extracted = `App Name: Course Manager\nEntities: Student, Course, Grade\nRoles: Teacher, Student, Admin\nFeatures: Add course, Enrol students, View reports`;
    }
    // Save to MongoDB
    if (db) {
      await db.collection("requirements").insertOne({
        requirements,
        extracted,
        createdAt: new Date(),
        aiError: aiError
          ? {
              status: aiError?.response?.status,
              message:
                aiError?.response?.data?.error?.message || aiError?.message,
            }
          : null,
      });
    }
    res.json({ extracted });
  } catch (err: any) {
    console.error("Extraction error:", err);
    res.status(500).json({ message: "Failed to extract requirements." });
  }
});

app.get("/", (_req, res) => res.send("API Running"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

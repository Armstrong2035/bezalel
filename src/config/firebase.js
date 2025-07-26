import admin from "firebase-admin";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    // Try to load service account from JSON file
    const serviceAccountPath = path.resolve(
      __dirname,
      "../../bezalel-firebase.json"
    );
    const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error);
    process.exit(1);
  }
}

// Get Firestore instance
const db = admin.firestore();

// Get Auth instance
const auth = admin.auth();

export { admin, db, auth };

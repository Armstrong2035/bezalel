import crypto from "crypto";

// This should be stored securely in environment variables
const ENCRYPTION_KEY =
  process.env.ENCRYPTION_KEY || "your-secure-encryption-key";
const ALGORITHM = "aes-256-gcm";

export const encryptContext = (context) => {
  try {
    // Generate a random initialization vector
    const iv = crypto.randomBytes(16);

    // Create cipher
    const cipher = crypto.createCipheriv(
      ALGORITHM,
      Buffer.from(ENCRYPTION_KEY),
      iv
    );

    // Encrypt the context
    const encrypted = Buffer.concat([
      cipher.update(JSON.stringify(context), "utf8"),
      cipher.final(),
    ]);

    // Get the auth tag
    const authTag = cipher.getAuthTag();

    // Return the encrypted data with IV and auth tag
    return {
      encrypted: encrypted.toString("base64"),
      iv: iv.toString("base64"),
      authTag: authTag.toString("base64"),
    };
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt context data");
  }
};

export const decryptContext = (encryptedData) => {
  try {
    const { encrypted, iv, authTag } = encryptedData;

    // Create decipher
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      Buffer.from(ENCRYPTION_KEY),
      Buffer.from(iv, "base64")
    );

    // Set auth tag
    decipher.setAuthTag(Buffer.from(authTag, "base64"));

    // Decrypt the data
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted, "base64")),
      decipher.final(),
    ]);

    // Parse and return the decrypted context
    return JSON.parse(decrypted.toString("utf8"));
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt context data");
  }
};

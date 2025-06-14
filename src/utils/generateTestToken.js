import { auth } from "../config/firebase.js";

export const generateTestToken = async (uid, email) => {
  try {
    // Create a custom token
    const customToken = await auth.createCustomToken(uid, {
      email: email,
    });

    console.log("Generated custom token:", customToken);
    return customToken;
  } catch (error) {
    console.error("Error generating custom token:", error);
    throw error;
  }
};

// Example usage:
// const token = await generateTestToken('test-user-123', 'test@example.com');

import { auth } from "../config/firebase.js";

export const createUser = async (email, password) => {
  try {
    // Create the user in Firebase Authentication
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      emailVerified: true,
    });

    console.log("Successfully created user:", userRecord.uid);

    // Generate a custom token for this user
    const customToken = await auth.createCustomToken(userRecord.uid);
    console.log("Custom token for the user:", customToken);

    return {
      user: userRecord,
      token: customToken,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Example usage:
// const { user, token } = await createUser('user@example.com', 'securepassword123');

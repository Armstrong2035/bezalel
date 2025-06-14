import { createUser } from "../utils/createUser.js";

const createNewUser = async () => {
  try {
    // Create a new user with real credentials
    const { user, token } = await createUser(
      "user@example.com",
      "securepassword123"
    );

    console.log("Created new user:");
    console.log("User ID:", user.uid);
    console.log("Email:", user.email);
    console.log("\nYou can use this token to test API endpoints:");
    console.log("Authorization: Bearer", token);

    // Example of how to use the token in an API call
    const response = await fetch("http://localhost:4000/api/protected-route", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log("\nAPI Response:", data);
  } catch (error) {
    console.error("Failed to create user:", error);
  }
};

// Run the script
createNewUser();

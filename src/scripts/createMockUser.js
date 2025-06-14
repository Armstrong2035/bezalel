import { db } from "../config/firebase.js";

const createMockUserDocument = async () => {
  try {
    // Mock user data
    const mockUserData = {
      email: "mock@example.com",
      displayName: "Mock User",
      role: "user",
      preferences: {
        notifications: true,
        theme: "light",
      },
      profile: {
        bio: "This is a mock user for testing purposes",
        location: "Test Location",
        interests: ["testing", "development"],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Create a mock UID
    const mockUid = "mock-user-" + Date.now();

    // Write directly to Firestore
    await db.collection("users").doc(mockUid).set(mockUserData);

    console.log("Successfully created mock user document:");
    console.log("User ID:", mockUid);
    console.log("User Data:", mockUserData);

    return { uid: mockUid, ...mockUserData };
  } catch (error) {
    console.error("Failed to create mock user document:", error);
    throw error;
  }
};

// Run the script
createMockUserDocument();

import { db } from "../config/firebase.js";

const usersCollection = db.collection("users");

export const createUser = async (uid, userData) => {
  try {
    const userRef = usersCollection.doc(uid);
    await userRef.set({
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { uid, ...userData };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUser = async (uid) => {
  try {
    const userDoc = await usersCollection.doc(uid).get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }
    return { uid: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const updateUser = async (uid, userData) => {
  try {
    const userRef = usersCollection.doc(uid);
    await userRef.update({
      ...userData,
      updatedAt: new Date().toISOString(),
    });
    return { uid, ...userData };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (uid) => {
  try {
    await usersCollection.doc(uid).delete();
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

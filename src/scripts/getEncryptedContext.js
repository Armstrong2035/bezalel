import { encryptContext } from "../utils/encryption.js";

const context = {
  idea: "A mobile app that helps people find and book local fitness classes",
  experienceLevel: "beginner",
  goal: "Side hustle",
  timeAvailability: "Max 15",
  capital: "1000 - 5000",
  archetype: "Consumer Mobile App",
};

const encryptedContext = encryptContext(context);
console.log(JSON.stringify(encryptedContext, null, 2));

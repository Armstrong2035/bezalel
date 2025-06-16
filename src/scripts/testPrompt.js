import { createPrompt } from "../engines/canvasEngine/canvasSchema.js";

const testPrompt = async () => {
  try {
    // Using our mock user's context
    const contextId = "mock-user-1710864000000";
    const segment = "valueProposition";

    const prompt = await createPrompt(contextId, segment);
    console.log("Complete Prompt:\n", prompt);
  } catch (error) {
    console.error("Error:", error);
  }
};

testPrompt();

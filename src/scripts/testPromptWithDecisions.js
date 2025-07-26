import { createPrompt } from "../engines/canvasEngine/canvasSchema.js";
import {
  saveCanvasSegment,
  updateOptionStatus,
} from "../services/canvasSegmentService.js";
import { generateMockCanvasSegment } from "../services/mockLlmService.js";

const testPromptWithDecisions = async () => {
  try {
    console.log("🧪 Testing createPrompt with decision context...\n");

    const userId = "test-user-prompt-decisions";
    const context = {
      idea: "A mobile app that helps people find and book local fitness classes",
      experienceLevel: "beginner",
      goal: "Side hustle",
      timeAvailability: "Max 15",
      capital: "1000 - 5000",
      archetype: "Consumer Mobile App",
    };

    // Step 1: Create initial value propositions
    console.log("1️⃣ Creating initial value propositions...");
    const mockResponse = await generateMockCanvasSegment("Test prompt");

    const savedCanvas = await saveCanvasSegment(
      userId,
      "valueProposition",
      mockResponse.response.options
    );

    console.log("✅ Canvas created with ID:", savedCanvas.id);

    // Step 2: Accept some options to create decision context
    console.log("\n2️⃣ Accepting options to create decision context...");

    const updatedCanvas = await updateOptionStatus(
      savedCanvas.id,
      "valueProposition",
      "vp1",
      "accepted"
    );

    console.log("✅ Accepted value proposition");
    console.log(
      "Decision summary:",
      updatedCanvas.decisions.valueProposition.summary
    );

    // Step 3: Test createPrompt for customer segments with decision context
    console.log("\n3️⃣ Testing createPrompt for customer segments...");

    const prompt = await createPrompt(context, "customerSegments", userId);

    console.log("=== GENERATED PROMPT ===");
    console.log(prompt);
    console.log("=== END PROMPT ===");

    // Step 4: Test createPrompt without userId (no decision context)
    console.log("\n4️⃣ Testing createPrompt without decision context...");

    const promptWithoutDecisions = await createPrompt(
      context,
      "customerSegments",
      null
    );

    console.log("=== PROMPT WITHOUT DECISIONS ===");
    console.log(promptWithoutDecisions);
    console.log("=== END PROMPT ===");

    console.log("\n🎉 Prompt generation test completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

// Run the test
testPromptWithDecisions();

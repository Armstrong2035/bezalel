import {
  saveCanvasSegment,
  updateOptionStatus,
  getUserCanvas,
} from "../services/canvasSegmentService.js";
import { generateMockCanvasSegment } from "../services/mockLlmService.js";

const testDecisionContext = async () => {
  try {
    console.log("🧪 Testing Enhanced Decision Context System...\n");

    const userId = "test-user-decision-context";
    const segment = "valueProposition";

    // Step 1: Create initial value propositions
    console.log("1️⃣ Creating initial value propositions...");
    const mockResponse = await generateMockCanvasSegment(
      "Test prompt for value propositions"
    );

    const savedCanvas = await saveCanvasSegment(
      userId,
      segment,
      mockResponse.response.options
    );

    console.log("✅ Initial canvas created with ID:", savedCanvas.id);

    // Step 2: Accept some options to create decision context
    console.log("\n2️⃣ Accepting options to create decision context...");

    const updatedCanvas1 = await updateOptionStatus(
      savedCanvas.id,
      segment,
      "vp1",
      "accepted"
    );

    const updatedCanvas2 = await updateOptionStatus(
      savedCanvas.id,
      segment,
      "vp2",
      "accepted"
    );

    console.log("✅ Accepted 2 value propositions");
    console.log("Decision summary:", updatedCanvas2.decisions[segment].summary);

    // Step 3: Add customer segments to see how context flows
    console.log("\n3️⃣ Adding customer segments with decision context...");

    const customerSegmentResponse = {
      segment: "Customer Segments",
      options: [
        {
          id: "cs1",
          title: "Busy Professionals",
          description:
            "Working professionals with limited time who prioritize convenience and efficiency",
          assumptionsToTest: [
            {
              assumption: "Professionals struggle with time",
              validationMethod: "Survey 30 professionals",
              successCriteria: "70%+ report time constraints",
            },
          ],
          scores: {
            easeOfExecution: {
              score: 8,
              reasoning: "Easy to reach through LinkedIn",
            },
            resourceAlignment: {
              score: 7,
              reasoning: "Good revenue potential",
            },
            marketFit: { score: 9, reasoning: "High willingness to pay" },
          },
          actionPlan: {
            week1: "Create LinkedIn ads",
            week2: "Partner with co-working spaces",
            week3: "Launch referral program",
            week4: "Analyze conversion rates",
          },
          dependencies: {
            required: ["Marketing Budget"],
            blockedBy: [],
          },
        },
        {
          id: "cs2",
          title: "Fitness Beginners",
          description:
            "Young adults new to fitness who need guidance and motivation",
          assumptionsToTest: [
            {
              assumption: "Beginners are intimidated",
              validationMethod: "Survey 40 beginners",
              successCriteria: "60%+ express fear",
            },
          ],
          scores: {
            easeOfExecution: {
              score: 6,
              reasoning: "Requires educational content",
            },
            resourceAlignment: {
              score: 8,
              reasoning: "Lower price sensitivity",
            },
            marketFit: { score: 7, reasoning: "High demand but competitive" },
          },
          actionPlan: {
            week1: "Create beginner-friendly filters",
            week2: "Partner with beginner studios",
            week3: "Launch first class free promo",
            week4: "Track retention rates",
          },
          dependencies: {
            required: ["Beginner-Friendly Studios"],
            blockedBy: [],
          },
        },
      ],
    };

    const canvasWithCustomerSegments = await saveCanvasSegment(
      userId,
      "customerSegments",
      customerSegmentResponse.options
    );

    console.log("✅ Customer segments added");
    console.log(
      "All segments:",
      Object.keys(canvasWithCustomerSegments.segments)
    );
    console.log(
      "All decisions:",
      Object.keys(canvasWithCustomerSegments.decisions)
    );

    // Step 4: Accept a customer segment option
    console.log("\n4️⃣ Accepting a customer segment option...");

    const finalCanvas = await updateOptionStatus(
      canvasWithCustomerSegments.id,
      "customerSegments",
      "cs1",
      "accepted"
    );

    console.log("✅ Customer segment accepted");
    console.log("Final decisions:", finalCanvas.decisions);

    // Step 5: Test the decision context formatting
    console.log("\n5️⃣ Testing decision context formatting...");

    const decisionContext = Object.entries(finalCanvas.decisions)
      .map(([seg, data]) => {
        try {
          const summary = JSON.parse(data.summary);
          return `${seg}:
  - Selected: ${summary.selectedCount} options
  - Focus: ${summary.primaryFocus}
  - Key themes: ${summary.keyThemes.join(", ")}
  - Average scores: Ease(${summary.averageScores.easeOfExecution}), Resources(${
            summary.averageScores.resourceAlignment
          }), Market(${summary.averageScores.marketFit})
  - Options: ${summary.selectedTitles.join(", ")}`;
        } catch (e) {
          return `${seg}: ${data.summary}`;
        }
      })
      .join("\n\n");

    console.log("=== DECISION CONTEXT FOR LLM ===");
    console.log(decisionContext);
    console.log("=== END DECISION CONTEXT ===");

    console.log("\n🎉 Decision context system test completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

// Run the test
testDecisionContext();

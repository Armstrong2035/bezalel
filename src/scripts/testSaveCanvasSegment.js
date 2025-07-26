import {
  saveCanvasSegment,
  getUserCanvas,
  updateOptionStatus,
} from "../services/canvasSegmentService.js";
import { generateMockCanvasSegment } from "../services/mockLlmService.js";

const testSaveCanvasSegment = async () => {
  try {
    console.log("🧪 Testing saveCanvasSegment function...\n");

    const userId = "test-user-123";
    const segment = "valueProposition";

    // Step 1: Generate mock LLM response
    console.log("1️⃣ Generating mock LLM response...");
    const mockResponse = await generateMockCanvasSegment(
      "Test prompt for value propositions"
    );

    // Step 2: Save canvas segment
    console.log("\n2️⃣ Saving canvas segment...");
    const savedCanvas = await saveCanvasSegment(
      userId,
      segment,
      mockResponse.response.options
    );

    console.log("\n✅ Canvas saved successfully!");
    console.log("Canvas ID:", savedCanvas.id);
    console.log("User ID:", savedCanvas.userId);
    console.log("Canvas Name:", savedCanvas.canvasName);
    console.log("Status:", savedCanvas.status);
    console.log("Segments:", Object.keys(savedCanvas.segments));

    // Step 3: Verify the saved data
    console.log("\n3️⃣ Verifying saved data...");
    const retrievedCanvas = await getUserCanvas(userId);

    if (retrievedCanvas) {
      console.log("✅ Canvas retrieved successfully!");
      console.log(
        "Number of options:",
        retrievedCanvas.segments[segment].options.length
      );
      console.log(
        "Options status:",
        retrievedCanvas.segments[segment].options.map((opt) => ({
          id: opt.id,
          title: opt.title,
          status: opt.status,
        }))
      );
    } else {
      console.log("❌ Failed to retrieve canvas");
    }

    // Step 4: Test updating option status
    console.log("\n4️⃣ Testing option status update...");
    const updatedCanvas = await updateOptionStatus(
      savedCanvas.id,
      segment,
      "vp1",
      "accepted"
    );

    console.log("✅ Option status updated!");
    console.log(
      "Accepted options:",
      updatedCanvas.decisions[segment]?.accepted || []
    );

    // Step 5: Test adding another segment (customer segments)
    console.log("\n5️⃣ Testing adding another segment...");
    const customerSegmentResponse = {
      segment: "Customer Segments",
      options: [
        {
          id: "cs1",
          title: "Busy Professionals",
          description: "Working professionals with limited time",
          assumptionsToTest: [
            {
              assumption: "Professionals struggle with time",
              validationMethod: "Survey 30 professionals",
              successCriteria: "70%+ report time constraints",
            },
          ],
          scores: {
            easeOfExecution: { score: 8, reasoning: "Easy to reach" },
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
      ],
    };

    const updatedCanvasWithCustomerSegments = await saveCanvasSegment(
      userId,
      "customerSegments",
      customerSegmentResponse.options
    );

    console.log("✅ Customer segments added!");
    console.log(
      "All segments:",
      Object.keys(updatedCanvasWithCustomerSegments.segments)
    );
    console.log(
      "Canvas decisions:",
      updatedCanvasWithCustomerSegments.decisions
    );

    console.log("\n🎉 All tests completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
};

// Run the test
testSaveCanvasSegment();

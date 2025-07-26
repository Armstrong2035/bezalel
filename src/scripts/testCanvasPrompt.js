import fetch from "node-fetch";

const testCanvasPrompt = async () => {
  try {
    // Mock context data
    const context = {
      idea: "A mobile app that helps people find and book local fitness classes",
      experienceLevel: "beginner",
      goal: "Side hustle",
      timeAvailability: "Max 15",
      capital: "1000 - 5000",
      archetype: "Consumer Mobile App",
    };

    // Test different segments
    const segments = [
      "valueProposition",
      "customerSegments",
      "channels",
      "revenueStreams",
      "keyResources",
      "keyActivities",
      "keyPartners",
      "costStructure",
    ];

    // Test each segment
    for (const segment of segments) {
      console.log(`\nTesting segment: ${segment}`);
      console.log("----------------------------------------");

      const response = await fetch(
        "http://localhost:4000/api/context/canvas/prompt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            context,
            userId: "mock-user-1710864000000",
            segment,
          }),
        }
      );

      const data = await response.json();
      console.log("Response:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Error testing canvas prompt:", error);
  }
};

// Run the test
testCanvasPrompt();

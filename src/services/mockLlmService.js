// Mock LLM service for testing without using API credits
export const generateMockCanvasSegment = async (prompt) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock value proposition response
  const response = {
    segment: "Value Propositions",
    options: [
      {
        id: "vp1",
        title: "Curated Fitness Class Discovery",
        description:
          "Easily find and book the best local fitness classes tailored to your preferences and schedule.",
        assumptionsToTest: [
          {
            assumption: "Users struggle to find suitable fitness classes",
            validationMethod:
              "Survey 50 target users about their class discovery pain points",
            successCriteria: "30%+ express difficulty finding desired classes",
          },
        ],
        scores: {
          easeOfExecution: {
            score: 7,
            reasoning:
              "Can test a basic curated discovery feature with manual class tagging",
          },
          resourceAlignment: {
            score: 8,
            reasoning:
              "Initial curation can be done by founder, advanced algorithms can come later",
          },
          marketFit: {
            score: 6,
            reasoning:
              "Solves a real problem but not clearly differentiated from alternatives yet",
          },
        },
        actionPlan: {
          week1: "Survey 50 users about class discovery challenges",
          week2: "Manually curate 30 classes and add to prototype app",
          week3: "Get feedback on curated classes from 10 test users",
          week4: "Analyze feedback and refine curation criteria",
        },
        dependencies: {
          required: ["Mobile App Prototype"],
          blockedBy: [],
        },
      },
      {
        id: "vp2",
        title: "Flexible Class Booking",
        description:
          "Book desired classes with ease, reschedule or cancel reservations as needed.",
        assumptionsToTest: [
          {
            assumption:
              "Users want more booking flexibility than current options provide",
            validationMethod: "Survey 50 users about booking pain points",
            successCriteria: "40%+ express a desire for more flexible booking",
          },
        ],
        scores: {
          easeOfExecution: {
            score: 5,
            reasoning:
              "Requires cooperation from multiple studios, which could take time",
          },
          resourceAlignment: {
            score: 7,
            reasoning:
              "Can be enabled via founder relationships and simple policy changes",
          },
          marketFit: {
            score: 8,
            reasoning:
              "Flexibility is highly valued by busy users and a key differentiator",
          },
        },
        actionPlan: {
          week1: "Survey users about their booking flexibility needs",
          week2: "Interview studio owners to assess openness to policy changes",
          week3:
            "Propose and negotiate flexible booking pilot with 2-3 studios",
          week4: "Implement booking policy changes in app and promote to users",
        },
        dependencies: {
          required: ["Mobile App Prototype", "Studio Partnerships"],
          blockedBy: [],
        },
      },
    ],
  };

  console.log("\n=== Mock LLM Response ===");
  console.log(JSON.stringify(response, null, 2));
  console.log("==================\n");

  return {
    prompt,
    response,
    usage: {
      inputTokens: 895,
      outputTokens: 2243,
    },
  };
};

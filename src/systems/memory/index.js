// Main memory structure
export const memory = {
  user: "",
  context: {},
  decisions: {},
  actions: {},
  results: {},
  feedback: {},
};

// Schema definitions
export const CONTEXT_SCHEMA = [
  "idea",
  "experienceLevel",
  "goal",
  "timeAvailability",
  "capital",
  "archetype",
];

export const DECISIONS_SCHEMA = ["accepted", "rejected", "ranked"];

export const ACTIONS_SCHEMA = ["completed", "pending", "failed"];

export const RESULTS_SCHEMA = ["metrics", "outcomes", "learnings"];

export const FEEDBACK_SCHEMA = ["user", "system", "performance"];

export default memory;

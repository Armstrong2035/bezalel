import { setContext } from "../../systems/memory/memoryContext.js";
import {
  levels,
  capitalOptions,
  timeAvailabilities,
  goals,
  archetypes,
} from "./businessTypePathways/pathwayPrompts.js";

const mapDecisionContext = (onBoardData) => {
  if (!onBoardData || typeof onBoardData !== "object") {
    throw new Error("onBoardData must be an object");
  }

  const context = {
    idea: {
      idea: onBoardData.idea,
    },
    experienceLevel: {
      key: onBoardData.experienceLevel,
      instruction: levels[onBoardData.experienceLevel],
    },
    goal: {
      key: onBoardData.goal,
      instruction: goals[onBoardData.goal],
    },
    timeAvailability: {
      key: onBoardData.timeAvailability,
      instruction: timeAvailabilities[onBoardData.timeAvailability],
    },
    capital: {
      key: onBoardData.capital,
      instruction: capitalOptions[onBoardData.capital],
    },
    archetype: {
      key: onBoardData.archetype,
      instruction: archetypes[onBoardData.archetype],
    },
  };

  return context;
};

export const saveToMemory = (onBoardData) => {
  const context = mapDecisionContext(onBoardData);
  setContext(context);
  //console.log("Context saved to memory:", JSON.stringify(context, null, 2));
};

// Example usage:
const onBoardData = {
  experienceLevel: "beginner",
  goal: "Side hustle",
  timeAvailability: "Max 5",
  capital: "0 - 100",
  archetype: "SaaS / Cloud Software",
  idea: "An AI-powered resume builder for freelancers",
};

//console.log(mapDecisionContext(onBoardData));
saveToMemory(onBoardData);

// Export the mapping functions for use elsewhere

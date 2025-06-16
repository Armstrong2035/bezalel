import {
  levels,
  capitalOptions,
  timeAvailabilities,
  goals,
  archetypes,
} from "../decisionEngine/businessTypePathways/pathwayPrompts.js";
import { segmentPrompts } from "./segmentPrompts.js";

export const canvasSegmentSchema = {
  segment: "", //e.g value proposition, customer segment, etc.
  cards: [],
};

export const createPrompt = (context, segment) => {
  try {
    // Build the base prompt with instructions using the provided context
    const basePrompt = `
      You are a helpful assistant that helps the user create a canvas for their business.
      The user's idea is ${context.idea}.
      The user's experience level is ${levels[context.experienceLevel]}.
      The user's goal is ${goals[context.goal]}.
      The user's time availability is ${
        timeAvailabilities[context.timeAvailability]
      }.
      The user's capital is ${capitalOptions[context.capital]}.
      The user's archetype is ${archetypes[context.archetype]}.
    `;

    // Add segment-specific prompt if provided
    if (segment && segmentPrompts[segment]) {
      return `${basePrompt}\n\n${segmentPrompts[segment]}`;
    }

    return basePrompt;
  } catch (error) {
    console.error("Error creating prompt:", error);
    throw error;
  }
};

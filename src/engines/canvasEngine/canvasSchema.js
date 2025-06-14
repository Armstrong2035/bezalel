import { getContext } from "../../services/contextService.js";
import {
  levels,
  capitalOptions,
  timeAvailabilities,
  goals,
  archetypes,
} from "../decisionEngine/businessTypePathways/pathwayPrompts.js";

export const canvasSegmentSchema = {
  segment: "", //e.g value proposition, customer segment, etc.
  cards: [],
};

const segmentPrompts = {
  valueProposition: `
    Help the user define their value proposition.
    Focus on:
    - What problem are they solving?
    - What unique value do they offer?
    - Why should customers choose them?
  `,
  customerSegments: `
    Help the user identify their customer segments.
    Focus on:
    - Who are their target customers?
    - What are their customer's needs?
    - What are their customer's pain points?
  `,
  channels: `
    Help the user identify their channels.
    Focus on:
    - How will they reach their customers?
    - What marketing channels will they use?
    - How will they deliver their value?
  `,
  revenueStreams: `
    Help the user identify their revenue streams.
    Focus on:
    - How will they make money?
    - What pricing model will they use?
    - What are their revenue sources?
  `,
  keyResources: `
    Help the user identify their key resources.
    Focus on:
    - What resources do they need?
    - What assets are required?
    - What partnerships are needed?
  `,
  keyActivities: `
    Help the user identify their key activities.
    Focus on:
    - What activities are crucial?
    - What processes are important?
    - What tasks are essential?
  `,
  keyPartners: `
    Help the user identify their key partners.
    Focus on:
    - Who are their suppliers?
    - Who are their collaborators?
    - What partnerships are needed?
  `,
  costStructure: `
    Help the user identify their cost structure.
    Focus on:
    - What are their fixed costs?
    - What are their variable costs?
    - What are their key expenses?
  `,
};

export const createPrompt = async (contextId, segment) => {
  try {
    // Get context from Firestore
    const context = await getContext(contextId);

    // Build the base prompt with instructions
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

import { getContext } from "../../systems/memory/memoryContext.js";
import { generateUniqueId } from "../../utils/generateId.js";

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

export const createSegmentPrompt = (canvasSegment) => {
  const context = getContext();
  const segmentPrompt =
    segmentPrompts[canvasSegment] || "Please specify a valid canvas segment.";

  const prompt = `
    You are a helpful assistant that helps the user create a canvas for their business.
    The user's idea is ${context.idea.idea}.
    The user's experience level is ${context.experienceLevel.instruction}.
    The user's goal is ${context.goal.instruction}.
    The user's time availability is ${context.timeAvailability.instruction}.
    The user's capital is ${context.capital.instruction}.
    The user's archetype is ${context.archetype.instruction}.

    ${segmentPrompt}
  `;

  return prompt;
};

export const createPrompt = (segment) => {
  const context = getContext();
  const basePrompt = `
    You are a helpful assistant that helps the user create a canvas for their business.
    The user's idea is ${context.idea.idea}.
    The user's experience level is ${context.experienceLevel.instruction}.
    The user's goal is ${context.goal.instruction}.
    The user's time availability is ${context.timeAvailability.instruction}.
    The user's capital is ${context.capital.instruction}.
    The user's archetype is ${context.archetype.instruction}.

    Current Canvas State:
    ${
      context.valueProposition
        ? `Value Proposition: ${context.valueProposition}\n`
        : ""
    }
    ${
      context.customerSegments
        ? `Customer Segments: ${context.customerSegments}\n`
        : ""
    }
    ${context.channels ? `Channels: ${context.channels}\n` : ""}
    ${
      context.revenueStreams
        ? `Revenue Streams: ${context.revenueStreams}\n`
        : ""
    }
    ${context.keyResources ? `Key Resources: ${context.keyResources}\n` : ""}
    ${context.keyActivities ? `Key Activities: ${context.keyActivities}\n` : ""}
    ${context.keyPartners ? `Key Partners: ${context.keyPartners}\n` : ""}
    ${context.costStructure ? `Cost Structure: ${context.costStructure}\n` : ""}
  `;

  if (segment && segmentPrompts[segment]) {
    return `${basePrompt}\n\n${segmentPrompts[segment]}`;
  }

  return basePrompt;
};

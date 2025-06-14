import memory, { CONTEXT_SCHEMA } from "./index.js";

export const setContext = (context) => {
  if (!context || typeof context !== "object") {
    throw new Error("Context must be an object");
  }

  // Validate required context fields
  const missingFields = CONTEXT_SCHEMA.filter((field) => !(field in context));

  if (missingFields.length > 0) {
    throw new Error(
      `Missing required context fields: ${missingFields.join(", ")}`
    );
  }

  memory.context = context;
  // console.log("Raw memory object:", memory);
  // console.log("Stringified memory:", JSON.stringify(memory, null, 2));
};

export const updateContext = (partialContext) => {
  if (!partialContext || typeof partialContext !== "object") {
    throw new Error("Partial context must be an object");
  }

  memory.context = {
    ...memory.context,
    ...partialContext,
  };
};

export const getContext = () => {
  return memory.context;
};

export const getContextField = (field) => {
  if (!(field in memory.context)) {
    throw new Error(`Context field '${field}' not found`);
  }
  return memory.context[field];
};

export const clearContext = () => {
  memory.context = {};
};

export default memory;

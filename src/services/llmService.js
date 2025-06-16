import Anthropic from "@anthropic-ai/sdk";

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const generateCanvasSegment = async (prompt) => {
  try {
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4000,
      temperature: 0.7,
      system:
        "You are a business strategy expert helping entrepreneurs create detailed business model canvas segments. Provide clear, actionable, and well-structured responses.",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return {
      content: message.content[0].text,
      usage: {
        inputTokens: message.usage.input_tokens,
        outputTokens: message.usage.output_tokens,
      },
    };
  } catch (error) {
    console.error("Error generating canvas segment:", error);
    throw new Error("Failed to generate canvas segment");
  }
};

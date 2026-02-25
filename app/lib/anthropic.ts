import Anthropic from "@anthropic-ai/sdk";

// Model constants — primary with automatic fallback on overload
export const PRIMARY_MODEL = "claude-sonnet-4-20250514";
export const FALLBACK_MODEL = "claude-haiku-4-5-20251001";

/** Check if an error is an Anthropic API overload (529) */
export function isOverloaded(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : "";
  return msg.includes("overloaded") || msg.includes("529");
}

/** Create an Anthropic client with retry logic. Returns null + error response if API key missing. */
export function getClient():
  | { client: Anthropic; error?: never }
  | { client?: never; error: Response } {
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      error: Response.json(
        {
          error:
            "ANTHROPIC_API_KEY is not configured. Add it to your .env.local file.",
        },
        { status: 500 }
      ),
    };
  }
  return {
    client: new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
      maxRetries: 3,
    }),
  };
}

/** Call Anthropic with automatic model fallback: Sonnet -> Haiku on overload */
export async function callWithFallback(
  client: Anthropic,
  params: Omit<Anthropic.MessageCreateParamsNonStreaming, "model">
): Promise<Anthropic.Message> {
  try {
    return await client.messages.create({
      model: PRIMARY_MODEL,
      ...params,
    });
  } catch (primaryErr) {
    if (isOverloaded(primaryErr)) {
      return await client.messages.create({
        model: FALLBACK_MODEL,
        ...params,
      });
    }
    throw primaryErr;
  }
}

/** Extract JSON from an Anthropic message response, with regex fallback */
export function parseJsonResponse<T>(message: Anthropic.Message): T {
  const responseText =
    message.content[0].type === "text" ? message.content[0].text : "";

  try {
    return JSON.parse(responseText) as T;
  } catch {
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as T;
    }
    throw new Error("Failed to parse AI response as JSON.");
  }
}

/** Map common Anthropic errors to user-friendly JSON responses */
export function errorResponse(error: unknown, context: string = "Request"): Response {
  console.error(`${context} error:`, error);
  const message =
    error instanceof Error ? error.message : `${context} failed unexpectedly.`;

  if (message.includes("credit balance")) {
    return Response.json(
      {
        error:
          "Your Anthropic API account needs credits. Go to console.anthropic.com to add credits.",
      },
      { status: 402 }
    );
  }
  if (message.includes("overloaded") || message.includes("529")) {
    return Response.json(
      {
        error:
          "The AI service is temporarily overloaded. Please wait a minute and try again.",
      },
      { status: 529 }
    );
  }
  return Response.json({ error: message }, { status: 500 });
}

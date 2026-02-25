import { getClient, callWithFallback, parseJsonResponse, errorResponse } from "@/app/lib/anthropic";
import { validate, strategySchema } from "@/app/lib/validation";
import { STRATEGY_SYSTEM_PROMPT, buildStrategyUserPrompt } from "@/app/lib/prompts";

export async function POST(request: Request) {
  try {
    const clientResult = getClient();
    if (clientResult.error) return clientResult.error;

    const body = await request.json();
    const validation = validate(strategySchema, body);
    if (!validation.success) return validation.response;

    const { jobDescription, companySize, industry } = validation.data;

    const message = await callWithFallback(clientResult.client, {
      max_tokens: 3500,
      system: STRATEGY_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildStrategyUserPrompt(jobDescription, companySize, industry),
        },
      ],
    });

    const result = parseJsonResponse(message);
    return Response.json({ result });
  } catch (error) {
    return errorResponse(error, "Sourcing strategy generation");
  }
}

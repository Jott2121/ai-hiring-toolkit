import { getClient, callWithFallback, parseJsonResponse, errorResponse } from "@/app/lib/anthropic";
import { validate, booleanSearchSchema } from "@/app/lib/validation";
import { BOOLEAN_SYSTEM_PROMPT, buildBooleanUserPrompt } from "@/app/lib/prompts";

export async function POST(request: Request) {
  try {
    const clientResult = getClient();
    if (clientResult.error) return clientResult.error;

    const body = await request.json();
    const validation = validate(booleanSearchSchema, body);
    if (!validation.success) return validation.response;

    const { jobDescription, location, experienceLevel, diversityFlags } =
      validation.data;

    const message = await callWithFallback(clientResult.client, {
      max_tokens: 2500,
      system: BOOLEAN_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildBooleanUserPrompt(
            jobDescription,
            location,
            experienceLevel,
            diversityFlags
          ),
        },
      ],
    });

    const result = parseJsonResponse(message);
    return Response.json({ result });
  } catch (error) {
    return errorResponse(error, "Boolean search generation");
  }
}

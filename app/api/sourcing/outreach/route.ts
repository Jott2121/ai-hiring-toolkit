import { getClient, callWithFallback, parseJsonResponse, errorResponse } from "@/app/lib/anthropic";
import { validate, outreachSchema } from "@/app/lib/validation";
import { OUTREACH_SYSTEM_PROMPT, buildOutreachUserPrompt } from "@/app/lib/prompts";

export async function POST(request: Request) {
  try {
    const clientResult = getClient();
    if (clientResult.error) return clientResult.error;

    const body = await request.json();
    const validation = validate(outreachSchema, body);
    if (!validation.success) return validation.response;

    const { profileText, jobDescription } = validation.data;

    const message = await callWithFallback(clientResult.client, {
      max_tokens: 3000,
      system: OUTREACH_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: buildOutreachUserPrompt(profileText, jobDescription),
        },
      ],
    });

    const result = parseJsonResponse(message);
    return Response.json({ result });
  } catch (error) {
    return errorResponse(error, "Outreach message generation");
  }
}

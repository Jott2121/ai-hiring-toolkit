import { getClient, callWithFallback, parseJsonResponse, errorResponse, isOverloaded } from "@/app/lib/anthropic";
import { validate, analyzeProfileSchema } from "@/app/lib/validation";
import { ANALYZE_SYSTEM_PROMPT, buildAnalyzeUserPrompt } from "@/app/lib/prompts";

export async function POST(request: Request) {
  try {
    const clientResult = getClient();
    if (clientResult.error) return clientResult.error;

    const body = await request.json();
    const validation = validate(analyzeProfileSchema, body);
    if (!validation.success) return validation.response;

    const { jobDescription, profiles } = validation.data;
    const results = [];

    // Process each profile individually (matches resume-scorer batch pattern)
    for (const profile of profiles) {
      try {
        const message = await callWithFallback(clientResult.client, {
          max_tokens: 2500,
          system: ANALYZE_SYSTEM_PROMPT,
          messages: [
            {
              role: "user",
              content: buildAnalyzeUserPrompt(profile.text, jobDescription),
            },
          ],
        });

        results.push(parseJsonResponse(message));
      } catch (err) {
        const rawMsg =
          err instanceof Error ? err.message : "Failed to analyze this profile.";
        const friendlyMsg = isOverloaded(err)
          ? "The AI service is temporarily overloaded. Please wait a minute and try again."
          : rawMsg;

        results.push({
          candidateName: profile.name,
          fitScore: 0,
          error: friendlyMsg,
          strengths: [],
          risks: [],
          interviewFocus: [],
          suggestedQuestions: [],
          evaluationRubric: [],
          dataCaveats: [],
        });
      }
    }

    return Response.json({ results });
  } catch (error) {
    return errorResponse(error, "Profile analysis");
  }
}

import Anthropic from "@anthropic-ai/sdk";

const PRIMARY_MODEL = "claude-sonnet-4-20250514";
const FALLBACK_MODEL = "claude-haiku-4-5-20251001";

function isOverloaded(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : "";
  return msg.includes("overloaded") || msg.includes("529");
}

export async function POST(request: Request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        {
          error:
            "ANTHROPIC_API_KEY is not configured. Add it to your .env.local file.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { roleTitle, jobDescription, candidateProfile } = body;

    if (!roleTitle || !jobDescription) {
      return Response.json(
        { error: "Role title and job description are required." },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
      maxRetries: 3,
    });

    const requestParams = {
      max_tokens: 3500,
      system:
        "You are an expert recruiter preparing interview materials. Respond with ONLY valid JSON. No markdown, no code blocks, no explanation — just the raw JSON object.",
      messages: [
        {
          role: "user" as const,
          content: `Generate comprehensive interview preparation materials for this role.

Role Title: ${roleTitle}

Job Description:
${jobDescription}
${candidateProfile ? `\nCandidate Profile:\n${candidateProfile}` : ""}

Return a JSON object with exactly these fields:
{
  "behavioralQuestions": [
    { "question": "the question", "followUp": "a follow-up probe", "whatToLookFor": "what good answers include" }
  ],
  "technicalQuestions": [
    { "question": "the question", "context": "why this question matters for the role", "whatToLookFor": "what good answers include" }
  ],
  "scorecard": [
    { "criteria": "criteria name", "description": "what this measures", "scale": { "1": "poor", "2": "below average", "3": "meets expectations", "4": "exceeds expectations", "5": "exceptional" } }
  ],
  "interviewerNotes": "A paragraph with preparation tips, suggested interview flow, red flags to watch for, and how to create a positive candidate experience."
}

Include 6-8 behavioral questions, 5-7 technical/role-specific questions, and 5-6 scorecard criteria.`,
        },
      ],
    };

    let message;
    try {
      message = await anthropic.messages.create({ model: PRIMARY_MODEL, ...requestParams });
    } catch (primaryErr) {
      if (isOverloaded(primaryErr)) {
        message = await anthropic.messages.create({ model: FALLBACK_MODEL, ...requestParams });
      } else {
        throw primaryErr;
      }
    }

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    try {
      const result = JSON.parse(responseText);
      return Response.json({ result });
    } catch {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return Response.json({ result: JSON.parse(jsonMatch[0]) });
      }
      return Response.json(
        { error: "Failed to parse generated content." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Interview kit error:", error);
    const message =
      error instanceof Error ? error.message : "Generation failed unexpectedly.";
    if (message.includes("credit balance")) {
      return Response.json(
        {
          error:
            "Your Anthropic API account needs credits. Go to console.anthropic.com → Plans & Billing to add credits.",
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
}

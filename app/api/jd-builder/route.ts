import Anthropic from "@anthropic-ai/sdk";

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
    const { roleTitle, notes } = body;

    if (!notes) {
      return Response.json(
        { error: "Hiring notes are required." },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
      maxRetries: 3,
    });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      system:
        "You are an expert recruiter and job description writer. Respond with ONLY valid JSON. No markdown, no code blocks, no explanation — just the raw JSON object.",
      messages: [
        {
          role: "user",
          content: `Transform these hiring manager notes into polished recruiting materials.

${roleTitle ? `Role Title: ${roleTitle}\n` : ""}
Hiring Manager Notes:
${notes}

Return a JSON object with exactly these fields:
{
  "jobDescription": "A complete, polished job description with sections: About the Role, Responsibilities (bulleted), Requirements (bulleted), Nice-to-Haves (bulleted), and What We Offer. Use newlines for formatting.",
  "linkedinPost": "A concise LinkedIn job posting version under 300 words. Engaging tone, highlights key selling points of the role.",
  "candidateSummary": "A 2-3 paragraph candidate-facing role summary. Conversational tone that would appeal to passive candidates.",
  "booleanSearch": "A Boolean search string for finding candidates on LinkedIn using AND, OR, NOT operators and quotation marks for phrases."
}`,
        },
      ],
    });

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
    console.error("JD builder error:", error);
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

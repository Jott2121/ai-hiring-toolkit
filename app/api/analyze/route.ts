import Anthropic from "@anthropic-ai/sdk";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

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
    const { roleTitle, jobDescription, resumes, requireClearance } = body;

    if (!roleTitle || !jobDescription || !resumes?.length) {
      return Response.json(
        { error: "Role title, job description, and at least one resume are required." },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
      maxRetries: 3,
    });
    const results = [];

    for (const resume of resumes) {
      try {
        const buffer = Buffer.from(resume.content, "base64");
        let text = "";

        if (resume.type === "application/pdf") {
          const data = await pdfParse(buffer);
          text = data.text;
        } else if (
          resume.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          const result = await mammoth.extractRawText({ buffer });
          text = result.value;
        } else {
          text = buffer.toString("utf-8");
        }

        if (!text.trim()) {
          results.push({
            candidateName: resume.name.replace(/\.(pdf|docx?)$/i, ""),
            fitScore: 0,
            error: "Could not extract text from this resume.",
            strengths: [],
            risks: ["Unable to read resume content"],
            interviewFocus: [],
            suggestedQuestions: [],
            evaluationRubric: [],
          });
          continue;
        }

        const requestParams = {
          max_tokens: 2500,
          system:
            "You are an expert recruiter analyzing resumes against job descriptions. Respond with ONLY valid JSON. No markdown, no code blocks, no explanation — just the raw JSON object.",
          messages: [
            {
              role: "user" as const,
              content: `Analyze this candidate's resume against the job description.

Job Title: ${roleTitle}

Job Description:
${jobDescription}

Resume:
${text}

Return a JSON object with exactly these fields:
{
  "candidateName": "Full name from resume",
  "fitScore": <number 0-100>,
  "hasClearance": <boolean - true if resume mentions any security clearance (Secret, Top Secret, TS/SCI, Public Trust, etc.), false otherwise>,
  "clearanceLevel": "<string - the specific clearance level mentioned, or 'None' if no clearance found>",
  "strengths": ["3-5 key strengths aligned to this role"],
  "risks": ["2-4 potential risks or gaps"],
  "interviewFocus": ["2-3 areas to probe in an interview"],
  "suggestedQuestions": ["5-7 specific interview questions tailored to this candidate and role"],
  "evaluationRubric": [
    { "criteria": "criteria name", "assessment": "brief assessment", "rating": "strong|moderate|weak" }
  ]
}

The evaluationRubric should have 4-5 criteria covering: technical skills, experience relevance, leadership/collaboration, culture fit, and growth potential.${requireClearance ? "\n\nIMPORTANT: This role requires a security clearance. If the candidate does not mention any security clearance on their resume, flag this prominently in the risks array." : ""}`,
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
          results.push(JSON.parse(responseText));
        } catch {
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            results.push(JSON.parse(jsonMatch[0]));
          } else {
            results.push({
              candidateName: resume.name.replace(/\.(pdf|docx?)$/i, ""),
              fitScore: 0,
              error: "Failed to parse analysis results.",
              strengths: [],
              risks: [],
              interviewFocus: [],
              suggestedQuestions: [],
              evaluationRubric: [],
            });
          }
        }
      } catch (err) {
        const rawMsg =
          err instanceof Error ? err.message : "Failed to analyze this resume.";
        const friendlyMsg =
          rawMsg.includes("overloaded") || rawMsg.includes("529")
            ? "The AI service is temporarily overloaded. Please wait a minute and try again."
            : rawMsg;
        results.push({
          candidateName: resume.name.replace(/\.(pdf|docx?)$/i, ""),
          fitScore: 0,
          error: friendlyMsg,
          strengths: [],
          risks: [],
          interviewFocus: [],
          suggestedQuestions: [],
          evaluationRubric: [],
        });
      }
    }

    return Response.json({ results });
  } catch (error) {
    console.error("Analysis error:", error);
    const message =
      error instanceof Error ? error.message : "Analysis failed unexpectedly.";
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

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  const roleTitle = body?.roleTitle ?? "Unknown Role";
  const jd = body?.jd ?? "";
  const resumes = Array.isArray(body?.resumes) ? body.resumes : [];

  const results = resumes.map((r: any, idx: number) => {
    const name =
      r?.filename?.replace(/\.(pdf|doc|docx)$/i, "") || `Candidate ${idx + 1}`;
    const score = Math.max(55, Math.min(92, 60 + idx * 7));

    return {
      candidateName: name,
      fitScore: score,
      strengths: [
        "Relevant experience appears aligned to JD keywords",
        "Clear progression and role ownership",
      ],
      risks: [
        "Needs deeper validation on core requirements",
        "Resume lacks measurable outcomes",
      ],
      interviewFocus: [
        "Validate most recent scope",
        "Probe technical depth on key requirements",
      ],
      suggestedQuestions: [
        "Walk me through your most relevant project for this role.",
        "What was the hardest problem you solved in the last 12 months?",
        "Which parts of this JD are you strongest in—and which are weakest?",
      ],
    };
  });

  return NextResponse.json({
    roleTitle,
    jdLength: jd.length,
    count: resumes.length,
    results,
    note: "Placeholder analysis only. Claude integration comes next.",
  });
}
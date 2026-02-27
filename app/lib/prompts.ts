// ============================================================
// LLM System & User Prompt Constants for the Sourcing Assistant
// ============================================================

// --- Boolean Search Generator ---

export const BOOLEAN_SYSTEM_PROMPT =
  "You are an expert technical recruiter and Boolean search specialist with 15+ years of experience. You build precise, production-ready search strings for LinkedIn Recruiter, Google X-Ray, Indeed, and GitHub. You follow senior recruiter best practices: proper use of parentheses for grouping, OR for synonyms, AND for requirements, NOT for exclusions, and quotation marks for exact phrases. Respond with ONLY valid JSON. No markdown, no code blocks, no explanation.";

export function buildBooleanUserPrompt(
  jobDescription: string,
  location?: string,
  experienceLevel?: string
): string {
  return `Generate Boolean search strings for sourcing candidates for this role.

Job Description:
${jobDescription}
${location ? `\nPreferred Location: ${location}` : ""}${experienceLevel ? `\nExperience Level: ${experienceLevel}` : ""}

Return a JSON object with exactly these fields:
{
  "broad": {
    "query": "Boolean string with OR-heavy structure, maximum synonyms, broader titles for maximum reach. Use parentheses to group OR terms.",
    "estimatedVolume": "high",
    "bestFor": "when to use this variant"
  },
  "targeted": {
    "query": "Boolean string with balanced AND/OR, specific titles and key skills for a qualified pipeline",
    "estimatedVolume": "medium",
    "bestFor": "when to use this variant"
  },
  "narrow": {
    "query": "Boolean string with strict AND, exact titles, niche skills, and specific qualifications for precision",
    "estimatedVolume": "low",
    "bestFor": "when to use this variant"
  },
  "searchTips": ["3-4 tips for refining these searches on different platforms"]
}

Important: Each Boolean query should be a single string ready to paste into a search bar. Use proper Boolean syntax with AND, OR, NOT, parentheses, and quotes.`;
}

// --- Sourcing Strategy Advisor ---

export const STRATEGY_SYSTEM_PROMPT =
  "You are a senior talent acquisition strategist who builds comprehensive, actionable sourcing plans. You understand multi-channel recruiting, passive candidate engagement, and bias-mitigation best practices. Respond with ONLY valid JSON. No markdown, no code blocks, no explanation.";

export function buildStrategyUserPrompt(
  jobDescription: string,
  companySize?: string,
  industry?: string
): string {
  return `Create a detailed 14-day sourcing strategy for filling this role.

Job Description:
${jobDescription}
${companySize ? `\nCompany Size: ${companySize}` : ""}${industry ? `\nIndustry: ${industry}` : ""}

Return a JSON object with exactly these fields:
{
  "dailyPlan": [
    {
      "days": "1-2",
      "theme": "theme for these days",
      "activities": ["3-5 specific, actionable activities"],
      "platforms": ["platforms to use"],
      "targetVolume": "number of outreaches or sourced candidates per day"
    }
  ],
  "communities": ["5-8 relevant online communities, Slack groups, forums, professional organizations"],
  "searchSynonyms": {
    "titles": ["5-8 alternative job titles to search"],
    "skills": ["5-8 related or adjacent skills to broaden the search"]
  },
  "cadence": {
    "initialOutreach": "timing and channel advice",
    "followUp1": "when and how to follow up",
    "followUp2": "second follow-up timing and approach",
    "finalTouch": "final outreach attempt"
  },
  "biasMitigation": ["4-5 specific, actionable tips to reduce bias in sourcing and screening"],
  "metrics": {
    "responseRateBenchmark": "expected response rate percentage",
    "pipelineTarget": "how many candidates to source total",
    "timeToFill": "estimated timeline"
  }
}

The dailyPlan should have 5-7 phases covering days 1-14.`;
}

// --- Outreach Message Builder ---

export const OUTREACH_SYSTEM_PROMPT =
  "You are a talent acquisition expert who writes high-converting, personalized candidate outreach messages. You understand CAN-SPAM Act requirements, GDPR consent requirements, and recruiting compliance best practices. Your messages are concise, genuine, and highlight mutual value. Respond with ONLY valid JSON. No markdown, no code blocks, no explanation.";

export function buildOutreachUserPrompt(
  profileText: string,
  jobDescription: string
): string {
  return `Write personalized outreach messages for a candidate based on their public profile.

Job Description:
${jobDescription}

Candidate Public Profile:
${profileText}

Return a JSON object with exactly these fields:
{
  "messages": [
    {
      "channel": "LinkedIn InMail" | "Email" | "Email (Follow-up)" | "SMS/Short",
      "subject": "subject line (for email/InMail only, null for SMS)",
      "body": "the full message text including a professional sign-off",
      "characterCount": <number>,
      "abTestNote": "what to vary when A/B testing this message"
    }
  ],
  "personalizationPoints": ["2-4 specific details from their profile that were used"],
  "complianceNotes": {
    "canSpam": "CAN-SPAM requirements reminder (physical address, unsubscribe option)",
    "gdpr": "GDPR consent reminder if contacting EU-based candidates",
    "optOut": "suggested opt-out language to include in messages"
  },
  "screeningQuestions": ["2-3 qualifying questions to include in follow-up conversation"]
}

Generate exactly 4 messages: 1 LinkedIn InMail, 1 cold email, 1 follow-up email, and 1 SMS/short message. Each should feel personalized, not templated.`;
}

// --- Profile Fit Analyzer ---

export const ANALYZE_SYSTEM_PROMPT =
  "You are an expert recruiter analyzing candidate public profiles against job descriptions. You provide honest, balanced assessments noting both strengths and limitations of evaluating from public profile data versus a full resume. Respond with ONLY valid JSON. No markdown, no code blocks, no explanation.";

export function buildAnalyzeUserPrompt(
  profileText: string,
  jobDescription: string
): string {
  return `Analyze this candidate's public profile against the job description.

Job Description:
${jobDescription}

Public Profile:
${profileText}

Return a JSON object with exactly these fields:
{
  "candidateName": "Full name from profile or 'Unknown'",
  "fitScore": <number 0-100>,
  "strengths": ["3-5 key strengths aligned to this role"],
  "risks": ["2-4 potential risks or gaps"],
  "interviewFocus": ["2-3 areas to probe in an interview"],
  "suggestedQuestions": ["5-7 specific interview questions tailored to this candidate and role"],
  "evaluationRubric": [
    { "criteria": "criteria name", "assessment": "brief assessment", "rating": "strong|moderate|weak" }
  ],
  "dataCaveats": ["1-3 notes about limitations of this assessment based on public profile data vs a full resume"]
}

The evaluationRubric should have 4-5 criteria covering: technical skills, experience relevance, leadership/collaboration, culture fit, and growth potential. Be transparent in dataCaveats about what cannot be assessed from a public profile alone.`;
}

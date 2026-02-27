import { z } from "zod";

// --- Boolean Search Generator ---
export const booleanSearchSchema = z.object({
  jobDescription: z.string().min(1, "Job description is required"),
  location: z.string().optional(),
  experienceLevel: z
    .enum(["entry", "mid", "senior", "executive"])
    .optional(),
});
export type BooleanSearchInput = z.infer<typeof booleanSearchSchema>;

// --- Sourcing Strategy Advisor ---
export const strategySchema = z.object({
  jobDescription: z.string().min(1, "Job description is required"),
  companySize: z
    .enum(["startup", "mid-market", "enterprise"])
    .optional(),
  industry: z.string().optional(),
});
export type StrategyInput = z.infer<typeof strategySchema>;

// --- Outreach Message Builder ---
export const outreachSchema = z.object({
  profileText: z.string().min(1, "Profile text is required"),
  jobDescription: z.string().min(1, "Job description is required"),
});
export type OutreachInput = z.infer<typeof outreachSchema>;

// --- Profile Fit Analyzer ---
export const analyzeProfileSchema = z.object({
  jobDescription: z.string().min(1, "Job description is required"),
  profiles: z
    .array(
      z.object({
        name: z.string().min(1),
        text: z.string().min(1),
      })
    )
    .min(1, "At least one profile is required"),
});
export type AnalyzeProfileInput = z.infer<typeof analyzeProfileSchema>;

/** Validate request body against a Zod schema. Returns parsed data or error Response. */
export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; response: Response } {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.issues[0]?.message || "Invalid input.";
    return {
      success: false,
      response: Response.json({ error: firstError }, { status: 400 }),
    };
  }
  return { success: true, data: result.data };
}

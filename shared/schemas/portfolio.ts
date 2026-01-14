import * as zod from "zod";

// -------------------------
// ----- Portfolio ---------
// -------------------------

/**
 * Schema for Portfolio.
 */
export const portfolioSchema = zod
  .object({
    id: zod.string().uuid(),
    image_url: zod.array(zod.string().url()),
    
    category: zod.string(),
    description: zod.string(),
    is_public: zod.boolean(),
    likes_count: zod.number(),
    views_count: zod.number(),

    created_at: zod.string(),
    updated_at: zod.string(),
  })
  .strict();

/**
 * The Portfolio schema.
 */
export type PortfolioSchema = zod.infer<typeof portfolioSchema>;

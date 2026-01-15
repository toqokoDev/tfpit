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

/**
 * Schema for Portfolio creation.
 */
export const portfolioCreateSchema = zod
  .object({
    category: zod.string({ required_error: 'Введите категорию' })
      .min(1, 'Категория обязательна')
      .max(100, 'Категория слишком длинная'),
    
    description: zod.string({ required_error: 'Введите описание' })
      .min(1, 'Описание обязательно')
      .max(1000, 'Описание слишком длинное'),
    
    is_public: zod.boolean().default(false),
  })
  .passthrough(); // Разрешаем дополнительные поля

/**
 * The Portfolio create schema.
 */
export type PortfolioCreateSchema = zod.infer<typeof portfolioCreateSchema>;

import * as zod from "zod";
import { portfolioSchema } from "./portfolio";

// -------------------------
// ----- User Socials ------
// -------------------------

/**
 * Schema for user socials.
 */
export const userSocialsSchema = zod
  .object({
    vk: zod.string().nullable(),
    website: zod.string().nullable(),
    telegram: zod.string().nullable(),
    instagram: zod.string().nullable(),
  })
  .strict();

/**
 * The user role schema.
 */
export type UserSocialsSchema = zod.infer<typeof userSocialsSchema>;

// -------------------------
// ----- User Role ---------
// -------------------------

/**
 * Schema for user role.
 */
export const userRoleSchema = zod
  .object({
    id: zod.string().uuid(),

    title: zod.string(),
    description: zod.string(),
  })
  .strict();

/**
 * The user role schema.
 */
export type UserRoleSchema = zod.infer<typeof userRoleSchema>;

// ----------------
// ----- User -----
// ----------------

/**
 * Schema for user.
 */
export const userSchema = zod
  .object({
    id: zod.string().uuid(),
    email: zod.string().email(),

    phone: zod.string().optional(),
    city: zod.string().optional(),
    bio: zod.string().optional(),
    rating: zod.number().default(5),
    experience_level: zod.number().default(0),
    gender: zod.string().optional(),
    birth_date: zod.union([zod.string(), zod.any()]).optional(),

    first_name: zod.string()
      .max(50, 'Имя слишком длинное'),

    last_name: zod.string()
      .max(50, 'Фамилия слишком длинная'),

    avatar_url: zod.string().url().optional(),
    cover_url: zod.string().url().optional(),

    role: userRoleSchema.optional(),
    socials: userSocialsSchema,
    portfolio: zod.array(portfolioSchema).optional(),

    created_at: zod.string().optional(),
    updated_at: zod.string().optional(),
  })
  .strict();

/**
 * The user schema.
 */
export type UserSchema = zod.infer<typeof userSchema>;

/**
 * Schema for user update.
 */
export const userUpdateSchema = zod
  .object({
    email: zod.string().email(),

    phone: zod.string().optional(),
    city: zod.string().optional(),
    bio: zod.string().optional(),
    gender: zod.string().optional(),
    birth_date: zod.union([zod.string(), zod.any()]).optional(),

    first_name: zod.string()
      .max(50, 'Имя слишком длинное'),

    last_name: zod.string()
      .max(50, 'Фамилия слишком длинная'),
  })
  .strict();

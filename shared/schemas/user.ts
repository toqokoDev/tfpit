import * as zod from "zod";

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
    gender: zod.string().optional(),
    birth_date: zod.union([zod.string(), zod.any()]).optional(),

    first_name: zod.string()
      .max(50, 'Имя слишком длинное'),

    last_name: zod.string()
      .max(50, 'Фамилия слишком длинная'),

    avatar_url: zod.string().url().optional(),
    cover_url: zod.string().url().optional(),

    role: userRoleSchema.optional(),

    created_at: zod.string(),
    updated_at: zod.string(),
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

import * as zod from "zod";

// -----------------
// ----- Login -----
// -----------------

/**
 * Schema for login.
 */
export const loginSchema = zod
  .object({
    email: zod.string()
      .email('Введите корректный адрес электронной почты')
      .transform((v) => v.toLowerCase().trim()),

    password: zod.string()
      .min(8, 'Пароль слишком короткий (минимум 8 символов)')
      .max(128, 'Пароль слишком длинный (максимум 128 символов)')
      .refine((v) => /[a-zA-Z]/.test(v), {
        message: 'Пароль должен содержать хотя бы одну латинскую букву',
      })
      .refine((v) => /\d/.test(v), {
        message: 'Пароль должен содержать хотя бы одну цифру',
      })
      // eslint-disable-next-line no-control-regex
      .refine((v) => !/[\u0000-\u001F\u007F]/.test(v), {
        message: 'Пароль содержит недопустимые спецсимволы',
      }),
  })
  .strict();

/**
 * The login schema.
 */
export type LoginSchema = zod.infer<typeof loginSchema>;

// --------------------------
// ----- Create Account -----
// --------------------------

/**
 * Schema for create account.
 */
export const createAccountSchema = zod
  .object({
    name: zod.string()
      .min(2, 'Имя слишком короткое (минимум 2 символа)')
      .max(50, 'Имя слишком длинное (максимум 50 символов)'),

    surname: zod.string()
      .min(2, 'Фамилия слишком короткая (минимум 2 символа)')
      .max(50, 'Фамилия слишком длинная (максимум 50 символов)'),

    password: zod.string()
      .min(8, 'Пароль слишком короткий (минимум 8 символов)')
      .max(128, 'Пароль слишком длинный (максимум 128 символов)')
      .refine((v) => /[a-zA-Z]/.test(v), {
        message: 'Пароль должен содержать хотя бы одну латинскую букву',
      })
      .refine((v) => /\d/.test(v), {
        message: 'Пароль должен содержать хотя бы одну цифру',
      })
      // eslint-disable-next-line no-control-regex
      .refine((v) => !/[\u0000-\u001F\u007F]/.test(v), {
        message: 'Пароль содержит недопустимые спецсимволы',
      }),
  })
  .strict();

/**
 * The create account schema.
 */
export type CreateAccountSchema = zod.infer<typeof createAccountSchema>;

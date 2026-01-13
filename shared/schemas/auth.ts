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
export const registerSchema = zod
  .object({
    email: zod.string({ required_error: 'Email обязателен' })
      .trim()
      .email('Введите корректный адрес электронной почты')
      .transform((v) => v.toLowerCase()),

    first_name: zod.string({ required_error: 'Введите имя' })
      .trim()
      .min(2, 'Имя слишком короткое (минимум 2 символа)')
      .max(50, 'Имя слишком длинное'),

    last_name: zod.string({ required_error: 'Введите фамилию' })
      .trim()
      .min(2, 'Фамилия слишком короткая (минимум 2 символа)')
      .max(50, 'Фамилия слишком длинная'),

    role: zod.enum(['model', 'photographer'], {
      errorMap: () => ({ message: 'Выберите роль: Модель или Фотограф' }),
    }),

    password: zod.string({ required_error: 'Введите пароль' })
      .min(1, 'Введите пароль')
      .min(8, 'Пароль слишком короткий (минимум 8 символов)')
      .max(128, 'Пароль слишком длинный')
      .refine((v) => /[a-zA-Z]/.test(v), {
        message: 'Пароль должен содержать латинскую букву',
      })
      .refine((v) => /\d/.test(v), {
        message: 'Пароль должен содержать цифру',
      })
      .refine((v) => !/[\u0000-\u001F\u007F]/.test(v), {
        message: 'Пароль содержит недопустимые спецсимволы',
      }),
  })
  .strict();

/**
 * The create account schema.
 */
export type RegisterSchema = zod.infer<typeof registerSchema>;

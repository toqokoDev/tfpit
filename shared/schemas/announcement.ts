import * as zod from "zod";

// -----------------------------
// ----- Announcement Create ---
// -----------------------------

/**
 * Schema for announcement creation.
 */
export const announcementCreateSchema = zod
  .object({
    title: zod.string({ required_error: 'Введите название объявления' })
      .min(3, 'Минимум 3 символа')
      .max(200, 'Максимум 200 символов'),

    description: zod.string({ required_error: 'Введите описание' })
      .min(10, 'Минимум 10 символов')
      .max(2000, 'Максимум 2000 символов'),

    city: zod.string({ required_error: 'Укажите город' })
      .min(1, 'Укажите город'),

    role_id: zod.string({ required_error: 'Выберите роль' })
      .min(1, 'Выберите роль'),

    shooting_genre_id: zod.string({ required_error: 'Выберите жанр' })
      .min(1, 'Выберите жанр'),

    experience_level: zod.string().optional(),

    shooting_date_type: zod.string({ required_error: 'Выберите тип даты' })
      .min(1, 'Выберите тип даты'),

    shooting_date: zod.string().optional(),

    location_name: zod.string().optional(),

    gender_preference: zod.string().optional(),

    additional_requirements: zod.array(zod.string()).optional(),
  })
  .passthrough();

/**
 * The announcement create schema.
 */
export type AnnouncementCreateSchema = zod.infer<typeof announcementCreateSchema>;

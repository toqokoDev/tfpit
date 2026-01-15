import * as zod from "zod";

// -------------------------
// ----- Model Profile ----
// -------------------------

/**
 * Schema for model profile.
 */
export const modelProfileSchema = zod
  .object({
    height: zod.number({ required_error: 'Введите рост' })
      .min(100, 'Рост должен быть не менее 100 см')
      .max(250, 'Рост должен быть не более 250 см'),
    
    weight: zod.number({ required_error: 'Введите вес' })
      .min(30, 'Вес должен быть не менее 30 кг')
      .max(200, 'Вес должен быть не более 200 кг'),
    
    bust: zod.number({ required_error: 'Введите обхват груди' })
      .min(60, 'Обхват груди должен быть не менее 60 см')
      .max(150, 'Обхват груди должен быть не более 150 см'),
    
    waist: zod.number({ required_error: 'Введите обхват талии' })
      .min(50, 'Обхват талии должен быть не менее 50 см')
      .max(150, 'Обхват талии должен быть не более 150 см'),
    
    hips: zod.number({ required_error: 'Введите обхват бедер' })
      .min(60, 'Обхват бедер должен быть не менее 60 см')
      .max(150, 'Обхват бедер должен быть не более 150 см'),
    
    shoe_size: zod.number({ required_error: 'Введите размер обуви' })
      .min(30, 'Размер обуви должен быть не менее 30')
      .max(50, 'Размер обуви должен быть не более 50'),
    
    eye_color: zod.string({ required_error: 'Выберите цвет глаз' })
      .min(1, 'Цвет глаз обязателен'),
    
    hair_color: zod.string({ required_error: 'Выберите цвет волос' })
      .min(1, 'Цвет волос обязателен'),
    
    hair_length: zod.string({ required_error: 'Выберите длину волос' })
      .min(1, 'Длина волос обязательна'),
    
    clothing_sizes: zod.array(zod.string()).optional(),
    
    has_tattoos: zod.boolean().nullable().optional(),
    has_piercings: zod.boolean().nullable().optional(),
    has_scars: zod.boolean().nullable().optional(),
    
    additional_info: zod.array(zod.string()).nullable().optional(),
  })
  .strict();

/**
 * The model profile schema.
 */
export type ModelProfileSchema = zod.infer<typeof modelProfileSchema>;

// -------------------------
// ----- Photographer -----
// -------------------------

/**
 * Schema for photographer profile.
 */
export const photographerProfileSchema = zod
  .object({
    camera: zod.string({ required_error: 'Введите модель камеры' })
      .min(1, 'Модель камеры обязательна'),
    
    lenses: zod.array(zod.string()).optional(),
    
    additional_info: zod.array(zod.string()).nullable().optional(),
  })
  .strict();

/**
 * The photographer profile schema.
 */
export type PhotographerProfileSchema = zod.infer<typeof photographerProfileSchema>;

// -------------------------
// ----- Hairdresser -------
// -------------------------

/**
 * Schema for hairdresser profile.
 */
export const hairdresserProfileSchema = zod
  .object({
    equipment: zod.array(zod.string()).nullable().optional(),
    
    specialties: zod.array(zod.string()).nullable().optional(),
    
    additional_info: zod.array(zod.string()).nullable().optional(),
  })
  .strict();

/**
 * The hairdresser profile schema.
 */
export type HairdresserProfileSchema = zod.infer<typeof hairdresserProfileSchema>;

// -------------------------
// ----- Stylist -----------
// -------------------------

/**
 * Schema for stylist profile.
 */
export const stylistProfileSchema = zod
  .object({
    skills: zod.array(zod.string()).nullable().optional(),
    
    additional_info: zod.array(zod.string()).nullable().optional(),
  })
  .strict();

/**
 * The stylist profile schema.
 */
export type StylistProfileSchema = zod.infer<typeof stylistProfileSchema>;

// -------------------------
// ----- Helper Function ---
// -------------------------

/**
 * Get role profile schema by table name.
 */
export function getRoleProfileSchema(tableName: string): zod.ZodObject<any> {
  switch (tableName) {
    case 'models':
      return modelProfileSchema;
    case 'photographers':
      return photographerProfileSchema;
    case 'hairdressers':
      return hairdresserProfileSchema;
    case 'stylists':
      return stylistProfileSchema;
    default:
      return zod.object({});
  }
}

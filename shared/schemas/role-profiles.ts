import * as zod from "zod";

const requiredNumber = (
  message: string,
  min: number,
  minMessage: string,
  max: number,
  maxMessage: string,
) => zod.preprocess(
  (value) => {
    if (value === '' || value === null || value === undefined) {
      return undefined;
    }

    return Number(value);
  },
  zod.number({ required_error: message, invalid_type_error: message })
    .min(min, minMessage)
    .max(max, maxMessage),
);

// -------------------------
// ----- Model Profile ----
// -------------------------

/**
 * Schema for model profile.
 */
export const modelProfileSchema = zod
  .object({
    height: requiredNumber(
      'Введите рост',
      100,
      'Рост должен быть не менее 100 см',
      250,
      'Рост должен быть не более 250 см',
    ),
    
    weight: requiredNumber(
      'Введите вес',
      30,
      'Вес должен быть не менее 30 кг',
      200,
      'Вес должен быть не более 200 кг',
    ),
    
    bust: requiredNumber(
      'Введите обхват груди',
      60,
      'Обхват груди должен быть не менее 60 см',
      150,
      'Обхват груди должен быть не более 150 см',
    ),
    
    waist: requiredNumber(
      'Введите обхват талии',
      50,
      'Обхват талии должен быть не менее 50 см',
      150,
      'Обхват талии должен быть не более 150 см',
    ),
    
    hips: requiredNumber(
      'Введите обхват бедер',
      60,
      'Обхват бедер должен быть не менее 60 см',
      150,
      'Обхват бедер должен быть не более 150 см',
    ),
    
    shoe_size: requiredNumber(
      'Введите размер обуви',
      30,
      'Размер обуви должен быть не менее 30',
      50,
      'Размер обуви должен быть не более 50',
    ),
    
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

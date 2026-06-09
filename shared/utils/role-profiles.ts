export type RoleTableName = 'models' | 'photographers' | 'hairdressers' | 'stylists';

export type RoleDisplayField = {
  key: string;
  label: string;
  value: string;
};

const ROLE_FIELD_LABELS: Record<RoleTableName, Record<string, string>> = {
  models: {
    height: 'Рост',
    weight: 'Вес',
    bust: 'Обхват груди',
    waist: 'Обхват талии',
    hips: 'Обхват бёдер',
    shoe_size: 'Размер обуви',
    eye_color: 'Цвет глаз',
    hair_color: 'Цвет волос',
    hair_length: 'Длина волос',
    clothing_sizes: 'Размеры одежды',
    has_tattoos: 'Татуировки',
    has_piercings: 'Пирсинг',
    has_scars: 'Шрамы',
    additional_info: 'Дополнительная информация',
  },
  photographers: {
    camera: 'Камера',
    lenses: 'Объективы',
    additional_info: 'Дополнительная информация',
  },
  hairdressers: {
    equipment: 'Оборудование',
    specialties: 'Специализации',
    additional_info: 'Дополнительная информация',
  },
  stylists: {
    skills: 'Навыки',
    additional_info: 'Дополнительная информация',
  },
};

const MASKED_VALUES: Record<RoleTableName, string[]> = {
  models: ['178 см', '62 кг', '90 см', '70 см', '95 см', '38', '██████', '██████', '██████', '██, ██', '██', '██', '██', '████████████████'],
  photographers: ['████████████████████', '████, ████', '████████████████'],
  hairdressers: ['████, ████', '████, ████', '████████████████'],
  stylists: ['████, ████, ████', '████████████████'],
};

export function getTableNameByRole(roleTitle: string): RoleTableName | null {
  const titleLower = roleTitle.toLowerCase();

  if (titleLower.includes('модель') || titleLower.includes('model')) return 'models';
  if (titleLower.includes('фотограф') || titleLower.includes('photographer')) return 'photographers';
  if (titleLower.includes('мастер по прическам') || titleLower.includes('hairdresser')) return 'hairdressers';
  if (titleLower.includes('визажист') || titleLower.includes('стилист') || titleLower.includes('stylist')) return 'stylists';

  return null;
}

export function hasRoleProfileTable(roleTitle: string | null | undefined): boolean {
  return !!roleTitle && getTableNameByRole(roleTitle) !== null;
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value.split(',').map(item => item.trim()).filter(Boolean);
  }

  return [];
}

function formatBoolean(value: unknown): string | null {
  if (value === true) return 'Есть';
  if (value === false) return 'Нет';
  return null;
}

function formatFieldValue(tableName: RoleTableName, key: string, value: unknown): string | null {
  if (value === null || value === undefined || value === '') return null;

  if (key.startsWith('has_')) {
    return formatBoolean(value);
  }

  if (['clothing_sizes', 'lenses', 'equipment', 'specialties', 'skills', 'additional_info'].includes(key)) {
    const tags = normalizeTags(value);
    return tags.length ? tags.join(', ') : null;
  }

  if (typeof value === 'number') {
    if (['height', 'bust', 'waist', 'hips'].includes(key)) return `${value} см`;
    if (key === 'weight') return `${value} кг`;
    return String(value);
  }

  return String(value);
}

export function getRoleDisplayFields(
  tableName: RoleTableName,
  data: Record<string, unknown> | null | undefined,
): RoleDisplayField[] {
  if (!data) return [];

  const labels = ROLE_FIELD_LABELS[tableName];

  return Object.keys(labels)
    .map((key) => {
      const value = formatFieldValue(tableName, key, data[key]);
      if (!value) return null;

      return {
        key,
        label: labels[key],
        value,
      };
    })
    .filter((field): field is RoleDisplayField => field !== null);
}

export function getRolePlaceholderFields(tableName: RoleTableName): RoleDisplayField[] {
  const labels = ROLE_FIELD_LABELS[tableName];
  const masks = MASKED_VALUES[tableName];

  return Object.keys(labels).map((key, index) => ({
    key,
    label: labels[key],
    value: masks[index] || '████████',
  }));
}

export function hasRoleDisplayData(
  tableName: RoleTableName,
  data: Record<string, unknown> | null | undefined,
): boolean {
  return getRoleDisplayFields(tableName, data).length > 0;
}

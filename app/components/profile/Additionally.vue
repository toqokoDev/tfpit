<script lang="ts" setup>
import { toast } from "vue-sonner";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { Field as VeeField } from "vee-validate";
import { AlertCircleIcon } from "lucide-vue-next";
import * as zod from "zod";

type RoleTableName = "models" | "photographers" | "hairdressers" | "stylists";
type RoleFormValues = Record<string, unknown>;

const supabase = useSupabaseClient<Database>();
const currentUserStore = useCurrentUserStore();
const currentUser = computed(() => currentUserStore.getUser());

const roles = ref<UserRoleSchema[]>([]);
const selectedRoleId = ref<string | null>(null);
const isFetching = ref<boolean>(true);
const isRoleDataFetching = ref<boolean>(false);
const isSaving = ref<boolean>(false);
const hasTriedSubmit = ref<boolean>(false);
const formRenderKey = ref<number>(0);
const roleData = ref<{ id: string } | null>(null);

const arrayFieldsByTable: Record<RoleTableName, string[]> = {
  models: ["clothing_sizes", "additional_info"],
  photographers: ["lenses", "additional_info"],
  hairdressers: ["equipment", "specialties", "additional_info"],
  stylists: ["skills", "additional_info"],
};

const baseFormValues: Record<RoleTableName, RoleFormValues> = {
  models: {
    height: undefined,
    weight: undefined,
    bust: undefined,
    waist: undefined,
    hips: undefined,
    shoe_size: undefined,
    eye_color: "",
    hair_color: "",
    hair_length: "",
    clothing_sizes: [],
    has_tattoos: null,
    has_piercings: null,
    has_scars: null,
    additional_info: [],
  },
  photographers: {
    camera: "",
    lenses: [],
    additional_info: [],
  },
  hairdressers: {
    equipment: [],
    specialties: [],
    additional_info: [],
  },
  stylists: {
    skills: [],
    additional_info: [],
  },
};

const getTableNameByRole = (roleTitle: string): RoleTableName | null => {
  const titleLower = roleTitle.toLowerCase();
  if (
    titleLower.includes("модель") 
    || titleLower.includes("model")
  ) return "models";
  if (titleLower.includes("фотограф") 
    || titleLower.includes("photographer")
  ) return "photographers";
  if (
    titleLower.includes("мастер по прическам") 
    || titleLower.includes("hairdresser")
  ) return "hairdressers";
  if (
    titleLower.includes("визажист")
    || titleLower.includes("стилист")
    || titleLower.includes("stylist")
  ) return "stylists";
  return null;
};

const selectedRole = computed(() => {
  return roles.value.find(role => role.id === selectedRoleId.value);
});

const currentTableName = computed(() => {
  return selectedRole.value ? getTableNameByRole(selectedRole.value.title) : null;
});

const { handleSubmit, resetForm, errors } = useForm({
  validationSchema: computed(() => {
    if (!selectedRole.value) return toTypedSchema(zod.object({}));
    const tableName = getTableNameByRole(selectedRole.value.title);
    return toTypedSchema(tableName ? getRoleProfileSchema(tableName) : zod.object({}));
  }),
});

const formErrorMessages = computed(() => {
  if (!hasTriedSubmit.value) return [];

  return Object.values(errors.value)
    .filter((message): message is string => typeof message === "string" && message.length > 0);
});

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map(item => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map(item => item.trim())
      .filter(Boolean);
  }

  return [];
}

function joinTags(value: unknown): string | null {
  const tags = normalizeTags(value);
  return tags.length ? tags.join(", ") : null;
}

function getEmptyValues(tableName: RoleTableName): RoleFormValues {
  return { ...baseFormValues[tableName] };
}

function getFormValues(tableName: RoleTableName, data: Record<string, unknown> | null): RoleFormValues {
  const values = getEmptyValues(tableName);
  if (!data) return values;

  for (const key of Object.keys(values)) {
    values[key] = data[key] ?? values[key];
  }

  for (const field of arrayFieldsByTable[tableName]) {
    values[field] = normalizeTags(data[field]);
  }

  return values;
}

function getSavePayload(tableName: RoleTableName, values: RoleFormValues): RoleFormValues {
  const payload: RoleFormValues = {};

  for (const key of Object.keys(baseFormValues[tableName])) {
    const value = values[key];
    if (value !== undefined) {
      payload[key] = value;
    }
  }

  for (const field of arrayFieldsByTable[tableName]) {
    payload[field] = tableName === "photographers"
      ? joinTags(values[field])
      : normalizeTags(values[field]);
  }

  return payload;
}

function sortRolesByTitleLength(roleList: UserRoleSchema[]): UserRoleSchema[] {
  return [...roleList].sort((firstRole, secondRole) => {
    const lengthDiff = firstRole.title.length - secondRole.title.length;
    if (lengthDiff !== 0) return lengthDiff;

    return firstRole.title.localeCompare(secondRole.title, "ru");
  });
}

async function updateCurrentUserRole(role: UserRoleSchema) {
  const { error } = await supabase
    .from("users")
    .update({ role: role.id })
    .eq("id", currentUser.value.id);

  if (error) throw error;

  currentUserStore.updateUser({ role });
}

async function selectRole(roleId: string) {
  if (selectedRoleId.value === roleId) return;

  hasTriedSubmit.value = false;
  resetForm({ values: {} });
  roleData.value = null;
  formRenderKey.value += 1;
  selectedRoleId.value = roleId;
  await loadRoleData();
}

async function getRoles() {
  try {
    isFetching.value = true;
    const { data, error } = await supabase
      .from("roles")
      .select("*");

    if (error) throw error;
    
    roles.value = sortRolesByTitleLength(data as UserRoleSchema[]);
    
    selectedRoleId.value = currentUser.value.role?.id || roles.value[0]?.id || null;

    if (selectedRoleId.value) {
      await loadRoleData();
    }
  } catch (error) {
    console.error(error);
    toast.error("Не удалось загрузить роли");
  } finally {
    isFetching.value = false;
  }
}

async function loadRoleData() {
  hasTriedSubmit.value = false;

  if (!selectedRoleId.value || !selectedRole.value) {
    roleData.value = null;
    isRoleDataFetching.value = false;
    return;
  }
  
  const tableName = getTableNameByRole(selectedRole.value.title);
  if (!tableName) {
    roleData.value = null;
    resetForm({ values: {} }, { force: true });
    formRenderKey.value += 1;
    isRoleDataFetching.value = false;
    return;
  }

  try {
    isRoleDataFetching.value = true;
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq("user_id", currentUser.value.id)
      .maybeSingle();

    if (error) throw error;
    
    roleData.value = data;
    resetForm({ values: getFormValues(tableName, data) }, { force: true });
    formRenderKey.value += 1;
  } catch (error) {
    console.error("Ошибка загрузки данных роли:", error);
    toast.error("Не удалось загрузить данные роли");
  } finally {
    isRoleDataFetching.value = false;
  }
}

const saveRoleData = handleSubmit(
  async (values) => {
    hasTriedSubmit.value = true;

    if (!selectedRoleId.value || !selectedRole.value) {
      toast.error("Выберите роль");
      return;
    }
    
    const tableName = getTableNameByRole(selectedRole.value.title);
    if (!tableName) {
      toast.error("Для выбранной роли нет дополнительных полей");
      return;
    }

    try {
      isSaving.value = true;
      const dataToSave = getSavePayload(tableName, values);

      if (roleData.value?.id) {
        const { error } = await supabase
          .from(tableName)
          .update(dataToSave)
          .eq("id", roleData.value.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(tableName)
          .insert({
            ...dataToSave,
            user_id: currentUser.value.id,
          });
        
        if (error) throw error;
      }

      await updateCurrentUserRole(selectedRole.value);

      toast.success("Данные успешно сохранены");
      await loadRoleData();
    } catch (error: any) {
      console.error("Ошибка сохранения данных роли:", error);
      toast.error(error.message || "Не удалось сохранить данные");
    } finally {
      isSaving.value = false;
    }
  },
  (errors) => {
    hasTriedSubmit.value = true;
    console.error("Validation errors:", errors);
    toast.error("Пожалуйста, заполните все обязательные поля");
  },
);

onMounted(() => {
  getRoles();
});

const hairLengthOptions = [
  { value: "короткие", label: "Короткие" },
  { value: "средние", label: "Средние" },
  { value: "длинные", label: "Длинные" },
];

const eyeColorOptions = [
  { value: "карие", label: "Карие" },
  { value: "голубые", label: "Голубые" },
  { value: "зеленые", label: "Зеленые" },
  { value: "серые", label: "Серые" },
  { value: "черные", label: "Черные" },
];

const hairColorOptions = [
  { value: "черные", label: "Черные" },
  { value: "каштановые", label: "Каштановые" },
  { value: "русые", label: "Русые" },
  { value: "блонд", label: "Блонд" },
  { value: "рыжие", label: "Рыжие" },
];
</script>

<template>
  <div class="space-y-6">
    <div v-if="isFetching" class="flex justify-center py-8">
      <ui-spinner />
    </div>

    <div v-else class="space-y-6">
      <div class="space-y-3">
        <ui-label class="text-sm font-medium">Выберите роль</ui-label>
        <div class="flex flex-wrap gap-2">
          <ui-button
            v-for="role in roles"
            :key="role.id"
            :variant="selectedRoleId === role.id ? 'default' : 'outline'"
            :disabled="isRoleDataFetching || isSaving"
            @click="selectRole(role.id)"
            class="flex-1 min-w-[120px]"
          >
            {{ role.title }}
          </ui-button>
        </div>
      </div>

      <div v-if="isRoleDataFetching" class="flex justify-center border-t py-8">
        <ui-spinner />
      </div>

      <form
        v-else-if="selectedRole && currentTableName"
        :key="formRenderKey"
        @submit.prevent="saveRoleData"
        class="space-y-4"
      >
        <div class="border-t pt-4">
          <ui-alert
            v-if="formErrorMessages.length > 0"
            variant="destructive"
            class="mb-4"
          >
            <alert-circle-icon />
            <ui-alert-title class="font-normal">
              <p>Пожалуйста, исправьте ошибки в форме</p>
              <ul class="mt-2 list-disc space-y-1 pl-5 text-sm">
                <li
                  v-for="message in formErrorMessages"
                  :key="message"
                >
                  {{ message }}
                </li>
              </ul>
            </ui-alert-title>
          </ui-alert>
          
          <ui-field-group>
            <template v-if="currentTableName === 'models'">
              <div class="grid grid-cols-2 gap-4">
                <base-input
                  name="height"
                  type="number"
                  label="Рост (см)"
                  placeholder="170"
                />
                <base-input
                  name="weight"
                  type="number"
                  label="Вес (кг)"
                  placeholder="60"
                />
                <base-input
                  name="bust"
                  type="number"
                  label="Обхват груди (см)"
                  placeholder="90"
                />
                <base-input
                  name="waist"
                  type="number"
                  label="Обхват талии (см)"
                  placeholder="70"
                />
                <base-input
                  name="hips"
                  type="number"
                  label="Обхват бедер (см)"
                  placeholder="95"
                />
                <base-input
                  name="shoe_size"
                  type="number"
                  label="Размер обуви"
                  placeholder="38"
                />
              </div>
              
              <base-select
                name="eye_color"
                label="Цвет глаз"
                placeholder="Выберите цвет глаз"
                :options="eyeColorOptions"
              />
              
              <base-select
                name="hair_color"
                label="Цвет волос"
                placeholder="Выберите цвет волос"
                :options="hairColorOptions"
              />
              
              <base-select
                name="hair_length"
                label="Длина волос"
                placeholder="Выберите длину волос"
                :options="hairLengthOptions"
              />
              
              <base-tags-input
                name="clothing_sizes"
                label="Размеры одежды"
                placeholder="Введите размер и нажмите Enter"
              />
              
              <div class="grid grid-cols-3 gap-4">
                <vee-field name="has_tattoos" v-slot="{ field, setValue }">
                  <ui-field>
                    <ui-field-label>Татуировки</ui-field-label>
                    <ui-select
                      :model-value="field.value === true ? 'yes' : field.value === false ? 'no' : 'unknown'"
                      @update:model-value="(val) => {
                        if (val === 'yes') setValue(true);
                        else if (val === 'no') setValue(false);
                        else setValue(null);
                      }"
                    >
                      <ui-select-trigger>
                        <ui-select-value />
                      </ui-select-trigger>
                      <ui-select-content>
                        <ui-select-item value="unknown">Не указано</ui-select-item>
                        <ui-select-item value="yes">Есть</ui-select-item>
                        <ui-select-item value="no">Нет</ui-select-item>
                      </ui-select-content>
                    </ui-select>
                  </ui-field>
                </vee-field>
                
                <vee-field name="has_piercings" v-slot="{ field, setValue }">
                  <ui-field>
                    <ui-field-label>Пирсинг</ui-field-label>
                    <ui-select
                      :model-value="field.value === true ? 'yes' : field.value === false ? 'no' : 'unknown'"
                      @update:model-value="(val) => {
                        if (val === 'yes') setValue(true);
                        else if (val === 'no') setValue(false);
                        else setValue(null);
                      }"
                    >
                      <ui-select-trigger>
                        <ui-select-value />
                      </ui-select-trigger>
                      <ui-select-content>
                        <ui-select-item value="unknown">Не указано</ui-select-item>
                        <ui-select-item value="yes">Есть</ui-select-item>
                        <ui-select-item value="no">Нет</ui-select-item>
                      </ui-select-content>
                    </ui-select>
                  </ui-field>
                </vee-field>
                
                <vee-field name="has_scars" v-slot="{ field, setValue }">
                  <ui-field>
                    <ui-field-label>Шрамы</ui-field-label>
                    <ui-select
                      :model-value="field.value === true ? 'yes' : field.value === false ? 'no' : 'unknown'"
                      @update:model-value="(val) => {
                        if (val === 'yes') setValue(true);
                        else if (val === 'no') setValue(false);
                        else setValue(null);
                      }"
                    >
                      <ui-select-trigger>
                        <ui-select-value />
                      </ui-select-trigger>
                      <ui-select-content>
                        <ui-select-item value="unknown">Не указано</ui-select-item>
                        <ui-select-item value="yes">Есть</ui-select-item>
                        <ui-select-item value="no">Нет</ui-select-item>
                      </ui-select-content>
                    </ui-select>
                  </ui-field>
                </vee-field>
              </div>
              
              <base-tags-input
                name="additional_info"
                label="Дополнительная информация"
                placeholder="Введите информацию и нажмите Enter"
              />
            </template>

            <template v-else-if="currentTableName === 'photographers'">
              <base-input
                name="camera"
                type="text"
                label="Камера"
                placeholder="Canon EOS 5D Mark IV"
              />
              
              <base-tags-input
                name="lenses"
                label="Объективы"
                placeholder="Введите объектив и нажмите Enter"
              />
              
              <base-tags-input
                name="additional_info"
                label="Дополнительная информация"
                placeholder="Введите информацию и нажмите Enter"
              />
            </template>

            <template v-else-if="currentTableName === 'hairdressers'">
              <base-tags-input
                name="equipment"
                label="Оборудование"
                placeholder="Введите оборудование и нажмите Enter"
              />
              
              <base-tags-input
                name="specialties"
                label="Специализации"
                placeholder="Введите специализацию и нажмите Enter"
              />
              
              <base-tags-input
                name="additional_info"
                label="Дополнительная информация"
                placeholder="Введите информацию и нажмите Enter"
              />
            </template>

            <template v-else-if="currentTableName === 'stylists'">
              <base-tags-input
                name="skills"
                label="Навыки"
                placeholder="Введите навык и нажмите Enter"
              />
              
              <base-tags-input
                name="additional_info"
                label="Дополнительная информация"
                placeholder="Введите информацию и нажмите Enter"
              />
            </template>
          </ui-field-group>

          <ui-field class="pt-4">
            <base-processing-button
              type="submit"
              label="Сохранить"
              :is-processing="isSaving"
            />
          </ui-field>
        </div>
      </form>

      <div v-else-if="selectedRole && !currentTableName" class="text-sm text-muted-foreground border-t pt-4">
        Для роли "{{ selectedRole.title }}" нет специальных полей
      </div>

      <div v-else class="text-sm text-muted-foreground">
        Выберите роль, чтобы увидеть доступные поля
      </div>
    </div>
  </div>
</template>

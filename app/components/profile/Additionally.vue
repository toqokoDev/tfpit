<script lang="ts" setup>
import { toast } from "vue-sonner";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { Field as VeeField } from "vee-validate";
import { AlertCircleIcon } from 'lucide-vue-next';
import * as zod from "zod";

type RoleTableName = 'models' | 'photographers' | 'hairdressers' | 'stylists';

const supabase = useSupabaseClient<Database>();
const currentUserStore = useCurrentUserStore();
const currentUser = computed(() => currentUserStore.getUser());

const roles = ref<UserRoleSchema[]>([]);
const selectedRoleId = ref<string | null>(null);
const isFetching = ref<boolean>(true);
const isSaving = ref<boolean>(false);
const roleData = ref<any>(null);

const getTableNameByRole = (roleTitle: string): RoleTableName | null => {
  const titleLower = roleTitle.toLowerCase();
  if (titleLower.includes('модель') || titleLower.includes('model')) return 'models';
  if (titleLower.includes('фотограф') || titleLower.includes('photographer')) return 'photographers';
  if (titleLower.includes('парикмахер') || titleLower.includes('hairdresser')) return 'hairdressers';
  if (titleLower.includes('стилист') || titleLower.includes('stylist')) return 'stylists';
  return null;
};

const selectedRole = computed(() => {
  return roles.value.find(role => role.id === selectedRoleId.value);
});

const currentTableName = computed(() => {
  return selectedRole.value ? getTableNameByRole(selectedRole.value.title) : null;
});

const { handleSubmit, setValues, resetForm, errors } = useForm({
  validationSchema: computed(() => {
    if (!selectedRole.value) return toTypedSchema(zod.object({}));
    const tableName = getTableNameByRole(selectedRole.value.title);
    return toTypedSchema(tableName ? getRoleProfileSchema(tableName) : zod.object({}));
  }),
});

async function getRoles() {
  try {
    isFetching.value = true;
    const { data, error } = await supabase
      .from('roles')
      .select('*');

    if (error) throw error;
    
    roles.value = data as UserRoleSchema[];
    
    if (currentUser.value.role?.id) {
      selectedRoleId.value = currentUser.value.role.id;
      await loadRoleData();
    }
  } catch (error) {
    console.error(error);
    toast.error('Не удалось загрузить роли');
  } finally {
    isFetching.value = false;
  }
}

async function loadRoleData() {
  if (!selectedRoleId.value || !selectedRole.value) return;
  
  const tableName = getTableNameByRole(selectedRole.value.title);
  if (!tableName) return;

  try {
    const { data, error } = await supabase
      .from(tableName as 'models' | 'photographers' | 'hairdressers' | 'stylists')
      .select('*')
      .eq('user_id', currentUser.value.id)
      .maybeSingle();

    if (error) throw error;
    
    roleData.value = data;
    
    if (data) {
      const formData: any = { ...data };
      // Преобразуем строки из БД (через запятую) в массивы для tags-input
      if (formData.clothing_sizes) {
        formData.clothing_sizes = Array.isArray(formData.clothing_sizes) 
          ? formData.clothing_sizes 
          : (typeof formData.clothing_sizes === 'string' 
            ? formData.clothing_sizes.split(',').map((s: string) => s.trim()).filter(Boolean)
            : []);
      } else {
        formData.clothing_sizes = [];
      }
      
      if (formData.lenses) {
        formData.lenses = Array.isArray(formData.lenses)
          ? formData.lenses
          : (typeof formData.lenses === 'string'
            ? formData.lenses.split(',').map((s: string) => s.trim()).filter(Boolean)
            : []);
      } else {
        formData.lenses = [];
      }
      
      if (formData.equipment) {
        formData.equipment = Array.isArray(formData.equipment)
          ? formData.equipment
          : (typeof formData.equipment === 'string'
            ? formData.equipment.split(',').map((s: string) => s.trim()).filter(Boolean)
            : []);
      } else {
        formData.equipment = [];
      }
      
      if (formData.specialties) {
        formData.specialties = Array.isArray(formData.specialties)
          ? formData.specialties
          : (typeof formData.specialties === 'string'
            ? formData.specialties.split(',').map((s: string) => s.trim()).filter(Boolean)
            : []);
      } else {
        formData.specialties = [];
      }
      
      if (formData.skills) {
        formData.skills = Array.isArray(formData.skills)
          ? formData.skills
          : (typeof formData.skills === 'string'
            ? formData.skills.split(',').map((s: string) => s.trim()).filter(Boolean)
            : []);
      } else {
        formData.skills = [];
      }
      
      if (formData.additional_info) {
        formData.additional_info = Array.isArray(formData.additional_info)
          ? formData.additional_info
          : (typeof formData.additional_info === 'string'
            ? formData.additional_info.split(',').map((s: string) => s.trim()).filter(Boolean)
            : []);
      } else {
        formData.additional_info = [];
      }
      
      setValues(formData);
    } else {
      resetForm();
    }
  } catch (error) {
    console.error('Ошибка загрузки данных роли:', error);
    toast.error('Не удалось загрузить данные роли');
  }
}

watch(selectedRoleId, async () => {
  if (selectedRoleId.value) {
    await loadRoleData();
  }
});

const saveRoleData = handleSubmit(
  async (values) => {
    console.log('saveRoleData called with values:', values);
    
    if (!selectedRoleId.value || !selectedRole.value) {
      console.error('No role selected');
      return;
    }
    
    const tableName = getTableNameByRole(selectedRole.value.title);
    if (!tableName) {
      console.error('No table name found for role:', selectedRole.value.title);
      return;
    }

    try {
      isSaving.value = true;
      
      const dataToSave: any = { ...values };
      
      // Преобразуем числовые поля из строк в числа
      if (dataToSave.height !== undefined) dataToSave.height = Number(dataToSave.height);
      if (dataToSave.weight !== undefined) dataToSave.weight = Number(dataToSave.weight);
      if (dataToSave.bust !== undefined) dataToSave.bust = Number(dataToSave.bust);
      if (dataToSave.waist !== undefined) dataToSave.waist = Number(dataToSave.waist);
      if (dataToSave.hips !== undefined) dataToSave.hips = Number(dataToSave.hips);
      if (dataToSave.shoe_size !== undefined) dataToSave.shoe_size = Number(dataToSave.shoe_size);
      
      // Преобразуем массивы из tags-input в строки через запятую для БД
      if (Array.isArray(dataToSave.clothing_sizes)) {
        const filtered = dataToSave.clothing_sizes.filter(Boolean);
        dataToSave.clothing_sizes = filtered.length > 0 ? filtered.join(',') : null;
      }
      if (Array.isArray(dataToSave.lenses)) {
        const filtered = dataToSave.lenses.filter(Boolean);
        dataToSave.lenses = filtered.length > 0 ? filtered.join(',') : null;
      }
      if (Array.isArray(dataToSave.equipment)) {
        const filtered = dataToSave.equipment.filter(Boolean);
        dataToSave.equipment = filtered.length > 0 ? filtered.join(',') : null;
      }
      if (Array.isArray(dataToSave.specialties)) {
        const filtered = dataToSave.specialties.filter(Boolean);
        dataToSave.specialties = filtered.length > 0 ? filtered.join(',') : null;
      }
      if (Array.isArray(dataToSave.skills)) {
        const filtered = dataToSave.skills.filter(Boolean);
        dataToSave.skills = filtered.length > 0 ? filtered.join(',') : null;
      }
      if (Array.isArray(dataToSave.additional_info)) {
        const filtered = dataToSave.additional_info.filter(Boolean);
        dataToSave.additional_info = filtered.length > 0 ? filtered.join(',') : null;
      }
      
      console.log('Data to save:', dataToSave);

    if (roleData.value?.id) {
      const { error } = await supabase
        .from(tableName as 'models' | 'photographers' | 'hairdressers' | 'stylists')
        .update(dataToSave)
        .eq('id', roleData.value.id);
      
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from(tableName as 'models' | 'photographers' | 'hairdressers' | 'stylists')
        .insert({
          ...dataToSave,
          user_id: currentUser.value.id,
        });
      
      if (error) throw error;
    }

      toast.success('Данные успешно сохранены');
      await loadRoleData();
    } catch (error: any) {
      console.error('Ошибка сохранения данных роли:', error);
      toast.error(error.message || 'Не удалось сохранить данные');
    } finally {
      isSaving.value = false;
    }
  },
  (errors) => {
    console.error('Validation errors:', errors);
    toast.error('Пожалуйста, заполните все обязательные поля');
  }
);

onMounted(() => {
  getRoles();
});

const hairLengthOptions = [
  { value: 'короткие', label: 'Короткие' },
  { value: 'средние', label: 'Средние' },
  { value: 'длинные', label: 'Длинные' },
];

const eyeColorOptions = [
  { value: 'карие', label: 'Карие' },
  { value: 'голубые', label: 'Голубые' },
  { value: 'зеленые', label: 'Зеленые' },
  { value: 'серые', label: 'Серые' },
  { value: 'черные', label: 'Черные' },
];

const hairColorOptions = [
  { value: 'черные', label: 'Черные' },
  { value: 'каштановые', label: 'Каштановые' },
  { value: 'русые', label: 'Русые' },
  { value: 'блонд', label: 'Блонд' },
  { value: 'рыжие', label: 'Рыжие' },
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
            @click="selectedRoleId = role.id"
            class="flex-1 min-w-[120px]"
          >
            {{ role.title }}
          </ui-button>
        </div>
      </div>

      <form v-if="selectedRole && currentTableName" @submit.prevent="saveRoleData" class="space-y-4">
        <div class="border-t pt-4">
          <ui-alert
            v-if="Object.keys(errors).length > 0"
            variant="destructive"
            class="mb-4"
          >
            <alert-circle-icon />
            <ui-alert-title class="font-normal">
              <p>Пожалуйста, исправьте ошибки в форме</p>
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

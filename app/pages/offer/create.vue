<script lang="ts" setup>
import { toast } from 'vue-sonner';
import { useForm } from 'vee-validate';
import { Field as VeeField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { CalendarDate } from '@internationalized/date';
import { X, Upload, ChevronLeft, ChevronRight } from 'lucide-vue-next';

interface SelectOption {
  id: string;
  title: string;
}

const router = useRouter();
const supabase = useSupabaseClient<Database>();
const currentUserStore = useCurrentUserStore();
const currentUser = computed(() => currentUserStore.getUser());

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(announcementCreateSchema),
  initialValues: {
    title: '',
    description: '',
    city: '',
    role_id: '',
    shooting_genre_id: '',
    experience_level: '',
    shooting_date_type: '',
    shooting_date: '',
    location_name: '',
    gender_preference: '',
    additional_requirements: [],
  },
});

// Data
const roles = ref<SelectOption[]>([]);
const genres = ref<SelectOption[]>([]);
const selectedImageFiles = ref<File[]>([]);
const previewImageUrls = ref<string[]>([]);
const imageInput = ref<HTMLInputElement | null>(null);
const birthDate = ref<CalendarDate | null>(null);
const isSubmitting = ref(false);
const isLoadingOptions = ref(true);

onMounted(async () => {
  try {
    isLoadingOptions.value = true;
    
    const { data: rolesData } = await supabase
      .from('roles')
      .select('id, title')
      .order('title');
    
    if (rolesData) roles.value = rolesData;

    const { data: genresData } = await supabase
      .from('shooting_genres')
      .select('id, title')
      .order('title');
    
    if (genresData) genres.value = genresData;
  } catch (error) {
    toast.error('Ошибка загрузки данных');
    console.error('Ошибка загрузки данных:', error);
  } finally {
    isLoadingOptions.value = false;
  }
});

const handleImageSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  
  if (!files || files.length === 0) return;

  const validFiles = Array.from(files).filter(file => {
    if (!file.type.startsWith('image/')) {
      toast.error(`${file.name} не является изображением`);
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error(`${file.name} слишком большой (макс. 5МБ)`);
      return false;
    }
    return true;
  });

  selectedImageFiles.value = [...selectedImageFiles.value, ...validFiles];
  
  validFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        previewImageUrls.value.push(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  });

  if (imageInput.value) {
    imageInput.value.value = '';
  }
};

const removeImage = (index: number) => {
  selectedImageFiles.value.splice(index, 1);
  previewImageUrls.value.splice(index, 1);
};

const uploadImageToStorage = async (file: File, userId: string): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `announcements/${userId}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('announcements')
      .upload(fileName, file, { upsert: false });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('announcements')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    toast.error('Ошибка загрузки изображения');
    console.error('Ошибка загрузки изображения:', error);
    throw error;
  }
};

// Form submission
const onSubmit = handleSubmit(async (values) => {
  try {
    isSubmitting.value = true;

    let imageUrls: string[] = [];
    if (selectedImageFiles.value.length > 0) {
      for (const file of selectedImageFiles.value) {
        const url = await uploadImageToStorage(file, currentUser.value.id);
        imageUrls.push(url);
      }
    }

    let formattedShootingDate: string | null = null;
    if (values.shooting_date_type === 'specific' && values.shooting_date) {
      formattedShootingDate = values.shooting_date;
    }

    const announcementData: any = {
      title: values.title,
      description: values.description,
      city: values.city,
      role_id: values.role_id,
      shooting_date_type: values.shooting_date_type,
      status: 'open',
      user_id: currentUser.value.id,
    };

    if (values.shooting_genre_id) announcementData.shooting_genre_id = values.shooting_genre_id;
    if (values.experience_level) announcementData.experience_level = values.experience_level;
    if (formattedShootingDate) announcementData.shooting_date = formattedShootingDate;
    if (values.location_name) announcementData.location_name = values.location_name;
    if (values.gender_preference) announcementData.gender_preference = values.gender_preference;
    if (values.additional_requirements && values.additional_requirements.length > 0) {
      announcementData.additional_requirements = values.additional_requirements;
    }
    if (imageUrls.length > 0) {
      announcementData.references_urls = imageUrls.join(';');
    }

    console.log(announcementData);

    const { data, error } = await supabase
      .from('announcements')
      .insert(announcementData)
      .select()
      .single();

    if (error) throw error;

    toast.success('Объявление успешно создано');
    router.push(`/offer/${data.id}`);
  } catch (error: any) {
    console.error('Ошибка создания объявления:', error);
    toast.error(error.message || 'Ошибка создания объявления');
  } finally {
    isSubmitting.value = false;
  }
});

const experienceLevelOptions = [
  { label: 'Начинающий', value: 'beginner' },
  { label: 'Средний', value: 'intermediate' },
  { label: 'Опытный', value: 'advanced' },
  { label: 'Профессионал', value: 'professional' },
];

const shootingDateTypeOptions = [
  { label: 'Конкретная дата', value: 'specific' },
  { label: 'Гибкая дата', value: 'flexible' },
];

const genderPreferenceOptions = [
  { label: 'Любой', value: 'any' },
  { label: 'Мужской', value: 'men' },
  { label: 'Женский', value: 'women' },
];

definePageMeta({
  middleware: 'auth',
});

useHead({ title: 'Создать объявление' });
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="flex items-center gap-4 mb-6">
        <ui-button variant="ghost" size="icon" @click="router.push('/offer')">
          <chevron-left class="h-4 w-4" />
        </ui-button>
        <h1 class="text-3xl font-bold">Создать объявление</h1>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-6">
        <ui-card>
          <ui-card-header>
            <ui-card-title>Основная информация</ui-card-title>
          </ui-card-header>
          <ui-card-content class="space-y-4">
            <div v-if="isLoadingOptions" class="space-y-4">
              <div class="space-y-2">
                <ui-skeleton class="h-4 w-32" />
                <ui-skeleton class="h-9 w-full" />
              </div>
              <div class="space-y-2">
                <ui-skeleton class="h-4 w-24" />
                <ui-skeleton class="h-24 w-full" />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <ui-skeleton class="h-4 w-16" />
                  <ui-skeleton class="h-9 w-full" />
                </div>
                <div class="space-y-2">
                  <ui-skeleton class="h-4 w-12" />
                  <ui-skeleton class="h-9 w-full" />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <ui-skeleton class="h-4 w-28" />
                  <ui-skeleton class="h-9 w-full" />
                </div>
                <div class="space-y-2">
                  <ui-skeleton class="h-4 w-28" />
                  <ui-skeleton class="h-9 w-full" />
                </div>
              </div>
            </div>
            
            <template v-else>
              <VeeField name="title" v-slot="{ field, errors }">
                <ui-field :data-invalid="!!errors.length">
                  <ui-field-label>Название объявления *</ui-field-label>
                  <ui-input
                    v-bind="field"
                    placeholder="Например: Съемка в стиле Vogue"
                  />
                  <ui-field-error v-if="errors.length" :errors="errors" />
                </ui-field>
              </VeeField>

              <VeeField name="description" v-slot="{ field, errors }">
                <ui-field :data-invalid="!!errors.length">
                  <ui-field-label>Описание *</ui-field-label>
                  <ui-textarea
                    v-bind="field"
                    placeholder="Опишите детали вашего объявления..."
                    rows="5"
                  />
                  <ui-field-error v-if="errors.length" :errors="errors" />
                </ui-field>
              </VeeField>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <VeeField name="city" v-slot="{ field, errors }">
                  <ui-field :data-invalid="!!errors.length">
                    <ui-field-label>Город *</ui-field-label>
                    <ui-input
                      v-bind="field"
                      placeholder="Минск"
                    />
                    <ui-field-error v-if="errors.length" :errors="errors" />
                  </ui-field>
                </VeeField>

                <VeeField name="role_id" v-slot="{ field, errors, setValue }">
                  <ui-field :data-invalid="!!errors.length">
                    <ui-field-label>Роль *</ui-field-label>
                    <ui-select
                      :model-value="field.value"
                      @update:model-value="setValue"
                    >
                      <ui-select-trigger>
                        <ui-select-value placeholder="Выберите роль" />
                      </ui-select-trigger>
                      <ui-select-content>
                        <ui-select-item
                          v-for="role in roles"
                          :key="role.id"
                          :value="role.id"
                        >
                          {{ role.title }}
                        </ui-select-item>
                      </ui-select-content>
                    </ui-select>
                    <ui-field-error v-if="errors.length" :errors="errors" />
                  </ui-field>
                </VeeField>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <VeeField name="shooting_genre_id" v-slot="{ field, setValue }">
                  <ui-field>
                    <ui-field-label>Жанр съемки *</ui-field-label>
                    <ui-select
                      :model-value="field.value"
                      @update:model-value="setValue"
                    >
                      <ui-select-trigger>
                        <ui-select-value placeholder="Выберите жанр" />
                      </ui-select-trigger>
                      <ui-select-content>
                        <ui-select-item
                          v-for="genre in genres"
                          :key="genre.id"
                          :value="genre.id"
                        >
                          {{ genre.title }}
                        </ui-select-item>
                      </ui-select-content>
                    </ui-select>
                  </ui-field>
                </VeeField>

                <VeeField name="experience_level" v-slot="{ field, setValue }">
                  <ui-field>
                    <ui-field-label>Уровень опыта</ui-field-label>
                    <ui-select
                      :model-value="field.value"
                      @update:model-value="setValue"
                    >
                      <ui-select-trigger>
                        <ui-select-value placeholder="Выберите уровень" />
                      </ui-select-trigger>
                      <ui-select-content>
                        <ui-select-item value="none">Не указано</ui-select-item>
                        <ui-select-item
                          v-for="option in experienceLevelOptions"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </ui-select-item>
                      </ui-select-content>
                    </ui-select>
                  </ui-field>
                </VeeField>
              </div>
            </template>
          </ui-card-content>
        </ui-card>

        <ui-card>
          <ui-card-header>
            <ui-card-title>Дата и место</ui-card-title>
          </ui-card-header>
          <ui-card-content class="space-y-4">
            <div v-if="isLoadingOptions" class="space-y-4">
              <div class="space-y-2">
                <ui-skeleton class="h-4 w-24" />
                <ui-skeleton class="h-9 w-full" />
              </div>
              <div class="space-y-2">
                <ui-skeleton class="h-4 w-28" />
                <ui-skeleton class="h-9 w-full" />
              </div>
            </div>
            
            <template v-else>
              <VeeField name="shooting_date_type" v-slot="{ field, errors, setValue }">
                <ui-field :data-invalid="!!errors.length">
                  <ui-field-label>Тип даты *</ui-field-label>
                  <ui-select
                    :model-value="field.value"
                    @update:model-value="setValue"
                  >
                    <ui-select-trigger>
                      <ui-select-value placeholder="Выберите тип даты" />
                    </ui-select-trigger>
                    <ui-select-content>
                      <ui-select-item
                        v-for="option in shootingDateTypeOptions"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </ui-select-item>
                    </ui-select-content>
                  </ui-select>
                  <ui-field-error v-if="errors.length" :errors="errors" />
                </ui-field>
              </VeeField>

              <!-- <base-date-picker
                v-if="dateTypeField.value === 'specific'"
                name="shooting_date"
                label="Дата съемки"
                placeholder="Выберите дату"
                v-model="birthDate"
              /> -->

              <VeeField name="location_name" v-slot="{ field }">
                <ui-field>
                  <ui-field-label>Название места</ui-field-label>
                  <ui-input
                    v-bind="field"
                    placeholder="Например: Студия на Немиге"
                  />
                </ui-field>
              </VeeField>
            </template>
          </ui-card-content>
        </ui-card>

        <ui-card>
          <ui-card-header>
            <ui-card-title>Дополнительная информация</ui-card-title>
          </ui-card-header>
          <ui-card-content class="space-y-4">
            <div v-if="isLoadingOptions" class="space-y-4">
              <div class="space-y-2">
                <ui-skeleton class="h-4 w-36" />
                <ui-skeleton class="h-9 w-full" />
              </div>
              <div class="space-y-2">
                <ui-skeleton class="h-4 w-48" />
                <ui-skeleton class="h-9 w-full" />
              </div>
            </div>
            
            <template v-else>
              <VeeField name="gender_preference" v-slot="{ field, setValue }">
                <ui-field>
                  <ui-field-label>Предпочтение по полу</ui-field-label>
                  <ui-select
                    :model-value="field.value"
                    @update:model-value="setValue"
                  >
                    <ui-select-trigger>
                      <ui-select-value placeholder="Выберите предпочтение" />
                    </ui-select-trigger>
                    <ui-select-content>
                      <ui-select-item value="none">Не указано</ui-select-item>
                      <ui-select-item
                        v-for="option in genderPreferenceOptions"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </ui-select-item>
                    </ui-select-content>
                  </ui-select>
                </ui-field>
              </VeeField>

              <base-tags-input
                name="additional_requirements"
                label="Дополнительные требования"
                placeholder="Введите требование и нажмите Enter"
              />
            </template>
          </ui-card-content>
        </ui-card>

        <ui-card>
          <ui-card-header>
            <ui-card-title>Изображения (референсы)</ui-card-title>
            <ui-card-description>
              Загрузите изображения для примера (макс. 5МБ на файл)
            </ui-card-description>
          </ui-card-header>
          <ui-card-content class="space-y-4">
            <input
              ref="imageInput"
              type="file"
              accept="image/*"
              multiple
              @change="handleImageSelect"
              class="hidden"
            />

            <ui-button
              type="button"
              variant="outline"
              @click="imageInput?.click()"
              :disabled="isSubmitting"
              class="w-full"
            >
              <Upload class="h-4 w-4 mr-2" />
              Выбрать изображения
            </ui-button>

            <div v-if="previewImageUrls.length > 0" class="space-y-4">
              <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <chevron-left class="w-4 h-4" />
                <span>Листайте свайпом</span>
                <chevron-right class="w-4 h-4" />
              </div>

              <ui-carousel
                class="w-full"
                :opts="{ align: 'start' }"
              >
                <ui-carousel-content>
                  <ui-carousel-item
                    v-for="(url, index) in previewImageUrls"
                    :key="index"
                    class="basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <div class="p-2 relative group">
                      <div class="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                        <img
                          :src="url"
                          :alt="`Preview ${index + 1}`"
                          class="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          @click="removeImage(index)"
                          class="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <x class="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </ui-carousel-item>
                </ui-carousel-content>
              </ui-carousel>
            </div>
          </ui-card-content>
        </ui-card>

        <div class="flex gap-4 justify-end">
          <ui-button 
            type="button"
            variant="outline" 
            @click="router.push('/offer')"
            :disabled="isLoadingOptions || isSubmitting"
          >
            Отмена
          </ui-button>
          <base-processing-button
            type="submit"
            label="Создать"
            :is-processing="isLoadingOptions || isSubmitting"
          />
        </div>
      </form>
    </div>
  </div>
</template>

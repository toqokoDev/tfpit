<script lang="ts" setup>
import { toast } from 'vue-sonner';
import { useForm } from 'vee-validate';
import { CalendarDate, parseDate } from '@internationalized/date';
import { toTypedSchema } from '@vee-validate/zod';
import { X, Upload, ChevronLeft, ChevronRight } from 'lucide-vue-next';

interface SelectOption {
  value: string;
  label: string;
}

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient<Database>();
const currentUserStore = useCurrentUserStore();
const currentUser = computed(() => currentUserStore.getUser());
const shootingDate = ref<CalendarDate | null>(null);

const announcementId = route.params.id as string;

const { handleSubmit, values, setValues } = useForm({
  validationSchema: toTypedSchema(announcementCreateSchema),
  keepValuesOnUnmount: true,
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
const imageInput = ref<HTMLInputElement | null>(null);
const imageFiles = ref<Array<{ url: string; file?: File }>>([]);
const existingImageUrls = ref<string[]>([]);
const isSubmitting = ref(false);
const isLoadingOptions = ref(true);
const isLoadingAnnouncement = ref(true);

onMounted(async () => {
  await Promise.all([
    loadFilterOptions(),
    loadAnnouncement()
  ]);
});

async function loadFilterOptions() {
  try {
    isLoadingOptions.value = true;
    
    const { data: rolesData } = await supabase
      .from('roles')
      .select('id, title')
      .order('title');
    
    if (rolesData) {
      roles.value = rolesData.map((role) => {
        return {
          value: role.id,
          label: role.title
        }
      });
    }

    const { data: genresData } = await supabase
      .from('shooting_genres')
      .select('id, title')
      .order('title');
    
    if (genresData) {
      genres.value = genresData.map((genre) => {
        return {
          value: genre.id,
          label: genre.title
        }
      });
    }
  } catch (error) {
    toast.error('Ошибка загрузки данных');
    console.error('Ошибка загрузки данных:', error);
  } finally {
    isLoadingOptions.value = false;
  }
}

async function loadAnnouncement() {
  try {
    isLoadingAnnouncement.value = true;

    const { data: announcementData, error } = await supabase
      .from('announcements')
      .select(`
        id,
        user_id,
        title,
        description,
        city,
        status,
        experience_level,
        shooting_date,
        shooting_date_type,
        location_name,
        gender_preference,
        additional_requirements,
        references_urls,
        role_id,
        shooting_genre_id
      `)
      .eq('id', announcementId)
      .single();

    if (error || !announcementData) {
      throw new Error('Объявление не найдено');
    }

    if (announcementData.user_id !== currentUser.value.id) {
      toast.error('У вас нет прав для редактирования этого объявления');
      router.push(`/offer/${announcementId}`);
      return;
    }

    if (announcementData.references_urls) {
      const imageUrls = typeof announcementData.references_urls === 'string'
        ? announcementData.references_urls.split(';').filter(url => url.trim())
        : Array.isArray(announcementData.references_urls)
        ? announcementData.references_urls
        : [];

      existingImageUrls.value = imageUrls;
      imageFiles.value = imageUrls.map(url => ({ url }));
    }

    const additionalReqs = announcementData.additional_requirements
      ? (typeof announcementData.additional_requirements === 'string'
        ? announcementData.additional_requirements.split(';').filter(req => req.trim())
        : Array.isArray(announcementData.additional_requirements)
        ? announcementData.additional_requirements
        : [])
      : [];

    shootingDate.value = parseDate(announcementData.shooting_date || '');
    
    setValues({
      title: announcementData.title || '',
      description: announcementData.description || '',
      city: announcementData.city || '',
      role_id: announcementData.role_id || '',
      shooting_genre_id: announcementData.shooting_genre_id || '',
      experience_level: announcementData.experience_level || '',
      shooting_date_type: announcementData.shooting_date_type || '',
      shooting_date: announcementData.shooting_date || '',
      location_name: announcementData.location_name || '',
      gender_preference: announcementData.gender_preference || '',
      additional_requirements: additionalReqs,
    });
  } catch (error: any) {
    toast.error(error.message || 'Ошибка при загрузке объявления');
    router.push('/offer');
  } finally {
    isLoadingAnnouncement.value = false;
  }
}

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

  validFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        imageFiles.value.push({
          url: e.target.result as string,
          file: file
        });
      }
    };
    reader.readAsDataURL(file);
  });

  if (imageInput.value) {
    imageInput.value.value = '';
  }
};

const removeImage = (url: string) => {
  const index = imageFiles.value.findIndex(item => item.url === url);
  if (index !== -1) {
    imageFiles.value.splice(index, 1);
  }
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

    if (imageFiles.value.length === 0) {
      toast.error('Пожалуйста, загрузите хотя бы одно изображение');
      isSubmitting.value = false;
      return;
    }

    let imageUrls: string[] = [];
    
    // Обрабатываем существующие изображения (без file) и новые (с file)
    for (const item of imageFiles.value) {
      if (item.file) {
        // Новое изображение - загружаем
        const url = await uploadImageToStorage(item.file, currentUser.value.id);
        imageUrls.push(url);
      } else {
        // Существующее изображение - просто используем URL
        imageUrls.push(item.url);
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
    };

    if (values.shooting_genre_id) announcementData.shooting_genre_id = values.shooting_genre_id;
    if (values.experience_level) announcementData.experience_level = values.experience_level;
    if (formattedShootingDate) announcementData.shooting_date = formattedShootingDate;
    if (values.location_name) announcementData.location_name = values.location_name;
    if (values.gender_preference) announcementData.gender_preference = values.gender_preference;
    if (values.additional_requirements && values.additional_requirements.length > 0) {
      announcementData.additional_requirements = values.additional_requirements.join(';');
    }
    announcementData.references_urls = imageUrls.join(';');

    const { data, error } = await supabase
      .from('announcements')
      .update(announcementData)
      .eq('id', announcementId)
      .select()
      .single();

    if (error) throw error;

    toast.success('Объявление успешно обновлено');
    router.push(`/offer/${announcementId}`);
  } catch (error: any) {
    console.error('Ошибка обновления объявления:', error);
    toast.error(error.message || 'Ошибка обновления объявления');
  } finally {
    isSubmitting.value = false;
  }
});

const experienceLevelOptions = [
  { label: 'Начинающий', value: 'beginner' },
  { label: 'Любитель', value: 'intermediate' },
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

useHead({ title: 'Редактировать объявление' });
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <div class="flex items-center gap-4 mb-6">
        <ui-button variant="ghost" size="icon" @click="router.back()">
          <chevron-left class="h-4 w-4" />
        </ui-button>
        <h1 class="text-3xl font-bold">Редактировать объявление</h1>
      </div>

      <div v-if="isLoadingAnnouncement" class="flex items-center justify-center min-h-[60vh]">
        <ui-spinner size="lg" />
      </div>

      <form v-else @submit.prevent="onSubmit" class="space-y-6">
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
              <base-input 
                name="title"
                type="text"
                label="Название объявления *"
                placeholder="Например: Съемка в стиле Vogue"
              />

              <base-textarea
                name="description"
                label="Описание *"
                placeholder="Опишите детали вашего объявления..."
                errors-to-show="all"
              />

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <base-input 
                  name="city"
                  type="text"
                  label="Город *"
                  placeholder="Минск"
                />

                <base-select
                  name="role_id"
                  label="Роль *"
                  placeholder="Выберите роль"
                  :options="roles"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <base-select
                  name="shooting_genre_id"
                  label="Жанр съемки"
                  placeholder="Выберите жанр"
                  :options="genres"
                />

                <base-select
                  name="experience_level"
                  label="Уровень опыта"
                  placeholder="Выберите уровень"
                  :options="experienceLevelOptions"
                />
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
              <base-select
                name="shooting_date_type"
                label="Тип даты *"
                placeholder="Выберите тип даты"
                :options="shootingDateTypeOptions"
              />

              <base-date-picker
                v-if="values.shooting_date_type === 'specific'"
                name="shooting_date"
                label="Дата съемки"
                placeholder="Выберите дату"
                v-model="shootingDate"
              />

              <base-input 
                name="location_name"
                type="text"
                label="Название места"
                placeholder="Например: Студия на Немиге"
              />
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
              <base-select
                name="gender_preference"
                label="Предпочтение по полу"
                placeholder="Выберите предпочтение"
                :options="genderPreferenceOptions"
              />

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

            <div v-if="imageFiles.length > 0" class="space-y-4">
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
                    v-for="(item, index) in imageFiles"
                    :key="item.url"
                    class="basis-full md:basis-1/2 lg:basis-1/3"
                  >
                    <div class="p-2 relative group">
                      <div class="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                        <img
                          :src="item.url"
                          :alt="`Preview ${index + 1}`"
                          class="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          @click="removeImage(item.url)"
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
            @click="router.push(`/offer/${announcementId}`)"
            :disabled="isLoadingOptions || isSubmitting || isLoadingAnnouncement"
          >
            Отмена
          </ui-button>
          <base-processing-button
            type="submit"
            label="Сохранить"
            :is-processing="isLoadingOptions || isSubmitting || isLoadingAnnouncement"
          />
        </div>
      </form>
    </div>
  </div>
</template>

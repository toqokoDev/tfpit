<script lang="ts" setup>
import { MapPin, Briefcase, Film, Clock, Eye, MessageSquare, ArrowLeft, Calendar, User, Building2, ChevronLeft, ChevronRight, Send, Share2 } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

interface AnnouncementData {
  id: string;
  title: string;
  description: string;
  city: string;
  status: string | null;
  experience_level: string | null;
  responses_count: number | null;
  views_count: number | null;
  created_at: string | null;
  shooting_date: string | null;
  shooting_date_type: string;
  location_name: string | null;
  gender_preference: string | null;
  additional_requirements: string | null;
  references_urls: string | string[] | null;
  role_id: string;
  shooting_genre_id: string | null;
  user_id: string;
  role?: { id: string; title: string } | null;
  shooting_genre?: { id: string; title: string } | null;
  user?: { id: string; first_name: string; last_name: string; avatar_url: string | null; role: { title: string } | null; experience_level: number | null } | null;
}

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient<Database>();
const announcementId = route.params.id as string;

const announcement = ref<AnnouncementData | null>(null);
const isLoading = ref(true);
const selectedImageIndex = ref<number | null>(null);
const isImageDialogOpen = ref(false);

const imageUrls = computed(() => {
  if (!announcement.value?.references_urls) return [];
  if (typeof announcement.value.references_urls === 'string') {
    return announcement.value.references_urls.split(';').filter(url => url.trim());
  }
  return Array.isArray(announcement.value.references_urls) 
    ? announcement.value.references_urls 
    : [];
});

async function loadAnnouncement() {
  try {
    isLoading.value = true;
    
    const { data: announcementData, error: announcementError } = await supabase
      .from('announcements')
      .select(`
        id,
        title,
        description,
        city,
        status,
        experience_level,
        responses_count,
        views_count,
        created_at,
        shooting_date,
        shooting_date_type,
        location_name,
        gender_preference,
        additional_requirements,
        references_urls,
        role_id,
        shooting_genre_id,
        user_id
      `)
      .eq('id', announcementId)
      .single();
    
    if (announcementError || !announcementData) {
      throw new Error('Объявление не найдено');
    }

    const roleId = announcementData.role_id;
    const genreId = announcementData.shooting_genre_id;
    const userId = announcementData.user_id;

    const [roleResult, genreResult, userResult] = await Promise.all([
      roleId ? supabase.from('roles').select('id, title').eq('id', roleId).single() : Promise.resolve({ data: null }),
      genreId ? supabase.from('shooting_genres').select('id, title').eq('id', genreId).single() : Promise.resolve({ data: null }),
      supabase.from('users').select('id, first_name, last_name, avatar_url, experience_level, role:role(title)').eq('id', userId).single()
    ]);

    announcement.value = {
      ...announcementData,
      references_urls: announcementData.references_urls as string | null,
      role: roleResult.data || null,
      shooting_genre: genreResult.data || null,
      user: userResult.data || null,
    };
    
    await supabase
      .from('announcements')
      .update({ views_count: (announcementData.views_count || 0) + 1 })
      .eq('id', announcementId);
    
  } catch (error: any) {
    toast.error(error.message || 'Ошибка при загрузке объявления');
    await router.push('/offer');
  } finally {
    isLoading.value = false;
  }
}

function formatDate(dateString: string | null) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getExperienceLevelText(level: string | null) {
  if (!level || level === 'none') return 'Не указан';
  const levelMap: Record<string, string> = {
    'beginner': 'Начинающий',
    'intermediate': 'Любитель',
    'advanced': 'Опытный',
    'professional': 'Профессионал'
  };
  return levelMap[level] || level;
}

function getGenderPreferenceText(pref: string | null) {
  if (!pref || pref === 'none') return 'Не указано';
  const prefMap: Record<string, string> = {
    'any': 'Любой',
    'men': 'Мужской',
    'women': 'Женский'
  };
  return prefMap[pref] || pref;
}

function getShootingDateTypeText(type: string) {
  const typeMap: Record<string, string> = {
    'specific': 'Конкретная дата',
    'flexible': 'Гибкая дата'
  };
  return typeMap[type] || type;
}

function getExperienceLevel(level: number | null) {
  const getYearsText = (years: number) => {
    const lastDigit = years % 10;
    const lastTwoDigits = years % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${years} лет`;
    if (lastDigit === 1) return `${years} год`;
    if (lastDigit >= 2 && lastDigit <= 4) return `${years} года`;
    return `${years} лет`;
  };

  if (level === null || level === undefined) return 'Не указан';
  if (level === 0) return 'Нет опыта';
  if (level < 2) return `Начинающий (${getYearsText(level)})`;
  if (level < 5) return `Начинающий (${getYearsText(level)})`;
  if (level < 8) return `Любитель (${getYearsText(level)})`;
  if (level < 12) return `Опытный (${getYearsText(level)})`;
  return `Профессионал (${getYearsText(level)})`;
}

async function shareAnnouncement() {
  const fullUrl = window.location.href;
  await navigator.clipboard.writeText(fullUrl);
  toast.success('Ссылка скопирована в буфер обмена');
}

function openImageDialog(index: number) {
  selectedImageIndex.value = index;
  isImageDialogOpen.value = true;
}

function closeImageDialog() {
  isImageDialogOpen.value = false;
  selectedImageIndex.value = null;
}

onMounted(async () => {
  await loadAnnouncement();
});

watch(announcement, (newAnnouncement) => {
  if (newAnnouncement) {
    useHead({ 
      title: `${newAnnouncement.title} - Объявление`,
      meta: [
        {
          name: 'description',
          content: newAnnouncement.description || 'Просмотр объявления',
        },
      ],
    });
  }
}, { immediate: true });

useHead({ 
  title: 'Объявление',
  meta: [
    {
      name: 'description',
      content: 'Просмотр объявления',
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="container mx-auto px-4 py-8">
      <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
        <ui-spinner size="lg" />
      </div>

      <div v-else-if="!announcement" class="flex flex-col items-center justify-center min-h-[60vh]">
        <div class="text-center">
          <p class="text-muted-foreground mb-4 text-lg">Объявление не найдено</p>
          <ui-button @click="router.back()">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Вернуться к списку
          </ui-button>
        </div>
      </div>

      <div v-else class="max-w-7xl mx-auto">
        <div class="mb-6 flex items-center justify-between">
          <ui-button variant="ghost" @click="router.back()">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Назад
          </ui-button>
          
          <div class="flex items-center gap-2">
            <ui-button @click="shareAnnouncement" size="icon" variant="outline">
              <share2 class="w-4 h-4" />
            </ui-button>
          </div>
        </div>

        <div class="space-y-6">
          <div v-if="announcement.user" class="flex items-center justify-between gap-4 pb-4 border-b">
            <NuxtLink 
              :to="`/profile/user/${announcement.user.id}`"
              class="flex items-center gap-4 hover:opacity-80 transition-opacity flex-1"
            >
              <div v-if="announcement.user.avatar_url" class="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  :src="announcement.user.avatar_url" 
                  :alt="`${announcement.user.first_name} ${announcement.user.last_name}`" 
                  class="w-full h-full object-cover" 
                />
              </div>
              <div v-else class="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User class="w-8 h-8" />
              </div>
              <div>
                <p class="font-medium text-lg">{{ announcement.user.first_name }} {{ announcement.user.last_name }}</p>
                <p v-if="announcement.user.role || announcement.user.experience_level !== null" class="text-sm text-muted-foreground mt-1">
                  <span v-if="announcement.user.role">{{ announcement.user.role.title }}</span>
                  <span v-if="announcement.user.role && announcement.user.experience_level !== null"> • </span>
                  <span v-if="announcement.user.experience_level !== null">{{ getExperienceLevel(announcement.user.experience_level) }}</span>
                </p>
              </div>
            </NuxtLink>
            <NuxtLink :to="`/profile/user/${announcement.user.id}`" class="flex-shrink-0">
              <ui-button class="gap-2">
                <MessageSquare class="w-4 h-4" />
                Связаться
              </ui-button>
            </NuxtLink>
          </div>

          <div>
            <h1 class="text-3xl font-bold mb-4">{{ announcement.title }}</h1>
            <p class="text-foreground whitespace-pre-wrap text-muted-foreground">{{ announcement.description }}</p>
          </div>

          <div v-if="imageUrls.length > 0" class="space-y-3">
            <h2 class="text-lg font-semibold">Референсы</h2>
            <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
              <ChevronLeft class="w-4 h-4" />
              <span>Листайте свайпом</span>
              <ChevronRight class="w-4 h-4" />
            </div>
            <ui-carousel 
              class="relative w-full"
              :opts="{ align: 'start' }"
            >
              <ui-carousel-content>
                <ui-carousel-item 
                  v-for="(img, index) in imageUrls"
                  :key="index"
                  class="basis-full md:basis-1/3"
                >
                  <div class="p-1">
                    <div
                      class="cursor-pointer hover:opacity-90 transition-opacity rounded-lg overflow-hidden"
                      @click="openImageDialog(index)"
                    >
                      <img
                        :src="img"
                        :alt="`${announcement.title} - ${index + 1}`"
                        class="w-full h-full rounded-lg object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </ui-carousel-item>
              </ui-carousel-content>
            </ui-carousel>
          </div>

          <ui-card>
            <ui-card-header>
              <ui-card-title>Основная информация</ui-card-title>
            </ui-card-header>
            <ui-card-content class="space-y-4">
              <div class="flex flex-col gap-3">
                <div v-if="announcement.role" class="flex items-center gap-2">
                  <span class="text-sm text-muted-foreground">Ищу:</span>
                  <span class="text-sm font-medium">{{ announcement.role.title }}</span>
                </div>
                <div v-if="announcement.shooting_genre" class="flex items-center gap-2">
                  <span class="text-sm text-muted-foreground">Жанр:</span>
                  <span class="text-sm font-medium">{{ announcement.shooting_genre.title }}</span>
                </div>
              </div>

              <div class="flex flex-col gap-3 text-muted-foreground pt-2 border-t">
                <div v-if="announcement.city" class="flex items-center gap-2">
                  <MapPin class="h-4 w-4" />
                  {{ announcement.city }}
                </div>
                <div v-if="announcement.shooting_date" class="flex items-center gap-2">
                  <Calendar class="h-4 w-4" />
                  {{ formatDate(announcement.shooting_date) }}
                </div>
                <div v-if="announcement.location_name" class="flex items-center gap-2">
                  <Building2 class="h-4 w-4" />
                  {{ announcement.location_name }}
                </div>
              </div>
            </ui-card-content>
          </ui-card>

          <ui-card>
            <ui-card-header>
              <ui-card-title>Детали</ui-card-title>
            </ui-card-header>
            <ui-card-content class="space-y-3">
              <div class="grid grid-cols-1 gap-3">
                <div>
                  <span class="text-sm text-muted-foreground">Тип даты: </span>
                  <span class="font-medium">{{ getShootingDateTypeText(announcement.shooting_date_type) }}</span>
                </div>
                <div>
                  <span class="text-sm text-muted-foreground">Уровень опыта: </span>
                  <span class="font-medium">{{ getExperienceLevelText(announcement.experience_level) }}</span>
                </div>
                <div>
                  <span class="text-sm text-muted-foreground">Предпочтение по полу: </span>
                  <span class="font-medium">{{ getGenderPreferenceText(announcement.gender_preference) }}</span>
                </div>
              </div>

              <div v-if="announcement.additional_requirements && announcement.additional_requirements.length > 0" class="pt-4 border-t">
                <p class="text-sm text-muted-foreground mb-2">Дополнительные требования:</p>
                <div class="flex flex-wrap gap-2">
                  <ui-badge 
                    v-for="(req, index) in announcement.additional_requirements.split(';')" 
                    :key="index"
                    variant="secondary"
                  >
                    {{ req }}
                  </ui-badge>
                </div>
              </div>
            </ui-card-content>
          </ui-card>
        </div>
      </div>

      <ui-dialog :open="isImageDialogOpen" @update:open="(open) => { if (!open) closeImageDialog(); else isImageDialogOpen = open; }">
        <ui-dialog-content class="sm:max-w-4xl p-0 bg-transparent border-none">
          <div v-if="selectedImageIndex !== null && imageUrls[selectedImageIndex]" class="relative">
            <img
              :src="imageUrls[selectedImageIndex]"
              :alt="`${announcement!.title} - ${selectedImageIndex + 1}`"
              class="max-h-[90vh] w-auto mx-auto rounded-lg"
            />
          </div>
        </ui-dialog-content>
      </ui-dialog>
    </div>
  </div>
</template>

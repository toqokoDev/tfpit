<script lang="ts" setup>
import { MapPin, Briefcase, Film, Clock, Eye, MessageSquare, ArrowLeft, Calendar, User, Building2, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

interface AnnouncementData {
  id: string;
  title: string;
  description: string;
  city: string;
  status: string;
  experience_level: string | null;
  responses_count: number | null;
  views_count: number | null;
  created_at: string | null;
  shooting_date: string | null;
  shooting_date_type: string;
  location_name: string | null;
  gender_preference: string | null;
  additional_requirements: string[] | null;
  references_urls: string | null;
  role_id: string;
  shooting_genre_id: string | null;
  user_id: string;
  role?: { id: string; title: string } | null;
  shooting_genre?: { id: string; title: string } | null;
  user?: { id: string; first_name: string; last_name: string; avatar_url: string | null } | null;
}

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient<Database>();
const announcementId = route.params.id as string;

const announcement = ref<AnnouncementData | null>(null);
const isLoading = ref(true);

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
      supabase.from('users').select('id, first_name, last_name, avatar_url').eq('id', userId).single()
    ]);

    announcement.value = {
      ...announcementData,
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
  if (!level) return 'Не указан';
  const levelMap: Record<string, string> = {
    'beginner': 'Начинающий',
    'intermediate': 'Средний',
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

async function shareAnnouncement() {
  const fullUrl = window.location.href;
  await navigator.clipboard.writeText(fullUrl);
  toast.success('Ссылка скопирована в буфер обмена');
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
          <ui-button @click="router.push('/offer')">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Вернуться к списку
          </ui-button>
        </div>
      </div>

      <div v-else class="max-w-4xl mx-auto">
        <div class="mb-6 flex items-center justify-between">
          <ui-button variant="ghost" @click="router.back()">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Назад
          </ui-button>
          
          <ui-button @click="shareAnnouncement" size="icon" variant="outline">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </ui-button>
        </div>

        <div class="space-y-6">
          <div>
            <h1 class="text-3xl font-bold mb-4">{{ announcement.title }}</h1>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <ui-badge v-if="announcement.role" variant="outline" class="gap-1">
                <Briefcase class="h-3 w-3" />
                {{ announcement.role.title }}
              </ui-badge>
              <ui-badge v-if="announcement.shooting_genre" variant="outline" class="gap-1">
                <Film class="h-3 w-3" />
                {{ announcement.shooting_genre.title }}
              </ui-badge>
            </div>

            <div class="flex flex-col gap-2 text-muted-foreground mb-6">
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
          </div>

          <div v-if="imageUrls.length > 0" class="space-y-4">
            <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ChevronLeft class="w-4 h-4" />
              <span>Листайте свайпом</span>
              <ChevronRight class="w-4 h-4" />
            </div>

            <ui-carousel 
              class="relative w-full"
              :opts="{ align: 'center' }"
            >
              <ui-carousel-content>
                <ui-carousel-item 
                  v-for="(img, index) in imageUrls" 
                  :key="index" 
                  class="basis-full"
                >
                  <div class="p-1 flex justify-center">
                    <img
                      :src="img"
                      :alt="`${announcement.title} - ${index + 1}`"
                      class="h-auto object-contain rounded-lg transition-opacity duration-300 max-w-full"
                      loading="lazy"
                    />
                  </div>
                </ui-carousel-item>
              </ui-carousel-content>
            </ui-carousel>
          </div>

          <ui-card>
            <ui-card-header>
              <ui-card-title>Описание</ui-card-title>
            </ui-card-header>
            <ui-card-content>
              <p class="text-foreground whitespace-pre-wrap">{{ announcement.description }}</p>
            </ui-card-content>
          </ui-card>

          <ui-card>
            <ui-card-header>
              <ui-card-title>Детали</ui-card-title>
            </ui-card-header>
            <ui-card-content class="space-y-3">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    v-for="(req, index) in announcement.additional_requirements" 
                    :key="index"
                    variant="secondary"
                  >
                    {{ req }}
                  </ui-badge>
                </div>
              </div>
            </ui-card-content>
          </ui-card>

          <div v-if="announcement.user" class="flex items-center gap-4 pb-4 border-b">
            <NuxtLink 
              :to="`/profile/user/${announcement.user.id}`"
              class="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <div v-if="announcement.user.avatar_url" class="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  :src="announcement.user.avatar_url" 
                  :alt="`${announcement.user.first_name} ${announcement.user.last_name}`" 
                  class="w-full h-full object-cover" 
                />
              </div>
              <div v-else class="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User class="w-6 h-6" />
              </div>
              <div>
                <p class="font-medium">{{ announcement.user.first_name }} {{ announcement.user.last_name }}</p>
                <p class="text-sm text-muted-foreground">Автор объявления</p>
              </div>
            </NuxtLink>
          </div>

          <div class="flex flex-wrap gap-4 text-sm text-muted-foreground pt-4 border-t">
            <div class="flex items-center gap-2">
              <Eye class="w-4 h-4" />
              <span>{{ announcement.views_count || 0 }} просмотров</span>
            </div>
            <div class="flex items-center gap-2">
              <MessageSquare class="w-4 h-4" />
              <span>{{ announcement.responses_count || 0 }} откликов</span>
            </div>
            <div class="text-sm text-muted-foreground">
              <span>Создано: {{ formatDate(announcement.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

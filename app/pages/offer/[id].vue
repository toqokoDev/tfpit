<script lang="ts" setup>
import { MapPin, Eye, Heart, ArrowLeft, Calendar, Building2, ChevronLeft, ChevronRight, Share2, MessageCircle } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

interface AnnouncementData {
  id: string;
  title: string;
  description: string;
  city: string;
  status: string | null;
  experience_level: string | null;
  responses_count: number | null;
  likes_count: number | null;
  views_count: number | null;
  created_at: string | null;
  shooting_date: string | null;
  shooting_date_type: string;
  location_name: string | null;
  gender_preference: string | null;
  additional_requirements: string | null;
  references_urls: string | string[] | null;
  shooting_genre_id: string | null;
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
const currentUserId = ref<string | null>(null);
const existingChatId = ref<string | null>(null);
const isResponseDialogOpen = ref(false);
const isSubmittingResponse = ref(false);
const responseMessage = ref('');

const {
  likesCount,
  hasLiked,
  isLikeLoading,
  toggleLike,
} = useContentLike('announcement', announcementId, computed(() => announcement.value?.likes_count || 0));

const imageUrls = computed(() => {
  if (!announcement.value?.references_urls) return [];
  if (typeof announcement.value.references_urls === 'string') {
    return announcement.value.references_urls.split(';').filter(url => url.trim());
  }
  return Array.isArray(announcement.value.references_urls) 
    ? announcement.value.references_urls 
    : [];
});

const isOwnAnnouncement = computed(() => {
  return Boolean(currentUserId.value && announcement.value?.user?.id === currentUserId.value);
});

const canRespond = computed(() => {
  return Boolean(announcement.value?.user?.id && !isOwnAnnouncement.value);
});

const responseButtonLabel = computed(() => {
  if (!currentUserId.value) return 'Войти и откликнуться';
  if (existingChatId.value) return 'Открыть чат';
  return 'Откликнуться';
});

async function loadAnnouncement() {
  try {
    isLoading.value = true;
    const { data: authData } = await supabase.auth.getUser();
    currentUserId.value = authData.user?.id || null;
    
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
        likes_count,
        views_count,
        created_at,
        shooting_date,
        shooting_date_type,
        location_name,
        gender_preference,
        additional_requirements,
        references_urls,
        shooting_genre_id,
        role:role(id, title),
        user:users(id, first_name, last_name, avatar_url, experience_level, role:role(title))
      `)
      .eq('id', announcementId)
      .single();
    
    if (announcementError || !announcementData) {
      throw new Error('Объявление не найдено');
    }

    const genreId = announcementData.shooting_genre_id;

    const genreResult = genreId
      ? await supabase.from('shooting_genres').select('id, title').eq('id', genreId).single()
      : { data: null };

    announcement.value = {
      ...announcementData,
      references_urls: announcementData.references_urls as string | null,
      shooting_genre: genreResult.data || null,
    };

    if (currentUserId.value && announcementData.user?.id !== currentUserId.value) {
      await loadExistingChat();
    }
    
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

async function loadExistingChat() {
  if (!currentUserId.value) return;

  const { data, error } = await supabase
    .from('announcement_chats')
    .select('id')
    .eq('announcement_id', announcementId)
    .eq('applicant_id', currentUserId.value)
    .maybeSingle();

  if (error) {
    console.error('Ошибка проверки отклика:', error);
    return;
  }

  existingChatId.value = data?.id || null;
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

function getAuthorSubtitle(user: AnnouncementData['user']) {
  if (!user) return null;

  const parts = [];
  if (user.role) parts.push(user.role.title);
  if (user.experience_level !== null) parts.push(getExperienceLevel(user.experience_level));

  return parts.join(' • ');
}

async function shareAnnouncement() {
  const fullUrl = window.location.href;
  await navigator.clipboard.writeText(fullUrl);
  toast.success('Ссылка скопирована в буфер обмена');
}

async function handleResponseClick() {
  if (!currentUserId.value) {
    await navigateTo(`/auth/login?redirect=/offer/${announcementId}`);
    return;
  }

  if (existingChatId.value) {
    await navigateTo(`/profile/chats/${existingChatId.value}`);
    return;
  }

  isResponseDialogOpen.value = true;
}

async function submitResponse() {
  if (!announcement.value?.user?.id || !currentUserId.value) return;

  const message = responseMessage.value.trim() || 'Здравствуйте! Хочу откликнуться на ваше объявление.';

  try {
    isSubmittingResponse.value = true;

    const { data, error } = await supabase
      .from('announcement_chats')
      .insert({
        announcement_id: announcementId,
        owner_id: announcement.value.user.id,
        applicant_id: currentUserId.value,
        initial_message: message,
      })
      .select('id')
      .single();

    if (error) throw error;

    existingChatId.value = data.id;
    responseMessage.value = '';
    isResponseDialogOpen.value = false;
    toast.success('Отклик отправлен');
    await navigateTo(`/profile/chats/${data.id}`);
  } catch (error: any) {
    if (error.code === '23505') {
      await loadExistingChat();
      toast.info('Вы уже откликались на это объявление');
      if (existingChatId.value) await navigateTo(`/profile/chats/${existingChatId.value}`);
      return;
    }

    toast.error(error.message || 'Не удалось отправить отклик');
  } finally {
    isSubmittingResponse.value = false;
  }
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
    <div class="container mx-auto px-4 py-6 md:py-10">
      <div v-if="isLoading" class="flex min-h-[60vh] items-center justify-center">
        <ui-spinner size="lg" />
      </div>

      <div v-else-if="!announcement" class="flex min-h-[60vh] flex-col items-center justify-center">
        <div class="rounded-3xl border bg-card p-8 text-center shadow-sm">
          <p class="mb-4 text-lg text-muted-foreground">Объявление не найдено</p>
          <ui-button @click="router.back()">
            <ArrowLeft class="mr-2 h-4 w-4" />
            Вернуться к списку
          </ui-button>
        </div>
      </div>

      <div v-else class="mx-auto max-w-6xl">
        <div class="mb-5 flex items-center justify-between">
          <ui-button variant="ghost" class="rounded-full" @click="router.back()">
            <ArrowLeft class="mr-2 h-4 w-4" />
            Назад
          </ui-button>

          <div class="flex items-center gap-2">
            <ui-button size="icon" variant="outline" class="rounded-full" @click="shareAnnouncement">
              <Share2 class="h-4 w-4" />
            </ui-button>
          </div>
        </div>

        <article class="overflow-hidden rounded-[2rem] border bg-card shadow-xl shadow-black/5 lg:grid lg:grid-cols-[minmax(0,1.35fr)_420px]">
          <div v-if="announcement.user" class="flex items-center justify-between border-b px-4 py-3 lg:hidden">
            <BaseAuthorLink
              :user="announcement.user"
              :subtitle="announcement.city || 'Объявление'"
              avatar-class="h-11 w-11"
            />
          </div>

          <section class="relative flex min-h-[420px] items-center justify-center bg-black lg:min-h-[720px]">
            <div v-if="imageUrls.length > 0" class="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-xs text-white backdrop-blur md:hidden">
              <ChevronLeft class="h-3.5 w-3.5" />
              <span>Листайте</span>
              <ChevronRight class="h-3.5 w-3.5" />
            </div>

            <ui-carousel v-if="imageUrls.length > 0" class="relative h-full w-full" :opts="{ align: 'center' }">
              <ui-carousel-content class="h-full">
                <ui-carousel-item v-for="(img, index) in imageUrls" :key="index" class="basis-full">
                  <button
                    type="button"
                    class="flex h-full min-h-[420px] w-full cursor-zoom-in items-center justify-center bg-black lg:min-h-[720px]"
                    @click="openImageDialog(index)"
                  >
                    <img
                      :src="img"
                      :alt="`${announcement.title} - ${index + 1}`"
                      class="h-full min-h-[420px] w-full object-cover lg:min-h-[720px]"
                      loading="lazy"
                    />
                  </button>
                </ui-carousel-item>
              </ui-carousel-content>
              <ui-carousel-previous class="hidden bg-background/90 shadow-md md:flex left-4 z-30" />
              <ui-carousel-next class="hidden bg-background/90 shadow-md md:flex right-4 z-30" />
            </ui-carousel>

            <div v-else class="flex h-full min-h-[420px] w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 px-8 text-center text-white lg:min-h-[720px]">
              <p class="mb-3 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">TFPIT</p>
              <h2 class="max-w-xl text-3xl font-bold md:text-5xl">{{ announcement.title }}</h2>
              <p class="mt-4 max-w-md text-sm text-white/60">Референсы не добавлены, но детали съемки уже доступны в описании.</p>
            </div>
          </section>

          <aside class="flex min-h-full flex-col">
            <div v-if="announcement.user" class="hidden items-center justify-between border-b px-5 py-4 lg:flex">
              <BaseAuthorLink
                :user="announcement.user"
                :subtitle="getAuthorSubtitle(announcement.user)"
              />
            </div>

            <div class="flex-1 space-y-6 px-5 py-5">
              <div>
                <div class="mb-3 flex flex-wrap gap-2">
                  <ui-badge v-if="announcement.role" variant="secondary" class="rounded-full">
                    Ищу: {{ announcement.role.title }}
                  </ui-badge>
                  <ui-badge v-if="announcement.shooting_genre" variant="secondary" class="rounded-full">
                    {{ announcement.shooting_genre.title }}
                  </ui-badge>
                </div>
                <h1 class="text-2xl font-bold leading-tight">{{ announcement.title }}</h1>
                <p class="mt-3 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{{ announcement.description }}</p>
              </div>

              <div class="grid gap-3 text-sm">
                <div v-if="announcement.city" class="flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3">
                  <MapPin class="h-4 w-4 text-pink-500" />
                  <span>{{ announcement.city }}</span>
                </div>
                <div v-if="announcement.shooting_date" class="flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3">
                  <Calendar class="h-4 w-4 text-purple-500" />
                  <span>{{ formatDate(announcement.shooting_date) }}</span>
                </div>
                <div v-if="announcement.location_name" class="flex items-center gap-3 rounded-2xl bg-muted/60 px-4 py-3">
                  <Building2 class="h-4 w-4 text-orange-500" />
                  <span>{{ announcement.location_name }}</span>
                </div>
              </div>

              <div class="grid gap-2 rounded-3xl border bg-background/80 p-4 text-sm">
                <div class="flex justify-between gap-4">
                  <span class="text-muted-foreground">Тип даты</span>
                  <span class="text-right font-medium">{{ getShootingDateTypeText(announcement.shooting_date_type) }}</span>
                </div>
                <div class="flex justify-between gap-4">
                  <span class="text-muted-foreground">Опыт</span>
                  <span class="text-right font-medium">{{ getExperienceLevelText(announcement.experience_level) }}</span>
                </div>
                <div class="flex justify-between gap-4">
                  <span class="text-muted-foreground">Пол</span>
                  <span class="text-right font-medium">{{ getGenderPreferenceText(announcement.gender_preference) }}</span>
                </div>
              </div>

              <div v-if="announcement.additional_requirements && announcement.additional_requirements.length > 0">
                <p class="mb-2 text-sm font-semibold">Дополнительные требования</p>
                <div class="flex flex-wrap gap-2">
                  <ui-badge
                    v-for="(req, index) in announcement.additional_requirements.split(';')"
                    :key="index"
                    variant="outline"
                    class="rounded-full"
                  >
                    {{ req }}
                  </ui-badge>
                </div>
              </div>
            </div>

            <footer class="border-t px-5 py-4">
              <div class="mb-3 flex flex-col gap-3">
                <ui-button
                  v-if="canRespond"
                  class="w-full rounded-full gap-2"
                  :disabled="isSubmittingResponse"
                  @click="handleResponseClick"
                >
                  <MessageCircle class="h-4 w-4" />
                  {{ responseButtonLabel }}
                </ui-button>
                <p v-else-if="isOwnAnnouncement" class="rounded-2xl bg-muted/70 px-4 py-3 text-center text-sm text-muted-foreground">
                  Это ваше объявление
                </p>
              </div>

              <div class="mb-3 flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <ui-button
                    variant="outline"
                    :disabled="isLikeLoading"
                    class="rounded-full gap-2"
                    :aria-label="hasLiked ? 'Убрать лайк' : 'Поставить лайк'"
                    @click="toggleLike"
                  >
                    <Heart
                      class="h-4 w-4"
                      :class="hasLiked ? 'text-rose-500' : ''"
                      :fill="hasLiked ? 'currentColor' : 'none'"
                    />
                    {{ likesCount }}
                  </ui-button>
                </div>
                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye class="h-4 w-4" />
                  <span>{{ announcement.views_count || 0 }}</span>
                </div>
              </div>
              <p v-if="announcement.created_at" class="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {{ formatDate(announcement.created_at) }}
              </p>
            </footer>
          </aside>
        </article>
      </div>

      <ui-dialog :open="isImageDialogOpen" @update:open="(open) => { if (!open) closeImageDialog(); else isImageDialogOpen = open; }">
        <ui-dialog-content class="sm:max-w-4xl border-none bg-transparent p-0">
          <div v-if="selectedImageIndex !== null && imageUrls[selectedImageIndex]" class="relative">
            <img
              :src="imageUrls[selectedImageIndex]"
              :alt="`${announcement!.title} - ${selectedImageIndex + 1}`"
              class="mx-auto max-h-[90vh] w-auto rounded-lg"
            />
          </div>
        </ui-dialog-content>
      </ui-dialog>

      <ui-dialog :open="isResponseDialogOpen" @update:open="isResponseDialogOpen = $event">
        <ui-dialog-content class="sm:max-w-md">
          <ui-dialog-header>
            <ui-dialog-title>Откликнуться на объявление</ui-dialog-title>
            <ui-dialog-description>
              Напишите короткое сообщение автору. Он сможет принять или отклонить отклик в чате.
            </ui-dialog-description>
          </ui-dialog-header>

          <div class="space-y-2 py-2">
            <ui-label for="response-message">Сообщение</ui-label>
            <ui-textarea
              id="response-message"
              v-model="responseMessage"
              placeholder="Здравствуйте! Мне интересно ваше объявление..."
              rows="5"
            />
          </div>

          <ui-dialog-footer>
            <ui-button
              variant="outline"
              :disabled="isSubmittingResponse"
              @click="isResponseDialogOpen = false"
            >
              Отмена
            </ui-button>
            <ui-button :disabled="isSubmittingResponse" @click="submitResponse">
              <ui-spinner v-if="isSubmittingResponse" size="sm" class="mr-2" />
              {{ isSubmittingResponse ? 'Отправка...' : 'Отправить отклик' }}
            </ui-button>
          </ui-dialog-footer>
        </ui-dialog-content>
      </ui-dialog>
    </div>
  </div>
</template>

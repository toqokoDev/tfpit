<script lang="ts" setup>
import { Star, BriefcaseBusiness, Link as LinkIcon, ChevronLeft, ChevronRight, Globe, Send, Instagram, MessageCircle } from 'lucide-vue-next';
import type { UserReview } from '../../../types/announcementChats';

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient<Database>();
const { fetchRoleProfileForUser } = useRoleProfileData();

const userId = computed(() => route.params.id as string);
const isLoading = ref(true);
const error = ref<string | null>(null);
const user = ref<any>(null);
const roleData = ref<Record<string, unknown> | null>(null);
const authUser = useSupabaseUser();
const portfolios = ref<PortfolioSchema[]>([]);
const isLoadingPortfolios = ref(false);
const reviews = ref<UserReview[]>([]);
const isLoadingReviews = ref(false);
const activeTab = ref('profile');
const selectedPortfolioImage = ref<{ portfolioId: string; imageIndex: number } | null>(null);

const initials = computed(() => {
  if (!user.value) return '?';
  const first = user.value.first_name?.[0] || '';
  const last = user.value.last_name?.[0] || '';
  return (first + last).toUpperCase() || '?';
});

const hasSocials = computed(() => {
  if (!user.value?.socials) return false;
  return !!(user.value.socials.instagram || user.value.socials.vk || 
            user.value.socials.telegram || user.value.socials.website);
});

const getExperienceLevel = (level: number) => {
  if (level < 3) return 'Начинающий';
  if (level >= 3 && level < 10) return 'Любитель';
  return 'Профессионал';
};

const getPortfolioImageZIndex = (portfolioId: string, imageIndex: number, imageCount: number) => {
  if (selectedPortfolioImage.value?.portfolioId !== portfolioId) {
    return imageCount - imageIndex;
  }

  return 10 - Math.abs(selectedPortfolioImage.value.imageIndex - imageIndex);
};

const fetchUser = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select(`
        email,
        first_name,
        last_name,
        phone,
        city,
        bio,
        rating,
        role:role(title),
        experience_level,
        cover_url,
        avatar_url,
        gender,
        birth_date,
        created_at
      `)
      .eq('id', userId.value)
      .maybeSingle();

    if (userError) throw userError;
    if (!userData) {
      error.value = 'Пользователь не найден';
      return;
    }

    const { data: socialsData, error: socialsError } = await supabase
      .from('socials')
      .select('vk, website, telegram, instagram')
      .eq('user_id', userId.value)
      .maybeSingle();

    if (socialsError) throw socialsError;

    user.value = {
      ...userData,
      socials: socialsData || {},
    };

    if (authUser.value) {
      roleData.value = await fetchRoleProfileForUser(
        userId.value,
        userData.role?.title,
      );
    } else {
      roleData.value = null;
    }

    useHead({
      title: `${user.value.first_name} ${user.value.last_name}`
    });
  } catch (err) {
    error.value = 'Ошибка при загрузке данных пользователя';
    console.error('Ошибка загрузки пользователя:', err);
  } finally {
    isLoading.value = false;
  }
};

const fetchReviews = async () => {
  try {
    isLoadingReviews.value = true;

    const { data, error: reviewsError } = await supabase
      .from('announcement_chat_reviews')
      .select(`
        id,
        chat_id,
        reviewer_id,
        reviewed_user_id,
        rating,
        comment,
        created_at,
        reviewer:users!announcement_chat_reviews_reviewer_id_fkey(id, first_name, last_name, avatar_url)
      `)
      .eq('reviewed_user_id', userId.value)
      .order('created_at', { ascending: false });

    if (reviewsError) throw reviewsError;

    reviews.value = (data || []) as unknown as UserReview[];
  } catch (err) {
    console.error('Ошибка загрузки отзывов:', err);
  } finally {
    isLoadingReviews.value = false;
  }
};

const fetchPortfolios = async () => {
  try {
    isLoadingPortfolios.value = true;
    
    const { data: portfolioData, error: portfolioError } = await supabase
      .from('portfolios')
      .select(`
        id,
        image_url,
        category,
        description,
        is_public,
        likes_count,
        views_count,
        created_at,
        updated_at
      `)
      .eq('user_id', userId.value)
      .eq('is_public', true)
      .order('created_at', { ascending: false });
    
    if (portfolioError) throw portfolioError;
    
    portfolios.value = (portfolioData || []).map(item => ({
      id: item.id,
      image_url: item.image_url ? item.image_url.split('|').filter(url => url.trim()) : [],
      category: item.category,
      description: item.description,
      is_public: item.is_public,
      likes_count: item.likes_count,
      views_count: item.views_count,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (err) {
    console.error('Ошибка загрузки портфолио:', err);
  } finally {
    isLoadingPortfolios.value = false;
  }
};

onMounted(async () => {
  await fetchUser();
  await fetchPortfolios();
  await fetchReviews();
});

watch(authUser, async () => {
  if (!user.value) return;

  if (authUser.value) {
    roleData.value = await fetchRoleProfileForUser(
      userId.value,
      user.value.role?.title,
    );
  } else {
    roleData.value = null;
  }
});
</script>

<template>
  <div class="flex items-start justify-center min-h-[calc(100vh-80px)] bg-muted/40 p-4">
    <ui-card v-if="isLoading" class="w-full max-w-2xl overflow-hidden pt-0">
      <div class="relative">
        <ui-skeleton class="h-48 w-full rounded-none" />
        <div class="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <ui-skeleton class="h-36 w-36 rounded-full" />
        </div>
      </div>

      <ui-card-header class="pt-6 text-center">
        <ui-skeleton class="mx-auto h-7 w-48" />
        <ui-skeleton class="mx-auto mt-2 h-4 w-64" />
      </ui-card-header>

      <ui-card-content class="space-y-6">
        <div class="grid w-full grid-cols-2 gap-2">
          <ui-skeleton class="h-9 w-full rounded-md" />
          <ui-skeleton class="h-9 w-full rounded-md" />
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="space-y-6">
            <div class="space-y-4">
              <div class="space-y-2">
                <ui-skeleton class="h-3 w-16" />
                <ui-skeleton class="h-4 w-36" />
              </div>
              <div class="space-y-2">
                <ui-skeleton class="h-3 w-12" />
                <ui-skeleton class="h-4 w-44" />
              </div>
            </div>

            <div class="space-y-2">
              <ui-skeleton class="h-4 w-32" />
              <div class="flex gap-3">
                <ui-skeleton class="h-5 w-5 rounded-sm" />
                <ui-skeleton class="h-5 w-5 rounded-sm" />
                <ui-skeleton class="h-5 w-5 rounded-sm" />
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <ui-skeleton class="h-4 w-16" />
            <ui-skeleton class="h-4 w-full" />
            <ui-skeleton class="h-4 w-full" />
            <ui-skeleton class="h-4 w-3/4" />
          </div>
        </div>

        <div class="space-y-2">
          <ui-skeleton class="h-4 w-28" />
          <div class="space-y-1.5 rounded-lg border border-dashed bg-muted/40 p-3">
            <ui-skeleton class="h-3 w-56" />
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div class="space-y-1.5">
                <ui-skeleton class="h-3 w-20" />
                <ui-skeleton class="h-4 w-full" />
              </div>
              <div class="space-y-1.5">
                <ui-skeleton class="h-3 w-24" />
                <ui-skeleton class="h-4 w-4/5" />
              </div>
              <div class="space-y-1.5">
                <ui-skeleton class="h-3 w-16" />
                <ui-skeleton class="h-4 w-3/5" />
              </div>
              <div class="space-y-1.5">
                <ui-skeleton class="h-3 w-28" />
                <ui-skeleton class="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </ui-card-content>
    </ui-card>

    <div v-else-if="error" class="text-center">
      <p class="text-destructive">{{ error }}</p>
    </div>
    
    <ui-card v-else-if="user" class="w-full max-w-2xl overflow-hidden pt-0">
      <div class="relative">
        <div 
          class="h-48 w-full overflow-hidden bg-muted"
        >
          <img 
            v-if="user.cover_url" 
            :src="user.cover_url" 
            class="h-full w-full object-cover"
            alt="Обложка"
          />
          <div v-else class="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600" />
        </div>

        <div class="absolute -bottom-12 left-1/2 z-20 -translate-x-1/2 transform">
          <div class="relative">
            <ui-avatar class="h-36 w-36 rounded-full">
              <ui-avatar-image :src="user.avatar_url || ''" :alt="user.first_name" />
              <ui-avatar-fallback class="text-lg">
                {{ initials }}
              </ui-avatar-fallback>
            </ui-avatar>
            
            <ui-badge 
              v-if="user.rating" 
              class="absolute -bottom-1 -right-1 flex items-center gap-1"
            >
              <star class="h-6 w-6" />
              <span class="text-sm font-semibold">{{ user.rating }}</span>
            </ui-badge>
          </div>
        </div>
      </div>

      <ui-card-header class="pt-6 text-center">
        <ui-card-title class="text-2xl">
          {{ user.first_name }} {{ user.last_name }}
        </ui-card-title>
        <ui-card-description v-if="user.city" class="flex items-center justify-center gap-2">
          <span>{{ user.role.title }} ({{ getExperienceLevel(user.experience_level) }})</span>
          <div class="h-6 w-[1px] bg-border mx-1 block"></div>

          <span>{{ user.city }}</span>
        </ui-card-description>
      </ui-card-header>

      <ui-card-content>
        <ui-tabs v-model="activeTab" class="w-full">
          <ui-tabs-list class="grid w-full grid-cols-2 mb-6">
            <ui-tabs-trigger value="profile">Профиль</ui-tabs-trigger>
            <ui-tabs-trigger value="portfolio">Портфолио</ui-tabs-trigger>
          </ui-tabs-list>

          <ui-tabs-content value="profile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-6">
                <div class="space-y-4 text-sm">
                  <div v-if="user.phone">
                    <p class="text-muted-foreground mb-1">Телефон</p>
                    <p class="font-medium">{{ user.phone }}</p>
                  </div>
                  <div v-if="user.email">
                    <p class="text-muted-foreground mb-1">Email</p>
                    <p class="font-medium">{{ user.email }}</p>
                  </div>
                </div>

                <div v-if="hasSocials" class="space-y-2">
                  <h3 class="text-sm font-semibold flex items-center gap-2">
                    <link-icon class="h-4 w-4" />
                    Социальные сети
                  </h3>
                  <div class="flex gap-3">
                    <a 
                      v-if="user.socials?.instagram" 
                      :href="user.socials.instagram" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="Instagram"
                    >
                      <instagram class="w-5 h-5"/>
                    </a>
                    <a 
                      v-if="user.socials?.vk" 
                      :href="user.socials.vk" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="ВКонтакте"
                    >
                      <message-circle class="w-5 h-5"/>
                    </a>
                    <a 
                      v-if="user.socials?.telegram" 
                      :href="user.socials.telegram" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="Telegram"
                    >
                      <send class="w-5 h-5" />
                    </a>
                    <a 
                      v-if="user.socials?.website" 
                      :href="user.socials.website" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      title="Веб-сайт"
                    >
                      <globe class="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div v-if="user.bio" class="space-y-2">
                <h3 class="text-sm font-semibold">О себе</h3>
                <p class="text-sm text-muted-foreground whitespace-pre-wrap">{{ user.bio }}</p>
              </div>
              <div v-else class="space-y-2">
                <h3 class="text-sm font-semibold">О себе</h3>
                <p class="text-sm text-muted-foreground">Информация отсутствует</p>
              </div>
            </div>

            <profile-role-additional-info
              :role-title="user.role?.title"
              :role-data="roleData"
            />

            <profile-user-reviews
              :reviews="reviews"
              :is-loading="isLoadingReviews"
            />
          </ui-tabs-content>

          <ui-tabs-content value="portfolio" class="space-y-4">
            <div v-if="isLoadingPortfolios" class="flex items-center justify-center py-8">
              <ui-spinner size="lg" />
            </div>
            
            <div v-else-if="portfolios.length === 0">
              <ui-empty>
                <ui-empty-header>
                  <ui-empty-media variant="icon">
                    <briefcase-business />
                  </ui-empty-media>
                  <ui-empty-title>Работ нет</ui-empty-title>
                  <ui-empty-description>
                    Публичных работ пока нет
                  </ui-empty-description>
                </ui-empty-header>
              </ui-empty>
            </div>
            
            <div v-else class="space-y-4">
              <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground md:hidden">
                <chevron-left class="w-4 h-4" />
                <span>Листайте свайпом</span>
                <chevron-right class="w-4 h-4" />
              </div>
              
              <ui-carousel class="relative w-full"
                :opts="{
                  align: 'center',
                }"
              >
                <ui-carousel-content>
                  <ui-carousel-item 
                    v-for="portfolio in portfolios" 
                    :key="portfolio.id" 
                    class="basis-full md:basis-1/2 lg:basis-1/2"
                  >
                    <div class="p-2 flex justify-center">
                      <div class="w-full overflow-hidden rounded-lg border bg-card">
                        <div
                          v-if="portfolio.image_url && portfolio.image_url.length > 0"
                          class="flex justify-center overflow-hidden bg-card px-2 py-3"
                        >
                          <div
                            v-for="(imageUrl, imageIndex) in portfolio.image_url.slice(0, 3)"
                            :key="imageUrl"
                            class="h-40 shrink-0 overflow-hidden rounded-xl bg-muted shadow-lg transition-transform duration-300 first:ml-0 hover:z-10 hover:-translate-y-1"
                            :class="{
                              'w-[94%]': portfolio.image_url.slice(0, 3).length === 1,
                              '-ml-[16%] w-[55%]': portfolio.image_url.slice(0, 3).length === 2,
                              '-ml-[16%] w-[42%]': portfolio.image_url.slice(0, 3).length >= 3,
                            }"
                            :style="{ zIndex: getPortfolioImageZIndex(portfolio.id, imageIndex, portfolio.image_url.slice(0, 3).length) }"
                            @mouseenter="selectedPortfolioImage = { portfolioId: portfolio.id, imageIndex }"
                          >
                            <img
                              :src="imageUrl"
                              :alt="`${portfolio.category} ${imageIndex + 1}`"
                              class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div v-else class="aspect-video w-full bg-muted" />
                        
                        <div class="p-4 space-y-3">
                          <div>
                            <h3 class="font-semibold text-lg mb-1">{{ portfolio.category }}</h3>
                            <p v-if="portfolio.description" class="text-sm text-muted-foreground line-clamp-2">
                              {{ portfolio.description }}
                            </p>
                          </div>
                          <ui-button 
                            @click="router.push(`/portfolio/${portfolio.id}`)" 
                            class="w-full"
                            variant="outline"
                          >
                            Перейти
                          </ui-button>
                        </div>
                      </div>
                    </div>
                  </ui-carousel-item>
                </ui-carousel-content>
                <ui-carousel-previous class="hidden md:flex left-4 z-30 bg-background/90 shadow-md" />
                <ui-carousel-next class="hidden md:flex right-4 z-30 bg-background/90 shadow-md" />
              </ui-carousel>
            </div>
          </ui-tabs-content>
        </ui-tabs>
      </ui-card-content>
    </ui-card>
  </div>
</template>

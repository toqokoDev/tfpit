<script lang="ts" setup>
import { Star, BriefcaseBusiness, Link as LinkIcon } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient<Database>();

const userId = computed(() => route.params.id as string);
const isLoading = ref(true);
const error = ref<string | null>(null);
const user = ref<any>(null);
const portfolios = ref<PortfolioSchema[]>([]);
const isLoadingPortfolios = ref(false);
const activeTab = ref('profile');

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
  if (level < 3) return 'Не опытный';
  if (level >= 3 && level < 10) return 'Любитель';
  return 'Профессионал';
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
});
</script>

<template>
  <div class="flex items-center justify-center min-h-[calc(100vh-80px)] bg-muted/40 p-4">
    <div v-if="isLoading" class="flex items-center justify-center">
      <ui-spinner size="lg" />
    </div>
    
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

      <ui-card-header class="pt-10 text-center">
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
            <div v-if="user.bio" class="space-y-2">
              <h3 class="text-sm font-semibold">О себе</h3>
              <p class="text-sm text-muted-foreground whitespace-pre-wrap">{{ user.bio }}</p>
            </div>

            <div v-if="hasSocials" class="space-y-2">
              <h3 class="text-sm font-semibold flex items-center gap-2">
                <link-icon class="h-4 w-4" />
                Социальные сети
              </h3>
              <div class="flex flex-wrap gap-3">
                <a 
                  v-if="user.socials?.instagram" 
                  :href="user.socials.instagram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-sm text-primary hover:underline"
                >
                  Instagram
                </a>
                <a 
                  v-if="user.socials?.vk" 
                  :href="user.socials.vk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-sm text-primary hover:underline"
                >
                  ВКонтакте
                </a>
                <a 
                  v-if="user.socials?.telegram" 
                  :href="user.socials.telegram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-sm text-primary hover:underline"
                >
                  Telegram
                </a>
                <a 
                  v-if="user.socials?.website" 
                  :href="user.socials.website" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="text-sm text-primary hover:underline"
                >
                  Веб-сайт
                </a>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 text-sm">
              <div v-if="user.phone">
                <p class="text-muted-foreground mb-1">Телефон</p>
                <p class="font-medium">{{ user.phone }}</p>
              </div>
              <div v-if="user.email">
                <p class="text-muted-foreground mb-1">Email</p>
                <p class="font-medium">{{ user.email }}</p>
              </div>
            </div>
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
            
            <ui-carousel v-else class="w-full"
              :opts="{
                align: 'start',
              }"
            >
              <ui-carousel-content>
                <ui-carousel-item 
                  v-for="portfolio in portfolios" 
                  :key="portfolio.id" 
                  class="basis-full md:basis-1/2 lg:basis-1/2"
                >
                  <div class="p-2">
                    <div class="rounded-lg border overflow-hidden bg-card">
                      <div class="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          v-if="portfolio.image_url && portfolio.image_url.length > 0"
                          :src="portfolio.image_url[0]"
                          :alt="portfolio.category"
                          class="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div class="p-4 space-y-3">
                        <div>
                          <h3 class="font-semibold text-lg mb-1">{{ portfolio.category }}</h3>
                          <p class="text-sm text-muted-foreground line-clamp-2">
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
            </ui-carousel>
          </ui-tabs-content>
        </ui-tabs>
      </ui-card-content>
    </ui-card>
  </div>
</template>

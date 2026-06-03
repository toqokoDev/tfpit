<script lang="ts" setup>
import { Eye, Heart, Globe, ChevronLeft, ChevronRight, ArrowLeft, Share2 } from 'lucide-vue-next';
import { toast } from "vue-sonner";

interface UserInfo {
  id: string;
  first_name: string; 
  last_name: string; 
  avatar_url: string | null;
}
// ----------------
// ----- Data -----
// ----------------

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient<Database>();
const portfolioId = route.params.id as string;

const portfolio = ref<PortfolioSchema | null>(null);
const isLoading = ref(true);
const userInfo = ref<UserInfo | null>(null);

const {
  likesCount,
  hasLiked,
  isLikeLoading,
  toggleLike,
} = useContentLike('portfolio', portfolioId, computed(() => portfolio.value?.likes_count || 0));

// ---------------------
// ----- Functions -----
// ---------------------

async function loadPortfolio() {
  try {
    isLoading.value = true;
    
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
        updated_at,
        user_id
      `)
      .eq('id', portfolioId)
      .eq('is_public', true)
      .single();
    
    if (portfolioError || !portfolioData) {
      throw new Error('Портфолио не найдено или недоступно');
    }
    
    if (!portfolioData.is_public) {
      throw new Error('Портфолио недоступно');
    }
    
    const portfolioItem: PortfolioSchema = {
      id: portfolioData.id,
      image_url: portfolioData.image_url ? portfolioData.image_url.split('|').filter(url => url.trim()) : [],
      category: portfolioData.category,
      description: portfolioData.description,
      is_public: portfolioData.is_public,
      likes_count: portfolioData.likes_count,
      views_count: portfolioData.views_count,
      created_at: portfolioData.created_at,
      updated_at: portfolioData.updated_at,
    };
    
    portfolio.value = portfolioItem;
    
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, first_name, last_name, avatar_url')
      .eq('id', portfolioData.user_id)
      .single();
    
    if (!userError && userData) {
      userInfo.value = {
        id: userData.id,
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        avatar_url: userData.avatar_url,
      };
    }
    
    await supabase
      .from('portfolios')
      .update({ views_count: portfolioData.views_count + 1 })
      .eq('id', portfolioId);
    
  } catch (error: any) {
    toast.error(error.message || 'Ошибка при загрузке портфолио');
    await router.push('/');
  } finally {
    isLoading.value = false;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

async function sharePortfolio() {
  const fullUrl = window.location.href;
  
  await navigator.clipboard.writeText(fullUrl);
  toast.success('Ссылка скопирована в буфер обмена');
}

onMounted(async () => {
  await loadPortfolio();
});

// ----------------
// ----- Page -----
// ----------------

watch(portfolio, (newPortfolio) => {
  if (newPortfolio) {
    useHead({ 
      title: `${newPortfolio.category} - Портфолио`,
      meta: [
        {
          name: 'description',
          content: newPortfolio.description || 'Просмотр портфолио',
        },
      ],
    });
  }
}, { immediate: true });

useHead({ 
  title: 'Портфолио',
  meta: [
    {
      name: 'description',
      content: 'Просмотр портфолио',
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

      <div v-else-if="!portfolio" class="flex min-h-[60vh] flex-col items-center justify-center">
        <div class="rounded-3xl border bg-card p-8 text-center shadow-sm">
          <p class="mb-4 text-lg text-muted-foreground">Портфолио не найдено или недоступно</p>
          <ui-button @click="router.push('/')">
            <ArrowLeft class="mr-2 h-4 w-4" />
            Вернуться на главную
          </ui-button>
        </div>
      </div>

      <div v-else class="mx-auto max-w-5xl">
        <div class="mb-5 flex items-center justify-between">
          <ui-button variant="ghost" class="rounded-full" @click="router.back()">
            <ArrowLeft class="mr-2 h-4 w-4" />
            Назад
          </ui-button>

          <div class="flex items-center gap-2">
            <ui-button size="icon" variant="outline" class="rounded-full" @click="sharePortfolio">
              <Share2 class="h-4 w-4" />
            </ui-button>
          </div>
        </div>

        <article class="overflow-hidden rounded-[2rem] border bg-card shadow-xl shadow-black/5 lg:grid lg:grid-cols-[minmax(0,1.25fr)_380px]">
          <header class="flex items-center justify-between border-b px-4 py-3 lg:col-span-2">
            <BaseAuthorLink
              v-if="userInfo"
              :user="userInfo"
              subtitle="Автор портфолио"
              avatar-class="h-11 w-11"
            />

            <div class="flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <Globe class="h-3.5 w-3.5" />
              <span>Публичное</span>
            </div>
          </header>

          <section class="relative flex min-h-[420px] items-center justify-center bg-black lg:min-h-[680px]">
            <div
              v-if="portfolio.image_url && portfolio.image_url.length > 1"
              class="absolute left-1/2 top-4 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-xs text-white backdrop-blur md:hidden"
            >
              <ChevronLeft class="h-3.5 w-3.5" />
              <span>Листайте</span>
              <ChevronRight class="h-3.5 w-3.5" />
            </div>

            <ui-carousel
              v-if="portfolio.image_url && portfolio.image_url.length > 0"
              class="relative h-full w-full"
              :opts="{ align: 'center' }"
            >
              <ui-carousel-content class="h-full">
                <ui-carousel-item v-for="img in portfolio.image_url" :key="img" class="basis-full">
                  <div class="flex h-full min-h-[420px] items-center justify-center bg-black lg:min-h-[680px]">
                    <img
                      :src="img"
                      :alt="portfolio.category"
                      class="h-full min-h-[420px] w-full object-cover lg:min-h-[680px]"
                      loading="lazy"
                    />
                  </div>
                </ui-carousel-item>
              </ui-carousel-content>
              <ui-carousel-previous class="hidden bg-background/90 shadow-md md:flex left-4 z-30" />
              <ui-carousel-next class="hidden bg-background/90 shadow-md md:flex right-4 z-30" />
            </ui-carousel>

            <div v-else class="flex h-full min-h-[420px] w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 px-8 text-center text-white lg:min-h-[680px]">
              <p class="mb-3 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/70">Portfolio</p>
              <h1 class="text-3xl font-bold md:text-5xl">{{ portfolio.category }}</h1>
              <p class="mt-4 max-w-md text-sm text-white/60">Изображения для этого портфолио пока не добавлены.</p>
            </div>
          </section>

          <aside class="flex flex-col border-t lg:border-l lg:border-t-0">
            <div class="flex-1 space-y-5 px-5 py-5">
              <div>
                <h1 class="text-2xl font-bold leading-tight">{{ portfolio.category }}</h1>
                <p v-if="portfolio.description" class="mt-3 text-sm leading-6 text-muted-foreground">
                  {{ portfolio.description }}
                </p>
              </div>

              <div class="grid gap-3 text-sm">
                <div class="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                  <span class="flex items-center gap-2 text-muted-foreground">
                    <Eye class="h-4 w-4" />
                    Просмотры
                  </span>
                  <span class="font-semibold">{{ portfolio.views_count }}</span>
                </div>
                <div class="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                  <span class="text-muted-foreground">Создано</span>
                  <span class="text-right font-semibold">{{ formatDate(portfolio.created_at) }}</span>
                </div>
                <div v-if="portfolio.updated_at !== portfolio.created_at" class="flex items-center justify-between rounded-2xl bg-muted/60 px-4 py-3">
                  <span class="text-muted-foreground">Обновлено</span>
                  <span class="text-right font-semibold">{{ formatDate(portfolio.updated_at) }}</span>
                </div>
              </div>
            </div>

            <footer class="border-t px-5 py-4">
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
                  <span>{{ portfolio.views_count }}</span>
                </div>
              </div>

              <p class="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {{ formatDate(portfolio.created_at) }}
              </p>
            </footer>
          </aside>
        </article>
      </div>
    </div>
  </div>
</template>

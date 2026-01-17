<script lang="ts" setup>
import { Eye, Heart, Globe, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-vue-next';
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
  <div class="container mx-auto px-4 py-8">
    <div v-if="isLoading" class="flex items-center justify-center min-h-[60vh]">
      <ui-spinner size="lg" />
    </div>

    <div v-else-if="!portfolio" class="flex flex-col items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <p class="text-muted-foreground mb-4 text-lg">Портфолио не найдено или недоступно</p>
        <ui-button @click="router.push('/')">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Вернуться на главную
        </ui-button>
      </div>
    </div>

    <div v-else class="max-w-4xl mx-auto">
      <div class="mb-6 flex items-center justify-between">
        <ui-button variant="ghost" @click="router.back()">
          <ArrowLeft class="w-4 h-4 mr-2" />
          Назад
        </ui-button>
        
        <ui-button @click="sharePortfolio" size="icon">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </ui-button>
      </div>

      <div class="space-y-6">
        <div v-if="userInfo" class="flex items-center gap-4 pb-4 border-b">
          <NuxtLink 
            :to="`/profile/user/${userInfo.id}`"
            class="flex items-center gap-4 hover:opacity-80 transition-opacity"
          >
            <div v-if="userInfo.avatar_url" class="w-12 h-12 rounded-full overflow-hidden">
              <img :src="userInfo.avatar_url" :alt="`${userInfo.first_name} ${userInfo.last_name}`" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <span class="text-lg font-medium">{{ (userInfo.first_name?.[0] || '') + (userInfo.last_name?.[0] || '') }}</span>
            </div>
            <div>
              <p class="font-medium">{{ userInfo.first_name }} {{ userInfo.last_name }}</p>
              <p class="text-sm text-muted-foreground">Автор портфолио</p>
            </div>
          </NuxtLink>
        </div>

        <div>
          <h1 class="text-3xl font-bold mb-2">{{ portfolio.category }}</h1>
          <p class="text-muted-foreground text-lg">{{ portfolio.description }}</p>
        </div>

        <div v-if="portfolio.image_url && portfolio.image_url.length > 0" class="space-y-4">
          <div class="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <chevron-left class="w-4 h-4" />
            <span>Листайте свайпом</span>
            <chevron-right class="w-4 h-4" />
          </div>

          <ui-carousel class="relative w-full max-w-2xl mx-auto"
            :opts="{
              align: 'center',
            }"
          >
            <ui-carousel-content>
              <ui-carousel-item v-for="img in portfolio.image_url" :key="img" class="basis-full">
                <div class="p-1 flex justify-center">
                  <img
                    :src="img"
                    :alt="portfolio.category"
                    class="h-auto object-contain rounded-lg transition-opacity duration-300 max-w-full"
                    loading="lazy"
                  />
                </div>
              </ui-carousel-item>
            </ui-carousel-content>
          </ui-carousel>
        </div>

        <div class="flex flex-wrap gap-4 text-sm text-muted-foreground pt-4 border-t">
          <div class="flex items-center gap-2">
            <eye class="w-4 h-4" />
            <span>{{ portfolio.views_count }} просмотров</span>
          </div>
          <div class="flex items-center gap-2">
            <heart class="w-4 h-4" />
            <span>{{ portfolio.likes_count }} лайков</span>
          </div>
          <div class="flex items-center gap-2">
            <globe class="w-4 h-4" />
            <span>Публичное</span>
          </div>
        </div>

        <div class="text-sm text-muted-foreground">
          <p>Создано: {{ formatDate(portfolio.created_at) }}</p>
          <p v-if="portfolio.updated_at !== portfolio.created_at">
            Обновлено: {{ formatDate(portfolio.updated_at) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

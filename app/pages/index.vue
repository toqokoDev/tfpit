<script setup lang="ts">
import { Briefcase } from 'lucide-vue-next';


const TAG_LIST = ['Fashion', 'Portrait', 'Street', 'Studio', 'Nude', 'Cosplay'];

const user = useSupabaseUser();
const supabase = useSupabaseClient<Database>();
const isLoading = ref(false);

const announcements = ref<any[]>([]);

async function fetchAnnouncements() {
  try {
    isLoading.value = true;
    
    const { data, error } = await supabase
      .from('announcements')
      .select(`
        id,
        title,
        description,
        city,
        location_name,
        experience_level,
        responses_count,
        views_count,
        created_at,
        shooting_date,
        user:users(id, first_name, last_name, avatar_url),
        references_urls
      `, 
      { count: 'exact' })
      .limit(3);

    if (error) {
      throw error;
    }

    console.log(data);

    announcements.value = data;
    
  } catch (error) {
    console.error('Ошибка загрузки объявлений:', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchAnnouncements();
});

useHead({ title: 'Главная' });
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-primary/8"></div>
      
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -right-20 h-[600px] w-[600px] rounded-full bg-primary/30 blur-[120px] animate-pulse"></div>
        <div class="absolute -bottom-20 -left-20 h-[600px] w-[600px] rounded-full bg-primary/25 blur-[120px] animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse" style="animation-delay: 2s;"></div>
      </div>

      <section class="relative container mx-auto px-4 py-24 text-center lg:py-32">
        <div class="relative z-10">
          <ui-badge variant="outline" class="mb-6 rounded-full px-4 py-1 text-sm font-normal">
            ✨ Новые съемки каждый час
          </ui-badge>
          <h1 class="mb-6 text-5xl font-extrabold tracking-tight lg:text-7xl">
            Твоё идеальное <br />
            <span class="text-primary">портфолио</span> начинается здесь
          </h1>
          <p class="mx-auto mb-10 max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Найдите фотографов, моделей и визажистов для совместных творческих проектов на условиях Time for Print.
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <NuxtLink to="/offer" as-child>
              <ui-button size="lg" class="h-12 px-8 text-base">Найти проект</ui-button>
            </NuxtLink>
            <NuxtLink v-if="!user" to="/auth/register" as-child>
              <ui-button size="lg" variant="outline" class="h-12 px-8 text-base">Присоединиться</ui-button>
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="relative z-10 container mx-auto px-4 pb-16">
        <div class="flex flex-wrap justify-center gap-2">
          <ui-button v-for="tag in TAG_LIST" 
            :key="tag" 
            variant="secondary" 
            size="sm" 
            class="rounded-full"
          >
          #{{ tag }}
          </ui-button>
        </div>
      </section>
    </div>

    <section class="relative z-10 bg-slate-50/50 py-20 dark:bg-slate-900/10">
      <div class="container mx-auto px-4">
        <div class="mb-12 flex items-end justify-between">
          <div>
            <h2 class="text-3xl font-bold tracking-tight">Актуальные предложения</h2>
            <p class="text-muted-foreground">Люди, которые ищут команду прямо сейчас</p>
          </div>
          <NuxtLink to="/offer" as-child>
            <ui-button variant="link" class="hidden sm:flex">Показать все</ui-button>
          </NuxtLink>
        </div>

        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <ui-card v-for="i in 3" :key="i" class="space-y-4">
            <ui-card-header>
              <ui-skeleton class="h-6 w-3/4" />
              <ui-skeleton class="h-4 w-full mt-2" />
              <ui-skeleton class="h-4 w-2/3 mt-2" />
            </ui-card-header>
            <ui-card-content class="space-y-3">
              <div class="flex gap-2">
                <ui-skeleton class="h-5 w-20" />
                <ui-skeleton class="h-5 w-24" />
              </div>
              <ui-skeleton class="h-4 w-full" />
              <ui-skeleton class="h-4 w-2/3" />
              <div class="flex items-center gap-4 pt-2 border-t">
                <ui-skeleton class="h-4 w-12" />
                <ui-skeleton class="h-4 w-12" />
                <ui-skeleton class="h-4 w-20 ml-auto" />
              </div>
            </ui-card-content>
          </ui-card>
        </div>

        <div v-else-if="announcements.length === 0" class="py-12">
          <ui-empty>
            <ui-empty-header>
              <ui-empty-media variant="icon">
                <briefcase class="h-12 w-12 text-muted-foreground" />
              </ui-empty-media>
              <ui-empty-title>Объявления не найдены</ui-empty-title>
            </ui-empty-header>
          </ui-empty>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <offer-announcement-card
            v-for="announcement in announcements"
            :key="announcement.id"
            :announcement="announcement"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Search, Filter, Users, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

interface SelectOption {
  id: string;
  title: string;
}

interface PortfolioPreview {
  id: string;
  image_url: string;
  category: string;
}

interface Specialist {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  cover_url: string | null;
  city: string | null;
  bio: string | null;
  rating: number | null;
  experience_level: number | null;
  role: SelectOption | null;
  portfolio_previews: PortfolioPreview[];
}

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient<Database>();

const ITEMS_PER_PAGE = 12;

const searchQuery = ref('');
const selectedCity = ref('');
const selectedRoleId = ref('');
const selectedExperienceLevel = ref('');
const currentPage = ref(1);

const specialists = ref<Specialist[]>([]);
const isLoading = ref(false);
const isLoadingFilters = ref(true);
const totalCount = ref(0);
const roles = ref<SelectOption[]>([]);
const cities = ref<string[]>([]);

const totalPages = computed(() => Math.max(1, Math.ceil(totalCount.value / ITEMS_PER_PAGE)));

onMounted(() => {
  loadFiltersFromURL();
  loadFilterOptions();
  fetchSpecialists();
});

watch(() => route.query, () => {
  loadFiltersFromURL();
  fetchSpecialists();
}, { deep: true });

function loadFiltersFromURL() {
  const query = route.query;
  searchQuery.value = (query.search as string) || '';
  selectedCity.value = (query.city as string) || '';
  selectedRoleId.value = (query.role as string) || '';
  selectedExperienceLevel.value = (query.experience_level as string) || '';
  currentPage.value = parseInt(query.page as string) || 1;
}

function updateURL(resetPage = true) {
  if (resetPage) {
    currentPage.value = 1;
  }

  const query: Record<string, string> = {};

  if (searchQuery.value) query.search = searchQuery.value;
  if (selectedCity.value) query.city = selectedCity.value;
  if (selectedRoleId.value) query.role = selectedRoleId.value;
  if (selectedExperienceLevel.value) query.experience_level = selectedExperienceLevel.value;
  if (currentPage.value > 1) query.page = String(currentPage.value);

  router.push({ query });
}

async function loadFilterOptions() {
  try {
    isLoadingFilters.value = true;

    const { data: rolesData, error: rolesError } = await supabase
      .from('roles')
      .select('id, title')
      .order('title');

    if (rolesError) throw rolesError;
    roles.value = rolesData || [];

    const { data: citiesData, error: citiesError } = await supabase
      .from('users')
      .select('city')
      .not('city', 'is', null);

    if (citiesError) throw citiesError;

    cities.value = [...new Set((citiesData || []).map(item => item.city).filter((city): city is string => !!city))].sort();
  } catch (error) {
    toast.error('Ошибка загрузки опций фильтров');
    console.error('Ошибка загрузки опций фильтров:', error);
  } finally {
    isLoadingFilters.value = false;
  }
}

async function fetchSpecialists() {
  try {
    isLoading.value = true;

    let query = supabase
      .from('users')
      .select(`
        id,
        first_name,
        last_name,
        avatar_url,
        cover_url,
        city,
        bio,
        rating,
        experience_level,
        role:role(id, title),
        created_at
      `, { count: 'exact' });

    if (searchQuery.value) {
      query = query.or(`first_name.ilike.%${searchQuery.value}%,last_name.ilike.%${searchQuery.value}%,bio.ilike.%${searchQuery.value}%`);
    }

    if (selectedCity.value) {
      query = query.eq('city', selectedCity.value);
    }

    if (selectedRoleId.value) {
      query = query.eq('role', selectedRoleId.value);
    }

    if (selectedExperienceLevel.value === 'beginner') {
      query = query.lt('experience_level', 3);
    } else if (selectedExperienceLevel.value === 'intermediate') {
      query = query.gte('experience_level', 3).lt('experience_level', 10);
    } else if (selectedExperienceLevel.value === 'professional') {
      query = query.gte('experience_level', 10);
    }

    const from = (currentPage.value - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    query = query
      .order('rating', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    const specialistsData = data || [];
    const userIds = specialistsData.map(specialist => specialist.id);
    const portfolioByUser = new Map<string, PortfolioPreview[]>();

    if (userIds.length > 0) {
      const { data: portfoliosData, error: portfoliosError } = await supabase
        .from('portfolios')
        .select('id, user_id, image_url, category')
        .in('user_id', userIds)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (portfoliosError) throw portfoliosError;

      for (const portfolio of portfoliosData || []) {
        const images = portfolio.image_url.split('|').filter(url => url.trim());
        const imageUrl = images[0];

        if (!imageUrl) continue;

        const previews = portfolioByUser.get(portfolio.user_id) || [];
        if (previews.length >= 3) continue;

        previews.push({
          id: portfolio.id,
          image_url: imageUrl,
          category: portfolio.category,
        });
        portfolioByUser.set(portfolio.user_id, previews);
      }
    }

    specialists.value = specialistsData.map(specialist => ({
      ...specialist,
      portfolio_previews: portfolioByUser.get(specialist.id) || [],
    }));
    totalCount.value = count || 0;
  } catch (error) {
    toast.error('Ошибка загрузки специалистов');
    console.error('Ошибка загрузки специалистов:', error);
  } finally {
    isLoading.value = false;
  }
}

function clearFilters() {
  searchQuery.value = '';
  selectedCity.value = '';
  selectedRoleId.value = '';
  selectedExperienceLevel.value = '';
  currentPage.value = 1;
  updateURL(false);
}

function goToPage(page: number) {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value);
  updateURL(false);
}

useHead({ title: 'Специалисты' });
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6 space-y-2">
        <h1 class="text-3xl font-bold">Специалисты</h1>
        <p class="text-muted-foreground">Найдите фотографов, моделей, визажистов и других участников для TFP-проектов</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        <aside class="bg-card border rounded-lg p-4 space-y-4 lg:sticky lg:top-8">
          <h2 class="font-semibold">Фильтры</h2>

          <div v-if="isLoadingFilters" class="relative">
            <ui-skeleton class="h-9 w-full" />
          </div>
          <div v-else class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <ui-input
              v-model="searchQuery"
              placeholder="Поиск..."
              class="pl-10"
              @keyup.enter="updateURL()"
            />
          </div>

          <div v-if="isLoadingFilters" class="space-y-4">
            <ui-skeleton class="h-9 w-full" />
            <ui-skeleton class="h-9 w-full" />
            <ui-skeleton class="h-9 w-full" />
            <ui-skeleton class="h-9 w-full" />
          </div>
          <div v-else class="space-y-4">
            <ui-select
              :model-value="selectedCity"
              @update:model-value="(value) => {
                selectedCity = value as string;
                selectedCity = selectedCity === 'all' ? '' : selectedCity;
                updateURL();
              }"
            >
              <ui-select-trigger class="h-9 w-full">
                <ui-select-value placeholder="Город" />
              </ui-select-trigger>
              <ui-select-content>
                <ui-select-item value="all">Все города</ui-select-item>
                <ui-select-item
                  v-for="city in cities"
                  :key="city"
                  :value="city"
                >
                  {{ city }}
                </ui-select-item>
              </ui-select-content>
            </ui-select>

            <ui-select
              :model-value="selectedRoleId"
              @update:model-value="(value) => {
                selectedRoleId = value as string;
                selectedRoleId = selectedRoleId === 'all' ? '' : selectedRoleId;
                updateURL();
              }"
            >
              <ui-select-trigger class="h-9 w-full">
                <ui-select-value placeholder="Роль" />
              </ui-select-trigger>
              <ui-select-content>
                <ui-select-item value="all">Все роли</ui-select-item>
                <ui-select-item
                  v-for="role in roles"
                  :key="role.id"
                  :value="role.id"
                >
                  {{ role.title }}
                </ui-select-item>
              </ui-select-content>
            </ui-select>

            <ui-select
              :model-value="selectedExperienceLevel"
              @update:model-value="(value) => {
                selectedExperienceLevel = value as string;
                selectedExperienceLevel = selectedExperienceLevel === 'all' ? '' : selectedExperienceLevel;
                updateURL();
              }"
            >
              <ui-select-trigger class="h-9 w-full">
                <ui-select-value placeholder="Уровень опыта" />
              </ui-select-trigger>
              <ui-select-content>
                <ui-select-item value="all">Все уровни</ui-select-item>
                <ui-select-item value="beginner">Начинающий</ui-select-item>
                <ui-select-item value="intermediate">Любитель</ui-select-item>
                <ui-select-item value="professional">Профессионал</ui-select-item>
              </ui-select-content>
            </ui-select>

            <ui-button
              variant="ghost"
              class="gap-2 h-9 w-full"
              @click="clearFilters"
            >
              <Filter class="h-4 w-4" />
              Очистить фильтры
            </ui-button>
          </div>
        </aside>

        <section>
          <div v-if="isLoading || isLoadingFilters" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mb-8">
            <specialists-specialist-card
              v-for="i in 6"
              :key="i"
              skeleton
            />
          </div>

          <div v-else-if="specialists.length === 0" class="py-12">
            <ui-empty>
              <ui-empty-header>
                <ui-empty-media variant="icon">
                  <Users class="h-12 w-12 text-muted-foreground" />
                </ui-empty-media>
                <ui-empty-title>Специалисты не найдены</ui-empty-title>
                <ui-empty-description>
                  Попробуйте изменить параметры поиска или фильтры
                </ui-empty-description>
              </ui-empty-header>
            </ui-empty>
          </div>

          <template v-else>
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 mb-8">
              <specialists-specialist-card
                v-for="specialist in specialists"
                :key="specialist.id"
                :specialist="specialist"
              />
            </div>

            <div v-if="totalPages > 1" class="flex items-center justify-center gap-3">
              <ui-button
                variant="outline"
                size="sm"
                :disabled="currentPage <= 1"
                @click="goToPage(currentPage - 1)"
              >
                <ChevronLeft class="h-4 w-4" />
                Назад
              </ui-button>
              <span class="text-sm text-muted-foreground">
                {{ currentPage }} / {{ totalPages }}
              </span>
              <ui-button
                variant="outline"
                size="sm"
                :disabled="currentPage >= totalPages"
                @click="goToPage(currentPage + 1)"
              >
                Вперёд
                <ChevronRight class="h-4 w-4" />
              </ui-button>
            </div>
          </template>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search, Plus, Filter, Briefcase } from 'lucide-vue-next';
import { toast } from 'vue-sonner';

interface SelectOption {
  id: string;
  title: string;
}

// ----------------
// ----- Data -----
// ----------------

const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient<Database>();

const ITEMS_PER_PAGE = 12;

// Filters and search
const searchQuery = ref<string>('');
const selectedCity = ref<string>('');
const selectedRoleId = ref<string>('');
const selectedGenreId = ref<string>('');
const selectedStatus = ref<string>('');
const selectedExperienceLevel = ref<string>('');
const currentPage = ref<number>(1);

// Data
const announcements = ref<any[]>([]);
const isLoading = ref(false);
const isLoadingFilters = ref(true);
const totalCount = ref(0);
const roles = ref<SelectOption[]>([]);
const genres = ref<SelectOption[]>([]);
const cities = ref<string[]>([]);

onMounted(() => {
  loadFiltersFromURL();
  loadFilterOptions();
  fetchAnnouncements();
});

watch(() => route.query, () => {
  loadFiltersFromURL();
  fetchAnnouncements();
}, { deep: true });

// ---------------------
// ----- Functions -----
// ---------------------

function loadFiltersFromURL() {
  const query = route.query;
  searchQuery.value = (query.search as string) || '';
  selectedCity.value = (query.city as string) || '';
  selectedRoleId.value = (query.role_id as string) || '';
  selectedGenreId.value = (query.genre_id as string) || '';
  selectedStatus.value = (query.status as string) || '';
  selectedExperienceLevel.value = (query.experience_level as string) || '';
  currentPage.value = parseInt(query.page as string) || 1;
}

function updateURL() {
  const query: Record<string, string> = {};
  
  if (searchQuery.value) query.search = searchQuery.value;
  if (selectedCity.value) query.city = selectedCity.value;
  if (selectedRoleId.value) query.role_id = selectedRoleId.value;
  if (selectedGenreId.value) query.genre_id = selectedGenreId.value;
  if (selectedStatus.value) query.status = selectedStatus.value;
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
    
    if (!rolesError && rolesData) {
      roles.value = rolesData;
    }

    const { data: genresData, error: genresError } = await supabase
      .from('shooting_genres')
      .select('id, title')
      .order('title');
    
    if (!genresError && genresData) {
      genres.value = genresData;
    }

    const { data: citiesData, error: citiesError } = await supabase
      .from('announcements')
      .select('city')
      .not('city', 'is', null);
    
    if (!citiesError && citiesData) {
      const uniqueCities = [...new Set(citiesData.map(item => item.city))].sort();
      cities.value = uniqueCities;
    }
  } catch (error) {
    toast.error('Ошибка загрузки опций фильтров');
    console.error('Ошибка загрузки опций фильтров:', error);
  } finally {
    isLoadingFilters.value = false;
  }
}

async function fetchAnnouncements() {
  try {
    isLoading.value = true;
    
    let query = supabase
      .from('announcements')
      .select(`
        id,
        title,
        description,
        city,
        location_name,
        status,
        experience_level,
        responses_count,
        views_count,
        created_at,
        shooting_date,
        shooting_date_type,
        role_id,
        shooting_genre_id,
        user_id,
        references_urls
      `, { count: 'exact' });

    if (searchQuery.value) {
      query = query.or(`title.ilike.%${searchQuery.value}%,description.ilike.%${searchQuery.value}%`);
    }

    if (selectedCity.value) {
      query = query.eq('city', selectedCity.value);
    }

    if (selectedRoleId.value) {
      query = query.eq('role_id', selectedRoleId.value);
    }

    if (selectedGenreId.value) {
      query = query.eq('shooting_genre_id', selectedGenreId.value);
    }

    if (selectedStatus.value) {
      query = query.eq('status', selectedStatus.value);
    }

    if (selectedExperienceLevel.value) {
      query = query.eq('experience_level', selectedExperienceLevel.value);
    }

    const from = (currentPage.value - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    query = query
      .order('created_at', { ascending: false })
      .range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    const announcementsData = data || [];
    
    const roleIds = [...new Set(announcementsData.map(a => a.role_id).filter((id): id is string => !!id))];
    const { data: rolesData } = roleIds.length > 0 ? await supabase
      .from('roles')
      .select('id, title')
      .in('id', roleIds) : { data: [] };
    
    const genreIds = [...new Set(announcementsData.map(a => a.shooting_genre_id).filter((id): id is string => !!id))];
    const { data: genresData } = genreIds.length > 0 ? await supabase
      .from('shooting_genres')
      .select('id, title')
      .in('id', genreIds) : { data: [] };
    
    const userIds = [...new Set(announcementsData.map(a => a.user_id).filter((id): id is string => !!id))];
    const { data: usersData } = userIds.length > 0 ? await supabase
      .from('users')
      .select('id, first_name, last_name, avatar_url')
      .in('id', userIds) : { data: [] };

    announcements.value = announcementsData.map(announcement => ({
      ...announcement,
      role: rolesData?.find(r => r.id === announcement.role_id) || null,
      shooting_genre: genresData?.find(g => g.id === announcement.shooting_genre_id) || null,
      user: usersData?.find(u => u.id === announcement.user_id) || null
    }));
    
    totalCount.value = count || 0;
  } catch (error) {
    toast.error('Ошибка загрузки объявлений');
    console.error('Ошибка загрузки объявлений:', error);
  } finally {
    isLoading.value = false;
  }
}

function clearFilters() {
  searchQuery.value = '';
  selectedCity.value = '';
  selectedRoleId.value = '';
  selectedGenreId.value = '';
  selectedStatus.value = '';
  selectedExperienceLevel.value = '';
  currentPage.value = 1;
  updateURL();
}

function navigateToCreate() {
  router.push('/offer/create');
}

useHead({ title: 'Предложения' });
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <div class="container mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">Объявления</h1>
        <ui-button @click="navigateToCreate">
          <Plus class="h-4 w-4" />
          <span class="hidden sm:flex">Создать объявление</span>
        </ui-button>
      </div>

      <div class="bg-card border rounded-lg p-4 mb-6 space-y-4">
        <div v-if="isLoadingFilters" class="relative">
          <ui-skeleton class="h-9 w-full" />
        </div>
        <div v-else class="relative">
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <ui-input
            v-model="searchQuery"
            placeholder="Поиск по названию или описанию..."
            class="pl-10"
            @keyup.enter="updateURL"
          />
        </div>

        <div v-if="isLoadingFilters" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <ui-skeleton class="h-9 w-full" />
          <ui-skeleton class="h-9 w-full" />
          <ui-skeleton class="h-9 w-full" />
          <ui-skeleton class="h-9 w-full" />
          <ui-skeleton class="h-9 w-full" />
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
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
            :model-value="selectedGenreId" 
            @update:model-value="(value) => {
              selectedGenreId = value as string;
              selectedGenreId = selectedGenreId === 'all' ? '' : selectedGenreId;
              updateURL();
            }"
          >
            <ui-select-trigger class="h-9 w-full">
              <ui-select-value placeholder="Жанр съемки" />
            </ui-select-trigger>
            <ui-select-content>
              <ui-select-item value="all">Все жанры</ui-select-item>
              <ui-select-item
                v-for="genre in genres"
                :key="genre.id"
                :value="genre.id"
              >
                {{ genre.title }}
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
              <ui-select-item value="intermediate">Средний</ui-select-item>
              <ui-select-item value="advanced">Опытный</ui-select-item>
              <ui-select-item value="professional">Профессионал</ui-select-item>
            </ui-select-content>
          </ui-select>

          <ui-button 
            variant="ghost" 
            @click="clearFilters"
            class="gap-2 h-9 w-full"
          >
            <Filter class="h-4 w-4" />
            Очистить фильтры
          </ui-button>
        </div>
      </div>

      <div v-if="isLoading || isLoadingFilters" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <ui-card v-for="i in 6" :key="i" class="space-y-4">
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
              <Briefcase class="h-12 w-12 text-muted-foreground" />
            </ui-empty-media>
            <ui-empty-title>Объявления не найдены</ui-empty-title>
            <ui-empty-description>
              Попробуйте изменить параметры поиска или фильтры
            </ui-empty-description>
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
  </div>
</template>

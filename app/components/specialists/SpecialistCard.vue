<script setup lang="ts">
import { Star, BriefcaseBusiness } from 'lucide-vue-next';

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
  role_data?: Record<string, unknown> | null;
}

const props = withDefaults(defineProps<{
  specialist?: Specialist;
  skeleton?: boolean;
}>(), {
  skeleton: false,
});

const router = useRouter();

const specialist = computed(() => props.specialist);
const selectedPortfolioImage = ref<{ portfolioId: string; imageIndex: number } | null>(null);

const initials = computed(() => {
  if (!specialist.value) return '?';

  const first = specialist.value.first_name?.[0] || '';
  const last = specialist.value.last_name?.[0] || '';
  return (first + last).toUpperCase() || '?';
});

const hasPortfolioPreviews = computed(() => {
  return (specialist.value?.portfolio_previews.length || 0) > 0;
});

function getExperienceLevelText(level: number | null | undefined) {
  if (level === null || level === undefined) return 'Опыт не указан';
  if (level < 3) return 'Начинающий';
  if (level < 10) return 'Любитель';
  return 'Профессионал';
}

function getPortfolioImageZIndex(portfolioId: string, imageIndex: number, imageCount: number) {
  if (selectedPortfolioImage.value?.portfolioId !== portfolioId) {
    return imageCount - imageIndex;
  }

  return 10 - Math.abs(selectedPortfolioImage.value.imageIndex - imageIndex);
}
</script>

<template>
  <ui-card
    v-if="skeleton"
    class="overflow-hidden pt-0"
  >
    <div class="relative">
      <ui-skeleton class="h-48 w-full rounded-none" />
      <div class="absolute -bottom-12 left-1/2 -translate-x-1/2">
        <ui-skeleton class="h-28 w-28 rounded-full" />
      </div>
    </div>

    <ui-card-header class="pt-14 text-center">
      <ui-skeleton class="mx-auto h-6 w-40" />
      <ui-skeleton class="mx-auto mt-2 h-4 w-56" />
    </ui-card-header>

    <ui-card-content class="space-y-2 pb-14">
      <div class="space-y-2">
        <ui-skeleton class="h-4 w-16" />
        <ui-skeleton class="min-h-10 h-10 w-full" />
        <ui-skeleton class="h-4 w-2/3" />
      </div>

      <div class="space-y-2">
        <ui-skeleton class="h-4 w-28" />
        <div class="space-y-1.5 rounded-lg border border-dashed bg-muted/40 p-3">
          <ui-skeleton class="h-3 w-56" />
          <div class="space-y-1.5">
            <ui-skeleton class="h-3 w-20" />
            <ui-skeleton class="h-4 w-full" />
            <ui-skeleton class="h-3 w-24" />
            <ui-skeleton class="h-4 w-4/5" />
            <ui-skeleton class="h-3 w-16" />
            <ui-skeleton class="h-4 w-3/5" />
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <ui-skeleton class="h-4 w-24" />
        <ui-skeleton class="h-40 w-full rounded-xl" />
      </div>
    </ui-card-content>
  </ui-card>

  <ui-card
    v-else-if="specialist"
    class="group cursor-pointer overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    @click="router.push(`/profile/user/${specialist.id}`)"
  >
    <div class="relative">
      <div class="h-48 w-full overflow-hidden bg-muted">
        <img
          v-if="specialist.cover_url"
          :src="specialist.cover_url"
          :alt="`${specialist.first_name} ${specialist.last_name}`"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div v-else class="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600" />
      </div>

      <div class="absolute -bottom-12 left-1/2 z-20 -translate-x-1/2 transform">
        <div class="relative">
          <ui-avatar class="h-28 w-28 rounded-full border-4 border-background">
            <ui-avatar-image :src="specialist.avatar_url || ''" :alt="specialist.first_name" />
            <ui-avatar-fallback class="text-lg">
              {{ initials }}
            </ui-avatar-fallback>
          </ui-avatar>

          <ui-badge
            v-if="specialist.rating"
            class="absolute -bottom-1 -right-1 flex items-center gap-1"
          >
            <Star class="h-4 w-4" />
            <span class="text-sm font-semibold">{{ specialist.rating }}</span>
          </ui-badge>
        </div>
      </div>
    </div>

    <ui-card-header class="pt-14 text-center">
      <ui-card-title class="text-2xl">
        {{ specialist.first_name }} {{ specialist.last_name }}
      </ui-card-title>
      <ui-card-description class="flex flex-wrap items-center justify-center gap-2">
        <span>{{ specialist.role?.title || 'Роль не указана' }} ({{ getExperienceLevelText(specialist.experience_level) }})</span>
        <template v-if="specialist.city">
          <div class="h-6 w-[1px] bg-border mx-1 block"></div>
          <span>{{ specialist.city }}</span>
        </template>
      </ui-card-description>
    </ui-card-header>

    <ui-card-content class="space-y-2 pb-14">
      <div class="space-y-2">
        <h3 class="text-sm font-semibold">О себе</h3>
        <p class="min-h-10 text-sm text-muted-foreground line-clamp-2">
          {{ specialist.bio || 'Информация отсутствует' }}
        </p>
      </div>

      <profile-role-additional-info
        :role-title="specialist.role?.title"
        :role-data="specialist.role_data"
        compact
      />

      <div class="space-y-3">
        <h3 class="flex items-center gap-2 text-sm font-semibold">
          <BriefcaseBusiness class="h-4 w-4" />
          Портфолио
        </h3>

        <div
          v-if="hasPortfolioPreviews"
          class="flex justify-center overflow-hidden bg-card px-2 py-3"
        >
          <div
            v-for="(portfolio, index) in specialist.portfolio_previews.slice(0, 3)"
            :key="portfolio.id"
            class="h-40 shrink-0 overflow-hidden rounded-xl bg-muted shadow-lg transition-transform duration-300 first:ml-0 hover:z-10 hover:-translate-y-1"
            :class="{
              'w-[94%]': specialist.portfolio_previews.slice(0, 3).length === 1,
              '-ml-[16%] w-[55%]': specialist.portfolio_previews.slice(0, 3).length === 2,
              '-ml-[16%] w-[42%]': specialist.portfolio_previews.slice(0, 3).length >= 3,
            }"
            :style="{ zIndex: getPortfolioImageZIndex(specialist.id, index, specialist.portfolio_previews.slice(0, 3).length) }"
            @mouseenter="selectedPortfolioImage = { portfolioId: specialist.id, imageIndex: index }"
          >
            <img
              :src="portfolio.image_url"
              :alt="portfolio.category"
              class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        <p v-else class="flex h-40 items-center justify-center rounded-xl border border-dashed text-center text-sm text-muted-foreground">
          Публичных работ пока нет
        </p>
      </div>
    </ui-card-content>
  </ui-card>
</template>

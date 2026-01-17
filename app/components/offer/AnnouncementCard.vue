<script setup lang="ts">
import { MapPin, Briefcase, Film, Clock, Eye, MessageSquare, Images } from 'lucide-vue-next';

interface Announcement {
  id: string;
  title: string;
  description: string;
  city: string | null;
  status: string;
  experience_level: string | null;
  responses_count: number | null;
  views_count: number | null;
  created_at: string | null;
  shooting_date: string | null;
  references_urls: string | null;
  role: { id: string; title: string } | null;
  shooting_genre: { id: string; title: string } | null;
}

const props = defineProps<{
  announcement: Announcement;
}>();

const router = useRouter();

const imageUrls = computed(() => {
  if (!props.announcement.references_urls) return [];
  // references_urls может быть строкой (разделенной ';') или массивом
  if (typeof props.announcement.references_urls === 'string') {
    return props.announcement.references_urls.split(';').filter(url => url.trim());
  }
  return Array.isArray(props.announcement.references_urls) ? props.announcement.references_urls : [];
});

const firstImage = computed(() => imageUrls.value[0] || null);
const remainingImagesCount = computed(() => Math.max(0, imageUrls.value.length - 1));

function formatDate(dateString: string | null) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
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

function getStatusText(status: string | null) {
  if (!status) return '';
  const statusMap: Record<string, string> = {
    'open': 'Открыто',
    'closed': 'Закрыто',
    'draft': 'Черновик'
  };
  return statusMap[status] || status;
}
</script>

<template>
  <ui-card
    class="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden pt-0"
    @click="router.push(`/offer/${announcement.id}`)"
  >
    <div v-if="firstImage" class="relative w-full aspect-video overflow-hidden bg-muted">
      <img
        :src="firstImage"
        :alt="announcement.title"
        class="w-full h-full object-cover"
      />
      <ui-badge
        v-if="remainingImagesCount > 0"
        variant="secondary"
        class="absolute top-2 right-2 gap-1"
      >
        +{{ remainingImagesCount }}
      </ui-badge>
    </div>
    
    <ui-card-header>
      <div class="flex items-start justify-between gap-2">
        <ui-card-title class="line-clamp-2">{{ announcement.title }}</ui-card-title>
      </div>
      <ui-card-description class="line-clamp-2 mt-2">
        {{ announcement.description }}
      </ui-card-description>
    </ui-card-header>

    <ui-card-content class="space-y-3">
      <div class="flex flex-wrap gap-2 text-sm">
        <ui-badge v-if="announcement.role" variant="outline" class="gap-1">
          <briefcase class="h-3 w-3" />
          {{ announcement.role.title }}
        </ui-badge>
        <ui-badge v-if="announcement.shooting_genre" variant="outline" class="gap-1">
          <film class="h-3 w-3" />
          {{ announcement.shooting_genre.title }}
        </ui-badge>
      </div>

      <div class="flex flex-col gap-2 text-sm text-muted-foreground">
        <div v-if="announcement.city" class="flex items-center gap-2">
          <MapPin class="h-4 w-4" />
          {{ announcement.city }}
        </div>
        <div v-if="announcement.shooting_date" class="flex items-center gap-2">
          <Clock class="h-4 w-4" />
          {{ formatDate(announcement.shooting_date) }}
        </div>
      </div>

      <div v-if="announcement.experience_level" class="text-sm">
        <span class="text-muted-foreground">Уровень опыта: </span>
        <span class="font-medium">{{ getExperienceLevelText(announcement.experience_level) }}</span>
      </div>

      <div class="flex items-center gap-4 pt-2 border-t text-sm text-muted-foreground">
        <div class="flex items-center gap-1">
          <Eye class="h-4 w-4" />
          {{ announcement.views_count || 0 }}
        </div>
        <div class="flex items-center gap-1">
          <MessageSquare class="h-4 w-4" />
          {{ announcement.responses_count || 0 }}
        </div>
        <div class="ml-auto text-xs">
          {{ formatDate(announcement.created_at) }}
        </div>
      </div>
    </ui-card-content>
  </ui-card>
</template>

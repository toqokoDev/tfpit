<script setup lang="ts">
import { MapPin, Building2, Film, Clock, Eye, MessageSquare, Images, User } from 'lucide-vue-next';

interface Announcement {
  id: string;
  title: string;
  description: string;
  city: string | null;
  location_name: string | null;
  status: string;
  experience_level: string | null;
  responses_count: number | null;
  views_count: number | null;
  created_at: string | null;
  shooting_date: string | null;
  references_urls: string | null;
  role: { id: string; title: string } | null;
  shooting_genre: { id: string; title: string } | null;
  user: { id: string; first_name: string; last_name: string; avatar_url: string | null } | null;
}

const props = defineProps<{
  announcement: Announcement;
}>();

const router = useRouter();

const imageUrls = computed(() => {
  if (!props.announcement.references_urls) return [];
  if (typeof props.announcement.references_urls === 'string') {
    return props.announcement.references_urls.split(';').filter(url => url.trim());
  }
  return Array.isArray(props.announcement.references_urls) ? props.announcement.references_urls : [];
});

const firstImage = computed(() => imageUrls.value[0] || null);

function formatDate(dateString: string | null) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
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
    </div>
    
    <ui-card-header>
      <div v-if="announcement.user" class="flex items-center gap-3 mb-3 pb-3 border-b">
        <NuxtLink 
          :to="`/profile/user/${announcement.user.id}`"
          class="flex items-center gap-3 hover:opacity-80 transition-opacity"
          @click.stop
        >
          <div v-if="announcement.user.avatar_url" class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img 
              :src="announcement.user.avatar_url" 
              :alt="`${announcement.user.first_name} ${announcement.user.last_name}`" 
              class="w-full h-full object-cover" 
            />
          </div>
          <div v-else class="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <User class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <p class="font-medium text-sm truncate">{{ announcement.user.first_name }} {{ announcement.user.last_name }}</p>
            <p class="text-xs text-muted-foreground">Автор объявления</p>
          </div>
        </NuxtLink>
      </div>
      <div class="flex items-start justify-between gap-2">
        <ui-card-title class="line-clamp-2">{{ announcement.title }}</ui-card-title>
      </div>
      <ui-card-description class="line-clamp-2 mt-2">
        {{ announcement.description }}
      </ui-card-description>
    </ui-card-header>

    <ui-card-content class="space-y-3">
      <div class="flex gap-2 text-sm items-center text-muted-foreground">
        <div class="flex items-center gap-2">
          <MapPin class="h-4 w-4" />
          {{ announcement.city }}
        </div>

        <div class="h-6 w-[1px] bg-border mx-1 block"></div>

        <div v-if="announcement.shooting_date" class="flex items-center gap-2">
          <Clock class="h-4 w-4" />
          {{ formatDate(announcement.shooting_date) }}
        </div>
        <span v-else class="flex items-center gap-2">
          <Clock class="h-4 w-4" />
          Обсуждается
        </span>
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

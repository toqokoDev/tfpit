<script setup lang="ts">
import { MapPin, Clock, Eye, Heart, User } from 'lucide-vue-next';

interface Announcement {
  id: string;
  title: string;
  description: string;
  city: string | null;
  location_name: string | null;
  likes_count: number | null;
  views_count: number | null;
  created_at: string | null;
  shooting_date: string | null;
  references_urls: string | null;
  user: { 
    id: string; 
    first_name: string; 
    last_name: string; 
    avatar_url: string | null 
  } | null;
}

const props = withDefaults(defineProps<{
  announcement?: Announcement;
  skeleton?: boolean;
}>(), {
  skeleton: false,
});

const router = useRouter();

const announcement = computed(() => props.announcement);

const imageUrls = computed(() => {
  if (!announcement.value?.references_urls) return [];
  if (typeof announcement.value.references_urls === 'string') {
    return announcement.value.references_urls.split(';').filter(url => url.trim());
  }
  return Array.isArray(announcement.value.references_urls) ? announcement.value.references_urls : [];
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
    v-if="skeleton"
    class="relative flex min-h-[420px] flex-col justify-end overflow-hidden pt-0"
  >
    <ui-skeleton class="absolute inset-0 h-full w-full rounded-none" />
    <div class="absolute inset-0 bg-gradient-to-t from-background/90 via-background/45 to-transparent"></div>

    <div class="relative z-10 w-full">
      <ui-card-header>
        <div class="flex items-center gap-3 mb-3 pb-3 border-b border-border/60">
          <ui-skeleton class="h-10 w-10 rounded-full" />
          <div class="min-w-0 flex-1 space-y-2">
            <ui-skeleton class="h-4 w-32" />
            <ui-skeleton class="h-3 w-24" />
          </div>
        </div>
        <ui-skeleton class="h-20 w-full" />
      </ui-card-header>

      <ui-card-content>
        <div class="mt-3 border-t border-border/60">
          <ui-skeleton class="mt-3 h-5 w-full" />
        </div>
      </ui-card-content>
    </div>
  </ui-card>

  <ui-card
    v-else-if="announcement"
    :class="[
      'group relative flex flex-col cursor-pointer overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
      firstImage ? 'min-h-[420px] justify-end text-white' : 'hover:scale-[1.01]',
    ]"
    @click="router.push(`/offer/${announcement.id}`)"
  >
    <div v-if="firstImage" class="absolute inset-0 bg-muted">
      <img
        :src="firstImage"
        :alt="announcement.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"></div>
    </div>
    
    <div class="relative z-10 w-full">
      <ui-card-header>
        <div
          v-if="announcement.user"
          :class="[
            'flex items-center gap-3 mb-3 pb-3 border-b',
            firstImage ? 'border-white/20' : '',
          ]"
        >
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
              <p :class="['text-xs', firstImage ? 'text-white/70' : 'text-muted-foreground']">Автор объявления</p>
            </div>
          </NuxtLink>
        </div>
        <div class="flex items-start justify-between gap-2">
          <ui-card-title class="line-clamp-2">{{ announcement.title }}</ui-card-title>
        </div>
        <ui-card-description :class="['line-clamp-2 mt-2', firstImage ? 'text-white/80' : '']">
          {{ announcement.description }}
        </ui-card-description>
      </ui-card-header>

      <ui-card-content class="space-y-3">
        <div :class="['flex gap-2 text-sm items-center', firstImage ? 'text-white/80' : 'text-muted-foreground']">
          <div class="flex items-center gap-2">
            <MapPin class="h-4 w-4" />
            {{ announcement.city }}
          </div>

          <div :class="['h-6 w-[1px] mx-1 block', firstImage ? 'bg-white/20' : 'bg-border']"></div>

          <div v-if="announcement.shooting_date" class="flex items-center gap-2">
            <Clock class="h-4 w-4" />
            {{ formatDate(announcement.shooting_date) }}
          </div>
          <span v-else class="flex items-center gap-2">
            <Clock class="h-4 w-4" />
            Обсуждается
          </span>
        </div>

        <div :class="['flex items-center gap-4 pt-2 border-t text-sm', firstImage ? 'border-white/20 text-white/80' : 'text-muted-foreground']">
          <div class="flex items-center gap-1">
            <Eye class="h-4 w-4" />
            {{ announcement.views_count || 0 }}
          </div>
          <div class="flex items-center gap-1">
            <Heart class="h-4 w-4"/>
            {{ announcement.likes_count || 0 }}
          </div>
          <div class="ml-auto text-xs">
            {{ formatDate(announcement.created_at) }}
          </div>
        </div>
      </ui-card-content>
    </div>
  </ui-card>
</template>
